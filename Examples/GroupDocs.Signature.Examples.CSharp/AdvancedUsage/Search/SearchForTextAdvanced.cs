using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForTextAdvanced
    {
        /// <summary>
        /// Search document for Text signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForTextAdvanced : Search document for Text signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                TextSearchOptions options = new TextSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    // single page number
                    PageNumber = 1,
                    // setup extended search in pages setup
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },
                    // specify text match type
                    MatchType = TextMatchType.Exact,
                    // specify text pattern to search
                    Text = "Text signature"
                };

                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                Console.WriteLine("\nSource document contains following text signature(s).");
                // enumerate all signature for output                
                foreach (TextSignature textSignature in signatures)
                {
                    if (textSignature != null)
                    {
                        Console.WriteLine($"Found Text signature at page {textSignature.PageNumber} with type [{textSignature.SignatureImplementation}] and text '{textSignature.Text}'.");
                        Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
                    }
                }
            }
        }
    }
}