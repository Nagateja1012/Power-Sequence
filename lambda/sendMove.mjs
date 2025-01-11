import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const webClient = new ApiGatewayManagementApiClient({
  endpoint: process.env.WEBSOCKET_ENDPOINT,
});

const TABLES = {
  CONNECTIONS: "PowerSequence_Connections",
  ROOM: "PowerSequence_Room",
  GAME: "PowerSequence_Game",
};

const broadcastToPlayers = async (players, message) => {
  await Promise.all(
    players.map((player) =>
      webClient.send(
        new PostToConnectionCommand({
          ConnectionId: player.clientId,
          Data: JSON.stringify(message),
        })
      )
    )
  );
};

const updateGameState = async (roomId, updateExpression, expressionValues) => {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLES.GAME,
      Key: { roomId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionValues,
    })
  );
};

const getGameState = async (roomId) => {
  const response = await dynamoDB.send(
    new GetCommand({
      TableName: TABLES.GAME,
      Key: { roomId },
    })
  );
  return response.Item;
};

const getPlayersInRoom = async (roomId) => {
  const response = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      KeyConditionExpression: "roomId = :roomId",
      ExpressionAttributeValues: { ":roomId": roomId },
    })
  );
  return response.Items;
};

export const handler = async (event) => {
  const {
    roomId,
    lastPlayedCard,
    command,
    playerMove,
    currentPlayer: playerId,
  } = JSON.parse(event.body).Message;
  const [playersInRoom, gameState] = await Promise.all([
    getPlayersInRoom(roomId),
    getGameState(roomId),
  ]);

  const { currentPlayer, isreverse, orderedPlayers } = gameState;

  const nextPlayer = isreverse
    ? (currentPlayer - 1 + orderedPlayers.length) % orderedPlayers.length
    : (currentPlayer + 1) % orderedPlayers.length;

  if (command === "placeCoin" || command === "Dead") {
    await updateGameState(roomId, "SET currentPlayer = :nextPlayer", {
      ":nextPlayer": nextPlayer,
    });
  }
  if (command === "placeCoin") {
    await broadcastToPlayers(playersInRoom, {
      type: "playerMove",
      content: {
        playerMove,
        currentPlayer: orderedPlayers[nextPlayer].playerId,
        lastPlayedCard,
      },
    });
  } else if (command === "Dead") {
    await broadcastToPlayers(playersInRoom, {
      type: "playerMove",
      content: {
        currentPlayer: orderedPlayers[nextPlayer].playerId,
        lastPlayedCard,
      },
    });
    await broadcastToPlayers(playersInRoom, {
      type: "info",
      content: { info: "Dead Card Played" },
    });
  } else if (command === "Claim") {
    const [{ numsequence: sequence }, { teamsequence: claimsequence }] =
      await Promise.all([
        dynamoDB
          .send(
            new GetCommand({
              TableName: TABLES.GAME,
              Key: { roomId },
              ProjectionExpression: "numsequence",
            })
          )
          .then((res) => res.Item),
        dynamoDB
          .send(
            new GetCommand({
              TableName: TABLES.GAME,
              Key: { roomId },
              ProjectionExpression: "teamsequence",
            })
          )
          .then((res) => res.Item),
      ]);

    const teamNumber = playerMove[0][0] - 1;
    const sequenceClaimed = playerMove.slice(1);
    const previousSequence = claimsequence[teamNumber];

    if (sequence[teamNumber] !== 0) {
      const matchingSequences = previousSequence.reduce(
        (count, seq) =>
          count +
          (sequenceClaimed.some(
            (claimed) => JSON.stringify(claimed) === JSON.stringify(seq)
          )
            ? 1
            : 0),
        0
      );

      if (matchingSequences > 2) {
        const player = playersInRoom.find((p) => p.playerId === playerId);
        await webClient.send(
          new PostToConnectionCommand({
            ConnectionId: player.clientId,
            Data: JSON.stringify({
              type: "error",
              content: {
                error:
                  "More than 2 coins from previous sequences detected in claim",
              },
            }),
          })
        );
        return { statusCode: 200, body: JSON.stringify("success") };
      }
    }

    sequence[teamNumber]++;

    if (sequence[teamNumber] === 2) {
      await broadcastToPlayers(playersInRoom, {
        type: "Winner",
        content: { Team: playerMove[0][0].toString() },
      });
    } else {
      await broadcastToPlayers(playersInRoom, {
        type: "sequence",
        content: { info: "Sequence claimed" },
      });

      claimsequence[teamNumber] = sequenceClaimed;
      await updateGameState(
        roomId,
        "SET numsequence = :sequence, teamsequence = :teamsequence",
        {
          ":sequence": sequence,
          ":teamsequence": claimsequence,
        }
      );
    }
  }

  return { statusCode: 200, body: JSON.stringify("success") };
};
