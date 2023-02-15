using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class CancellationVerifyProcess
    {
        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnVerifyProgress(Signature sender, ProcessProgressEventArgs args)
        {
            // check if process takes more than 0.1 second (100 milliseconds) processing cancellation
            if (args.Ticks > 350)
            {
                args.Cancel = true;
                Console.WriteLine("Sign progress was canceled. Time spent {0} mlsec", args.Ticks);
            }
        }

        /// <summary>
        /// Verify document and cancel process
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # CancellationVerifyProcess : Verify document and cancel process\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                signature.VerifyProgress += OnVerifyProgress;

                TextVerifyOptions options = new TextVerifyOptions("Text signature")
                {
                    // ...
                };

                // sign document to file
                VerificationResult result = signature.Verify(options);

                if (result.IsValid)
                {
                    Helper.WriteError("\nDocument verification was not canceled!\n");
                }
                else
                {
                    Console.WriteLine("\nDocument verification was canceled successfully!\n");
                }
            }
        }
    }
}