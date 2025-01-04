import GameBoard from "../GameBoard/gameboard.component";
import ImageGallery from "../playerHand/playerHand.component";
import {
  CreatePlayerElements,
  
} from "../Player/player.component";
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
import CardSelect from "../PowerCards/CardSelect/CardSelect.component";
import { useSelection } from "../GameBoard/gameboard.context";
import GameForm from "../lobby/lobby.component";
import RoomScreen from "../Room/Room.component";
import {   useState } from "react";
import { GameLobbyDataService } from "../Services/Service.Send";
import { GameFormData } from "../models/model";
import { RoomScreenReadService } from "../Services/Service.Read";
import { useCurrentPlayer } from "../Room/player.context";
import { usePlayerHand } from "../playerHand/playerHand.context";




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
  const { setCurrentPlayer, setNumTeam} = useCurrentPlayer()
  const [currentScreen, setCurrentScreen] = useState("game");
  const {images, setImages} = usePlayerHand();
 

  const handleGameFormSubmit = (formData: GameFormData) => {
    GameLobbyDataService(formData);
    
    setCurrentPlayer(formData.gameName)
    setNumTeam(formData.numTeams)
    setCurrentScreen("roomScreen");
  };
  const handleRoomScreenComplete = () => {
    setCurrentScreen("game");
  };
  RoomScreenReadService();
 const handleDeck = () => {
  console.log("deck clicked");
  setImages([...images, 'ERASE']);
  }


  return (
    <PlayArea>
      {currentScreen === "gameForm" && (
        <GameForm onSubmit={handleGameFormSubmit} />
      )}
      {currentScreen === "roomScreen" && (
        <RoomScreen
          onClick={handleRoomScreenComplete}
        ></RoomScreen>
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
          <CardPlayed  />
          <ClaimButton
            onClick={() => {
              setIsSelectionActive("Claim")
            }}
          >
            Claim
          </ClaimButton>
          <Score>
            <button
              onClick={() => {
                setIsSelectionActive("Erase");
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
    </PlayArea>
  );
}

export default App;
