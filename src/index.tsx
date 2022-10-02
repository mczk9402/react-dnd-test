import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
