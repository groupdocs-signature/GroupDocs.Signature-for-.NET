using GroupDocs.Signature.Options;
using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.QuickStart
{
    class HelloWorld
    {
        /// <summary>
        /// Basic example of GroupDocs.Signature usage
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Quick Start] # HelloWorld : Basic example of GroupDocs.Signature usage\n");
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "HelloWorld", fileName);

            // Sign document with text signature.
            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions textSignOptions = new TextSignOptions("Hello world!");
                signature.Sign(outputFilePath, textSignOptions);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
