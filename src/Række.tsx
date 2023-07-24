import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Felt } from "./Felt";
import { Round } from "./YatzySet";

export function Række(props: Props) {
  return (
    <TableRow
      selected={props.rounds.some((r) => r === props.currentRound)}
      sx={{}}
    >
      <TableCell
        align="left"
        sx={{
          color: props.available ? "text.primary" : "ghostwhite",
          paddingY: "0px",
          fontSize: "2.3vh",
        }}
        onClick={() => {
          if (props.available) {
            props.setRound();
          }
        }}
      >
        {props.Slags}
      </TableCell>
      {FeltI(0, props)}
      {FeltI(1, props)}
      {FeltI(2, props)}
      {FeltI(3, props)}
      {FeltI(4, props)}
      {FeltI(5, props)}
    </TableRow>
  );
}

function FeltI(i: number, props: Props) {
  return (
    <Felt
      onClick={() => props.onClick(i)}
      Round={props.rounds[i]}
      CurrentRound={props.currentRound}
    />
  );
}

interface Props {
  onClick: (i: number) => void;
  rounds: Round[];
  Slags: string;
  available: boolean;
  currentRound: Round;
  setRound: () => void;
}
