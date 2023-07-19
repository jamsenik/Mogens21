import React from 'react';
import { TableCell } from '@mui/material';
export function ResultatFelt(props: Props) {
    return (
            <TableCell sx={{paddingX:0, paddingY:0, minWidth: "10px", fontSize: "2.2vh", color: props.Value < 0 ? "red" : ""}}
                    
                    align='center'>
                {props.Value}
            </TableCell>
    );
}


interface Props {
    Value: number;
  }

