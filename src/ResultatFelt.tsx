import { TableCell } from '@mui/material';
export function ResultatFelt(props: Props) {
    return (
            <TableCell sx={{paddingX:0, paddingY:0, minWidth: "10px", fontSize: "2.2vh"}}
                    align='center'>
                {props.Value}
            </TableCell>
    );
}


interface Props {
    Value: string;
  }

