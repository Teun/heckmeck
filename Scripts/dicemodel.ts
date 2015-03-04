/// <reference path="dice.ts" />
/// <reference path="knockout.d.ts" />
import Dice = require("dice");
import ko = require("knockout");
export = DiceModel;
module DiceModel {
    export class Set {
    	constructor(dice : string){
    		for (var i = 0; i < dice.length; i++){
    			this.dice.push(parseInt(dice[i]))
    		}
    	}

    	dice : KnockoutObservableArray<number> = ko.observableArray<number>();
    	diceList = (nr:number, v:number)=>{
    		var result : Array<number> = [];
    		for(var i = 0; i<nr;i++){
    			result.push(v + 1);
    		}
    		return result;
    	}
    	expectation = ko.computed(()=>{
    		return Dice.DiceSet.For(this.dice());
    		}); 
	}
}