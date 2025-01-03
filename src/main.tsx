import React from "react";
import ReactDOM from "react-dom/client";
import App from "./playArea/App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { SelectionProvider } from "./GameBoard/gameboard.context.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SelectionProvider>
    <App />
    </SelectionProvider>
  </React.StrictMode>
);
