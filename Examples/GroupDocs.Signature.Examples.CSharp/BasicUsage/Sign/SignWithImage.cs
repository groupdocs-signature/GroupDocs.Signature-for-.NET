using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithImage
    {
        /// <summary>
        /// Sign document with image signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWithImage : Sign document with image\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithImage", fileName);

            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions options = new ImageSignOptions(imagePath)
                {
                    // set signature position
                    Left = 50,
                    Top = 50,
                    AllPages = true
                };

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
