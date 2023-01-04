using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;    

    public class SearchPdfForMetadata
    {
        /// <summary>
        /// Search document for metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SearchPdfForMetadata : Search Pdf document for metadata signature(s)\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_METADATA;
            using (Signature signature = new Signature(filePath))
            {
                // search for signatures in document
                List<PdfMetadataSignature> signatures = signature.Search<PdfMetadataSignature>(SignatureType.Metadata);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (PdfMetadataSignature mdSignature in signatures)
                {
                    Console.WriteLine($"\t[{mdSignature.TagPrefix} : {mdSignature.Name}] = {mdSignature.Value} ({mdSignature.Type})");
                }
            }
        }
    }
}