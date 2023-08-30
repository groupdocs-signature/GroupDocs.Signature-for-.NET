using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class Sign7ZIPArchiveDocuments
    {
        /// <summary>
        /// Sign ZIP Documents with various signature options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # Sign7ZIPArchiveDocuments : Sign 7z archive document with various signature options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_7Z;
            string fileName = Path.GetFileName(filePath);
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "Sign7ZIPArchiveDocuments");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create list of signature options
                ImageSignOptions imOptions1 = new ImageSignOptions(Constants.ImageStamp)
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Width = 100,
                    Height = 40,
                    Margin = new Padding(20)
                };
                QrCodeSignOptions qrOptions2 = new QrCodeSignOptions("12345678", QrCodeTypes.QR)
                {
                    Left = 400,
                    Top = 400
                };
                List<SignOptions> listOptions = new List<SignOptions>() { imOptions1, qrOptions2 };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} documents(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of successfully signed documents:");
                int number = 1;
                foreach (DocumentResultSignature document in signResult.Succeeded)
                {
                    Console.WriteLine($"Document #{number++}: {document.FileName}. Processed: {document.ProcessingTime}, mls");
                }
                if (signResult.Failed.Count > 0)
                {
                    Console.WriteLine("\nList of failed documents:");
                    number = 1;
                    foreach (DocumentResultSignature document in signResult.Failed)
                    {
                        Console.WriteLine($"ERROR in Document #{number++}-{document.FileName}: {document.ErrorMessage}, mls");
                    }
                }
            }
        }
    }
}