import React from "react";
import ReactDOM from "react-dom/client";
import App from "./playArea/App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { SelectionProvider } from "./GameBoard/gameboard.context.tsx";
import { PlayersProvider } from "./Room/Room.context.tsx";
import { CurrentPlayerProvider } from "./Room/player.context.tsx";
import { PlayedCardProvider } from "./PlayedCard/PlayedCard.context.tsx";
import { PlayerHandProvider } from "./playerHand/playerHand.context.tsx";
import { CardProvider } from "./PowerCards/CardSelect/CardSelect.context.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardProvider>
    <PlayerHandProvider>
     <PlayedCardProvider>
    <PlayersProvider>
    <SelectionProvider>
      <CurrentPlayerProvider>
    <App />
    </CurrentPlayerProvider>
    </SelectionProvider>
    </PlayersProvider>
    </PlayedCardProvider>
    </PlayerHandProvider>
    </CardProvider>
    
  </React.StrictMode>
);
