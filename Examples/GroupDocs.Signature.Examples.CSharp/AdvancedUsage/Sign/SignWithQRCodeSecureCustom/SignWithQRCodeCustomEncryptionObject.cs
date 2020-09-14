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

    public class SignWithQRCodeCustomEncryptionObject
    {
        // Define custom data signature class
        private class DocumentSignatureData
        {
            [Format("SignID")]
            public string ID { get; set; }

            [Format("SAuth")]
            public string Author { get; set; }

            [Format("SDate", "yyyy-MM-dd")]
            public DateTime Signed { get; set; }

            [Format("SDFact", "N2")]
            public decimal DataFactor { get; set; }

            [SkipSerialization]
            public string Comments { get; set; }
        }

        /// <summary>
        /// Sign document with QR-Code signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeSecureCustom", "QRCodeCustomEncryptionObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create data encryption
                IDataEncryption encryption = new CustomXOREncryption();

                // create custom object
                DocumentSignatureData documentSignatureData = new DocumentSignatureData()
                {
                    ID = Guid.NewGuid().ToString(),
                    Author = Environment.UserName,
                    Signed = DateTime.Now,
                    DataFactor = 11.22M
                };

                // setup QR-Code options
                QrCodeSignOptions options = new QrCodeSignOptions()
                {
                    // set custom object to serialize to QR Code
                    Data = documentSignatureData,
                    // QR-code type
                    EncodeType = QrCodeTypes.QR,
                    // specify serialization encryption
                    DataEncryption = encryption,
                    // locate and align signature
                    Height = 100,
                    Width = 100,
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Margin = new Padding() { Right = 10, Bottom = 10 }
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}