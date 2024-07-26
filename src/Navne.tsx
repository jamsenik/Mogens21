import { TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react';

interface Props {
    valid: boolean[];
    names: string[];
    updateName: (name: string, index: number) => void;
    rank: (player: number) => number;
    behind: (player: number) => number;
    roundsPlayed: number[];
    pietRules: boolean;
}

function Navn(i: number, props: Props) {
    const theName = props.names[i];
    const rank = props.rank(i) > 0 ? props.rank(i) : ""
    const delta = props.behind(i) < 0 ? " (" + props.behind(i) + ")" : "";
    const label = props.pietRules? "" : rank  + delta;
    return <TableCell sx={{ paddingX: "2px", paddingY: "px", minWidth: "10px", paddingTop: "5px", maxHeight: "2vh" }}>
        <TextField
            value={theName}
            error={!props.valid[i] && !props.pietRules}
            helperText={!props.valid[i] && !props.pietRules ? props.roundsPlayed[i] + " udfyldt": ""}
            size="small"
            onFocus={event => {
                event.target.select();
            }}
            label = {label}
            onChange={e => props.updateName(e.target.value, i)}

        >  </TextField>
    </TableCell>

}

export function Navne(props: Props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ paddingX: "1px", paddingY: "0px", minWidth: "10px", maxHeight: "1vh" }} />
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
