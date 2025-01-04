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
import { AnimationProvider } from "./GameAnimations/animation.context.tsx";
import { GameEndProvider } from "./GameScreens/GameEnd/GameEnd.context.tsx";
import { SuggestionProvider } from "./GameScreens/Suggestion/Suggestion.context.tsx";
import { TurnProvider } from "./Deck/deck.context.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TurnProvider>
    <SuggestionProvider>
    <GameEndProvider>
    <AnimationProvider>
    <GrabProvider>
      <CardProvider>
        <PlayerHandProvider>
          <PlayedCardProvider>
            <PlayersProvider>
              <SelectionProvider>
                <CurrentPlayerProvider>
                  <App />
                  <h3 style={{ textAlign: 'center', fontSize: '0.8rem', color: 'black' , marginTop:'2%', letterSpacing: '2px'}}>Designed and devloped by Naga Teja for AWS Hackathon</h3>                </CurrentPlayerProvider>
              </SelectionProvider>
            </PlayersProvider>
          </PlayedCardProvider>
        </PlayerHandProvider>
      </CardProvider>
    </GrabProvider>
    </AnimationProvider>
    </GameEndProvider>
    </SuggestionProvider>
    </TurnProvider>
  </React.StrictMode>
);
