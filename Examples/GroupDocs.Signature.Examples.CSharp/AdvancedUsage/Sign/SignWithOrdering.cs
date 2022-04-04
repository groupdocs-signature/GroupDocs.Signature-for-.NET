using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    

    public class SignWithOrdering
    {
        /// <summary>
        /// Sign document with Barcode signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithOrdering : Sign document with ordering the signatures\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_IMAGE;
            string fileName = Path.GetFileName(filePath);
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SignWithOrdering");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create several signatures that intersect

                // # 1 create barcode option with predefined barcode text
                // this options will be on top
                BarcodeSignOptions options1 = new BarcodeSignOptions("12345678")
                {
                    // setup Barcode encoding type
                    EncodeType = BarcodeTypes.Code128,
                    // set signature position
                    Left = 100,
                    Top = 100,
                    Width = 100,
                    Height = 100,
                    ZOrder = 2,
                };

                // # 2 create barcode option with predefined barcode text
                // this options will be bottom
                QrCodeSignOptions options2 = new QrCodeSignOptions("12345678")
                {
                    // setup Barcode encoding type
                    EncodeType = QrCodeTypes.QR,
                    // set signature position
                    Left = 150,
                    Top = 150,
                    ZOrder = 1
                };
                // sign document to file
                List<SignOptions> options = new List<SignOptions>() { options1, options2 };
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}