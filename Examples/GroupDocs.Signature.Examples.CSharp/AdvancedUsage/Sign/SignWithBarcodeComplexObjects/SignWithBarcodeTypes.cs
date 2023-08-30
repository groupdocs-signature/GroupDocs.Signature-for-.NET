using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    
    public class SignWithBarcodeTypes
    {
        /// <summary>
        /// Sign document with Barcode signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithBarcodeTypes : Sign document with complex Barcode type signatures\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SignWithBarcodeTypes");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

            using (Signature signature = new Signature(filePath))
            {
                // setup options with GS1CompositeBar 
                var bc_GS1CompositeBar = new BarcodeSignOptions("(01)03212345678906|(21)A1B2C3D4E5F6G7H8", BarcodeTypes.GS1CompositeBar)
                {
                    Top = 100,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                // setup options with HIBCCode39LIC 
                var bc_HIBCLICCode39 = new BarcodeSignOptions("+A99912345/$$52001510X3", BarcodeTypes.HIBCCode39LIC)
                {
                    Top = 300,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                // setup options with HIBCCode128LIC 
                var bc_HIBCLICCode128 = new BarcodeSignOptions("+A99912345/$$52001510X3", BarcodeTypes.HIBCCode128LIC)
                {
                    Top = 500,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                var listOptions = new List<SignOptions>()
                {
                    bc_GS1CompositeBar, bc_HIBCLICCode39, bc_HIBCLICCode128
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BarcodeSignature barcodeSignature in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {barcodeSignature.SignatureType} Id:{barcodeSignature.SignatureId}, Location: {barcodeSignature.Left}x{barcodeSignature.Top}. Size: {barcodeSignature.Width}x{barcodeSignature.Height}");
                    Console.WriteLine($"Location at {barcodeSignature.Left}-{barcodeSignature.Top}. Size is {barcodeSignature.Width}x{barcodeSignature.Height}.");

                    string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{barcodeSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
                    {
                        fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
                    }
                    number++;
                }
            }
        }
    }
}