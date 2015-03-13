/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="dice.d.ts" />
declare class app {
    constructor(ib: any);
    private currentValue;
    init(cont: any): void;
}
export = app;
