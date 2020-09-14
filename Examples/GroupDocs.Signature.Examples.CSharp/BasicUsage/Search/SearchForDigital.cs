using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForDigital
    {
        /// <summary>
        /// Search document for digital signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SearchForDigital : Search document for digital signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                // search for signatures in document
                List<DigitalSignature> signatures = signature.Search<DigitalSignature>(SignatureType.Digital);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (var digitalSignature in signatures)
                {
                    Console.WriteLine($"Digital signature found from {digitalSignature.SignTime} with validation flag {digitalSignature.IsValid}. Certificate SN {digitalSignature.Certificate?.SerialNumber}");
                }
            }
        }
    }
}