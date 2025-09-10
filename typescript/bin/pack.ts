export function binary_nbit(e: string | number, n: number): string {
    let num: number;
    if (typeof e === 'string') {
        num = Number(e);
    } else {
        num = e;
    }

    if (num !== undefined && num !== null) {
        let binarynumchar = num.toString(2);
        while (binarynumchar.length < n) {
            binarynumchar = '0' + binarynumchar;
        }
        return binarynumchar;
    } else {
        return '';
    }
}

export function settingcode(char: string): number | null {
    const charcode = char.charCodeAt(0);
    if (charcode === ' '.charCodeAt(0)) {
        return 0;
    } else if (
        charcode >= 'a'.charCodeAt(0) &&
        charcode <= 'z'.charCodeAt(0)
    ) {
        return charcode - 'a'.charCodeAt(0) + 37;
    } else if (
        charcode >= 'A'.charCodeAt(0) &&
        charcode <= 'Z'.charCodeAt(0)
    ) {
        return charcode - 'A'.charCodeAt(0) + 11;
    } else if (
        charcode >= '0'.charCodeAt(0) &&
        charcode <= '9'.charCodeAt(0)
    ) {
        return charcode - '0'.charCodeAt(0) + 1;
    } else {
        return null;
    }
}

export function settingchar(code: number): string | null {
    if (code === 0) {
        return ' ';
    } else if (
        code >= 37 &&
        code <= 62
    ) {
        return String.fromCharCode(code + 60);
    } else if (
        code >= 11 &&
        code <= 36
    ) {
        return String.fromCharCode(code + 54);
    } else if (
        code >= 1 &&
        code <= 10
    ) {
        return String.fromCharCode(code + 47);
    } else {
        return null;
    }
}