using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithBarcode
    {
        /// <summary>
        /// Sign document with barcode signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWithBarcode : Sign document with Barcode\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithBarcode", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create barcode option with predefined barcode text
                BarcodeSignOptions options = new BarcodeSignOptions("JohnSmith")
                {
                    // setup Barcode encoding type
                    EncodeType = BarcodeTypes.Code128,

                    // set signature position
                    Left = 50,
                    Top = 150,
                    Width = 200,
                    Height = 50
                };

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}