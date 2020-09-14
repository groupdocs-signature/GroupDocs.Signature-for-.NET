using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    /// <summary>
    /// Sign document from local disk
    /// </summary>
    public class LoadDocumentFromLocalDisk
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # LoadDocumentFromLocalDisk : Sign document from local disk\n");

            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "LoadDocumentFromLocalDisk", fileName);
            //
            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {                    
                };
                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}