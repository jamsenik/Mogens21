import { Button, TableCell } from '@mui/material';
import { Round } from './YatzySet'

export function Felt(props: Props) {
    return (
        <TableCell sx={{paddingX:0, paddingY:0, minWidth: "10px"}}>
            <Button onClick={props.onClick} 
            variant={props.Round === props.CurrentRound ? "contained" : "text"}
            sx={{padding: 0, minWidth: 0}}
            fullWidth = {true}
            size="small"
            >
            {props.Round?.toString()+" "}
            </Button>
        </TableCell>
    );
}


interface Props {
    onClick: () => void;
    Round: Round;
    CurrentRound: Round;
  }

