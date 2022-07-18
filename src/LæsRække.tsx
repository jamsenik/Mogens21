import {ResultatFelt} from './ResultatFelt'
import { TableCell, TableRow } from '@mui/material';

export function LæsRække(props: Props) {
    return (
        <TableRow
        >
            <TableCell align="left"
             sx={{ paddingY:"2px", fontSize: "2.2vh"}} 
            >
                {props.Slags}
            </TableCell>
            {LæsFeltI(0 , props)}
            {LæsFeltI(1 , props)}
            {LæsFeltI(2 , props)}
            {LæsFeltI(3 , props)}
            {LæsFeltI(4 , props)}
            {LæsFeltI(5 , props)}


        </TableRow>

    );
}

function LæsFeltI(i: number, props: Props){
    return <ResultatFelt Value={props.Tal[i].toString()} />;

}

interface Props {
    Slags: string;
    Tal: number[];
  }
