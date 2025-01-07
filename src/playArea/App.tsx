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

import { usePlayerHand } from "../playerHand/playerHand.context";
import { useCards } from "../GameScreens/CardSelect/CardSelect.context";
import { useCurrentPlayer } from "../GameScreens/Room/player.context";
import GameForm from "../GameScreens/lobby/lobby.component";
import RoomScreen from "../GameScreens/Room/Room.component";
import GameResult from "../GameScreens/GameEnd/GameEnd.component";
import SuggestionText from "../GameScreens/Suggestion/Suggestion.component";
import { useSuggestion } from "../GameScreens/Suggestion/Suggestion.context";
import { useTurn } from "../Deck/deck.context";
import { useWebSocket } from "../Services/websocket.services";

function App() {

 

  const { setIsSelectionActive } = useSelection();
  const { setCurrentPlayer, RoomId, currentPlayer } = useCurrentPlayer();
  const [currentScreen, setCurrentScreen] = useState("game");
  const { images, setImages } = usePlayerHand();
  const { setdropCard, setDropCardNum } = useCards();
  const { setSuggestion, setSuggestionType } = useSuggestion();
  const { isYourTurn, setIsTurnCompleted } = useTurn();
  const { sendMessage, messages } = useWebSocket();

  useEffect(() => {
    if (messages[0]?.content?.currentScreen) {
      setCurrentScreen(messages[0].content.currentScreen);
    }
    if(messages[0]?.type === 'error'){
      setSuggestionType('error')
        setSuggestion(messages[0]?.content?.error)
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
      console.log("deck clicked");
      setImages([...images, "ERASE"]);
      setIsTurnCompleted(true);
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
          <ClaimButton
            onClick={() => {
              sendMessage({ action: "sendMove", Message: { hello: "hi" } });
              if (isYourTurn) {
                setIsSelectionActive("Claim");
                setSuggestion("Select the Sequence to claim");
              }
            }}
          >
            Claim
          </ClaimButton>
          {}{" "}
          <Score>
            <button
              // disabled={!isTurnCompleted}
              onClick={() => {
                setdropCard(true);
                setDropCardNum(2);
                // setIsSelectionActive("Erase");
              }}
            >
              testing
            </button>
          </Score>
          <ImageGallery
            images={["R1", "ALTER", "R2", "DROP", "B1", "GRAB", "G1", "DROP"]}
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
