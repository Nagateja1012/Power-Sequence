import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
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

const response = {
  statusCode: 200,
  body: JSON.stringify('Hello from Lambda!'),
};

const broadcastToPlayers = async (players, message) => {
  await Promise.all(
    players.map(player =>
      webClient.send(
        new PostToConnectionCommand({
          ConnectionId: player.clientId,
          Data: JSON.stringify(message),
        })
      )
    )
  );
};

const getPlayersInRoom = async (roomId) => {
  const response = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      KeyConditionExpression: "roomId = :roomId",
      ExpressionAttributeValues: { ":roomId": roomId }
    })
  );
  return response.Items;
};
  const getGameState = async (roomId) => {
    const response = await dynamoDB.send(
      new GetCommand({
        TableName: TABLES.GAME,
        Key: { roomId }
      })
    );
    return response.Item;
  };


   const updateGameState = async (roomId, updateExpression, expressionAttributeValues) => {
      await dynamoDB.send(
        new UpdateCommand({
          TableName: TABLES.GAME,
          Key: { roomId },
          UpdateExpression: updateExpression,
          ExpressionAttributeValues: expressionAttributeValues
        })
      );
    };


    const deleteConnection = async (roomId, clientId , playerId) => {
      await dynamoDB.send(
        new DeleteCommand({
          TableName: TABLES.CONNECTIONS,
          Key: { roomId , playerId }, // Use the partition key
          ConditionExpression: "clientId = :clientId", // Ensure clientId matches
          ExpressionAttributeValues: {
            ":clientId": clientId
          }
        })
      );
    };

const getNextPlayerIndex = (currentPlayer, isReverse, totalPlayers) => {
  return isReverse
    ? (currentPlayer - 1 + totalPlayers) % totalPlayers
    : (currentPlayer + 1) % totalPlayers;
};

export const handler = async (event) => {
  const clientId = event.requestContext.connectionId;

  const {Items} = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      IndexName: "clientId-index", // Replace with your GSI name
      KeyConditionExpression: "clientId = :clientId",
      ExpressionAttributeValues: {
        ":clientId": clientId
      }
    })
  );
  const Item = Items[0]
  if (!Item) {
    return response;
  }
    
  const { playerId, roomId } = Item;

  const [playersInRoom, gameState] = await Promise.all([
    getPlayersInRoom(roomId),
    getGameState(roomId)
  ]);
      
  if(gameState){
  const { currentPlayer, isreverse, orderedPlayers } = gameState;
  const playerIndex = orderedPlayers.findIndex(player => player.playerId === playerId);

  await deleteConnection(roomId,clientId, playerId);

  if (playerIndex === currentPlayer) {
    const nextPlayer = getNextPlayerIndex(currentPlayer, isreverse, orderedPlayers.length);

    await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
      ":skipNextplayer": nextPlayer
    });

    await broadcastToPlayers(
      playersInRoom.filter(player => player.playerId !== playerId), 
      {
        type: "PowerUpdate",
        content: { currentPlayer: orderedPlayers[nextPlayer].playerId }
      }
    );
  }
     
  const updatedPlayers = orderedPlayers.filter(player => player.playerId !== playerId);
  await updateGameState(roomId, "SET orderedPlayers = :players", {
    ":players": updatedPlayers,
  });
}
      
  return response;
}


