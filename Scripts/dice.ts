export = Dice;
module Dice {
    export class Roll {

        values: number[] = [];
        constructor(nums) {
            this.values = nums;
        }
        chanceToThrowThis() {
            var totalDice: number = this.values.reduce((n1, n2) => n1 + n2, 0);
            var diceToGo = totalDice;
            var combination = 1;
            var totalPossibilities = Math.pow(6, totalDice);
            for (var i = 0; i < this.values.length; i++) {
                combination *= choose(diceToGo, this.values[i]);
                diceToGo -= this.values[i];
            }
            return (combination / totalPossibilities);
        }
        toString() {
            return this.values.reduce((n1: string, n2: number) => { return n1 + "-" + n2; }, "[") + "]";
        }
    }

    export function RollWith (nrOfDice:number){
        if (nrOfDice == 0) return [];
        return rollWith(nrOfDice, 6).map(n => new Roll(n));
    }
    var rollCache : { [key: string]: number[][]; } = { };
    var rollWith = (nrOfDice: number, positions: number): Array<number[]> => {
        var key: string = nrOfDice + "-" + positions;
        if (!(key in rollCache)) {
            var result: number[][] = [];
            if (positions == 1) {
                result.push([nrOfDice]);
            } else {
                for (var i = 0; i <= nrOfDice; i++) {
                    var innerResult = [];
                    innerResult.push(i);
                    var remainder = rollWith(nrOfDice - i, positions - 1);
                    for (var item in remainder) {
                        result.push(innerResult.concat(remainder[item]));
                    }
                }
            }
            rollCache[key] = result;
        }
        return rollCache[key];
    }
    var factorial = (x: number, lowerBound: number)=>{
        var fact: number = 1;
        while (x >= 1 && x > lowerBound) {
            fact *= x;
            x--;
        }
        return fact;
    }

    var choose = (n: number, r: number)=>{
        return (factorial(n, Math.max(n - r, r)) / (factorial(Math.min(n - r, r), 1)));
    }

    var cache: { [key: string]: DiceSet; } = {};

    export class DiceSet extends Roll {
        constructor(nums: number[]) {
            super(nums);
        }
        static For(values: number[]): DiceSet {
            var key: string = values.reduce((r: string, n: number) => r + "-" + n, "");
            if (!(key in cache)) {
                cache[key] = new DiceSet(values);
            }
            return cache[key];
        }
        Cache(): { [key: string]: DiceSet; } { return cache; }


        Score(): number {
            if (this.values[5] == 0) return 0;
            return this.values.filter((n, i) => i < 5)
                .reduce((p, n, i) => n * (i + 1) + p, 0)
                + (this.values[5] * 5);
        }
        CurrentValue(): number {
            var score: number = this.Score();
            if (score < 21) return 0;
            if (score < 25) return 1;
            if (score < 29) return 2;
            if (score < 33) return 3;
            return 4;
        }
        private expected: number = null;
        ExpectedValue(): number {
            var that = this;
            if (this.expected === null) {
                var valueForQuit: number = this.CurrentValue();
                var valueForRoll: number = 0;
                var rolls: Roll[] = RollWith(this.DiceLeft());
                for (var i = 0; i < rolls.length; i++) {
                    var roll = rolls[i];
                    var picks: DiceSet[] = roll.values.map((v, i) => { return { value: i, nr: v } }).filter(d => d.nr > 0).map(d => {
                        var resultSet = that.AddDice(d.value, d.nr);
                        return resultSet;
                    });
                    var pick = picks.sort((d1, d2) => d2.ExpectedValue() - d1.ExpectedValue())[0];
                    valueForRoll += pick.ExpectedValue() * roll.chanceToThrowThis();
                }
                this.expected = Math.max(valueForRoll, valueForQuit);
            }
            return this.expected;
        }

        AddDice(value: number, nr: number): DiceSet {
            var values: number[] = Array.apply(this, this.values);
            if (values[value] > 0) return DiceSet.Dead();
            values[value] = nr;
            return DiceSet.For(values);
        }

        DiceLeft(): number {
            return 8 - this.values.reduce((n1, n2) => n1 + n2, 0);
        }
        static Dead(): DiceSet { return new DeadSet(); }
    }
    class DeadSet extends DiceSet {
        constructor() { super([]) }
        ExpectedValue(): number { return 0; }
    }
 
}