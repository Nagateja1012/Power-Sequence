import GameBoard from "../GameBoard/gameboard.component";
import ImageGallery from "../playerHand/playerHand.component";
import { CreatePlayerElements } from "../Player/player.component";
import CardPlayed from "../PlayedCard/PlayedCard.component";
import ImageLoader from "../Common/AssetsLoader/imageLoader.component";
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

import { GameFormData } from "../Common/models/model";

import { useCurrentPlayer } from "../GameScreens/Room/Room.context";
import GameForm from "../GameScreens/lobby/lobby.component";
import RoomScreen from "../GameScreens/Room/Room.component";
import GameResult from "../GameScreens/GameEnd/GameEnd.component";
import SuggestionText from "../GameScreens/Suggestion/Suggestion.component";
import { useSuggestion } from "../GameScreens/Suggestion/Suggestion.context";
import { useTurn } from "./deck.context";
import { useWebSocket } from "../Services/websocket.services";

import { usePlayedCard } from "../PlayedCard/PlayedCard.context";
import {
  gameSound,
  sequenceSound,
} from "../Common/GameSounds/SoundEffects.component";

function App() {
  const { setIsSelectionActive } = useSelection();
  const { setCurrentPlayer, RoomId, currentPlayer } = useCurrentPlayer();
  const [currentScreen, setCurrentScreen] = useState("gameForm");
  const { setSuggestion, setSuggestionType } = useSuggestion();
  const { isYourTurn, setIsTurnCompleted, setIsYourTurn, isTurnCompleted } =
    useTurn();
  const { sendMessage, messages, sendDraft, draft } = useWebSocket();
  const { PlayedCard } = usePlayedCard();

  useEffect(() => {
    const message = messages[0];
    if (message?.content?.currentScreen) {
      setCurrentScreen(message.content.currentScreen);
    }

    if (message?.content?.currentPlayer) {
      const isPlayersTurn = message.content.currentPlayer === currentPlayer;
      if (isPlayersTurn) {
        setSuggestionType("info");
        setSuggestion("It's your turn");
      }
      setIsYourTurn(isPlayersTurn);
    }

    if (message?.type) {
      switch (message.type) {
        case "error":
          setSuggestionType("error");
          setSuggestion(message.content.error);
          break;
        case "sequence":
          sequenceSound();
          setSuggestionType("sequence");
          setSuggestion(message.content.info);
          break;
        case "info":
          setSuggestionType("info");
          setSuggestion(message.content.info);
          break;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (currentScreen === "game") {
      gameSound();
    }
  }, [currentScreen]);

  const handleGameFormSubmit = (formData: GameFormData) => {
    sendMessage({ action: "createGame", Message: formData });
    setCurrentPlayer(formData.PlayerUseName);
  };
  const handleRoomScreenComplete = () => {
    sendMessage({
      action: "GameStart",
      Message: {
        roomId: RoomId,
        playerId: currentPlayer,
      },
    });
  };
  const handleDeck = () => {
    if (isYourTurn) {
      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Deck",
          roomId: RoomId,
          currentPlayer: currentPlayer,
        },
      });
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
            <GameBoard />
          </GameBoardStyle>
          <CreatePlayerElements />
          <Deck onClick={handleDeck}>
            <ImageLoader
              src={import.meta.env.VITE_ASSETS_URL + "deck.png"}
              StyledImg={DeckImage}
            />
          </Deck>
          <CardPlayed />
          <ClaimButton
            disabled={!isTurnCompleted}
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
              if (draft) {
                sendDraft();
              } else {
                sendMessage({
                  action: "sendMove",
                  Message: {
                    command: "Dead",
                    roomId: RoomId,
                    currentPlayer: currentPlayer,
                    lastPlayedCard: PlayedCard,
                  },
                });
              }
              setIsTurnCompleted(false);
              setIsSelectionActive("");
            }}
          >
            Next
          </Score>
          <ImageGallery />
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
