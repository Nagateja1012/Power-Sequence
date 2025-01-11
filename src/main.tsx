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
import { CurrentPlayerProvider } from "./GameScreens/Room/Room.context.tsx";

import { SuggestionProvider } from "./GameScreens/Suggestion/Suggestion.context.tsx";
import { TurnProvider } from "./playArea/deck.context.tsx";
import { WebSocketProvider } from "./Services/websocket.services.tsx";
import { AnimationProvider } from "./Common/GameAnimations/animation.context.tsx";
import { HelpButtons } from "./GameScreens/Rules/Rules.component.tsx";

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
                        <HelpButtons />
                        <h3 className="DesignBy">
                          Designed and devloped by Naga Teja for AWS Hackathon
                        </h3>
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
