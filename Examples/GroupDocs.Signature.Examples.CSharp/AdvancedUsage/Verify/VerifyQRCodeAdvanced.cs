using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    /// <summary>
    /// Following example shows document verification for QR-Code signature with applying specific options.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>

    public class VerifyQRCodeAdvanced
    {
        /// <summary>
        /// Verify document with QR-Code signature with applying specific options
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyQRCodeAdvanced : Verify document with QR-Code signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                QrCodeVerifyOptions options = new QrCodeVerifyOptions()
                {
                    // specify if all pages should be verified
                    AllPages = false,
                    PagesSetup = new PagesSetup() { FirstPage = true },
                    // specify text pattern
                    Text = "John",
                    // specify verification text pattern
                    MatchType = TextMatchType.Contains
                };
                // Verify document signatures
                // For evaluation version this verification will fail
                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                }
                else
                {
                    Helper.WriteError("\nDocument failed verification process.");
                }
            }
        }
    }
}