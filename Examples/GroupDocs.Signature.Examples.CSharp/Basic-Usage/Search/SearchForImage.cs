using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    
    public class SearchForImage
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
                    // specify as true to search all pages of a document
                    AllPages = true
                };

                // search document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
                Console.WriteLine($"\nSource document ['{fileName}'] contains following image signature(s).");
                // output signatures
                foreach (ImageSignature imageSignature in signatures)
                {
                    Console.WriteLine($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
                }
            }
        }
    }
}