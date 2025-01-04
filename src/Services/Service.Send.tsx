import { GameFormData } from "../models/model"




export const GameLobbyDataService = (formData:GameFormData) => {
    console.log(formData)
    
    
}


export const alterCardsUpdate= (imageName:string, cards:string[] ) =>{
    console.log('Clicked image:', imageName);
    console.log('Current cards:', cards);
}