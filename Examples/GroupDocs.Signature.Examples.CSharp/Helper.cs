using System;
using System.Collections.Generic;
using System.Text;

namespace GroupDocs.Signature.Examples.CSharp
{
    public static class Helper
    {
        public static void WriteError(string text){
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(text);
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}
