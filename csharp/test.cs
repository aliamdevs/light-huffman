using System;

class Program
{
    static void Main()
    {
        string text = "Hello World 123 HELLO world 123";
        Console.WriteLine("Original text: " + text);

        var encoded = LightHuffman.LightHuffmanEncode(text);
        string encodedData = (string)encoded["data"];

        Console.WriteLine("\n--- ENCODED ---");
        Console.WriteLine("Encoded data (first 200 bits): " + encodedData.Substring(0, Math.Min(200, encodedData.Length)) + "...");
        Console.WriteLine("Encoded length (bits): " + encodedData.Length);
        Console.WriteLine("Code body size: " + encoded["sizeofcode"]);
        Console.WriteLine("Extra memory size: " + encoded["sizeofmemory"]);

        string decoded = LightHuffman.LightHuffmanDecode(encodedData);

        Console.WriteLine("\n--- DECODED ---");
        Console.WriteLine("Decoded text: " + decoded);

        if (decoded == text)
            Console.WriteLine("\n✅ SUCCESS: Decoded text matches original");
        else
            Console.WriteLine("\n❌ ERROR: Decoded text does not match original");
    }
}
