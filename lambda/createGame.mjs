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
};

const TTL = 4 * 60 * 60;

const generateRoomId = () => {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
};

const sendMessage = async (connectionId, message) => {
  try {
    await webClient.send(
      new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: Buffer.from(JSON.stringify(message)),
      })
    );
    console.log("Message sent successfully to connection:", connectionId);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const getPlayersInRoom = async (roomId) => {
  return await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      KeyConditionExpression: "roomId = :roomId",
      ExpressionAttributeValues: {
        ":roomId": roomId,
      },
    })
  );
};

const broadcastToRoom = async (players, roomId) => {
  const roomData = await dynamoDB.send(
    new GetCommand({
      TableName: TABLES.ROOM,
      Key: { roomId },
    })
  );

  const playerData = players.Items.map((p) => ({
    playerId: p.playerId,
    playerName: p.playerName,
    teamId: p.teamId,
  }));

  const messagePromises = players.Items.map((player) =>
    sendMessage(player.clientId, {
      type: "PlayerData",
      content: { 
        roomId, 
        players: playerData,
        numTeams: roomData.Item.numTeam
      },
    })
  );

  await Promise.all(messagePromises);
};

const teamSelected = async (message) => {
  const { roomId, playerId, teamId } = message;

  try {
    await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLES.CONNECTIONS,
        Key: { roomId, playerId },
        UpdateExpression: "set teamId = :teamId",
        ExpressionAttributeValues: { ":teamId": teamId },
      })
    );

    const playersInRoom = await getPlayersInRoom(roomId);
    await broadcastToRoom(playersInRoom, roomId);
    
  } catch (error) {
    console.error("Error updating team selection:", error);
    throw error;
  }
};

const createNewRoom = async (message, connections) => {
  let roomId;
  let existingRoom;
  do {
    roomId = generateRoomId();
    existingRoom = await dynamoDB.send(
      new GetCommand({
        TableName: TABLES.ROOM,
        Key: { roomId },
      })
    );
  } while (existingRoom.Item && existingRoom.Item.status !== "ended");

  message.Message.roomId = roomId;
  connections.Item.roomId = roomId;

  const room = {
    TableName: TABLES.ROOM,
    Item: {
      roomId,
      roomPassword: message.Message.roomPassword,
      numPlayers: message.Message.numPlayers,
      numTeam: message.Message.numTeams,
      status: "waiting",
      ttl: TTL,
      timestamp: new Date().toISOString(),
    },
  };

  await Promise.all([
    dynamoDB.send(new PutCommand(connections)),
    dynamoDB.send(new PutCommand(room)),
  ]);

  return roomId;
};

export const handler = async (event) => {
  const message = JSON.parse(event.body);
  const clientId = event.requestContext.connectionId;

  if (message.Message.teamSelect) {
     await teamSelected(message.Message);
    return {
        statusCode: 200,
        body: JSON.stringify({
          message: "updated team",
          clientId,
          roomId: roomId,
        }),
      };
  } else {
    const connections = {
      TableName: TABLES.CONNECTIONS,
      Item: {
        roomId: message.Message.roomId,
        playerId: message.Message.PlayerUseName,
        playerName: message.Message.playerName,
        clientId,
        teamId: null,
        ttl: TTL,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      if (message.Message.isCreate) {
        await createNewRoom(message, connections);
      } else {
        const roomData = await dynamoDB.send(
          new GetCommand({
            TableName: TABLES.ROOM,
            Key: { roomId: message.Message.roomId },
          })
        );

        if (
          !roomData.Item ||
          roomData.Item.roomPassword !== message.Message.roomPassword ||
          roomData.Item.status !== "waiting"
        ) {
          await sendMessage(clientId, {
            type: "error",
            content: { error: "Invalid room ID or password" },
          });
          return {
            statusCode: 401,
            body: JSON.stringify({ message: "Invalid room ID or password" }),
          };
        }

        await dynamoDB.send(new PutCommand(connections));
      }

      const playersInRoom = await getPlayersInRoom(message.Message.roomId);
      await broadcastToRoom(playersInRoom, message.Message.roomId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Successfully created game room",
          clientId,
          roomId: message.Message.roomId,
        }),
      };
    } catch (error) {
      await sendMessage(clientId, {
        type: "error",
        content: { error: "Failed to create game room. Please Try Again" },
      });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message:
            error.name === "GetCommand"
              ? "Failed to retrieve room details"
              : "Failed to create game room",
          error: error.message,
        }),
      };
    }
  }
};
