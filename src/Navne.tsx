import { TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react';


interface Props {
    valid: boolean[];
}

function Navn(i: number, props: Props) {
    return <TableCell sx={{paddingX:"1px", paddingY:"1px", minWidth: "10px", paddingTop: 0}}>
        <TextField
            variant="filled"
            defaultValue={"Spiller " + (i + 1)}
            error={!props.valid[i]}
            size = "small"
            helperText={!props.valid[i] ? "FEJL" : ""}
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
                <TableCell size="small" sx={{paddingX:"1px", paddingY:"1px", minWidth: "10px"}}/>
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
