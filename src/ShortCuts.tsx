import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

export function ShortCuts(props: Props) {
    const keyMap = {
        ONE: "1",
        TWO: "2",
        THREE: "3",
        FOUR: "4",
        FIVE: "5",
        SIX: "6",
        BACK_SPACE: "backspace",
        NEXT: ["space", "right"],
        PREVIOUS: ["left"]

    };

    const one : (keyEvent?: KeyboardEvent) => void = (event) => {
        console.log("One");
        if (event) {
            event.preventDefault();
          }
        props.diceClick(1);
    };
    const two = () => {
        console.log("Two");

        props.diceClick(2);
    };
    const three = () => {
        props.diceClick(3);
    };
    const four = () => {
        props.diceClick(4);
    };
    const five = () => {
        props.diceClick(5);
    };
    const six = () => {
        props.diceClick(6);
    };
    const backspace = () => {
        props.backspace();
    };
    const next = () => {
        props.next();
    };
    const previous = () => {
        props.previous();
    };


    const handlers = {
        ONE: one,
        TWO: two,
        THREE: three,
        FOUR: four,
        FIVE: five,
        SIX: six,
        BACK_SPACE: backspace,
        NEXT: next,
        PREVIOUS: previous

    };
    return (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />)
}

interface Props {
    diceClick: (i: number) => void;
    // diceEnabled: (i: number) => boolean;
    backspace: () => void;
    // scratch: () => void;
    // clear: () => void;
    next: () => void;
    previous: () => void;
}