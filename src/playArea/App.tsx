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
  const inputData = [
    { value: 7, color: "R" },
    { value: 2, color: "B" },
    { value: 4, color: "G" },
    { value: 1, color: "R" },
    { value: 8, color: "G" },
    { value: 3, color: "B" },
    { value: 0, color: "R" },
    { value: 5, color: "G" },
    { value: 9, color: "B" },
    { value: 6, color: "R" },
    { value: 2, color: "G" },
    { value: 7, color: "B" },
    { value: 4, color: "R" },
    { value: 1, color: "G" },
    { value: 8, color: "B" },
    { value: 3, color: "R" },
    { value: 0, color: "G" },
    { value: 5, color: "B" },
    { value: 9, color: "R" },
    { value: 6, color: "G" },
    { value: 2, color: "R" },
    { value: 7, color: "G" },
    { value: 4, color: "B" },
    { value: 1, color: "R" },
    { value: 8, color: "G" },
    { value: 3, color: "B" },
    { value: 0, color: "R" },
    { value: 5, color: "G" },
    { value: 9, color: "B" },
    { value: 6, color: "R" },
    { value: 2, color: "G" },
    { value: 7, color: "B" },
    { value: 4, color: "R" },
    { value: 1, color: "G" },
    { value: 8, color: "B" },
    { value: 3, color: "R" },
    { value: 0, color: "G" },
    { value: 5, color: "B" },
    { value: 9, color: "R" },
    { value: 6, color: "G" },
    { value: 2, color: "B" },
    { value: 7, color: "G" },
    { value: 4, color: "B" },
    { value: 1, color: "R" },
    { value: 8, color: "G" },
    { value: 3, color: "B" },
    { value: 0, color: "R" },
    { value: 5, color: "G" },
    { value: 9, color: "B" },
    { value: 6, color: "R" },
    { value: 2, color: "G" },
    { value: 7, color: "B" },
    { value: 4, color: "R" },
    { value: 1, color: "G" },
    { value: 8, color: "B" },
    { value: 3, color: "R" },
    { value: 0, color: "G" },
    { value: 5, color: "B" },
    { value: 9, color: "R" },
    { value: 6, color: "G" },
  ];
  const samplePlayers = [
    {
      name: "John Smith", 
      playerNumber: 1,
      group: 1,
      isPlaying: true,
    },
    {
      name: "Sarah Johnson",
      playerNumber: 2, 
      group: 2,
      isPlaying: false,
    },
    {
      name: "Mike Williams",
      playerNumber: 3,
      group: 1,
      isPlaying: false,
    },
    {
      name: "Emily Brown",
      playerNumber: 4,
      group: 2,
      isPlaying: false,
    },
    {
      name: "David Miller",
      playerNumber: 5,
      group: 3,
      isPlaying: false,
    },
    {
      name: "John Smith",
      playerNumber: 6,
      group: 1,
      isPlaying: true,
    },
    {
      name: "Sarah Johnson",
      playerNumber: 7,
      group: 2,
      isPlaying: false,
    },
    {
      name: "Mike Williams",
      playerNumber: 8,
      group: 1,
      isPlaying: false,
    },
    {
      name: "Emily Brown",
      playerNumber: 9,
      group: 2,
      isPlaying: false,
    },
    {
      name: "David Miller",
      playerNumber: 10,
      group: 3,
      isPlaying: false,
    },
    {
      name: "Emily Brown",
      playerNumber: 11,
      group: 2,
      isPlaying: false,
    },
    {
      name: "David Miller",
      playerNumber: 12,
      group: 3,
      isPlaying: false,
    },
  ];

  const { setIsSelectionActive } = useSelection();
  const { setCurrentPlayer } = useCurrentPlayer();
  const [currentScreen, setCurrentScreen] = useState("gameForm");
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
            <GameBoard inputData={inputData} />
          </GameBoardStyle>
          <CreatePlayerElements
            players={
              samplePlayers as {
                name: string;
                playerNumber: number;
                group: 1 | 2 | 3;
                isPlaying: boolean;
              }[]
            }
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
