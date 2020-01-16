using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForBarcodeAdvanced
    {
        /// <summary>
        /// Search document for Barcode signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForBarcodeAdvanced : Search document for Barcode signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                BarcodeSearchOptions options = new BarcodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    // single page number
                    PageNumber = 1,
                    // setup extended search in pages setup
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },

                    // specify special barcode type to search
                    EncodeType = BarcodeTypes.Code39Standard,
                    // specify text match type
                    MatchType = TextMatchType.Contains,
                    // specify text pattern to search
                    Text = "12345678"
                };

                // search for signatures in document
                List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var barcodeSignature in signatures)
                {
                    Console.WriteLine("Barcode signature found at page {0} with type {1} and text {2}", barcodeSignature.PageNumber, barcodeSignature.EncodeType, barcodeSignature.Text);
                }
            }
        }
    }
}