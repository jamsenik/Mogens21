import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { YatzySet } from './yatzy.js';

function Række(props) {
    return (
        <div className="række">
            <span className={(props.available ? "etiket" : "etiket brugt")} >
                {props.Slags}
            </span>
            <Felt onClick={() => props.onClick(0)} Value={props.rounds?.[0].toString()} Valgt={props.currentRound === props.rounds?.[0]} />
            <Felt onClick={() => props.onClick(1)} Value={props.rounds?.[1].toString()} Valgt={props.currentRound === props.rounds?.[1]}/>
            <Felt onClick={() => props.onClick(2)} Value={props.rounds?.[2].toString()} Valgt={props.currentRound === props.rounds?.[2]}/>
            <Felt onClick={() => props.onClick(3)} Value={props.rounds?.[3].toString()} Valgt={props.currentRound === props.rounds?.[3]}/>
            <Felt onClick={() => props.onClick(4)} Value={props.rounds?.[4].toString()} Valgt={props.currentRound === props.rounds?.[4]}/>
            <Felt onClick={() => props.onClick(5)} Value={props.rounds?.[5].toString()} Valgt={props.currentRound === props.rounds?.[5]}/>
        </div>
    );
}

function LæsRække(props) {
    return (
        <div className="række">
            <span className="etiket"> {props.Slags}</span>
            <Felt Value={props.Tal[0]}> </Felt>
            <Felt Value={props.Tal[1]}> </Felt>
            <Felt Value={props.Tal[2]}> </Felt>
            <Felt Value={props.Tal[3]}> </Felt>
            <Felt Value={props.Tal[4]}> </Felt>
            <Felt Value={props.Tal[5]}> </Felt>
        </div>
    );
}


function Mellemrum(props) {
    return (
        <div className="mellemrum">
        </div>
    );
}

function Navne(props) {
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



function Felt(props) {
    return (
        <button
            onClick={props.onClick}
            className={props.Valgt ? "felt valgt" : "felt"}
        >
            {props.Value}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        var player = 0;
        let sets = Array(6).fill(null).map(() => new YatzySet(player++));
        for (let index = 1; index < sets.length; index++) {
            const left = sets[index-1];
            const right = sets[index];
            left.setRight(right);
            right.setLeft(left);
        }
        this.state = {
            YatzySets: sets,
            currentSet: sets[0],
            currentRound: sets[0].round(0),

        }
    }

    handleClick(p, r) {
        console.log("Call back player: " + p + " round: " + r);
        var set = this.state.YatzySets[p];
        var round = set.round(r);
        this.setState({
            YatzySets: this.state.YatzySets,
            currentSet: set,
            currentRound: round
        });
    }

    rowFunc(round) {
        return (player) => this.handleClick(player, round)
    }

    rowRounds(i) {
        let result = this.state.YatzySets.map(ys => ys.round(i));
        return result;
    }

    addDice(i) {
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

    terning(i) {
        return <button className="terning" disabled={!this.state.currentRound.canBeNext(i)} onClick={() => this.addDice(i)}>{i}</button>

    }

    række(round, slags) {
        return <Række Slags={slags}
            onClick={this.rowFunc(round)} rounds={this.rowRounds(round)}
            available={this.state.currentSet.rounds[round].blank()}
            currentRound={this.state.currentRound} />
    }

    render() {
        return (
            <div>
                <div className="blok">
                    <Navne playerId={this.state.currentSet.anders()} 
                           valid={this.state.YatzySets.map(ys => ys.verify())}
                    />
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
const screenfull = require('screenfull');

class FullScreenToggle extends React.Component {
    componentDidMount() {
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                //   console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
            });
        }
    }

    // enabling fullscreen has to be done after some user input
    toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }

    render() {
        return (
            <button className="terning" onClick={this.toggleFullScreen}>&#x26F6; </button>
        )
    }
}

class Game extends React.Component {

    render() {
        return (
            <div >
                <Board />
            </div>
        );
    }

    // componentDidMount() {
    //     window.addEventListener('beforeunload', this.beforeunload.bind(this));
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    // }

    // beforeunload(e) {
    //     console.log('Before unload');
    //     e.preventDefault();
    //     e.returnValue = true;
    // }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
