
using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForText
    {
        /// <summary>
        /// Search document for Text signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SearchForText : Search document for Text signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            using (Signature signature = new Signature(filePath))
            {
                TextSearchOptions options = new TextSearchOptions()
                {
                    AllPages = true, // this value is set by default
                };

                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                Console.WriteLine($"\nSource document ['{fileName}'] contains following text signature(s).");
                // enumerate all signature for output                
                foreach (TextSignature textSignature in signatures)
                {
                    Console.WriteLine($"Found Text signature at page {textSignature.PageNumber} with type [{textSignature.SignatureImplementation}] and text '{textSignature.Text}'.");
                }
            }
        }
    }
}
