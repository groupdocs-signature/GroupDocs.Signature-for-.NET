using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeEventObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard Event object.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeEventObject : Sign document with QR-Code containing standard QR-Code Event object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeEvent", "QRCodeEventObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create Event object
                Event evnt = new Event()
                {
                    Title = "GTM(9-00)",
                    Description = "General Team Meeting",
                    Location = "Conference-Room",
                    StartDate = DateTime.Now.Date.AddDays(1).AddHours(9),
                    EndDate = DateTime.Now.Date.AddDays(1).AddHours(9).AddMinutes(30)
                };
                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to Event instance
                    Data = evnt,
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