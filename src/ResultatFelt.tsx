import { Button, TableCell } from '@mui/material';
export function ResultatFelt(props: Props) {
    return (
            <TableCell sx={{paddingX:0, paddingY:0, minWidth: "10px"}}>
                <Button  
                sx={{padding: 0, minWidth: 0}}
                fullWidth = {true}
                size="small"
                >
                {props.Value}
                </Button>
            </TableCell>
    );
}


interface Props {
    Value: string;
  }

