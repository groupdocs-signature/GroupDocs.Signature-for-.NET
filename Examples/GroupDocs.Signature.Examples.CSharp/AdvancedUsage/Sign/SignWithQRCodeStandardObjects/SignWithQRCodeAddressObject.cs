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

    public class SignWithQRCodeAddressObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard Address object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeAddress : Sign document with QR-Code containing standard Address object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeAddress", "QRCodeAddressObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create Address object
                Address address = new Address()
                {
                    Street = "221B Baker Street",
                    City = "London",
                    State = "NW",
                    ZIP = "NW16XE",
                    Country = "England"
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to Address instance
                    Data = address,
                    // set right bottom corner
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Center,
                    Margin = new Padding(10),
                    Width = 100,
                    Height = 100,
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}