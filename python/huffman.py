import heapq

class HuffmanNode:
    def __init__(self, char, frequency):
        self.char = char
        self.frequency = frequency
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.frequency < other.frequency


class HuffmanCoding:
    def __init__(self):
        self.root = None
        self.codes = {}
        self.reverse_codes = {}

    def build_frequency_map(self, text: str) -> dict:
        frequency_map = {}
        for char in text:
            frequency_map[char] = frequency_map.get(char, 0) + 1
        return frequency_map

    def build_huffman_tree(self, frequency_map: dict):
        heap = [HuffmanNode(char, freq) for char, freq in frequency_map.items()]
        heapq.heapify(heap)

        while len(heap) > 1:
            left = heapq.heappop(heap)
            right = heapq.heappop(heap)
            merged = HuffmanNode(None, left.frequency + right.frequency)
            merged.left, merged.right = left, right
            heapq.heappush(heap, merged)

        self.root = heap[0] if heap else None
        return self.root

    def generate_codes(self, node=None, current_code=""):
        if node is None:
            node = self.root
        if node is None:
            return

        if node.char is not None:
            self.codes[node.char] = current_code
            self.reverse_codes[current_code] = node.char
            return

        self.generate_codes(node.left, current_code + "0")
        self.generate_codes(node.right, current_code + "1")

    def encode(self, text: str):
        freq_map = self.build_frequency_map(text)
        self.build_huffman_tree(freq_map)
        self.generate_codes()

        encoded = "".join(self.codes[char] for char in text)
        return {
            "encodedText": encoded,
            "codes": self.codes,
            "frequencyMap": freq_map,
        }

    def decode(self, encoded_text: str, codes=None) -> str:
        if codes and isinstance(codes, dict):
            self.reverse_codes = {code: char for char, code in codes.items()}

        current_code = ""
        decoded = []
        for bit in encoded_text:
            current_code += bit
            if current_code in self.reverse_codes:
                decoded.append(self.reverse_codes[current_code])
                current_code = ""
        return "".join(decoded)
