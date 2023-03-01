using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithQRCodeTypes
    {
        /// <summary>
        /// Sign document with various QR-Code types.
        /// This example demonstrates how to pass specific text format for various QR-code types.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeTypes : Sign document with specific QR-Code types\n");

            // The path to the documents directory.
            string sourceFilePath = Constants.SAMPLE_PDF;
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SignWithQRCodeTypes");
            string destinFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeTypes", "SignWithQRCodeTypes.pdf");

            using (Signature signature = new Signature(sourceFilePath))
            {

                // create HIBC LIC QR-Code options
                var hibcLic_QR = new QrCodeSignOptions("A123PROD30917/75#422011907#GP293", QrCodeTypes.HIBCLICQR)
                {
                    Left = 100,
                    Top = 100,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                // create HIBC LIC Aztec Code options
                var hibcLic_AZ = new QrCodeSignOptions("A123PROD30917/75#422011907#GP293", QrCodeTypes.HIBCLICAztec)
                {
                    Left = 400,
                    Top = 100,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                // create HIBC LIC Aztec Code options
                var hibcLic_DM = new QrCodeSignOptions("A123PROD30917/75#422011907#GP293", QrCodeTypes.HIBCLICDataMatrix)
                {
                    Left = 200,
                    Top = 300,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };

                var listOptions = new List<SignOptions>()
                {
                    hibcLic_QR, hibcLic_AZ, hibcLic_DM
                };
                // sign document to file with list of all specific QR-Codes
                var signResult = signature.Sign(destinFilePath, listOptions);

                Console.WriteLine("\nSource document signed successfully.\nFile saved at " + destinFilePath);

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (QrCodeSignature qrSignature in signResult.Succeeded)
                {
                    string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{qrSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
                    {
                        fs.Write(qrSignature.Content, 0, qrSignature.Content.Length);
                    }
                    number++;
                }
            }
        }
    }
}