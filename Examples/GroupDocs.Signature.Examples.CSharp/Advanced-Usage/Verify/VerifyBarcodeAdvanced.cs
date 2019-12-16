using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class VerifyBarcodeAdvanced
    {
        /// <summary>
        /// Verify document with Barcode signature with applying specific options
        /// </summary>
        public static void Run()
        {
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
                    Console.WriteLine("\nDocument was verified successfully!");
                }
                else
                {
                    Console.WriteLine("\nDocument failed verification process.");
                }
            }
        }
    }
}