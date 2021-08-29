import React from 'react';


interface Props {
    valid: boolean[];
}

export function Navne(props: Props) {
    return (
        <div className="øverst">
            <span className="etiket"> Navn</span>
            <input type="text" className={"felt navn" + (props.valid[0] ? "" : " fejl")}></input>
            <input type="text" className={"felt navn" + (props.valid[1] ? "" : " fejl")}></input>
            <input type="text" className={"felt navn" + (props.valid[2] ? "" : " fejl")}></input>
            <input type="text" className={"felt navn" + (props.valid[3] ? "" : " fejl")}></input>
            <input type="text" className={"felt navn" + (props.valid[4] ? "" : " fejl")}></input>
            <input type="text" className={"felt navn" + (props.valid[5] ? "" : " fejl")}></input>
        </div>
    );
}
