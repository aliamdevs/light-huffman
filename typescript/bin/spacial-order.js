"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = countSpecialOrder;
function countSpecialOrder(n) {
    var results = [];
    var m = Math.ceil(Math.sqrt(n));
    for (var i = 0; i < m * m; i++) {
        var digit1 = Math.floor(i / m);
        var digit2 = i % m;
        var numStr = digit1.toString() + digit2.toString();
        var sum = digit1 + digit2;
        results.push({ num: numStr, sum: sum, digit1: digit1, digit2: digit2 });
    }
    results.sort(function (a, b) {
        if (a.sum !== b.sum) {
            return a.sum - b.sum;
        }
        if (a.digit1 !== b.digit1) {
            return a.digit1 - b.digit1;
        }
        return a.digit2 - b.digit2;
    });
    return results.map(function (item) { return item.num; });
}
