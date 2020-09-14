using System;
using System.IO;
using System.Text;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeEmailObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard Email object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeEmail : Sign document with QR-Code containing standard Email object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeEmail", "QRCodeEmailObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create Email object
                Email email = new Email()
                {
                    Address = "sherlock@holmes.com",
                    Subject = "Very important e-mail",
                    Body = "Hello, Watson. Reach me ASAP!"
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to Email instance
                    Data = email,
                    // set right bottom corner
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Center,
                    Width = 100,
                    Height = 100,
                    Margin = new Padding(10)
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}