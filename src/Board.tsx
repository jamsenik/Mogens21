import React from 'react';
import { Round, YatzySet } from './YatzySet';
import { Række } from './Række';
import { LæsRække } from './LæsRække';
import { FullScreenToggle } from './FullScreenToggle';
import { Navne } from "./Navne";
import { Mellemrum } from "./Mellemrum";
import { ReactElement } from 'react';

interface State {
    YatzySets: YatzySet[];
    currentSet: YatzySet;
    currentRound: Round;
}


export class Board extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        let sets = Array(6).fill(null).map(() => new YatzySet());
        for (let index = 1; index < sets.length; index++) {
            const left = sets[index - 1];
            const right = sets[index];
            left.setRight(right);
            right.setLeft(left);
        }
        this.state = {
            YatzySets: sets,
            currentSet: sets[0],
            currentRound: sets[0].round(0),
        };
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
    }

    removeDice() {
        console.log("Back");
        this.state.currentRound.back();
        this.setState(this.state);
    }

    scratch() {
        console.log("Scratch");
        this.state.currentRound.scratch();
        this.setState(this.state);

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
                <div className="blok">
                    <Navne valid={this.state.YatzySets.map(ys => ys.verify())} />
                    {this.række(0, "1")}
                    {this.række(1, "2")}
                    {this.række(2, "3")}
                    {this.række(3, "4")}
                    {this.række(4, "5")}
                    {this.række(5, "6")}
                    <Mellemrum />
                    <LæsRække Slags="Bonus" Tal={this.state.YatzySets.map(ys => ys.bonus())}></LæsRække>
                    <Mellemrum />
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
                    <Mellemrum />
                    <LæsRække Slags="Total" Tal={this.state.YatzySets.map(ys => ys.score())}></LæsRække>

                </div>
                <div className="nederst">
                    <div className="slag">
                        {this.state.currentRound.toArray()}
                    </div>
                    <div className="knaplinje">
                        {this.terning(1)}
                        {this.terning(2)}
                        {this.terning(3)}
                        {this.terning(4)}
                        {this.terning(5)}
                        {this.terning(6)}
                        <button className="terning" onClick={() => this.scratch()}>X</button>
                        <button className="terning" disabled={this.state.currentRound.blank()} onClick={() => this.removeDice()}>&lt;</button>
                        <FullScreenToggle />
                    </div>
                </div>
            </div>
        );
    }
}
