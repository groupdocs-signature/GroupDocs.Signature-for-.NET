using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SearchForQRCodeEncryptedText
    {
        /// <summary>
        /// Search document for encrypted QR-Code signature with applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_ENCRYPTED_TEXT;

            using (Signature signature = new Signature(filePath))
            {
                // setup key and pasphrase
                string key = "1234567890";
                string salt = "1234567890";
                // create data encryption
                IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);

                QrCodeSearchOptions options = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true,
                    PageNumber = 1,
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },

                    // specify special QRCode type to search
                    EncodeType = QrCodeTypes.QR,

                    //
                    DataEncryption = encryption
                };

                // search for signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var qrCodeSignature in signatures)
                {
                    Console.WriteLine("QRCode signature found at page {0} with type {1} and text '{2}'", qrCodeSignature.PageNumber,
                        qrCodeSignature.EncodeType.TypeName, qrCodeSignature.Text);
                }
            }
        }
    }
}