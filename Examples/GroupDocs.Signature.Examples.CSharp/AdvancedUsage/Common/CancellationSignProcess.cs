using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class CancellationSignProcess
    {
        /// <summary>
        /// Defines on progress event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void OnSignProgress(Signature sender, ProcessProgressEventArgs args)
        {
            // check if process takes more than 0.1 second (100 milliseconds) processing cancellation
            if (args.Ticks > 100)
            {
                args.Cancel = true;
                Console.WriteLine("Sign progress was canceled. Time spent {0} mlsec", args.Ticks);
            }            
        }

        /// <summary>
        /// Sign document and cancel process
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # CancellationSignProcess : Sign document and cancel process\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextEvents", fileName);

            using (Signature signature = new Signature(filePath))
            {         
                signature.SignProgress += OnSignProgress;             

                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // ...
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}