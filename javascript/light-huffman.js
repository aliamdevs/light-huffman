/**
 * Light Memory-Based Huffman Compression
 * LightHuffman Compression
 * Version 1.0
 * @param {string} str - The String You Want To Encode
 * @param {string} code - The Code You Want To Decode
 * @returns {string} The Encoded String
 * @throws {Error} If str is not String
 * @example
 * // Returns "011101010101010101010 ... "
 * LightHuffmanEncode('Lorem ipsum dolor sit amet ... ');
 * @example
 * // Returns "Lorem ipsum dolor sit amet ... "
 * LightHuffmanEncode('011101010101010101010 ... ');
 */

const HuffmanCoding = require('./bin/huffman.js');
const {settingcode ,binary_nbit, settingchar } = require('./bin/pack.js');
const countSpecialOrder = require('./bin/spacial-order.js');

/**
 * @property {string} str - The String You Want To Encode
 */

function LightHuffmanEncode (str) {
  if (typeof str !== 'string') throw TypeError('String Required .');

  let body = '', numchar = [] , alphabets = [] , SOsettings = '' , Huffsetting = '';
  for (let i = 0; i < str.length; i++) {
      const elm = str[i];
      if(!alphabets.includes(elm) && settingcode(elm) !== null){
          alphabets.push(elm);
          numchar.push(0);
      }
  }
  for (let i = 0; i < str.length; i++) {
      const elm = str[i];
      if(alphabets.indexOf(elm) != -1){
          numchar[alphabets.indexOf(elm)] = numchar[alphabets.indexOf(elm)] + 1;
      }
  }
  SOsettings = binary_nbit(alphabets.length , 6);
  const paired = alphabets.map((char, index) => {
    return { char, frequency: numchar[index] };
  });
  paired.sort((a, b) => b.frequency - a.frequency);
  let spacialordermap = {};
  paired.forEach(elm => {
      SOsettings += binary_nbit(settingcode(elm.char) , 6);
      spacialordermap[elm.char] = elm.frequency;
  });

  const SOWrite = paired.map((x)=>x.char);
  const SORead = countSpecialOrder(alphabets.length);
  for (let i = 0; i < str.length; i++) {
      const elm = str[i];
      if(alphabets.indexOf(elm) != -1){
          body = body + SORead[SOWrite.indexOf(elm)];
      }
  }
  
  const Huffman = new HuffmanCoding();
  const encodedResult = Huffman.encode(body);
  body = encodedResult.encodedText;
  const tmpbase = Math.ceil(Math.sqrt(alphabets.length))
  Huffsetting = binary_nbit(tmpbase-1 , 3);
  for (let i = 0; i < tmpbase; i++) {
    const tmp = encodedResult.codes[i.toString()];
    Huffsetting = tmp + binary_nbit(tmp.length,3) + Huffsetting;
  }
  // console.log(paired);
  
  return {
    data: SOsettings + body + Huffsetting ,
    sizeofcode: body.length,
    sizeofmemory : (SOsettings + Huffsetting).length,
    huffmanfrequencymap : encodedResult.frequencyMap,
    spacialorderfrequencymap : spacialordermap
  }
}

/**
 * @property {string} code - The Code You Want To Decode
 */

function LightHuffmanDecode(code){
  if (typeof code !== 'string') throw TypeError('String Required .');

  const SOLen = parseInt( code.slice(0,6), 2 );
  const SOSettings = code.slice(6,(SOLen*6)+7);
  let SOmap = [];
  for (let i = 0; i < SOLen; i++) {
    const elm = parseInt(SOSettings.slice((i*6),((i+1)*6)),2);
    SOmap.push(settingchar(elm))
  }
  const SOCodes = countSpecialOrder(SOmap.length);

  const HLen = parseInt(code.slice(-3) , 2) + 1;
  let p = code.length - 3 , k = HLen ,j = 0, HSetting = {};  
  while(k>0){
    const tmp = parseInt(code.slice(p - 3 , p) , 2);
    p = p - 3;
    HSetting[j.toString()] = code.slice(p - tmp , p);
    p = p - tmp;
    k--;
    j++;
  }

  const HuffmanCoded = code.slice((SOLen*6)+6 , p);
  const Huffman = new HuffmanCoding();
  const decodedResult = Huffman.decode(HuffmanCoded , HSetting);

  let result = ''
  for (let i = 0; i < decodedResult.length / 2; i++) {
    const TC = decodedResult.slice((i*2),((i+1)*2));
    result += SOmap[SOCodes.indexOf(TC)]
  }

  return result;
}

module.exports = {
  LightHuffmanEncode,
  LightHuffmanDecode
}