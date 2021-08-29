import {Felt} from './Felt'

export function LæsRække(props: Props) {
    return (
        <div className="række">
            <span className="etiket"> {props.Slags}</span>
            {LæsFeltI(0,props)}
            {LæsFeltI(1,props)}
            {LæsFeltI(2,props)}
            {LæsFeltI(3,props)}
            {LæsFeltI(4,props)}
            {LæsFeltI(5,props)}
        </div>
    );
}

function LæsFeltI(i: number, props: Props){
    return <Felt Value={props.Tal[i].toString()} />;

}

interface Props {
    Slags: string;
    Tal: number[];
  }
