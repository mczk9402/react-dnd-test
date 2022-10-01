import React, { FC, ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { canMoveKnight, moveKnight } from "../hooks/Game";
import { BoardSquare } from "./BoardSquare";
import { Knight } from "./Knight";
import { Square } from "./Square";

type Props = {
  knightPosition: number[];
};

type RenderSquare = (i: number, knightXY: number[]) => ReactNode;

type RenderPiece = (x: number, y: number, knightXY: number[]) => ReactNode;

const handleSquareClick = (toX: number, toY: number) => {
  if (!canMoveKnight(toX, toY)) return;
  moveKnight(toX, toY);
};

const renderSquare: RenderSquare = (i, knightPosition) => {
  const x = i % 8;
  const y = Math.floor(i / 8);

  return (
    <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
};

const renderPiece: RenderPiece = (x, y, [knightX, knightY]) => {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
};

export const Board: FC<Props> = ({ knightPosition }) => {
  const squares = [];

  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
};
