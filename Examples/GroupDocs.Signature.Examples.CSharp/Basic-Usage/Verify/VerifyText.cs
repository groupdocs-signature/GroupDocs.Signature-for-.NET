using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class VerifyText
    {
        /// <summary>
        /// Verify document with Text signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                TextVerifyOptions options = new TextVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    SignatureImplementation = TextSignatureImplementation.Stamp,
                    Text = "John",
                    MatchType = TextMatchType.Contains
                };
                // verify document signatures

                VerificationResult result = signature.Verify(options);
                if(result.IsValid)
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