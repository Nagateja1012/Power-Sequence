import { UpdatePlayingState } from "../Player/player.component";
import { usePlayers } from "../Room/Room.context"


import { useEffect } from "react"

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