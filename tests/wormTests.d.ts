import tsUnit = require("../Scripts/tsUnit/tsUnit");
export declare module WormTests {
    class ScoreTests extends tsUnit.TestClass {
        allWormsHaveValue40(): void;
        all5NoWormScores0(): void;
        all5OneWormScores40(): void;
    }
    class Rolls extends tsUnit.TestClass {
        throw5times5with5(): void;
        roll1Gives6(): void;
        roll2Gives21(): void;
    }
    class Expectations extends tsUnit.TestClass {
        neededWormGivesExpectedValue016666(): void;
        completeSetHasExpectationEqualsCurrent(): void;
        expectedValueBeforeStart(): void;
    }
    class ExpectedPicks extends tsUnit.TestClass {
        oneDiceGivesOneSixthForWorm(): void;
    }
}
