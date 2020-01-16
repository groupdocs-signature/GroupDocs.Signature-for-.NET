using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SaveDocumentWithPassword
    {
        /// <summary>
        /// Sign document and make it password-protected
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SaveDocumentWithPassword : Sign document and make it password-protected\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SaveSignedWithPassword", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create QRCode option with predefined QRCode text
                QrCodeSignOptions signOptions = new QrCodeSignOptions("JohnSmith")
                {
                    // setup QRCode encoding type
                    EncodeType = QrCodeTypes.QR,

                    // set signature position
                    Left = 100,
                    Top = 100
                };

                SaveOptions saveOptions = new SaveOptions()
                {
                    Password = "1234567890",
                    UseOriginalPassword = false
                };
                // sign document to file
                SignResult result = signature.Sign(outputFilePath, signOptions, saveOptions);
                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}