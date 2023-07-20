import React from "react";
import { Round, YatzySet, GameState } from "./YatzySet";
import { Række } from "./Række";
import { LæsRække } from "./LæsRække";
import { Navne } from "./Navne";
import { ReactElement } from "react";
import { ButtonBar } from "./ButtonBar";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { ShortCuts } from "./ShortCuts";
import {
  ListenToRemoteState,
  ListenToRemoteStateUpdate,
  StoreRemoteState,
} from "./RemoteState";
import { Slag } from "./Slag";

interface State {
  YatzySets: YatzySet[];
  currentSet: number;
  currentRound: number;
  names: string[];
  groupName?: string;
}

function clearSets(): YatzySet[] {
  let sets = Array(6)
    .fill(null)
    .map(() => new YatzySet());
  for (let index = 1; index < sets.length; index++) {
    const left = sets[index - 1];
    const right = sets[index];
    left.setRight(right);
    right.setLeft(left);
  }
  return sets;
}

export class Game extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    let emptySets = clearSets();
    const names = [
      "Spiller 1",
      "Spiller 2",
      "Spiller 3",
      "Spiller 4",
      "Spiller 5",
      "Spiller 6",
    ];
    this.state = {
      YatzySets: emptySets,
      currentSet: 0,
      currentRound: 0,
      names: names,
      groupName: undefined,
    };

    ListenToRemoteState((game: GameState) => this.updateState(game));
    console.log("End of constructor", this);
  }

  updateState(game: GameState) {
    const allRounds = game.rounds;
    console.log("As promised: ", game);

    let storedSets = clearSets();
    for (let index = 0; index < allRounds.length; index++) {
      const element = allRounds[index];
      storedSets[index].setCubes(element);
    }
    this.setState({
      YatzySets: storedSets,
      currentSet: game.currentPlayer,
      currentRound: game.currentRound,
      names: game.names,
    });
  }

  handleClick(p: number, r: number) {
    //console.log("Call back player: " + p + " round: " + r);
    var set = this.state.YatzySets[p];
    set.round(r);
    const newState = {
      YatzySets: this.state.YatzySets,
      currentSet: p,
      currentRound: r,
      names: this.state.names,
    } as State;
    this.setState(newState, () => this.storeBoard());
  }

  rowFunc(round: number): (p: number) => void {
    return (player) => this.handleClick(player, round);
  }

  rowRounds(i: number): Round[] {
    let result = this.state.YatzySets.map((ys) => ys.round(i));
    return result;
  }

  addDice(i: number) {
    const currentRound = this.state.YatzySets[this.state.currentSet].round(
      this.state.currentRound
    );
    if (currentRound.canBeNext(i)) {
      currentRound.add(i);
      this.setState(this.state, () => this.storeBoard());
    }
  }

  removeDice() {
    console.log("Back");
    const currentRound = this.state.YatzySets[this.state.currentSet].round(
      this.state.currentRound
    );
    currentRound.back();
    this.setState(this.state, () => this.storeBoard());
  }

  scratch() {
    console.log("Scratch");
    const currentRound = this.state.YatzySets[this.state.currentSet].round(
      this.state.currentRound
    );
    currentRound.scratch();
    this.setState(this.state, () => this.storeBoard());
  }

  clearBoard() {
    console.log("Clear board");
    const sets = clearSets();
    const newState = {
      YatzySets: sets,
      currentSet: 0,
      currentRound: 0,
      names: this.state.names,
    } as State;
    this.setState(newState, () => this.storeBoard());
  }

  updateName(name: string, index: number) {
    const newState = { ...this.state };
    newState.names[index] = name;
    this.setState(newState, () => this.storeBoard());
  }

  updateGroupName(name: string) {
    ListenToRemoteStateUpdate(
      (g) => this.updateState(g),
      this.getState(),
      name
    );
    const newState = { ...this.state };
    newState.groupName = name;
    this.setState(newState);
  }

  storeBoard() {
    console.log("Store board");
    const state = this.getState();
    StoreRemoteState(state);
  }

  getState(): GameState {
    const sets = this.state.YatzySets;

    const rounds = sets.map((ys) => ys.allCubes());
    const statedto = {} as GameState;
    statedto.names = this.state.names;
    statedto.rounds = rounds;
    statedto.currentPlayer = this.state.currentSet;
    statedto.currentRound = this.state.currentRound;
    return statedto;
  }

  terning(i: number) {
    return (
      <button
        className="terning"
        disabled={
          !this.state.YatzySets[this.state.currentSet]
            .round(this.state.currentRound)
            .canBeNext(i)
        }
        onClick={() => this.addDice(i)}
      >
        ,{i}
      </button>
    );
  }

  rank(player: number): number {
    const set = this.state.YatzySets[player];
    if (set.roundsPlayed() === 0) {
      return -1;
    }
    const score = set.score();
    const better = this.state.YatzySets.reduce(
      (n, r) => n + (r.roundsPlayed() > 0 && r.score() > score ? 1 : 0),
      0
    );
    return better + 1;
  }

  behind(player: number): number {
    const set = this.state.YatzySets[player];
    if (set.roundsPlayed() === 0) {
      return 0;
    }
    const score = set.score();
    const max = Math.max(...this.state.YatzySets.map((ys) => ys.score()));
    return score - max;
  }

  shift(delta: number) {
    if (delta === 0){
        return;
    }
    const currentSet = this.state.currentSet;
    const numberOfPlayers = this.state.names.filter(
      (s) => !s.match("Spiller")
    ).length;
    const nextSet = (((currentSet + delta) % numberOfPlayers) + numberOfPlayers) % numberOfPlayers;
    this.setState({
      YatzySets: this.state.YatzySets,
      currentSet: nextSet,
      currentRound: 0,
      names: this.state.names,
    }, () => this.storeBoard());
  }

  række(round: number, slags: string): ReactElement {
    return (
      <Række
        Slags={slags}
        onClick={this.rowFunc(round)}
        rounds={this.rowRounds(round)}
        available={this.state.YatzySets[this.state.currentSet]
          .round(round)
          .blank()}
        currentRound={this.state.YatzySets[this.state.currentSet].round(
          this.state.currentRound
        )}
      />
    );
  }

  render() {
    return (
      <div>
        <ShortCuts
          diceClick={(i: number) => {
            this.addDice(i);
          }}
          // diceEnabled={i => this.state.currentRound.canBeNext(i)}
          backspace={() => this.removeDice()}
          // scratch={() => this.scratch()}
          // clear={() => this.clearBoard()}
          next={() => this.shift(1)}
        />

        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 200 }} aria-label="simple table">
            <Navne
              valid={this.state.YatzySets.map((ys) => ys.verify())}
              names={this.state.names}
              updateName={(name, index) => this.updateName(name, index)}
              rank={(player) => this.rank(player)}
              behind={(player) => this.behind(player)}
            />
            <TableBody>
              {this.række(0, "1")}
              {this.række(1, "2")}
              {this.række(2, "3")}
              {this.række(3, "4")}
              {this.række(4, "5")}
              {this.række(5, "6")}
              <LæsRække
                Slags="Bonus"
                Tal={this.state.YatzySets.map((ys) => ys.bonusResult())}
              ></LæsRække>
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
              <LæsRække
                Slags="Total"
                Tal={this.state.YatzySets.map((ys) => ys.score())}
              ></LæsRække>
            </TableBody>
          </Table>
        </TableContainer>
        <Slag
          Slag={this.state.YatzySets[this.state.currentSet]
            .round(this.state.currentRound)
            .toArray()}
          Shift={(delta) => this.shift(delta)}
        />
        <ButtonBar
          diceClick={(i: number) => {
            this.addDice(i);
          }}
          diceEnabled={(i) =>
            this.state.YatzySets[this.state.currentSet]
              .round(this.state.currentRound)
              .canBeNext(i)
          }
          backspace={() => this.removeDice()}
          scratch={() => this.scratch()}
          clear={() => this.clearBoard()}
          setGroup={(name) => this.updateGroupName(name)}
          groupName={this.state.groupName ?? ""}
        />
      </div>
    );
  }
}
