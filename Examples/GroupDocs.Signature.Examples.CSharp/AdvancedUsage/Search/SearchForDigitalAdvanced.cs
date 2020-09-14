using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForDigitalAdvanced
    {
        /// <summary>
        /// Search document for digital signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForDigitalAdvanced : Search document for digital signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_DIGITAL;

            using (Signature signature = new Signature(filePath))
            {
                DigitalSearchOptions options = new DigitalSearchOptions()
                {
                    // specify special search criteria
                    Comments = "Approved",
                    // specify date range period of signature
                    SignDateTimeFrom = new DateTime(year: 2020, month: 01, day: 01),
                    SignDateTimeTo = new DateTime(year: 2020, month: 12, day: 31)
                };
                // search for signatures in document
                List<DigitalSignature> signatures = signature.Search<DigitalSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var digitalSignature in signatures)
                {
                    Console.WriteLine("Digital signature found from {0} with validation flag {1}. Certificate SN {2}", 
                        digitalSignature.SignTime, digitalSignature.IsValid, digitalSignature.Certificate?.SerialNumber);
                }
            }
        }
    }
}
