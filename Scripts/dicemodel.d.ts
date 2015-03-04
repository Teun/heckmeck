/// <reference path="dice.d.ts" />
/// <reference path="knockout.d.ts" />
import Dice = require("dice");
export = DiceModel;
declare module DiceModel {
    class Set {
        constructor(dice: string);
        dice: KnockoutObservableArray<number>;
        diceList: (nr: number, v: number) => number[];
        expectation: KnockoutComputed<Dice.DiceSet>;
    }
}
