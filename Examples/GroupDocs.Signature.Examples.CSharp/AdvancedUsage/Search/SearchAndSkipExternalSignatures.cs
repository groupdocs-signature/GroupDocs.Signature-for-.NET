using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchAndSkipExternalSignatures
    {
        /// <summary>
        /// Search document for Text signature skipping external signatures
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchAndSkipExternalSignatures : Search document for Text signature skipping external signatures\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                TextSearchOptions options = new TextSearchOptions()
                {
                    // specify search on all pages
                    AllPages = false
                };
                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                // enumerate all signature for output                
                foreach (TextSignature textSignature in signatures)
                {
                    if (textSignature != null)
                    {
                        Console.WriteLine($"Found Text signature at page {textSignature.PageNumber} with type [{textSignature.SignatureImplementation}] and text '{textSignature.Text}'.");
                        Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
                    }
                }

                // specify SkipExternal value to exclude non signature objects from Search result
                options.SkipExternal = true;

                // search for text signatures in document skipping external
                signatures = signature.Search<TextSignature>(options);
                Console.WriteLine($"\nSource document ['{filePath}'] contains {signatures.Count} not external signatures.");

            }
        }
    }
}