using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithResultAnalysis
    {
        /// <summary>
        /// Sign document and result analysis
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithResultAnalysis : Sign document and result analysis\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCode", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create QRCode option with predefined QRCode text
                QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                {
                    // setup QRCode encoding type
                    EncodeType = QrCodeTypes.QR,
                    // set location as right down corner 
                    HorizontalAlignment = HorizontalAlignment.Right,
                    VerticalAlignment = VerticalAlignment.Bottom
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"Sign-process was executed for {signResult.ProcessingTime} mls");
                Console.WriteLine($"Input document size {signResult.SourceDocumentSize} bytes");
                Console.WriteLine($"Output document size {signResult.DestinDocumentSize} bytes");
                Console.WriteLine($"Total processed signatures {signResult.TotalSignatures}");
                if (signResult.Failed.Count == 0)
                {
                    Console.WriteLine("\nAll signatures were successfully created!");
                }
                else
                {
                    Console.WriteLine($"Successfully created signatures : {signResult.Succeeded.Count}");
                    Helper.WriteError($"Failed signatures : {signResult.Failed.Count}");
                }
                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}