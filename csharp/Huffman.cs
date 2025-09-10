using System;
using System.Collections.Generic;
using System.Linq;

public class HuffmanNode : IComparable<HuffmanNode>
{
    public char? Char { get; set; }
    public int Frequency { get; set; }
    public HuffmanNode Left { get; set; }
    public HuffmanNode Right { get; set; }

    public HuffmanNode(char? ch, int freq)
    {
        Char = ch;
        Frequency = freq;
    }

    public int CompareTo(HuffmanNode other)
    {
        return Frequency.CompareTo(other.Frequency);
    }
}

public class HuffmanCoding
{
    private HuffmanNode Root;
    public Dictionary<char, string> Codes = new();
    public Dictionary<string, char> ReverseCodes = new();

    private Dictionary<char, int> BuildFrequencyMap(string text)
    {
        var freqMap = new Dictionary<char, int>();
        foreach (char c in text)
        {
            if (!freqMap.ContainsKey(c))
                freqMap[c] = 0;
            freqMap[c]++;
        }
        return freqMap;
    }

    private HuffmanNode BuildHuffmanTree(Dictionary<char, int> freqMap)
    {
        var heap = new List<HuffmanNode>();
        foreach (var kv in freqMap)
            heap.Add(new HuffmanNode(kv.Key, kv.Value));

        heap.Sort();

        while (heap.Count > 1)
        {
            heap.Sort();
            var left = heap[0];
            var right = heap[1];
            heap.RemoveRange(0, 2);

            var merged = new HuffmanNode(null, left.Frequency + right.Frequency)
            {
                Left = left,
                Right = right
            };

            heap.Add(merged);
        }

        Root = heap[0];
        return Root;
    }

    private void GenerateCodes(HuffmanNode node, string currentCode)
    {
        if (node == null) return;

        if (node.Char != null)
        {
            Codes[node.Char.Value] = currentCode;
            ReverseCodes[currentCode] = node.Char.Value;
            return;
        }

        GenerateCodes(node.Left, currentCode + "0");
        GenerateCodes(node.Right, currentCode + "1");
    }

    public (string encodedText, Dictionary<char, string> codes, Dictionary<char, int> frequencyMap) Encode(string text)
    {
        var freqMap = BuildFrequencyMap(text);
        BuildHuffmanTree(freqMap);
        GenerateCodes(Root, "");

        var encoded = string.Concat(text.Select(c => Codes[c]));

        return (encoded, Codes, freqMap);
    }

    public string Decode(string encodedText, Dictionary<char, string> codes = null)
    {
        if (codes != null)
        {
            ReverseCodes.Clear();
            foreach (var kv in codes)
                ReverseCodes[kv.Value] = kv.Key;
        }

        string currentCode = "";
        var decoded = new List<char>();

        foreach (char bit in encodedText)
        {
            currentCode += bit;
            if (ReverseCodes.ContainsKey(currentCode))
            {
                decoded.Add(ReverseCodes[currentCode]);
                currentCode = "";
            }
        }

        return new string(decoded.ToArray());
    }
}
