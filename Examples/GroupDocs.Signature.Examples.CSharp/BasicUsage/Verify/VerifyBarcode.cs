using System;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyBarcode
    {
        /// <summary>
        /// Verify document with Barcode signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # VerifyBarcode : Verify document with Barcode signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                BarcodeVerifyOptions options = new BarcodeVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    Text = "John",
                    MatchType = TextMatchType.Contains
                };
                // verify document signatures

                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine($"\nDocument {filePath} was verified successfully!");
                }
                else
                {
                    Console.WriteLine($"\nDocument {filePath} failed verification process.");
                }
            }
        }
    }
}