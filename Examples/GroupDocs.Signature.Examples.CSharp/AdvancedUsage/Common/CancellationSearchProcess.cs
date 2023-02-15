using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class CancellationSearchProcess
    {
        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSearchProgress(Signature sender, ProcessProgressEventArgs args)
        {
            // check if process takes more than 0.1 second (100 milliseconds) processing cancellation
            if (args.Ticks > 100)
            {
                args.Cancel = true;
                Console.WriteLine("Sign progress was canceled. Time spent {0} mlsec", args.Ticks);
            }
        }

        /// <summary>
        /// Search document and cancel process
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # CancellationSearchProcess : Search document and cancel process\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                signature.SearchProgress += OnSearchProgress;

                TextSearchOptions options = new TextSearchOptions("Text signature")
                {
                    // ...
                };

                // search for signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var textSignature in signatures)
                {
                    Console.WriteLine("Text signature found at page {0} with text {1}", textSignature.PageNumber, textSignature.Text);
                }
            }
        }
    }
}