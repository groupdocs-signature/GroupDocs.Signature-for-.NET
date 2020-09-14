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
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                TextVerifyOptions options = new TextVerifyOptions()
                {
                    // specify if all pages should be verified
                    AllPages = false,
                    PagesSetup = new PagesSetup() { FirstPage = true },
                    // specify text pattern
                    Text = "Text signature",
                    //// specify verification text pattern
                    MatchType = TextMatchType.Exact,
                };
                // verify document signatures

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