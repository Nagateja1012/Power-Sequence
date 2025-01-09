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
import { CurrentPlayerProvider } from "./GameScreens/Room/player.context.tsx";
import { AnimationProvider } from "./GameAnimations/animation.context.tsx";
import { SuggestionProvider } from "./GameScreens/Suggestion/Suggestion.context.tsx";
import { TurnProvider } from "./Deck/deck.context.tsx";
import { WebSocketProvider } from "./Services/websocket.services.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebSocketProvider>
    <TurnProvider>
    <SuggestionProvider>
    <AnimationProvider>
    <GrabProvider>
      <CardProvider>
        <PlayerHandProvider>
          <PlayedCardProvider>

              <SelectionProvider>
                <CurrentPlayerProvider>
                <App />
              <h3 style={{ textAlign: 'center', fontWeight:"bolder", fontFamily:"sans-serif", fontSize: '0.8rem',color: 'rgb(0, 0, 0)', top:'98%', left:'50%', transform: 'translate(-50%, -50%)', position:"absolute", letterSpacing: '2px', zIndex:'1'}}>Designed and devloped by Naga Teja for AWS Hackathon</h3>     
                  
                             </CurrentPlayerProvider>
              </SelectionProvider>

          </PlayedCardProvider>
        </PlayerHandProvider>
      </CardProvider>
    </GrabProvider>
    </AnimationProvider>
    </SuggestionProvider>
    </TurnProvider>
    </WebSocketProvider>
  </React.StrictMode>
);
