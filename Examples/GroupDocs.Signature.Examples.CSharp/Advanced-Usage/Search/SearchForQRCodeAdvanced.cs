using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class SearchForQRCodeAdvanced
    {
        /// <summary>
        /// Search document for QR-Code signature with applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                QrCodeSearchOptions options = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    PageNumber = 1,
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },

                    // specify special QRCode type to search
                    EncodeType = QrCodeTypes.QR,
                    // specify text match type
                    MatchType = TextMatchType.Exact,
                    // specify text pattern to search
                    Text = "12345678"
                };

                // search for signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var QrCodeSignature in signatures)
                {
                    Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", 
                        QrCodeSignature.PageNumber, QrCodeSignature.EncodeType, QrCodeSignature.Text);
                }
            }
        }
    }
}