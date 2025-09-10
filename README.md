# Light-Huffman ![C++](https://img.shields.io/badge/%20-A8B9CC?logo=c&logoColor=white) ![Python](https://img.shields.io/badge/%20-3776AB?logo=python&logoColor=white) ![Javascript](https://img.shields.io/badge/%20-F7DF1E?logo=javascript&logoColor=white) ![Typescript](https://img.shields.io/badge/%20-3178C6?logo=typescript&logoColor=white) ![Apache](https://img.shields.io/badge/%20-D22128?logo=apache&logoColor=white) ![Verson](https://img.shields.io/badge/1.0-darkgreen)

## Introduction

***Hi I'm Ali*** & This Project is **Light** Memory-Based **Huffman** Compression.\
If You Aren't Familiar with [Huffman Codding](https://en.wikipedia.org/wiki/Huffman_coding)

## Huffman Vs Light Huffman 

### The Context :
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.

### Difference in Number of bits : 
***The Huffman Code Size (Without Memmory) →*** 4307 bits .\
***The Light Huffman Code Size (Without Memmory) →*** 4288 bits .

> This Comparison is on a small scale with a difference of 19 bits. This difference is on a larger scale .

### Difference in Memmory : 
***The Huffman Memmory Size →*** Depend on Programing → (Need to Storage The HuffmanCodes)\
***The Light Huffman Code Size (Without Memmory) →*** 245 bits .

> With Light Huffman Final , Comperesion Size is → 4533 bits and **When You Want to Decode You Don't Need Any Thing** .

### Difference in Huffman Tree : 
***The Light Huffman Tree :***


![LightHuffmanTree](https://github.com/aliamdevs/light-huffman/blob/main/temp/LHTREEnew.png)

***The Regular Huffman Tree :***


![RegularHuffmanTree](https://github.com/aliamdevs/light-huffman/blob/main/temp/HTREEnew.png)

### Difference in Speed : 

The Speed of Both Operations in The Same Environment in the C, JS and TS Programming Languages ​​is ***Almost Equal***.

## Algorithm 

> [Check Out The Pseudocode Here.](./PseudoCode)

***Encode :***
- Create A Frequency Map To Use In Special Order.
- Convert To The Base of The Nearest Square Root of Len of Letter Variations **By Special Order**.
- **Special Order** Is a Sorting of Two-Letter bases based on the Sum Of Digits & Then The Digit Alone.
- Convert Frequency Map To A Binary Setting Code.
- Encode With Huffman Now .
- Convert Huffman Codes To A Binary Setting Code .
- Return Result = *FrequencyMapSetting* + *EncodedCode* + *HuffmanCodesSetting* .

***Decode :***
- Split *FrequencyMapSetting* , *EncodedCode* , *HuffmanCodesSetting* Sections .
- Decode *HuffmanCodesSetting* Section .
- Decode *EncodedCode* By Huffman with *HuffmanCodesSetting* .
- Separate The Huffman Decoded Two By Two .
- Decode *FrequencyMapSetting* Section .
- Decode By **Special Order** with *FrequencyMapSetting*
- Return The ***Encoded Text***

## Usage

### 1. UART / USART Data Transmission
- Send compressed text over UART/USART between microcontrollers (e.g., ATmega32 → ATmega32).
- Instead of sending raw ASCII (8 bits per char), send compressed 01 stream.
- Benefit: Less bandwidth, faster transmission.

```
// Example: Sending compressed data via USART
String message = "Today is a sunny day. Let's go out and play, play, play! Today is a sunny day. Come and play with me! Sunny, sunny, sunny, sunny.";
Compressed data = LightHuffmanEncode(message);
USART_Send(data.bits);  // fewer bytes than original
```

- Raw ASCII = 129 chars × 8 bits = 1032 bits.
- LightHuffman Encoded = 615 bits.
- Transmission time reduced by ~40%.

### 2. ATmega32 / AVR Microcontrollers

- Store *LARGE STATIC TEXTs* (**logs**, **lookup tables**,**dictionary data** ) in Flash/EEPROM.
- Retrieve and decode on demand with very little RAM usage.
- Benefit: Fit more data into limited 1–2 KB SRAM / 32 KB Flash.

```
// Example: Store compressed help menu in EEPROM
addr = storeBits(encodedData, 0);
retrieved = loadBits(0, encodedLength);
decoded = LightHuffmanDecode(retrieved);
LCD_Print(decoded);
```

### 3. Storage of Large Text

- Compress sensor logs, error messages, or documents before saving to SD card / Flash.
- Great for IoT devices where storage and transmission are expensive.
- Benefit: Up to ~40% less memory usage.

### 4. Wireless / IoT Devices

- Transmit compressed payloads via LoRa, NRF24L01, ZigBee, or Bluetooth Low Energy.
- Smaller packets → lower latency & less power consumption.

### 5. Firmware Assets Compression

- Store large strings (menus, debug messages, JSON configs) compressed in firmware.
- Decompress only when needed.
- Benefit: Saves program memory, especially in ATmega32, STM32, ESP32, PIC MCUs.

## Faults 
 
 - In Encoding Small Texts By ***Light Huffman*** Might The Result Don't Reduce Size Compare with Raw ASCII Even With Less Repetition Might Increase The Size . In This Case The Regular Huffman Works Better .

 - This Code Support 63 Char Contain ***Space , A-Z , a-z , 0-9*** & Symbols Will Be Missed After Encode & Decode . In This Case That You Use A Lot Of Symbols & You Can't Convert it To Letters , Regular Huffman is Better

### Of Course, This Project is Version ***1.0*** and I Hope to Fix these Shortcomings in Future, Higher Versions.
### Thank you for your attention to this repository.
## License

[Apache 2.0 License](./LICENSE)