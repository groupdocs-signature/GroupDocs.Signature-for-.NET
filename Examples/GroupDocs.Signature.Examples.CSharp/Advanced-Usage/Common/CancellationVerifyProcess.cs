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
                signature.VerifyProgress += OnVerifyProgress;

                TextVerifyOptions options = new TextVerifyOptions("John Smith")
                {
                    // ...
                };

                // sign document to file
                VerificationResult result = signature.Verify(options);
            }
        }
    }
}