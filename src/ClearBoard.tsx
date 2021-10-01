import React from 'react';

export function ClearBoard(props: Props)  {
    
        return (
            <button className="terning" onClick={() => bekræft(props.onClick)}>&#x2622; </button>
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
