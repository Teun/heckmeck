export = Dice;
declare module Dice {
    class Roll {
        values: number[];
        constructor(nums: any);
        chanceToThrowThis(): number;
        toString(): string;
    }
    function RollWith(nrOfDice: number): Roll[];
    class DiceSet extends Roll {
        constructor(nums: number[]);
        static For(values: number[]): DiceSet;
        Cache(): {
            [key: string]: DiceSet;
        };
        Score(): number;
        CurrentValue(): number;
        private expected;
        ExpectedValue(): number;
        AddDice(value: number, nr: number): DiceSet;
        DiceLeft(): number;
        static Dead(): DiceSet;
    }
}
