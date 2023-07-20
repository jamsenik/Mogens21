import { useDrag } from "@use-gesture/react";
import React from "react";

export function Slag(props: Props) {
  const bind = useDrag(
    ({ swipe: [swipeX] }) => {
      if (swipeX !== 0) {
        props.Shift(swipeX)
      }
    },
    { axis: "x", swipe: { distance: 25, velocity: 0.1 } }
  );

  return (
    <div {...bind()} className="touch">
      <div className="nederst">
        <div className="slag">
{props.Slag}            
        </div>
      </div>
    </div>
  );
}

interface Props {
  Slag: number[];
  Shift: (delta: number) => void;
}


