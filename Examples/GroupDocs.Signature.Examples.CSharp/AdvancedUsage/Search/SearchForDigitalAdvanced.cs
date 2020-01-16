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
            string filePath = Constants.SAMPLE_SPREADSHEET_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                DigitalSearchOptions options = new DigitalSearchOptions()
                {
                    // specify special search criteria
                    Comments = "Test comment",
                    // specify date range period of signature
                    SignDateTimeFrom = new DateTime(2017, 1, 1),
                    SignDateTimeTo = new DateTime(2017, 2, 2)

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
