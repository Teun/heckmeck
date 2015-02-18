/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="dice.ts" />
import Dice = require("dice");
import ko = require("knockout");
function dice(d, nr) {
    var res = "";
    for (var j = 0; j < nr; j++) {
        res += "<img src='img/" + d + ".png' />";
    }
    return res;
}
function currentValue(set) {
    var res = 0;
    var values = [1, 2, 3, 4, 5, 5];
    for (var j = 0; j < set.length; j++) {
        res += parseInt(set[j]) * values[j];
    }
    if (res < 21) return 0;
    if (res < 25) return 1;
    if (res < 29) return 2;
    if (res < 33) return 3;
    return 4;
}




$(function () {
    $('#calc').on("click", function () {
        var set = $("#input").val();
        var setList = [];
        var html = "";
        for (var i = 0; i < set.length; i++) {
            var cnt = parseInt(set[i]);
            setList.push(cnt);
            html += dice(i + 1, cnt);
        }
        $("#dice").html(html);

        var ds: Dice.DiceSet = Dice.DiceSet.For(setList);
        var html = "";
        html += "<table><tr><td>Expected</td><td></td></tr>"
        html += "<tr><td>" + ds.CurrentValue() + "</td><td>Stop now</td></tr>"
        html += "<tr><td>" + ds.ExpectedValue() + "</td><td>Optimal play</td></tr>"
        var cnt = 0;
        for (var i = 0; i < set.length; i++) {
            cnt += parseInt(set[i]);
        }
        var diceLeft = 8 - cnt;
        for (var i = 0; i < setList.length; i++) {
            if (setList[i] == 0) {
                for (var j = 0; j < diceLeft; j++) {
                    var newSet =Dice.DiceSet.For( setList.slice(0, i).concat(j + 1).concat(setList.slice(i + 1)));
                    html += "<tr><td>" + newSet.ExpectedValue() + "</td><td>" + dice(i + 1, j + 1) + "</td></tr>";
                }
            }
        }
        html += "</table>"

        $("#options").html(html);


    });

});
