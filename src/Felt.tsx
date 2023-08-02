import { TableCell } from "@mui/material";
import { Round } from "./YatzySet";
import React from "react";

export function Felt(props: Props) {
  var bgcolor  = "";
  if (props.Round === props.CurrentRound){
    bgcolor = "primary.main";
  } else if (props.Round.isWrong()){
    bgcolor = "secondary.main";
  }
  return (
    <TableCell
      onClick={props.onClick}
      sx={{
        paddingX: 0,
        paddingY: 0,
        minWidth: "10px",
        fontSize: "2.2vh",
        bgcolor: bgcolor,
      }}
      align="center"
    >
      {props.Round?.toString() + " "}
    </TableCell>
  );
}

interface Props {
  onClick: () => void;
  Round: Round;
  CurrentRound: Round;
}
