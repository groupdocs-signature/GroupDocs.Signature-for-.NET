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
            // check if process takes more than 1 second (1000 milliseconds) processing cancellation
            if (args.Ticks > 1000)
            {
                args.Cancel = true;
                Console.WriteLine("Sign progress was cancelled. Time spent {0} mlsec", args.Ticks);
            }
        }

        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            using (Signature signature = new Signature(filePath))
            {
                signature.SearchProgress += OnSearchProgress;

                QrCodeSearchOptions options = new QrCodeSearchOptions(QrCodeTypes.QR)
                {
                    // ...
                };

                // search for signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var QrCodeSignature in signatures)
                {
                    Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", QrCodeSignature.PageNumber, QrCodeSignature.EncodeType, QrCodeSignature.Text);
                }
            }
        }
    }
}