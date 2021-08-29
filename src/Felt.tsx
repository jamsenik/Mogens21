
export function Felt(props: Props) {
    return (
        <button
            onClick={props.onClick}
            className={props.Valgt ? "felt valgt" : "felt"}
        >
            {props.Value}
        </button>
    );
}


interface Props {
    onClick?: () => void;
    Valgt?: boolean;
    Value: string;
  }

