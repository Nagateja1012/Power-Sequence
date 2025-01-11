import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
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

const TTL = 4 * 60 * 60;

const COLOR_MAP = {
  R: "#fa6666",
  B: "#accaff",
  G: "#a9e77f",
  W: "#ffffff",
};

const CORNERS = [
  [0, 0],
  [0, 7],
  [7, 0],
  [7, 7],
];

const GAME_BOARD = [
  ...Array(2)
    .fill(["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"])
    .flat(),
  ...Array(2)
    .fill(["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"])
    .flat(),
  ...Array(2)
    .fill(["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"])
    .flat(),
];

const DECK = [
  ...Array(3)
    .fill(["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"])
    .flat(),
  ...Array(3)
    .fill(["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"])
    .flat(),
  ...Array(3)
    .fill(["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"])
    .flat(),
  ...Array(3)
    .fill([
      "SKIP",
      "REVERSE",
      "ERASE",
      "ALTER",
      "GRAB",
      "JOKER",
      "DROP",
      "JOKER",
    ])
    .flat(),
  "SKIP",
  "REVERSE",
  "ERASE",
  "ALTER",
  "GRAB",
  "JOKER",
  "DROP",
];

export const handler = async (event) => {
  const { roomId, playerId } = JSON.parse(event.body).Message;

  const connectionResponse = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      KeyConditionExpression: "playerId = :playerId AND roomId = :roomId",
      ExpressionAttributeValues: { ":playerId": playerId, ":roomId": roomId },
    })
  );

  const { teamId, playerName, clientId } = connectionResponse.Items[0];
  const newPlayer = { playerId, teamId, name: playerName };

  try {
    await updateOrCreateGame(roomId, newPlayer);

    const [roomResponse, gameResponse] = await Promise.all([
      dynamoDB.send(
        new GetCommand({ TableName: TABLES.ROOM, Key: { roomId } })
      ),
      dynamoDB.send(
        new GetCommand({ TableName: TABLES.GAME, Key: { roomId } })
      ),
    ]);

    const numPlayers = roomResponse.Item.numPlayers;
    const currentPlayers = gameResponse.Item.orderedPlayers.length;

    if (currentPlayers == numPlayers) {
      await gameGenerate(roomId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ isComplete: currentPlayers === numPlayers }),
    };
  } catch (error) {
    throw error;
  }
};

const updateOrCreateGame = async (roomId, newPlayer) => {
  try {
    const existingGame = await dynamoDB.send(
      new GetCommand({
        TableName: TABLES.GAME,
        Key: { roomId },
      })
    );

    if (
      existingGame.Item &&
      existingGame.Item.orderedPlayers.some(
        (p) => p.playerId === newPlayer.playerId
      )
    ) {
      return;
    }

    await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLES.GAME,
        Key: { roomId },
        UpdateExpression:
          "SET orderedPlayers = list_append(if_not_exists(orderedPlayers, :empty_list), :player)",
        ExpressionAttributeValues: {
          ":player": [newPlayer],
          ":empty_list": [],
        },
        ConditionExpression: "attribute_exists(roomId)",
      })
    );
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      await dynamoDB.send(
        new PutCommand({
          TableName: TABLES.GAME,
          Item: {
            roomId,
            orderedPlayers: [newPlayer],
            ttl: Math.floor(Date.now() / 1000) + TTL,
          },
          ConditionExpression: "attribute_not_exists(roomId)",
        })
      );
    } else {
      throw error;
    }
  }
};

const gameGenerate = async (roomId) => {
  const gameResponse = await dynamoDB.send(
    new GetCommand({
      TableName: TABLES.GAME,
      Key: { roomId },
    })
  );

  const sortedPlayers = sortPlayersByTeam(gameResponse.Item.orderedPlayers);
  const initialGrid = generateGameBoard();
  const shuffledDeck = [...DECK].sort(() => Math.random() - 0.5);
  await Promise.all([
    notifyPlayers(roomId, sortedPlayers, initialGrid, shuffledDeck),
    updateGameState(roomId, sortedPlayers, initialGrid, shuffledDeck),
  ]);
};

const sortPlayersByTeam = (players) => {
  const teamGroups = players.reduce((groups, player) => {
    (groups[player.teamId] = groups[player.teamId] || []).push(player);
    return groups;
  }, {});

  const teams = Object.keys(teamGroups).sort();
  const sortedPlayers = [];
  let teamIndex = 0;

  while (Object.values(teamGroups).some((group) => group.length > 0)) {
    const currentTeam = teams[teamIndex];
    if (teamGroups[currentTeam]?.length) {
      sortedPlayers.push(teamGroups[currentTeam].shift());
    }
    teamIndex = (teamIndex + 1) % teams.length;
  }

  return sortedPlayers;
};

const generateGameBoard = () => {
  const shuffledBoard = [...GAME_BOARD].sort(() => Math.random() - 0.5);
  const grid = Array(8)
    .fill()
    .map(() =>
      Array(8)
        .fill()
        .map(() => ({
          value: -1,
          color: "#ffffff",
          hasIcon: false,
        }))
    );

  let inputIndex = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (CORNERS.some(([r, c]) => r === row && c === col)) {
        grid[row][col] = {
          value: -1,
          color: COLOR_MAP.W,
          hasIcon: true,
        };
      } else if (inputIndex < shuffledBoard.length) {
        const item = shuffledBoard[inputIndex++];
        grid[row][col] = {
          value: parseInt(item.substring(1)),
          color: COLOR_MAP[item.charAt(0)],
          hasIcon: false,
        };
      }
    }
  }
  return grid;
};

const updateGameState = async (roomId, players, board, deck) => {
  const uniqueTeams = [...new Set(players.map((player) => player.teamId))];
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLES.GAME,
      Key: { roomId },
      UpdateExpression:
        "SET orderedPlayers = :players, Deck = :deck, isreverse = :isreverse, currentPlayer = :currentPlayer, numsequence = :sequence, teamsequence =:teamsequence",
      ExpressionAttributeValues: {
        ":players": players,
        ":deck": deck,
        ":isreverse": false,
        ":currentPlayer": 0,
        ":sequence": Array(uniqueTeams.length).fill(0),
        ":teamsequence": Array(uniqueTeams.length).fill([]),
      },
    })
  );
};

const notifyPlayers = async (roomId, players, board, deck) => {
  const playersInRoom = await getPlayersInRoom(roomId);

  const notifications = playersInRoom.flatMap((player) => {
    const messages = [
      {
        ConnectionId: player.clientId,
        Data: JSON.stringify({
          type: "GAME_START",
          content: {
            board,
            players,
            currentScreen: "game",
            cards: deck.splice(0, 4),
            currentPlayer: players[0].playerId,
          },
        }),
      },
    ];

    return messages.map((msg) =>
      webClient.send(new PostToConnectionCommand(msg)).catch((err) => {})
    );
  });

  await Promise.all(notifications);
};

const getPlayersInRoom = async (roomId) => {
  return await dynamoDB
    .send(
      new QueryCommand({
        TableName: TABLES.CONNECTIONS,
        KeyConditionExpression: "roomId = :roomId",
        ExpressionAttributeValues: {
          ":roomId": roomId,
        },
      })
    )
    .then((response) => response.Items);
};
