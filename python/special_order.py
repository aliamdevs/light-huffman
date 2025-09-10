import math

def count_special_order(n: int):
    results = []
    m = math.ceil(math.sqrt(n))
    for i in range(m * m):
        digit1, digit2 = divmod(i, m)
        num_str = f"{digit1}{digit2}"
        results.append((num_str, digit1 + digit2, digit1, digit2))

    results.sort(key=lambda x: (x[1], x[2], x[3]))
    return [r[0] for r in results]
