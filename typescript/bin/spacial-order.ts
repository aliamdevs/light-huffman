interface SpecialOrderResult {
    num: string;
    sum: number;
    digit1: number;
    digit2: number;
}

export default function countSpecialOrder(n: number): string[] {
    const results: SpecialOrderResult[] = [];
    const m = Math.ceil(Math.sqrt(n));

    for (let i = 0; i < m * m; i++) {
        const digit1 = Math.floor(i / m);
        const digit2 = i % m;
        const numStr = digit1.toString() + digit2.toString();
        const sum = digit1 + digit2;

        results.push({ num: numStr, sum: sum, digit1: digit1, digit2: digit2 });
    }

    results.sort((a, b) => {
        if (a.sum !== b.sum) {
            return a.sum - b.sum;
        }
        if (a.digit1 !== b.digit1) {
            return a.digit1 - b.digit1;
        }
        return a.digit2 - b.digit2;
    });

    return results.map(item => item.num);
}
