export class YatzySet {
  rounds: Round[];
  left: YatzySet | null;
  right: YatzySet | null;

  constructor() {
    let r: Round[] = [
      new UpperRound(1),
      new UpperRound(2),
      new UpperRound(3),
      new UpperRound(4),
      new UpperRound(5),
      new UpperRound(6),
    ];
    r.push(new PatternRound([2]));
    r.push(new PatternRound([2, 2]));
    r.push(new PatternRound([2, 2, 2]));
    r.push(new PatternRound([3]));
    r.push(new PatternRound([4]));
    r.push(new PatternRound([3, 3]));
    r.push(new FixedRound([1, 2, 3, 4, 5], 0));
    r.push(new FixedRound([2, 3, 4, 5, 6], 0));
    r.push(new FixedRound([1, 2, 3, 4, 5, 6], 9));
    r.push(new PatternRound([3, 2]));
    r.push(new Round());
    r.push(new PatternRound([6], 100));
    this.rounds = r;
    this.left = null;
    this.right = null;
  }

  setLeft(l: YatzySet) {
    this.left = l;
  }

  setRight(r: YatzySet) {
    this.right = r;
  }

  verify() {
    let p = this.roundsPlayed();
    if (this.left !== null && p !== 0) {
      let l = this.left.roundsPlayed();
      if (l !== p && l !== p + 1) {
        return false;
      }
    }

    if (this.right !== null) {
      let r = this.right.roundsPlayed();
      if (r !== 0) {
        if (r !== p - 1 && r !== p) {
          return false;
        }
      }
    }
    return true;
  }

  roundsPlayed() {
    return this.playedRounds().length;
  }

  round(i: number): Round {
    return this.rounds[i];
  }

  score(): number {
    return (
      this.rounds
        .filter((round) => !round.blank())
        .reduce((sum, round) => sum + round.score(), 0) + this.bonus()
    );
  }

  bonus(): number {
    return this.isTopSet() &&
      this.rounds.slice(0, 6).reduce((sum, r) => sum + r.score(), 0) >= 0
      ? 50
      : 0;
  }

  topDifference(): number {
    return this.rounds
      .slice(0, 6)
      .reduce((sum, r) => sum + (r.blank() ? 0 : r.score()), 0);
  }

  bonusResult(): number {
    const bonus = this.bonus();
    if (bonus > 0) {
      return bonus;
    } else {
      return this.topDifference();
    }
  }

  isTopSet(): boolean {
    const ts = this.rounds.slice(0, 6).every((round) => !round.blank());
    return ts;
  }

  playedRounds(): Round[] {
    return this.rounds.filter((round) => !round.blank());
  }

  allCubes(): RoundState[] {
    return this.rounds.map((r) => {
      var state: RoundState = {
        cubes: r.cubes,
        scratched: r.scrathed,
      };
      return state;
    });
  }

  setCubes(rounds: RoundState[]) {
    for (let index = 0; index < rounds.length; index++) {
      const element = rounds[index];
      if (element.scratched) {
        this.rounds[index].scratch();
      } else {
        element.cubes.forEach((cube) => {
          this.rounds[index].add(cube);
        });
      }
    }
  }
}

export interface GameState {
  names: string[];
  rounds: RoundState[][];
  currentPlayer: number;
  currentRound: number;
}

export interface RoundState {
  cubes: number[];
  scratched: boolean;
}

export class Round {
  cubes: number[];
  scrathed: boolean;
  constructor() {
    this.cubes = [];
    this.scrathed = false;
  }

  score(): number {
    if (this.scrathed) {
      return 0;
    }
    return this.cubes.reduce((sum, c) => sum + c, 0);
  }

  blank(): boolean {
    return this.cubes.length === 0 && !this.scrathed;
  }

  add(dice: number) {
    this.cubes.push(dice);
    this.scrathed = false;
  }

  scratch() {
    this.cubes = [];
    this.scrathed = true;
  }

  clear() {
    this.cubes = [];
    this.scrathed = false;
  }

  back() {
    this.cubes.pop();
    if (this.scrathed) {
      this.clear();
    }
  }

  toArray(): number[] {
    return this.cubes;
  }

  toString(): string {
    if (this.scrathed) {
      return "X";
    }
    if (this.blank()) {
      return "\xa0";
    }
    return this.score().toString();
  }

  bonus(): number {
    return 0;
  }

  canBeNext(v: number): boolean {
    return this.cubes.length < 6;
  }

  isIncomplete(): boolean {
    return !this.scrathed && this.cubes.length > 0 && this.cubes.length < 6;
  }
}

class UpperRound extends Round {
  kind: number;
  constructor(kind: number) {
    super();
    this.kind = kind;
  }

  add(dice: number) {
    if (dice === this.kind) {
      super.add(dice);
    }
  }

  score(): number {
    return super.score() - 4 * this.kind;
  }

  bouns(): number {
    return this.score();
  }

  canBeNext(v: number): boolean {
    return super.canBeNext(v) && v === this.kind;
  }

  isIncomplete(): boolean {
    return !this.scrathed && this.cubes.length < 6;
  }
}

class PatternRound extends Round {
  pattern: number[];
  kind: number[];
  bonusPoints: number;
  index: number;
  constructor(pattern: number[], bonus: number = 0) {
    super();
    this.pattern = pattern;
    this.kind = Array(pattern.length).fill(0);
    this.bonusPoints = bonus;
    this.index = 0;
  }

  add(dice: number) {
    if (this.isAPreviousValue(dice) || this.index >= this.pattern.length) {
      return;
    }
    for (let i = 0; i < this.pattern[this.index]; i++) {
      super.add(dice);
    }
    this.kind[this.index] = dice;
    this.index += 1;
  }

  canBeNext(v: number): boolean {
    return (
      super.canBeNext(v) &&
      !this.isAPreviousValue(v) &&
      this.index < this.pattern.length
    );
  }

  isAPreviousValue(d: number): boolean {
    return this.kind.includes(d);
  }

  clear() {
    super.clear();
    this.kind = Array(this.pattern.length).fill(0);
    this.index = 0;
  }

  back() {
    if (this.index === 0) {
      this.clear();
      return;
    }
    this.index -= 1;
    this.kind[this.index] = 0;
    for (let i = 0; i < this.pattern[this.index]; i++) {
      super.back();
    }
  }

  score(): number {
    return (
      (this.index === this.pattern.length ? this.bonusPoints : 0) +
      super.score()
    );
  }

  scratch() {
    this.clear();
    super.scratch();
  }

  isIncomplete(): boolean {
    return !this.scrathed && this.index < this.pattern.length;
  }
}

class FixedRound extends Round {
  bonusPoints: number;
  set: boolean;
  pattern: number[];
  constructor(pattern: number[], bonusPoints: number) {
    super();
    this.pattern = pattern;
    this.bonusPoints = bonusPoints;
    this.set = false;
  }

  add(dice: number) {
    if (!this.pattern.includes(dice) || this.set) {
      return;
    }
    this.pattern.forEach((d) => super.add(d));
    this.set = true;
  }

  canBeNext(v: number): boolean {
    return !this.set && this.pattern.includes(v);
  }

  clear() {
    super.clear();
    this.set = false;
  }

  back() {
    this.pattern.forEach((d) => super.back());
    this.set = false;
  }

  scratch() {
    super.scratch();
    this.set = false;
  }

  score(): number {
    return (this.set ? this.bonusPoints : 0) + super.score();
  }

  isIncomplete(): boolean {
    return !this.scrathed && !this.set;
  }
}
