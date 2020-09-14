using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeEncryptedText
    {
        /// <summary>
        /// Sign document with QR-Code signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeSecureCustom", "QRCodeEncryptedText.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // setup key and passphrase
                string key = "1234567890";
                string salt = "1234567890";
                // create data encryption
                IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);

                // setup QR-Code options
                QrCodeSignOptions options = new QrCodeSignOptions()
                {
                    //setup text to be secured
                    Text = "This is private text to be secured.",
                    EncodeType = QrCodeTypes.QR,
                    // specify text encryption
                    DataEncryption = encryption,
                    // locate and align signature
                    Height = 100,
                    Width = 100,
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Margin = new Padding() {  Right = 10, Bottom = 10}
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}