using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    /// <summary>
    /// Following example shows searching document for QR-Code signature with applying specific options.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>
    public class SearchForQRCodeCustomEncryptionObject
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
        /// Search document for QR-Code signature with applying specific options.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeCustomEncryptionObject : Search document for QR-Code signature with applying specific options.\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_CUSTOM_ENCRYPTION_OBJECT;

            using (Signature signature = new Signature(filePath))
            {
                // create data encryption
                IDataEncryption encryption = new CustomXOREncryption();

                QrCodeSearchOptions options = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true,
                    DataEncryption = encryption
                };
                try
                {
                    // search for signatures in document
                    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                    Console.WriteLine("\nSource document contains following signatures:");
                    foreach (var qrCodeSignature in signatures)
                    {
                        Console.WriteLine("QRCode signature found at page {0} with type {1}.", qrCodeSignature.PageNumber, qrCodeSignature.EncodeType);
                        DocumentSignatureData documentSignatureData = qrCodeSignature.GetData<DocumentSignatureData>();
                        if (documentSignatureData != null)
                        {
                            Console.WriteLine("QRCode signature has DocumentSignatureData object:\n ID = {0}, Author = {1}, Signed = {2}, DataFactor {3}",
                                documentSignatureData.ID, documentSignatureData.Author, documentSignatureData.Signed.ToShortDateString(), documentSignatureData.DataFactor);
                        }
                    }
                }
                catch
                {
                    Helper.WriteError("\nThis example requires license to properly run. " +
                                  "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                                  "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                                  "\nLearn how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
                }
            }
        }
    }
}