using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    /// <summary>
    /// Sign document from stream
    /// </summary>
    class LoadDocumentFromStream
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # LoadDocumentFromStream : Sign document from stream\n");

            string outputFilePath = Path.Combine(Constants.OutputPath, "LoadDocumentFromStream", "signedSample.xlsx");
            using (Stream stream = File.OpenRead(Constants.SAMPLE_SPREADSHEET))
            {
                using (Signature signature = new Signature(stream))
                {
                    QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                    {
                        EncodeType = QrCodeTypes.QR,
                        Left = 100,
                        Top = 100
                    };

                    // sign document to file
                    signature.Sign(outputFilePath, options);
                }
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
