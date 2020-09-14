using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SubscribeVerifyEvents
    {
        /// <summary>
        /// Defines on start process event handler
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnVerifyStarted(Signature sender, ProcessStartEventArgs args)
        {
            Console.WriteLine("Verify process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
        }

        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnVerifyProgress(Signature sender, ProcessProgressEventArgs args)
        {
            Console.WriteLine("Verify progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
        }

        /// <summary>
        /// Defines on completed event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnVerifyCompleted(Signature sender, ProcessCompleteEventArgs args)
        {
            Console.WriteLine("Verify process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
        }

        /// <summary>
        /// Verify document with text signature applying specific options and subscribe for events
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SubscribeVerifyEvents : Verify document with text signature applying specific options and subscribe for events\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                signature.VerifyStarted += OnVerifyStarted;
                signature.VerifyProgress += OnVerifyProgress;
                signature.VerifyCompleted += OnVerifyCompleted;

                TextVerifyOptions options = new TextVerifyOptions("Text signature")
                {
                    AllPages = false,
                    PageNumber = 1
                };

                // verify document
                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!\n");
                }
                else
                {
                    Helper.WriteError("\nDocument failed verification process.\n");
                }
            }
        }
    }
}