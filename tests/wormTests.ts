import tsUnit = require("../Scripts/tsUnit/tsUnit")
import Dice = require("../Scripts/dice")
export module WormTests {
    export class ScoreTests extends tsUnit.TestClass {

        allWormsHaveValue40() {
            var ds = Dice.DiceSet.For([0, 0, 0, 0, 0, 8]);
            this.areIdentical(40, ds.Score());
            this.areIdentical(4, ds.CurrentValue());
        }

        all5NoWormScores0() {
            var ds = Dice.DiceSet.For([0, 0, 0, 0, 8, 0]);
            this.areIdentical(0, ds.Score());
        }

        all5OneWormScores40() {
            var ds = Dice.DiceSet.For([0, 0, 0, 0, 7, 1]);
            this.areIdentical(40, ds.Score());
        }
    }
    export class Rolls extends tsUnit.TestClass {

        throw5times5with5() {
            var roll = new Dice.Roll([0, 0, 0, 0, 5, 0]);
            this.areIdentical(1/(6*6*6*6*6), roll.chanceToThrowThis() );
        }

        roll1Gives6() {
            var combinations = Dice.RollWith(1);
            this.areIdentical(6, combinations.length);
        }
        roll2Gives21() {
            var combinations = Dice.RollWith(2);
            this.areIdentical(21, combinations.length);
        }

    }
    export class Expectations extends tsUnit.TestClass {
        neededWormGivesExpectedValue016666() {
            var ds = new Dice.DiceSet([3, 0, 2, 0, 2, 0]);
            this.areIdentical(1 / 6, ds.ExpectedValue()); // the only way to score is by throwing a worm: 1/6
        }
        completeSetHasExpectationEqualsCurrent() {
            var ds = new Dice.DiceSet([3, 0, 0, 0, 1, 3]);
            this.areIdentical(1, ds.ExpectedValue());
            this.areIdentical(1, ds.CurrentValue());
        }
        expectedValueBeforeStart() {
            var ds = new Dice.DiceSet([0, 0, 0, 0, 0, 0]);
            this.areIdentical(1.6447296740400994, ds.ExpectedValue());
        }
    }
} 
