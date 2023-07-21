import { useDrag } from "@use-gesture/react";
import React from "react";

export function Slag(props: Props) {
  const bind = useDrag(
    ({ swipe: [swipeX] }) => {
      if (swipeX === -1) {
        props.Previous();
      }
      if (swipeX === 1) {
        props.Next();
      }
    },
    { axis: "x", swipe: { distance: 25, velocity: 0.01 } }
  );

  return (
    <div {...bind()} className="touch">
      <div className="nederst">
        <div className="slag">{props.Slag}</div>
      </div>
    </div>
  );
}

interface Props {
  Slag: number[];
  Next: () => void;
  Previous: () => void;
}
