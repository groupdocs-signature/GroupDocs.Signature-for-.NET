using System;
using System.IO;
using System.Net;


namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    /// <summary>
    /// This example demonstrates how to render document from stream.
    /// </summary>
    class LoadDocumentFromStream
    {
        public static void Run()
        {
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignFromStream", "signedSample.pdf");
            using (Stream stream = File.OpenRead(Constants.SAMPLE_PDF))
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
