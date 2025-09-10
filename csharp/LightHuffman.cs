using System;
using System.Collections.Generic;
using System.Linq;

public static class LightHuffman
{
    public static Dictionary<string, object> LightHuffmanEncode(string s)
    {
        if (s == null) throw new ArgumentException("String Required.");

        string body = "";
        var alphabets = new List<char>();
        var numchar = new List<int>();

        foreach (char ch in s)
        {
            if (!alphabets.Contains(ch) && Pack.SettingCode(ch) != null)
            {
                alphabets.Add(ch);
                numchar.Add(0);
            }
        }

        foreach (char ch in s)
        {
            int idx = alphabets.IndexOf(ch);
            if (idx != -1) numchar[idx]++;
        }

        string SOsettings = Pack.BinaryNBit(alphabets.Count, 6);
        var paired = alphabets
            .Select((c, i) => new { Char = c, Frequency = numchar[i] })
            .OrderByDescending(x => x.Frequency)
            .ToList();

        var spacialordermap = new Dictionary<char, int>();
        foreach (var p in paired)
        {
            SOsettings += Pack.BinaryNBit(Pack.SettingCode(p.Char).Value, 6);
            spacialordermap[p.Char] = p.Frequency;
        }

        var SOWrite = paired.Select(p => p.Char).ToList();
        var SORead = SpecialOrder.CountSpecialOrder(alphabets.Count);

        foreach (char ch in s)
        {
            int idx = SOWrite.IndexOf(ch);
            if (idx != -1) body += SORead[idx];
        }

        var huffman = new HuffmanCoding();
        var encodedResult = huffman.Encode(body);
        body = encodedResult.encodedText;

        int tmpbase = (int)Math.Ceiling(Math.Sqrt(alphabets.Count)) - 1;
        string Huffsetting = Pack.BinaryNBit(tmpbase, 3);

        for (int i = 0; i <= tmpbase; i++)
        {
            string tmp = encodedResult.codes.ContainsKey(i.ToString()) ? encodedResult.codes[i.ToString()] : "";
            Huffsetting = tmp + Pack.BinaryNBit(tmp.Length, 3) + Huffsetting;
        }

        return new Dictionary<string, object>
        {
            {"data", SOsettings + body + Huffsetting},
            {"sizeofcode", body.Length},
            {"sizeofmemory", (SOsettings + Huffsetting).Length},
            {"huffmanfrequencymap", encodedResult.frequencyMap},
            {"spacialorderfrequencymap", spacialordermap}
        };
    }

    public static string LightHuffmanDecode(string code)
    {
        if (code == null) throw new ArgumentException("String Required.");

        int SOLen = Convert.ToInt32(code.Substring(0, 6), 2);
        string SOSettings = code.Substring(6, SOLen * 6);

        var SOmap = new List<char>();
        for (int i = 0; i < SOLen; i++)
        {
            int elm = Convert.ToInt32(SOSettings.Substring(i * 6, 6), 2);
            var c = Pack.SettingChar(elm);
            if (c.HasValue) SOmap.Add(c.Value);
        }

        var SOCodes = SpecialOrder.CountSpecialOrder(SOmap.Count);

        int HLen = Convert.ToInt32(code.Substring(code.Length - 3), 2) + 1;
        int p = code.Length - 3, k = HLen, j = 0;
        var HSetting = new Dictionary<string, string>();

        while (k > 0)
        {
            int tmp = Convert.ToInt32(code.Substring(p - 3, 3), 2);
            p -= 3;
            HSetting[j.ToString()] = code.Substring(p - tmp, tmp);
            p -= tmp;
            k--;
            j++;
        }

        string HuffmanCoded = code.Substring((SOLen * 6) + 6, p - ((SOLen * 6) + 6));
        var huffman = new HuffmanCoding();
        string decodedResult = huffman.Decode(HuffmanCoded, HSetting.ToDictionary(x => x.Key[0], x => x.Value));

        string result = "";
        for (int i = 0; i < decodedResult.Length; i += 2)
        {
            string TC = decodedResult.Substring(i, 2);
            int idx = SOCodes.IndexOf(TC);
            result += SOmap[idx];
        }

        return result;
    }
}
