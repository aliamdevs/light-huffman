"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binary_nbit = binary_nbit;
exports.settingcode = settingcode;
exports.settingchar = settingchar;
function binary_nbit(e, n) {
    var num;
    if (typeof e === 'string') {
        num = Number(e);
    }
    else {
        num = e;
    }
    if (num !== undefined && num !== null) {
        var binarynumchar = num.toString(2);
        while (binarynumchar.length < n) {
            binarynumchar = '0' + binarynumchar;
        }
        return binarynumchar;
    }
    else {
        return '';
    }
}
function settingcode(char) {
    var charcode = char.charCodeAt(0);
    if (charcode === ' '.charCodeAt(0)) {
        return 0;
    }
    else if (charcode >= 'a'.charCodeAt(0) &&
        charcode <= 'z'.charCodeAt(0)) {
        return charcode - 'a'.charCodeAt(0) + 37;
    }
    else if (charcode >= 'A'.charCodeAt(0) &&
        charcode <= 'Z'.charCodeAt(0)) {
        return charcode - 'A'.charCodeAt(0) + 11;
    }
    else if (charcode >= '0'.charCodeAt(0) &&
        charcode <= '9'.charCodeAt(0)) {
        return charcode - '0'.charCodeAt(0) + 1;
    }
    else {
        return null;
    }
}
function settingchar(code) {
    if (code === 0) {
        return ' ';
    }
    else if (code >= 37 &&
        code <= 62) {
        return String.fromCharCode(code + 60);
    }
    else if (code >= 11 &&
        code <= 36) {
        return String.fromCharCode(code + 54);
    }
    else if (code >= 1 &&
        code <= 10) {
        return String.fromCharCode(code + 47);
    }
    else {
        return null;
    }
}
