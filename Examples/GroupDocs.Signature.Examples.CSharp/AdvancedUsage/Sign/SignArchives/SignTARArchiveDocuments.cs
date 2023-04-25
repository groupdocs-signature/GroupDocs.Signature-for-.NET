using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignTARArchiveDocuments
    {
        /// <summary>
        /// Sign TAR Documents with varios signature options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignTARArchiveDocuments : Sign TAR archive document with various signature options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_TAR;
            string fileName = Path.GetFileName(filePath);
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SignTARArchiveDocuments");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create list of signature options
                BarcodeSignOptions bcOptions1 = new BarcodeSignOptions("12345678", BarcodeTypes.Code128)
                {
                    Left = 100,
                    Top = 100
                };
                QrCodeSignOptions qrOptions2 = new QrCodeSignOptions("12345678", QrCodeTypes.QR)
                {
                    Left = 400,
                    Top = 400
                };
                List<SignOptions> listOptions = new List<SignOptions>() { bcOptions1, qrOptions2 };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} documents(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of successfully signed documents:");
                int number = 1;
                foreach (DocumentResultSignature document in signResult.Succeeded)
                {
                    Console.WriteLine($"Document #{number++}: {document.FileName}. Processed: {document.ProcessingTime}, mls");
                }
            }
        }
    }
}