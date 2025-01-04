import React from "react";
import ReactDOM from "react-dom/client";
import App from "./playArea/App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { SelectionProvider } from "./GameBoard/gameboard.context.tsx";


import { PlayedCardProvider } from "./PlayedCard/PlayedCard.context.tsx";
import { PlayerHandProvider } from "./playerHand/playerHand.context.tsx";
import { CardProvider } from "./GameScreens/CardSelect/CardSelect.context.tsx";
import { GrabProvider } from "./Player/player.context.tsx";
import { PlayersProvider } from "./GameScreens/Room/Room.context.tsx";
import { CurrentPlayerProvider } from "./GameScreens/Room/player.context.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GrabProvider>
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
    </GrabProvider>
  </React.StrictMode>
);
