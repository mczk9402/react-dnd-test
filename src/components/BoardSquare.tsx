import React, { FC, ReactNode } from "react";
import { useDrop } from "react-dnd";
import { canMoveKnight, moveKnight } from "../hooks/Game";
import { ItemTypes } from "../types/ItemTypes";
import { Square } from "./Square";

type Props = {
  x: number;
  y: number;
  children: ReactNode;
};

export const BoardSquare: FC<Props> = ({ x, y, children }) => {
  const black = (x + y) % 2 === 1;
  const [{ isOver, isCanDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(x, y),
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        isCanDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );

  // return <Square black={black}>{children}</Square>;
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !isCanDrop && <Overlay color="red" />}
      {!isOver && isCanDrop && <Overlay color="yellow" />}
      {isOver && isCanDrop && <Overlay color="green" />}
    </div>
  );
};

const Overlay = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: color,
      }}
    ></div>
  );
};
