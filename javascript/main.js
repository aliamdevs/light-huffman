const { LightHuffmanEncode } = require("./Light-huffman");
const t= "Today is a sunny day. Let's go out and play, play, play! Today is a sunny day. Come and play with me! Sunny, sunny, sunny, sunny."
const e = LightHuffmanEncode(t);
console.log(t.length );

console.log('====================================');
console.log(e.data.length);
console.log('====================================');