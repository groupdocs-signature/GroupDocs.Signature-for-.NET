using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SubscribeSearchEvents
    {
        /// <summary>
        /// Defines on start process event handler
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSearchStarted(Signature sender, ProcessStartEventArgs args)
        {
            Console.WriteLine("Search process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
        }

        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSearchProgress(Signature sender, ProcessProgressEventArgs args)
        {
            Console.WriteLine("Search progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
        }

        /// <summary>
        /// Defines on completed event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSearchCompleted(Signature sender, ProcessCompleteEventArgs args)
        {
            Console.WriteLine("Search process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
        }

        /// <summary>
        /// Search document for barcode signatures and subscribe for events
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SubscribeSearchEvents : Search document for barcode signatures and subscribe for events\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                signature.SearchStarted += OnSearchStarted;
                signature.SearchProgress += OnSearchProgress;
                signature.SearchCompleted += OnSearchCompleted;

                BarcodeSearchOptions options = new BarcodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    PageNumber = 1,
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },

                    // specify text match type
                    MatchType = TextMatchType.Contains,
                    // specify text pattern to search
                    Text = "12345"
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