def binary_nbit(e, n: int) -> str:
    num = int(e)
    binary = bin(num)[2:]
    return binary.zfill(n)


def settingcode(char: str):
    charcode = ord(char)
    if char == " ":
        return 0
    elif "a" <= char <= "z":
        return charcode - ord("a") + 37
    elif "A" <= char <= "Z":
        return charcode - ord("A") + 11
    elif "0" <= char <= "9":
        return charcode - ord("0") + 1
    else:
        return None


def settingchar(code: int):
    if code == 0:
        return " "
    elif 37 <= code <= 62:
        return chr(code + 60)
    elif 11 <= code <= 36:
        return chr(code + 54)
    elif 1 <= code <= 10:
        return chr(code + 47)
    else:
        return None
