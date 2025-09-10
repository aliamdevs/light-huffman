from huffman import HuffmanCoding
from pack import settingcode, binary_nbit, settingchar
from special_order import count_special_order


def LightHuffmanEncode(s: str):
    if not isinstance(s, str):
        raise TypeError("String Required.")

    body, numchar, alphabets = "", [], []
    for ch in s:
        if ch not in alphabets and settingcode(ch) is not None:
            alphabets.append(ch)
            numchar.append(0)

    for ch in s:
        if ch in alphabets:
            idx = alphabets.index(ch)
            numchar[idx] += 1

    SOsettings = binary_nbit(len(alphabets), 6)
    paired = sorted(
        [{"char": c, "frequency": f} for c, f in zip(alphabets, numchar)],
        key=lambda x: -x["frequency"],
    )
    spacialordermap = {}
    for p in paired:
        SOsettings += binary_nbit(settingcode(p["char"]), 6)
        spacialordermap[p["char"]] = p["frequency"]

    SOWrite = [p["char"] for p in paired]
    SORead = count_special_order(len(alphabets))

    for ch in s:
        if ch in alphabets:
            body += SORead[SOWrite.index(ch)]

    huffman = HuffmanCoding()
    encoded_result = huffman.encode(body)
    body = encoded_result["encodedText"]

    tmpbase = -1 + int(len(alphabets) ** 0.5) + 1  # ceil(sqrt(n)) - 1
    Huffsetting = binary_nbit(tmpbase, 3)

    for i in range(tmpbase + 1):
        tmp = encoded_result["codes"].get(str(i), "")
        Huffsetting = tmp + binary_nbit(len(tmp), 3) + Huffsetting

    return {
        "data": SOsettings + body + Huffsetting,
        "sizeofcode": len(body),
        "sizeofmemory": len(SOsettings + Huffsetting),
        "huffmanfrequencymap": encoded_result["frequencyMap"],
        "spacialorderfrequencymap": spacialordermap,
    }


def LightHuffmanDecode(code: str):
    if not isinstance(code, str):
        raise TypeError("String Required.")

    SOLen = int(code[:6], 2)
    SOSettings = code[6 : (SOLen * 6) + 6]
    SOmap = [settingchar(int(SOSettings[i * 6 : (i + 1) * 6], 2)) for i in range(SOLen)]
    SOCodes = count_special_order(len(SOmap))

    HLen = int(code[-3:], 2) + 1
    p, k, j, HSetting = len(code) - 3, HLen, 0, {}
    while k > 0:
        tmp = int(code[p - 3 : p], 2)
        p -= 3
        HSetting[str(j)] = code[p - tmp : p]
        p -= tmp
        k -= 1
        j += 1

    HuffmanCoded = code[(SOLen * 6) + 6 : p]
    huffman = HuffmanCoding()
    decodedResult = huffman.decode(HuffmanCoded, HSetting)

    result = []
    for i in range(0, len(decodedResult), 2):
        TC = decodedResult[i : i + 2]
        result.append(SOmap[SOCodes.index(TC)])
    return "".join(result)
