declare module tsUnit {
    class Test {
        private tests;
        private testRunLimiter;
        private reservedMethodNameContainer;
        constructor(...testModules: any[]);
        addTestClass(testClass: TestClass, name?: string): void;
        run(testRunLimiter?: ITestRunLimiter): TestResult;
        showResults(target: HTMLElement, result: TestResult): void;
        getTapResults(result: TestResult): string;
        private createTestLimiter();
        private isReservedFunctionName(functionName);
        private runSingleTest(testResult, testClass, unitTestName, testsGroupName, parameters?, parameterSetIndex?);
        private getTestResult(result);
        private getTestSummary(result);
        private getTestResultList(testResults);
        private encodeHtmlEntities(input);
    }
    interface ITestRunLimiter {
        isTestsGroupActive(groupName: string): boolean;
        isTestActive(testName: string): boolean;
        isParametersSetActive(paramatersSetNumber: number): boolean;
    }
    interface IThrowsParameters {
        fn: () => void;
        message?: string;
        errorString?: string;
    }
    class TestContext {
        setUp(): void;
        tearDown(): void;
        protected areIdentical(expected: any, actual: any, message?: string): void;
        protected areNotIdentical(expected: any, actual: any, message?: string): void;
        protected areCollectionsIdentical(expected: any[], actual: any[], message?: string): void;
        protected areCollectionsNotIdentical(expected: any[], actual: any[], message?: string): void;
        protected isTrue(actual: boolean, message?: string): void;
        protected isFalse(actual: boolean, message?: string): void;
        protected isTruthy(actual: any, message?: string): void;
        protected isFalsey(actual: any, message?: string): void;
        protected throws(params: IThrowsParameters): void;
        protected throws(actual: () => void, message?: string): void;
        protected executesWithin(actual: () => void, timeLimit: number, message?: string): void;
        protected fail(message?: string): void;
        private getError(resultMessage, message?);
        private static getNameOfClass(inputClass);
        private printVariable(variable);
    }
    class TestClass extends TestContext {
        protected parameterizeUnitTest(method: Function, parametersArray: any[][]): void;
    }
    class FakeFactory {
        static getFake<T>(obj: any, ...implementations: [string, any][]): T;
        private static populateFakeType(fake, toCopy);
    }
    class TestDescription {
        testName: string;
        funcName: string;
        parameterSetNumber: number;
        message: string;
        constructor(testName: string, funcName: string, parameterSetNumber: number, message: string);
    }
    class TestResult {
        passes: TestDescription[];
        errors: TestDescription[];
    }
}
export = tsUnit;
