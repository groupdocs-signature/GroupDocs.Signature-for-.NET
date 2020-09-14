using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigital
    {
        /// <summary>
        /// Sign document with digital signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWithDigital : Sign document with digital certificate\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigital", fileName);

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // optional: setup image file path
                    ImageFilePath = imagePath,
                    //
                    Left = 50,
                    Top = 50,
                    PageNumber = 1,
                    Password = "1234567890"
                };

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
