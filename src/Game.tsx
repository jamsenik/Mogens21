import React from 'react';
import { Round, YatzySet, RoundState } from './YatzySet';
import { Række } from './Række';
import { LæsRække } from './LæsRække';
import { Navne } from "./Navne";
import { ReactElement } from 'react';
import { ButtonBar } from './ButtonBar';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';



interface State {
    YatzySets: YatzySet[];
    currentSet: YatzySet;
    currentRound: Round;
}


export class Game extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        let sets = this.clearSets();
        let storedStateJson = localStorage.getItem('MogensYatzy');
        if (storedStateJson !== null) {
            var allRounds: RoundState[][] = JSON.parse(storedStateJson);

            console.log("Board loaded");

            for (let index = 0; index < allRounds.length; index++) {
                const element = allRounds[index];
                sets[index].setCubes(element);
            }

        }
        this.state = {
            YatzySets: sets,
            currentSet: sets[0],
            currentRound: sets[0].round(0),
        };
    }

    clearSets(): YatzySet[] {
        let sets = Array(6).fill(null).map(() => new YatzySet());
        for (let index = 1; index < sets.length; index++) {
            const left = sets[index - 1];
            const right = sets[index];
            left.setRight(right);
            right.setLeft(left);
        }
        return sets;
    }

    handleClick(p: number, r: number) {
        console.log("Call back player: " + p + " round: " + r);
        var set = this.state.YatzySets[p];
        var round = set.round(r);
        this.setState({
            YatzySets: this.state.YatzySets,
            currentSet: set,
            currentRound: round
        });

    }

    rowFunc(round: number): (p: number) => void {
        return (player) => this.handleClick(player, round);
    }

    rowRounds(i: number): Round[] {
        let result = this.state.YatzySets.map(ys => ys.round(i));
        return result;
    }

    addDice(i: number) {
        this.state.currentRound.add(i);
        this.setState(this.state);
        this.storeBoard();
    }

    removeDice() {
        console.log("Back");
        this.state.currentRound.back();
        this.setState(this.state);
        this.storeBoard();
    }

    scratch() {
        console.log("Scratch");
        this.state.currentRound.scratch();
        this.setState(this.state);
        this.storeBoard();
    }

    clearBoard() {
        console.log("Clear board");
        const sets = this.clearSets();
        this.setState({
            YatzySets: sets,
            currentSet: sets[0],
            currentRound: sets[0].round(0),
        });
        this.storeBoard(sets);

    }

    storeBoard(sets: YatzySet[] | null = null) {
        console.log("Store board");
        if (sets == null) {
            sets = this.state.YatzySets;
        }
        localStorage.setItem("MogensYatzy", JSON.stringify(sets.map(ys => ys.allCubes())));
    }


    terning(i: number) {
        return (
            <button className="terning"
                disabled={!this.state.currentRound.canBeNext(i)}
                onClick={() => this.addDice(i)}>
                {i}
            </button>
        );
    }

    række(round: number, slags: string): ReactElement {
        return <Række Slags={slags}
            onClick={this.rowFunc(round)} rounds={this.rowRounds(round)}
            available={this.state.currentSet.rounds[round].blank()}
            currentRound={this.state.currentRound} />;
    }



    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table size="small" sx={{ minWidth: 200 }} aria-label="simple table">
                        <Navne valid={this.state.YatzySets.map(ys => ys.verify())} />
                        <TableBody>
                            {this.række(0, "1")}
                            {this.række(1, "2")}
                            {this.række(2, "3")}
                            {this.række(3, "4")}
                            {this.række(4, "5")}
                            {this.række(5, "6")}
                            <LæsRække Slags="Bonus" Tal={this.state.YatzySets.map(ys => ys.bonus())}></LæsRække>
                            {this.række(6, "1 par")}
                            {this.række(7, "2 par")}
                            {this.række(8, "3 par")}
                            {this.række(9, "3 ens")}
                            {this.række(10, "4 ens")}
                            {this.række(11, "2 x 3 ens")}
                            {this.række(12, "Lav")}
                            {this.række(13, "Høj")}
                            {this.række(14, "Cameron")}
                            {this.række(15, "Hus")}
                            {this.række(16, "Chance")}
                            {this.række(17, "Yatzy")}
                            <LæsRække Slags="Total" Tal={this.state.YatzySets.map(ys => ys.score())}></LæsRække>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="nederst">
                    <div className="slag">
                        {this.state.currentRound.toArray()}
                    </div>

                </div>
                <ButtonBar diceClick={(i: number) => { this.addDice(i) }}
                    diceEnabled={i => this.state.currentRound.canBeNext(i)}
                    backspace={() => this.removeDice()}
                    scratch={() => this.scratch()}
                    clear={() => this.clearBoard()}
                />

            </div>
        );
    }
}