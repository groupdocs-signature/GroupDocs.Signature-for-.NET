using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeEPCObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard EPC/SEPA object.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeEPCObject : Sign document with QR-Code containing standard QR-Code EPC object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeEPC", "QRCodeEPCObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create EPC object
                EPC epc = new EPC()
                {
                    Name = "Sherlock",
                    BIC = "MrSherlockH",
                    IBAN = "US533220010000026001300001480",
                    Amount = 9.99D,
                    Code = "SHRL",
                    Reference = "Private service",
                    Information = "Thanks for help"
                };
                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to EPC instance
                    Data = epc,
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