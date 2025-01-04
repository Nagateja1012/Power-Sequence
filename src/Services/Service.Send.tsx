import { GameFormData } from "../models/model"




export const GameLobbyDataService = (formData:GameFormData) => {
    console.log(formData)
    
    
}


export const alterCardsUpdate= (imageName:string, cards:string[] ) =>{
    console.log('Clicked image:', imageName);
    console.log('Current cards:', cards);
}

export const GrabCardsSend = (name:string) =>{
    console.log(name)
}

export const DropCardSend= (numcards:Number) => {
    console.log(numcards)
}

export const Skipcard= () => {
    console.log('Skip card')

}

export const reverseCard = () =>{
    console.log('reverse card')
}