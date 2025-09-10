using System;

public static class Pack
{
    public static string BinaryNBit(int num, int n)
    {
        return Convert.ToString(num, 2).PadLeft(n, '0');
    }

    public static int? SettingCode(char c)
    {
        if (c == ' ') return 0;
        if (c >= 'a' && c <= 'z') return c - 'a' + 37;
        if (c >= 'A' && c <= 'Z') return c - 'A' + 11;
        if (c >= '0' && c <= '9') return c - '0' + 1;
        return null;
    }

    public static char? SettingChar(int code)
    {
        if (code == 0) return ' ';
        if (code >= 37 && code <= 62) return (char)(code + 60);
        if (code >= 11 && code <= 36) return (char)(code + 54);
        if (code >= 1 && code <= 10) return (char)(code + 47);
        return null;
    }
}
