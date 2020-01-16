using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class SubscribeSignEvents
    {
        /// <summary>
        /// Defines on start process event handler
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSignStarted(Signature sender, ProcessStartEventArgs args)
        {
            Console.WriteLine("Sign process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
        }

        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSignProgress(Signature sender, ProcessProgressEventArgs args)
        {
            Console.WriteLine("Sign progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
        }

        /// <summary>
        /// Defines on completed event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSignCompleted(Signature sender, ProcessCompleteEventArgs args)
        {
            Console.WriteLine("Sign process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
        }

        /// <summary>
        /// Sign document with text signature and subscribe for events
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SubscribeSignEvents : Sign document with text signature and subscribe for events\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextEvents", fileName);

            using (Signature signature = new Signature(filePath))
            {
                signature.SignStarted += OnSignStarted;
                signature.SignProgress += OnSignProgress;
                signature.SignCompleted += OnSignCompleted;

                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set signature position 
                    Left = 100,
                    Top = 100
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine($"\nSource document signed successfully.\nFile saved at {outputFilePath}\n");
        }
    }
}