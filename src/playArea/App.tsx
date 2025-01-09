import GameBoard from "../GameBoard/gameboard.component";
import ImageGallery from "../playerHand/playerHand.component";
import { CreatePlayerElements } from "../Player/player.component";
import CardPlayed from "../PlayedCard/PlayedCard.component";
import ImageLoader from "../AssetsLoader/imageLoader.component";
import {
  ClaimButton,
  Deck,
  DeckImage,
  GameBoardStyle,
  PlayArea,
  Score,
} from "./App.styles";
import CardSelect from "../GameScreens/CardSelect/CardSelect.component";
import { useSelection } from "../GameBoard/gameboard.context";

import { useState, useEffect } from "react";
import { GameLobbyDataService } from "../Services/Service.Send";
import { GameFormData } from "../models/model";
import { RoomScreenReadService } from "../Services/Service.Read";


import { useCurrentPlayer } from "../GameScreens/Room/player.context";
import GameForm from "../GameScreens/lobby/lobby.component";
import RoomScreen from "../GameScreens/Room/Room.component";
import GameResult from "../GameScreens/GameEnd/GameEnd.component";
import SuggestionText from "../GameScreens/Suggestion/Suggestion.component";
import { useSuggestion } from "../GameScreens/Suggestion/Suggestion.context";
import { useTurn } from "../Deck/deck.context";
import { useWebSocket } from "../Services/websocket.services";

import { usePlayedCard } from "../PlayedCard/PlayedCard.context";

function App() {

 

  const { setIsSelectionActive } = useSelection();
  const { setCurrentPlayer, RoomId, currentPlayer } = useCurrentPlayer();
  const [currentScreen, setCurrentScreen] = useState("game");
  // const { images, setImages  } = usePlayerHand();
  // const { setdropCard, setDropCardNum } = useCards();
  const { setSuggestion, setSuggestionType } = useSuggestion();
  const { isYourTurn, setIsTurnCompleted, setIsYourTurn , isTurnCompleted} = useTurn();
  const { sendMessage, messages , sendDraft, draft} = useWebSocket();
   const {PlayedCard} = usePlayedCard();
 
  

  useEffect(() => {

    if (messages[0]?.content?.currentScreen) {
      setCurrentScreen(messages[0].content.currentScreen);
    }
    if ( messages[0]?.content?.currentPlayer) {
      setIsYourTurn(messages[0]?.content?.currentPlayer === currentPlayer)
    }
    if(messages[0]?.type === 'error'){
      setSuggestionType('error')
        setSuggestion(messages[0]?.content?.error)
    }
    if(messages[0]?.type === 'sequence'){
      setSuggestionType('sequence')
        setSuggestion(messages[0]?.content?.info)
    }
    if(messages[0]?.type === 'info'){
      setSuggestionType('info')
        setSuggestion(messages[0]?.content?.info)
    }
      
  }, [messages]);

  const handleGameFormSubmit = (formData: GameFormData) => {
    GameLobbyDataService(formData);
    sendMessage( { action: "createGame", Message: formData })
    setCurrentPlayer(formData.PlayerUseName);
  };
  const handleRoomScreenComplete = () => {
    sendMessage( { action: "GameStart", Message: {
      roomId: RoomId, 
      playerId: currentPlayer
    } })
  };
  RoomScreenReadService();
  const handleDeck = () => {
    if (isYourTurn) {
      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Deck",
          roomId: RoomId,
          currentPlayer: currentPlayer,
        },
      })
      setIsTurnCompleted(false);
    }
  };

  return (
    <PlayArea>
      {currentScreen === "gameForm" && (
        <GameForm onSubmit={handleGameFormSubmit} />
      )}
      {currentScreen === "roomScreen" && (
        <RoomScreen onClick={handleRoomScreenComplete}></RoomScreen>
      )}

      {currentScreen === "game" && (
        <div>
          <GameBoardStyle>
            <GameBoard  />
          </GameBoardStyle>
          <CreatePlayerElements
          />
          <Deck onClick={handleDeck}>
            <ImageLoader
              src={import.meta.env.VITE_ASSETS_URL + "deck.png"}
              StyledImg={DeckImage}
            />
          </Deck>
          <CardPlayed />
          <ClaimButton disabled={!isTurnCompleted}
            onClick={() => {
                setIsSelectionActive("Claim");
                setSuggestion("Select the Sequence to claim");
            }}
          >
            Claim
          </ClaimButton>
          {}{" "}
          <Score
           
              disabled={!isTurnCompleted}
              onClick={() => {
                if(draft){
                sendDraft();
                }
                else{
                  console.log(PlayedCard)
                  sendMessage({
                    action: "sendMove",
                    Message: {
                      command: "Dead",
                      roomId: RoomId,
                      currentPlayer: currentPlayer,
                      lastPlayedCard: PlayedCard
                    }
                  })
                }
                setIsTurnCompleted(false);
                setIsSelectionActive('')
              }}
            >
              Next

          </Score>
          <ImageGallery
          />
          <CardSelect />
        </div>
      )}
      <GameResult></GameResult>
      <SuggestionText></SuggestionText>
      <h1>{} </h1>
    </PlayArea>
  );
}

export default App;
