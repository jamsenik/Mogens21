export class YatzySet {
    // let BONUS = 50;

    // var Rounds: [Round]
    // var Left: YatzySet?
    // var Right: YatzySet?
    // var PlayerName : String = ""
    constructor(playerId){
        this.playerId = playerId;
        let r = [new UpperRound(1), new UpperRound(2), new UpperRound(3), new UpperRound(4), new UpperRound(5), new UpperRound(6)];
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

    }
    // init(){
    //     Rounds = Array()
    //     for r in 1...6 {
    //         Rounds.append(UpperRound(kind: r))
    //     }
    //     Rounds.append(PatternRound(pattern: [2]))
    //     Rounds.append(PatternRound(pattern: [2, 2]))
    //     Rounds.append(PatternRound(pattern: [2, 2, 2]))
    //     Rounds.append(PatternRound(pattern: [3]))
    //     Rounds.append(PatternRound(pattern: [4]))
    //     Rounds.append(PatternRound(pattern: [3, 3]))
    //     Rounds.append(FixedRound(pattern: [1, 2, 3, 4, 5]))
    //     Rounds.append(FixedRound(pattern: [2, 3, 4, 5, 6]))
    //     Rounds.append(FixedRound(pattern: [1, 2, 3, 4, 5, 6], bonus: 9))
    //     Rounds.append(PatternRound(pattern: [3, 2]))
    //     Rounds.append(Round())
    //     Rounds.append(PatternRound(pattern: [6], bonus: 100))
    // }

    verify() {
        let p = this.roundsPlayed();
        if (this.left !== null && p != 0){
            let l = this.left.roundsPlayed()
            if (l !== p && l !== p + 1) {
                return false
            }
        }


        if (this.right !== null){
            let r = this.right.roundsPlayed();
            if (r != 0){
                if (r !== p - 1 && r !== p){
                    return false;
                }
            }
        }
        return true
    }

    roundsPlayed() {
        return this.rlayedRounds().length;
    }

    round(i){
        return this.rounds[i];
    }

    score(){
        return this.rounds.filter(round => !round.blank()).reduce((sum, round) => sum + round.score(), 0) + this.bonus();
    }
 
    bonus(){
        return this.isTopSet() && this.rounds.slice(0,6).reduce((sum, r) => sum + r.score(), 0) >= 0 ? 50 : 0;
    }

    isTopSet(){
        const ts = this.rounds.slice(0, 6).every(round => !round.blank());
        return ts;
    }

    playedRounds() {
        return this.rounds.filter(round => !round.blank()).length;
    }

    anders(){
        return this.playerId;
    }
    // func PlayedTopRounds() -> [Round] {
    //     return Rounds[0...5].filter({!$0.Blank()})
    // }

    // class func  MaxInput(play : Int) -> Int {
    //     return 4
    // }
}

class Round {
    constructor() {
        this.cubes = [];
        this.scrathed = false;
    }

    score() {
        if (this.scrathed) {
            return 0;
        }
        return this.cubes.reduce((sum, c) => sum + c, 0);
    }

    blank(){
        return this.cubes.length === 0 && !this.scrathed;
    }

    add(dice){
        this.cubes.push(dice);
        this.scrathed = false;

    }

    scratch(){
        this.cubes = [];
        this.scrathed = true;
    }

    clear() {
        this.cubes = [];
        this.scrathed = false;
    }

    back() {
        this.cubes.pop();
        if (this.scrathed){
            this.clear();
        }
    }

    toArray() {
        return this.cubes.join("");
    }

    toString(){
        if(this.scrathed){
            return "X";
        }
        if(this.blank()){
            return "";
        }
        return this.score();
    }

    bonus(){
        return 0;
    }

    canBeNext(v){
        return this.cubes.length < 6;
    }

    isIncomplete(){
        return false;
    }
}

class UpperRound extends Round {
    constructor(kind) {
        super();
        this.kind = kind;
    }

    add(dice){
        if (dice === this.kind) {
            super.add(dice)
        }
    }
    
    score(){
        
        return super.score() - 4 * this.kind
    }
    
    bouns(){
        return this.score()
    }

    canBeNext(v){
        return super.canBeNext(v) && v === this.kind;
    }
    
}

class PatternRound extends Round{
    constructor(pattern, bonus = 0) {
        super();
        this.pattern = pattern;
        this.kind = Array(pattern.length).fill(0);
        this.bonus = bonus;
        this.index = 0;
    }
    
    add(dice){
        console.log("Adding: " + dice);
        if (this.isAPreviousValue(dice) || this.index >= this.pattern.count){
            return
        }
        for (let i = 0; i < this.pattern[this.index]; i++){
            super.add(dice);
        }
        this.kind[this.index] = dice;
        this.index += 1
    }
    
    canBeNext(v){
        return super.canBeNext(v) && !this.isAPreviousValue(v) && this.index < this.pattern.length
    }
    
    isAPreviousValue(d) {
        return this.kind.includes(d)
    }
    
    clear(){
        super.clear()
        this.kind = Array(this.pattern.length).fill(0)
        this.index = 0
    }
    
    back(){
        if (this.index ===  0){
            this.clear();
            return;
        }
        this.index -= 1;
        this.kind[this.index] = 0;
        for (let i = 0; i < this.pattern[this.index]; i++){
            super.back();
        }
    }
    
    score(){
         return (this.index === this.pattern.length ? this.bonus : 0 ) + super.score();
    }

    scratch() {
        this.clear()
        super.scratch()
    }
    
    isIncomplete() {
        return this.index !== 0 && this.index < this.pattern.length
    }
}

class FixedRound extends Round{
    // let pattern : [Int]
    // var set = false
    // var bonus = 0
    
    constructor(pattern, bonus) {
        super();
        this.pattern = pattern;
        this.bonus = bonus;
        this.set = false;
        
    }
    
    add(dice){
        if (!this.pattern.includes(dice) || this.set){
            return
        }
        this.pattern.forEach(d => super.add(d));
        this.set = true;
    }
    
    canBeNext(v){
        return !this.set && this.pattern.includes(v);
    }
    
    
    clear(){
        super.clear();
        this.set = false;
    }
    
    back(){
        this.pattern.forEach(d => super.back());
        this.set = false;
    }
    
    scratch() {
        super.scratch();
        this.set = false;
    }
    
    score(){
        return (this.set ? this.bonus : 0) + super.score();
    }
    
    ssIncomplete(){
        return false;
    }
    
}