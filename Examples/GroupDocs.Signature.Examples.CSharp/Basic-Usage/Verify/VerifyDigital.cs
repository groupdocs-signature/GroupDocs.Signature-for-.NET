using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class VerifyDigital
    {
        /// <summary>
        /// Verify document with digital signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;
            using (Signature signature = new Signature(filePath))
            {
                DigitalVerifyOptions options = new DigitalVerifyOptions(Constants.CertificatePfx)
                {
                    Comments = "Test comment",
                    Password = "1234567890"

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