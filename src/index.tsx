import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Knight } from "./components/Knight";
import { Square } from "./components/Square";
import { Board } from "./components/Board";
import { observe } from "./hooks/Game";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

observe((knightPosition) => {
  root.render(
    <React.StrictMode>
      <Board knightPosition={knightPosition} />
    </React.StrictMode>
  );
});
