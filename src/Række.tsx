import { Felt } from './Felt'
import { Round } from './YatzySet'

export function Række(props: Props) {
    return (
        <div className="række">
            <span className={(props.available ? "etiket" : "etiket brugt")} >
                {props.Slags}
            </span>
            {FeltI(0, props)}
            {FeltI(1, props)}
            {FeltI(2, props)}
            {FeltI(3, props)}
            {FeltI(4, props)}
            {FeltI(5, props)}
        </div>
    );
}

function FeltI(i: number, props: Props) {
    return (
        <Felt onClick={() => props.onClick(i)}
            Round={props.rounds[i]}
            CurrentRound={props.currentRound}  />
    );
}

interface Props {
    onClick: (i: number) => void;
    rounds: Round[];
    Slags: string;
    available: boolean;
    currentRound: Round;
}
