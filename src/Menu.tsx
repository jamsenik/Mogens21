import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { SpeedDialAction } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DialIcon from '@mui/icons-material/LunchDining';
import FullScreenIcon from '@mui/icons-material/Fullscreen';

const screenfull = require('screenfull');

export function Menu(props: Props)  {
    
        return (
            <SpeedDial
            ariaLabel="Yatzy"
            sx={{ position: 'absolute', bottom: 2, right: 2 }}
            icon={<SpeedDialIcon
                icon={<DialIcon />}

            />}
        >
           
            <SpeedDialAction
                onClick={() => toggleFullScreen()}
                tooltipTitle="Full screen"
                icon={<FullScreenIcon />} />
            <SpeedDialAction
            onClick={() => bekræft(props.clear)}
            tooltipTitle="Clear board"
            icon={<DeleteIcon/>} />

        </SpeedDial>
        );

    }

function bekræft (clear: () => void){
    if (window.confirm("Ægte?")){
        clear();
    }
}

interface Props {
    clear: () => void;
  }

function  toggleFullScreen () {
    if (screenfull.isEnabled) {
        screenfull.toggle();
    }
};