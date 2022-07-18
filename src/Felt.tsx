import { TableCell } from '@mui/material';
import { Round } from './YatzySet'

export function Felt(props: Props) {
    return (
        <TableCell 
            onClick={props.onClick} 
            sx={{paddingX:0, paddingY:0, minWidth: "10px", fontSize: "2.2vh", bgcolor: props.Round === props.CurrentRound ? "primary.main" : null}}
            align='center'
            >
            {props.Round?.toString()+" "}
        </TableCell>
    );
}


interface Props {
    onClick: () => void;
    Round: Round;
    CurrentRound: Round;
  }

