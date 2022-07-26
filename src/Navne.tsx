import { TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react';


interface Props {
    valid: boolean[];
    names: string[];
}

function Navn(i: number, props: Props) {
    return <TableCell sx={{paddingX:"2px", paddingY:"px", minWidth: "10px", paddingTop: 0, maxHeight: "2vh"}}>
        <TextField
            variant="filled"
            defaultValue={props.names[i]}
            error={!props.valid[i]}
            helperText={!props.valid[i] ? "FEJL" : ""}
            size="small"
            onFocus={event => {
                event.target.select();
              }}
              inputProps={{
                style: {
                  padding: 5
                }
             }}

        />
    </TableCell>

}

export function Navne(props: Props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{paddingX:"1px", paddingY:"0px", minWidth: "10px", maxHeight: "1vh"}}/>
                {Navn(0, props)}
                {Navn(1, props)}
                {Navn(2, props)}
                {Navn(3, props)}
                {Navn(4, props)}
                {Navn(5, props)}
            </TableRow>
        </TableHead >

    );
}
