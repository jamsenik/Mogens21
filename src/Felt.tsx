import { Round } from './YatzySet'

export function Felt(props: Props) {
    return (
        <button
            onClick={props.onClick}
            className={"felt" + (props.Round === props.CurrentRound ? " valgt" : "")}
        >
            {props.Round?.toString()}
        </button>
    );
}


interface Props {
    onClick: () => void;
    Round: Round;
    CurrentRound: Round;
  }

