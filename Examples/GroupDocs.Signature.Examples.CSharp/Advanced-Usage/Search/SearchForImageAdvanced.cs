using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    

    public class SearchForImageAdvanced
    {
        /// <summary>
        /// Search document for Bar-Code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET_SIGNED;
            string fileName = Path.GetFileName(filePath);
            using (Signature signature = new Signature(filePath))
            {
                // setup search options
                ImageSearchOptions searchOptions = new ImageSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    // single page number
                    PageNumber = 1,
                    // setup extended search in pages setup
                    PagesSetup = new PagesSetup()
                    {
                        FirstPage = true,
                        LastPage = true,
                        OddPages = false,
                        EvenPages = false
                    }
                };

                // search document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
                Console.WriteLine($"\nSource document ['{fileName}'] contains following image signature(s).");
                // output signatures
                foreach (ImageSignature imageSignature in signatures)
                {
                    Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
                    Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
                }
            }
        }
    }
}