import React, { ReactNode } from "react";

type Props = {
  black: boolean;
  children: ReactNode;
};

export const Square: React.FC<Props> = ({ black, children }) => {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
