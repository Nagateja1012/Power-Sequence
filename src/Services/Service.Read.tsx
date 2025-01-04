import { UpdatePlayingState } from "../Player/player.component";
import { useCards } from "../GameScreens/CardSelect/CardSelect.context";



import { useEffect } from "react"
import { usePlayers } from "../GameScreens/Room/Room.context";

export const RoomScreenReadService = ()=>{
    const samplePlayer = [
        { id: "1", name: "teja", teamId: null },
        { id: "2", name: "Bob", teamId: "1" },
        { id: "3", name: "Charlie", teamId: "2" },
      ];
    const {players, setPlayers} = usePlayers();
    
    useEffect(() => {
        setPlayers(samplePlayer)
        console.log(players)
    }, [])
}    

export const currentplayerturn = () =>{
    UpdatePlayingState("Mike Williams");
}

export const readboard = () => {
    //init grid
}

export const readplayerCards =() =>{
    //init cards
}

export const readplayedCard = () =>{
    //init played card
}

export const readDeck = () => {
    //read deck card
}



export const AlterCards =() =>{
    //get top 4 cards.
}

export const GrabCards =() =>{
    //get top 4 cards.
    return 'R1'
}

export const DropCardRead =() =>{
   const {  setdropCard, setDropCardNum} = useCards();
    setdropCard(true);
    setDropCardNum(1);
}