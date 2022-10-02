import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";
import { Preview, usePreview } from "react-dnd-preview";
import { CSSProperties, useState } from "react";
import { usePreviewStateContent, usePreviewStateFull } from "react-dnd-preview/dist/cjs/usePreview";

type GeneratePreview = (arg: { itemType: any; item: any; style: any; ref: any; monitor?: any }) => JSX.Element;

const generatePreview: GeneratePreview = ({ itemType, item, style, ref, monitor }) => {
  return (
    <div
      style={{
        ...style,
        zIndex: 999,
        fill: "pink",
        opacity: 0.5,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        width: ref.clientWidth + "px",
        height: ref.clientHeight + "px",
      }}
    >
      ♘
    </div>
  );
};

export const Knight = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [_ref, setRef] = useState<null | HTMLDivElement>(null);

  return (
    <>
      <Preview
        generator={(e) => {
          return generatePreview({ itemType: e.itemType, item: e.item, style: e.style, ref: _ref });
        }}
      />
      <div
        ref={(el) => {
          setRef(el);
          drag(el);
        }}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          width: "100%",
          height: "100%",
        }}
      >
        ♘
      </div>
    </>
  );
};
