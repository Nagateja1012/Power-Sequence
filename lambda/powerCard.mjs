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

const getNextPlayer = (isreverse, currentPlayer, orderedPlayers) => { 
  return isreverse
    ? (currentPlayer - 1 + orderedPlayers.length) % orderedPlayers.length
    : (currentPlayer + 1) % orderedPlayers.length;  
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

export const handler = async (event) => {


    const { roomId, currentPlayer: playerId,command, playerMove,grabPlayer, lastPlayedCard } = JSON.parse(event.body).Message;

    const [playersInRoom, gameState] = await Promise.all([
        getPlayersInRoom(roomId),
        getGameState(roomId)
      ]);
      const { currentPlayer, isreverse, orderedPlayers,Deck, numsequence, teamsequence } = gameState;


    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
      };
      

       
    switch (command) {
        case 'Deck':
            const nextPlayer = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
            const player = playersInRoom.find(p => p.playerId === playerId);
            
            // Get the Deck array from game data

if (Deck && Deck.length > 0) {
  // Pop a card from Deck
  const card = Deck.pop();

  // Update Deck in DynamoDB
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLES.GAME,
      Key: { roomId },
      UpdateExpression: "set Deck = :Deck",
      ExpressionAttributeValues: {
        ":Deck": Deck
      }
    })
  );
  await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
    ":skipNextplayer": nextPlayer
  });

  // Send card to player
  await webClient.send(
    new PostToConnectionCommand({
      ConnectionId: player.clientId,
      Data: JSON.stringify({
        type: "Power",
        content: { command: "Deck", card   }
      })
    })
  );


  await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[nextPlayer].playerId}}) 

} else {
  // Send no cards message
  await webClient.send(
    new PostToConnectionCommand({
      ConnectionId: player.clientId, 
      Data: JSON.stringify({
        type: "error",
        content: {error:  "No more cards in Deck"}
      })
    })
  );
}              
return response;

case 'Skip':

const skipplayer =  getNextPlayer(isreverse, currentPlayer, orderedPlayers);
const skipNextplayer = getNextPlayer(isreverse, skipplayer, orderedPlayers);
await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
    ":skipNextplayer": skipNextplayer
  });
await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[skipNextplayer].playerId, lastPlayedCard:"SKIP" }})

return response;

case 'Reverse':
const reverseplayer =  getNextPlayer(!isreverse, currentPlayer, orderedPlayers);
await updateGameState(roomId, "SET currentPlayer = :reverseNextplayer, isreverse = :isreverse", {
    ":reverseNextplayer": reverseplayer,
    ":isreverse": !isreverse
  });
  await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[reverseplayer].playerId,lastPlayedCard:'REVERSE' }})

    return response;

    case 'Erase':

        const isEraseValid = () => {
            return teamsequence.some(sequence => 
              sequence.length === playerMove.length && 
              sequence.every((val, index) => val === playerMove[index])
            );
          }
          if(isEraseValid()){
            const earplayer = playersInRoom.find(p => p.playerId === playerId);
            await webClient.send(
                new PostToConnectionCommand({
                  ConnectionId: earplayer.clientId,
                  Data: JSON.stringify({
                    type: "error",
                    content: {error:  "Selected sequence not claimed cannot be erased"}
                  })
                })
              );
              return response;
          }
    const earseNext = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
     await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
content: { command:'Erase', currentPlayer: orderedPlayers[earseNext].playerId,lastPlayedCard:'ERASE', playerMove:playerMove }})
await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
    ":skipNextplayer": earseNext
  });
    return response;

case 'Destroy':
     const destroyNext = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
// Function to check if arrays are equal regardless of element order
const areArraysEqual = (arr1, arr2) => {

  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort((a,b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  const sorted2 = [...arr2].sort((a,b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
 
  return sorted1.every((val, idx) => val[0] === sorted2[idx][0] && val[1] === sorted2[idx][1]);
};

// Function to check sequence match and return index
const checkSequenceMatch = (playerSequence, teamSequences) => {
  for (let i = 0; i < teamSequences.length; i++) {
    if (areArraysEqual(playerSequence[0], teamSequences[i])) {
      teamSequences.splice(i, 1); // Remove matched sequence
      return i;
    }
  }
  return -1;
};

const index = checkSequenceMatch(playerMove, teamsequence)

if(index != -1){
  numsequence[index] = numsequence[index] - 1  
  await updateGameState(roomId, "SET numsequence = :numsequence, teamsequence = :teamsequence", {
    ":numsequence": numsequence,
    ":teamsequence": teamsequence
  })
    await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
   content: { command:'Destroy', currentPlayer: orderedPlayers[destroyNext].playerId,lastPlayedCard:'DESTROY', playerMove:playerMove }})
   await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
    ":skipNextplayer": destroyNext
  });
}else{
    const player = playersInRoom.find(p => p.playerId === playerId);
    await webClient.send(
        new PostToConnectionCommand({
          ConnectionId: player.clientId,
          Data: JSON.stringify({
            type: "error",
            content: {error:  "Selected sequence not claimed cannot be destroyed"}
          })
        })
      );
}
   
   
   return response;


   case 'Alter1':
    

    // Function to get top 4 cards from deck and send to player
const sendTopFourCards = async ( roomId, playerId, playersInRoom, Deck) => {
  const player = playersInRoom.find(p => p.playerId === playerId);
  
  if (Deck && Deck.length >= 4) {
    // Get top 4 cards
    const topCards = Deck.slice(-4);
    
    // Send cards to player
    await webClient.send(
      new PostToConnectionCommand({
        ConnectionId: player.clientId,
        Data: JSON.stringify({
          type: "Power", 
          content: {
            command: "Alter1",
            cards: topCards
          }
        })
      })
    );
    const updatedDeck = Deck.slice(0, -4);
    await updateGameState(roomId, "SET Deck = :updatedDeck", {
        ":updatedDeck": updatedDeck
      });
  } else {
    // Send error if not enough cards
    await webClient.send(
      new PostToConnectionCommand({
        ConnectionId: player.clientId,
        Data: JSON.stringify({
          type: "error",
          content: {
            error: "Not enough cards in deck"
          }
        })
      })
    );
  }
};    

await sendTopFourCards( roomId,playerId, playersInRoom, Deck);
return response;

case 'Alter2':
    const alterNext = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
    // Function to add player move cards back to deck
const addCardsBackToDeck = async (roomId, playerMove, Deck) => {
  // Add player move cards to top of deck
  const updatedDeck = [...Deck, ...playerMove];
  
  // Update deck in game state
  await updateGameState(roomId, "SET Deck = :updatedDeck", {
    ":updatedDeck": updatedDeck
  });
  
  return updatedDeck;
};        
addCardsBackToDeck(roomId, playerMove, Deck)
await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
content: {  currentPlayer: orderedPlayers[alterNext].playerId,lastPlayedCard:'ALTER'}})
await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
    ":skipNextplayer": alterNext
  });

return response;

case 'Grab':

    const grabplayerfrom = playersInRoom.find(p => p.playerId === grabPlayer);

    await webClient.send(
        new PostToConnectionCommand({
          ConnectionId: grabplayerfrom.clientId,
          Data: JSON.stringify({
            type: "Power",
            content: { command: "GrabFrom", returnPlayerid:playerId }
          })
        })
      );
      

return response;

case 'GrabFrom':
    // Function to find index of player in orderedPlayers array
const findPlayerIndex = (playerId, orderedPlayers) => {
  return orderedPlayers.findIndex(player => player.playerId === playerId);
}; 
const grabplayerindex= findPlayerIndex(grabPlayer, orderedPlayers)  ;     
const grabFromNext = getNextPlayer(isreverse, grabplayerindex, orderedPlayers)
    const grabplayerTo = playersInRoom.find(p => p.playerId === grabPlayer);
    await webClient.send(
        new PostToConnectionCommand({
          ConnectionId: grabplayerTo.clientId,
          Data: JSON.stringify({
            type: "Power",
            content: { command: "Grab", card:playerMove }
          })
        })
      );
    await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[grabFromNext].playerId,lastPlayedCard:'GRAB' }})
    await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
        ":skipNextplayer": grabFromNext
      });

return response;


case 'Drop':
    const dropNext = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
    
    await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[dropNext].playerId,lastPlayedCard:'DROP', playerMove, command: 'Drop' }})
    await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
        ":skipNextplayer": dropNext
      });

return response;

case 'Drop1':
    const dropNext1 = getNextPlayer(isreverse, currentPlayer, orderedPlayers)
    

    await broadcastToPlayers(playersInRoom,{type: "PowerUpdate",
    content: {  currentPlayer: orderedPlayers[dropNext1].playerId,lastPlayedCard }})
    await updateGameState(roomId, "SET currentPlayer = :skipNextplayer", {
        ":skipNextplayer": dropNext1
      });

return response;


}




  };
  
