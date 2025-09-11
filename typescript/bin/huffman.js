"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HuffmanNode = /** @class */ (function () {
    function HuffmanNode(char, frequency) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
    return HuffmanNode;
}());
var HuffmanCoding = /** @class */ (function () {
    function HuffmanCoding() {
        this.root = null;
        this.codes = {};
        this.reverseCodes = {};
    }
    HuffmanCoding.prototype.buildFrequencyMap = function (text) {
        var frequencyMap = {};
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var char = text_1[_i];
            frequencyMap[char] = (frequencyMap[char] || 0) + 1;
        }
        return frequencyMap;
    };
    HuffmanCoding.prototype.buildHuffmanTree = function (frequencyMap) {
        var nodes = [];
        for (var _i = 0, _a = Object.entries(frequencyMap); _i < _a.length; _i++) {
            var _b = _a[_i], char = _b[0], frequency = _b[1];
            nodes.push(new HuffmanNode(char, frequency));
        }
        while (nodes.length > 1) {
            nodes.sort(function (a, b) { return a.frequency - b.frequency; });
            var left = nodes.shift();
            var right = nodes.shift();
            var internalNode = new HuffmanNode(null, left.frequency + right.frequency);
            internalNode.left = left;
            internalNode.right = right;
            nodes.push(internalNode);
        }
        this.root = nodes[0];
        return this.root;
    };
    HuffmanCoding.prototype.generateCodes = function (node, currentCode) {
        if (currentCode === void 0) { currentCode = ''; }
        if (!node)
            return;
        if (node.char !== null) {
            this.codes[node.char] = currentCode;
            this.reverseCodes[currentCode] = node.char;
            return;
        }
        this.generateCodes(node.left, currentCode + '0');
        this.generateCodes(node.right, currentCode + '1');
    };
    HuffmanCoding.prototype.encode = function (text) {
        var frequencyMap = this.buildFrequencyMap(text);
        this.buildHuffmanTree(frequencyMap);
        this.generateCodes(this.root);
        var encoded = '';
        for (var _i = 0, text_2 = text; _i < text_2.length; _i++) {
            var char = text_2[_i];
            encoded += this.codes[char];
        }
        return {
            encodedText: encoded,
            codes: this.codes,
            frequencyMap: frequencyMap
        };
    };
    HuffmanCoding.prototype.decode = function (encodedText, codes) {
        if (codes && typeof codes === 'object') {
            this.reverseCodes = {};
            for (var _i = 0, _a = Object.entries(codes); _i < _a.length; _i++) {
                var _b = _a[_i], char = _b[0], code = _b[1];
                this.reverseCodes[code] = char;
            }
        }
        var currentCode = '';
        var decoded = '';
        for (var _c = 0, encodedText_1 = encodedText; _c < encodedText_1.length; _c++) {
            var bit = encodedText_1[_c];
            currentCode += bit;
            if (this.reverseCodes[currentCode]) {
                decoded += this.reverseCodes[currentCode];
                currentCode = '';
            }
        }
        return decoded;
    };
    return HuffmanCoding;
}());
exports.default = HuffmanCoding;
