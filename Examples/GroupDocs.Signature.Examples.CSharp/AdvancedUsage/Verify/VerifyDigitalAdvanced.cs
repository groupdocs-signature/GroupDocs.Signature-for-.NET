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
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyDigitalAdvanced : Verify document with digital signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_DIGITAL;
            using (Signature signature = new Signature(filePath))
            {
                DigitalVerifyOptions options = new DigitalVerifyOptions()
                {
                    // specify special search criteria
                    Comments = "Approved",
                    // specify date range period of signature
                    SignDateTimeFrom = new DateTime(year: 2020, month: 01, day: 01),
                    SignDateTimeTo = new DateTime(year: 2020, month: 12, day: 31)

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