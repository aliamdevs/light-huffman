class HuffmanNode {
    char: string | null;
    frequency: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;

    constructor(char: string | null, frequency: number) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

export default class HuffmanCoding {
    root: HuffmanNode | null;
    codes: Record<string, string>;
    reverseCodes: Record<string, string>;

    constructor() {
        this.root = null;
        this.codes = {};
        this.reverseCodes = {};
    }

    buildFrequencyMap(text: string): Record<string, number> {
        const frequencyMap: Record<string, number> = {};
        for (const char of text) {
            frequencyMap[char] = (frequencyMap[char] || 0) + 1;
        }
        return frequencyMap;
    }

    buildHuffmanTree(frequencyMap: Record<string, number>): HuffmanNode {
        const nodes: HuffmanNode[] = [];

        for (const [char, frequency] of Object.entries(frequencyMap)) {
            nodes.push(new HuffmanNode(char, frequency));
        }

        while (nodes.length > 1) {
            nodes.sort((a, b) => a.frequency - b.frequency);

            const left = nodes.shift()!;
            const right = nodes.shift()!;

            const internalNode = new HuffmanNode(
                null,
                left.frequency + right.frequency
            );
            internalNode.left = left;
            internalNode.right = right;

            nodes.push(internalNode);
        }

        this.root = nodes[0];
        return this.root;
    }

    generateCodes(node: HuffmanNode | null, currentCode: string = ''): void {
        if (!node) return;

        if (node.char !== null) {
            this.codes[node.char] = currentCode;
            this.reverseCodes[currentCode] = node.char;
            return;
        }

        this.generateCodes(node.left, currentCode + '0');
        this.generateCodes(node.right, currentCode + '1');
    }

    encode(text: string): { encodedText: string; codes: Record<string, string>; frequencyMap: Record<string, number> } {
        const frequencyMap = this.buildFrequencyMap(text);
        this.buildHuffmanTree(frequencyMap);
        this.generateCodes(this.root);

        let encoded = '';
        for (const char of text) {
            encoded += this.codes[char];
        }

        return {
            encodedText: encoded,
            codes: this.codes,
            frequencyMap: frequencyMap
        };
    }

    decode(encodedText: string, codes?: Record<string, string>): string {
        if (codes && typeof codes === 'object') {
            this.reverseCodes = {};
            for (const [char, code] of Object.entries(codes)) {
                this.reverseCodes[code] = char;
            }
        }

        let currentCode = '';
        let decoded = '';

        for (const bit of encodedText) {
            currentCode += bit;

            if (this.reverseCodes[currentCode]) {
                decoded += this.reverseCodes[currentCode];
                currentCode = '';
            }
        }

        return decoded;
    }
}
