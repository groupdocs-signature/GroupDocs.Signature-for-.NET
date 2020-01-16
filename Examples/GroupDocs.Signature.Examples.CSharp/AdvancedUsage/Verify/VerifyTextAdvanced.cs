using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyTextAdvanced
    {
        /// <summary>
        /// Verify document with Text signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyTextAdvanced : Verify document with Text signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                TextVerifyOptions options = new TextVerifyOptions()
                {
                    // specify if all pages shoudl be verified
                    AllPages = false,
                    PagesSetup = new PagesSetup() { FirstPage = false, LastPage = true, OddPages = false, EvenPages = true },
                    // specify text pattern
                    Text = "John",
                    // specify verification text pattern
                    MatchType = TextMatchType.Contains,
                    // specify types of QR code to verify
                    SignatureImplementation = TextSignatureImplementation.Stamp,
                    // specify if form fielsd should be verified
                    FormTextFieldTitle = "Sample",
                    FormTextFieldType = FormTextFieldType.RichText
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