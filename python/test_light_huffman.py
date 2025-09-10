from light_huffman import LightHuffmanEncode, LightHuffmanDecode


def test_light_huffman():
    text = "Hello World 123 HELLO world 123"

    print("Original text:", text)
    print("Original length (chars):", len(text))
    print("Original length (bits if ASCII):", len(text) * 8)

    # Encode
    encoded = LightHuffmanEncode(text)
    encoded_data = encoded["data"]

    print("\n--- ENCODED ---")
    print("Encoded binary string (first 200 bits):", encoded_data[:200], "...")
    print("Encoded length (bits):", len(encoded_data))
    print("Code body size:", encoded["sizeofcode"])
    print("Extra memory size:", encoded["sizeofmemory"])
    print("Huffman Frequency Map:", encoded["huffmanfrequencymap"])
    print("Spacial Order Frequency Map:", encoded["spacialorderfrequencymap"])

    # Decode
    decoded = LightHuffmanDecode(encoded_data)

    print("\n--- DECODED ---")
    print("Decoded text:", decoded)

    # Check correctness
    if decoded == text:
        print("\n✅ SUCCESS: Decoded text matches original")
    else:
        print("\n❌ ERROR: Decoded text does not match original")


if __name__ == "__main__":
    test_light_huffman()
