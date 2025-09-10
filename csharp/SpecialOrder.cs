using System;
using System.Collections.Generic;
using System.Linq;

public static class SpecialOrder
{
    public static List<string> CountSpecialOrder(int n)
    {
        var results = new List<(string num, int sum, int d1, int d2)>();
        int m = (int)Math.Ceiling(Math.Sqrt(n));

        for (int i = 0; i < m * m; i++)
        {
            int d1 = i / m;
            int d2 = i % m;
            string numStr = $"{d1}{d2}";
            results.Add((numStr, d1 + d2, d1, d2));
        }

        return results
            .OrderBy(r => r.sum)
            .ThenBy(r => r.d1)
            .ThenBy(r => r.d2)
            .Select(r => r.num)
            .ToList();
    }
}
