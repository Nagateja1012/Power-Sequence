
import "./App.css";
import GameBoard from "../GameBoard/gameboard.component";
import ImageGallery from "../playerHand/playerHand.component";
import { CreatePlayerElements, UpdatePlayingState } from "../Player/player.component";
import CardPlayed from "../PlayedCard/PlayedCard.component";
import {winSound as playsound} from "../GameSounds/SoundEffects.component"
import ImageLoader from "../AssetsLoader/imageLoader.component";


function App() {
  const inputData = [
    { value: 7, color: 'R' },
    { value: 2, color: 'B' },
    { value: 4, color: 'G' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' },
    { value: 2, color: 'R' },
    { value: 7, color: 'G' },
    { value: 4, color: 'B' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' },
    { value: 2, color: 'B' },
    { value: 7, color: 'G' },
    { value: 4, color: 'B' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' }
];
const samplePlayers = [
  {
    name: "John Smith",
    playerNumber: 1,
    group: 1,
    isPlaying: true
  },
  {
    name: "Sarah Johnson", 
    playerNumber: 2,
    group: 2,
    isPlaying: false
  },
  {
    name: "Mike Williams",
    playerNumber: 3, 
    group: 1,
    isPlaying: false
  },
  {
    name: "Emily Brown",
    playerNumber: 4,
    group: 2, 
    isPlaying: false
  },
  {
    name: "David Miller",
    playerNumber: 5,
    group: 3,
    isPlaying: false
  },
  {
    name: "John Smith",
    playerNumber: 6,
    group: 1,
    isPlaying: true
  },
  {
    name: "Sarah Johnson", 
    playerNumber: 7,
    group: 2,
    isPlaying: false
  },
  {
    name: "Mike Williams",
    playerNumber: 8, 
    group: 1,
    isPlaying: false
  },
  {
    name: "Emily Brown",
    playerNumber: 9,
    group: 2, 
    isPlaying: false
  },
  {
    name: "David Miller",
    playerNumber: 10,
    group: 3,
    isPlaying: false
  },
  {
    name: "Emily Brown",
    playerNumber: 11,
    group: 2, 
    isPlaying: false
  },
  {
    name: "David Miller",
    playerNumber: 12,
    group: 3,
    isPlaying: false
  }
];

  return (
 
    <div className="play-area">
   
    <div className="Game-Board"><GameBoard inputData={inputData} /></div>

    
    <CreatePlayerElements players={samplePlayers as { name: string; playerNumber: number; group: 1 | 2 | 3; isPlaying: boolean; }[]} />      
      <div className="Deck"> <img 
          src={ImageLoader({src: import.meta.env.VITE_ASSETS_URL+'deck.png'})?.toString()}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '80px',
            height: '120px',
            cursor: 'pointer'
          }}
        /></div>

   
      <CardPlayed imageName="ALTER" />

   
    <div className="Claim-Button" onClick={()=>{
      UpdatePlayingState("Mike Williams")
    } }>Claim</div>

   
    <div className="Timer" ><button onClick={()=>{
      playsound()
    }}>testing</button></div>
  

    <div >
   <ImageGallery  images={["R1", "ALTER","R2", "DROP","B1", "GRAB","G1","R1", "G5","R9"]}/>
    </div>
</div>

  );
}

export default App;
