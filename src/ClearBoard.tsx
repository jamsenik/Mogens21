import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { SpeedDialAction } from '@mui/material';

export function ClearBoard(props: Props)  {
    
        return (
            <SpeedDialAction
            onClick={() => bekræft(props.onClick)}
            tooltipTitle="Clear board"
            icon={<DeleteIcon />} />

        );

    }

function bekræft (clear: () => void){
    if (window.confirm("Ægte?")){
        clear();
    }
}

interface Props {
    onClick: () => void;
  }
