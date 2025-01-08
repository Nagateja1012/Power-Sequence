
import { useCards } from "../GameScreens/CardSelect/CardSelect.context";





export const RoomScreenReadService = ()=>{
   
}    

export const currentplayerturn = () =>{

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