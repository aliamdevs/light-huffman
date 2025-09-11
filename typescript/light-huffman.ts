import HuffmanCoding from './bin/huffman';
import { settingcode, binary_nbit, settingchar } from './bin/pack';
import countSpecialOrder from './bin/spacial-order';

interface EncodeResult {
    data: string;
    sizeofcode: number;
    sizeofmemory: number;
    huffmanfrequencymap: Record<string, number>;
    spacialorderfrequencymap: Record<string, number>;
}

interface CharFrequencyPair {
    char: string;
    frequency: number;
}

/**
 * Light Memory-Based Huffman Compression
 * LightHuffman Compression
 * Version 1.0
 * @param {string} str - The String You Want To Encode
 * @returns {EncodeResult} The Encoded String and metadata
 * @throws {Error} If str is not String
 * @example
 * // Returns "011101010101010101010 ... "
 * LightHuffmanEncode('Lorem ipsum dolor sit amet ... ');
 */
export function LightHuffmanEncode(str: string): EncodeResult {
    if (typeof str !== 'string') throw new TypeError('String Required.');

    let body = '';
    const numchar: number[] = [];
    const alphabets: string[] = [];
    let SOsettings = '';
    let Huffsetting = '';

    // Collect unique characters and their frequencies
    for (const char of str) {
        if (!(alphabets as any).includes(char) && settingcode(char) !== null) {
            alphabets.push(char);
            numchar.push(0);
        }
    }

    for (const char of str) {
        const index = alphabets.indexOf(char);
        if (index !== -1) {
            numchar[index]++;
        }
    }

    SOsettings = binary_nbit(alphabets.length, 6);
    const paired: CharFrequencyPair[] = alphabets.map((char, index) => {
        return { char, frequency: numchar[index] };
    });

    paired.sort((a, b) => b.frequency - a.frequency);

    const spacialordermap: Record<string, number> = {};
    paired.forEach(elm => {
        const code = settingcode(elm.char);
        if (code !== null) {
            SOsettings += binary_nbit(code, 6);
            spacialordermap[elm.char] = elm.frequency;
        }
    });

    const SOWrite = paired.map(x => x.char);
    const SORead = countSpecialOrder(alphabets.length);

    for (const char of str) {
        const index = SOWrite.indexOf(char);
        if (index !== -1) {
            body += SORead[index];
        }
    }

    const Huffman = new HuffmanCoding();
    const encodedResult = Huffman.encode(body);
    body = encodedResult.encodedText;

    const tmpbase = Math.ceil(Math.sqrt(alphabets.length));
    Huffsetting = binary_nbit(tmpbase - 1, 3);

    for (let i = 0; i < tmpbase; i++) {
        const tmp = encodedResult.codes[i.toString()];
        Huffsetting = tmp + binary_nbit(tmp.length, 3) + Huffsetting;
    }

    return {
        data: SOsettings + body + Huffsetting,
        sizeofcode: body.length,
        sizeofmemory: (SOsettings + Huffsetting).length,
        huffmanfrequencymap: encodedResult.frequencyMap,
        spacialorderfrequencymap: spacialordermap
    };
}

/**
 * Light Memory-Based Huffman Decompression
 * @param {string} code - The Code You Want To Decode
 * @returns {string} The decoded string
 * @throws {Error} If code is not String
 * @example
 * // Returns "Lorem ipsum dolor sit amet ... "
 * LightHuffmanDecode('011101010101010101010 ... ');
 */
export function LightHuffmanDecode(code: string): string {
    if (typeof code !== 'string') throw new TypeError('String Required.');

    const SOLen = parseInt(code.slice(0, 6), 2);
    const SOSettings = code.slice(6, 6 + (SOLen * 6));
    const SOmap: string[] = [];

    for (let i = 0; i < SOLen; i++) {
        const elm = parseInt(SOSettings.slice(i * 6, (i + 1) * 6), 2);
        const char = settingchar(elm);
        if (char !== null) {
            SOmap.push(char);
        }
    }

    const SOCodes = countSpecialOrder(SOmap.length);
    const HLen = parseInt(code.slice(-3), 2) + 1;

    let p = code.length - 3;
    let k = HLen;
    let j = 0;
    const HSetting: Record<string, string> = {};

    while (k > 0) {
        const tmp = parseInt(code.slice(p - 3, p), 2);
        p -= 3;
        HSetting[j.toString()] = code.slice(p - tmp, p);
        p -= tmp;
        k--;
        j++;
    }

    const HuffmanCoded = code.slice(6 + (SOLen * 6), p);
    const Huffman = new HuffmanCoding();
    const decodedResult = Huffman.decode(HuffmanCoded, HSetting);

    let result = '';
    for (let i = 0; i < decodedResult.length; i += 2) {
        const TC = decodedResult.slice(i, i + 2);
        const index = SOCodes.indexOf(TC);
        if (index !== -1) {
            result += SOmap[index];
        }
    }

    return result;
}