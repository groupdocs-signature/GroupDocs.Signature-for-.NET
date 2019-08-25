using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class VerifyDigitalAdvanced
    {
        /// <summary>
        /// Verify document with digital signature with applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;
            string certificate = Constants.CertificateCer;
            using (Signature signature = new Signature(filePath))
            {
                DigitalVerifyOptions options = new DigitalVerifyOptions()
                {
                    Comments = "Test1",
                    SignDateTimeFrom = new DateTime(year: 2019, month: 05, day: 01)
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