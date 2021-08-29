export function ResultatFelt(props: Props) {
    return (
        <button
            className="felt"
        >
            {props.Value}
        </button>
    );
}


interface Props {
    Value: string;
  }

