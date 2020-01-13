using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class SearchForMultiple
    {
        /// <summary>
        /// Search document for multiple signature types
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORD_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                // define few search options
                TextSearchOptions textOptions = new TextSearchOptions()
                {
                    AllPages = true
                };

                BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions()
                {
                    AllPages = true,
                    Text = "123456789012",
                    MatchType = TextMatchType.Exact
                };

                QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions()
                {
                    AllPages = true,
                    Text = "John Sm",
                    MatchType = TextMatchType.Contains
                };

                MetadataSearchOptions metadataOptions = new MetadataSearchOptions()
                {
                    AllPages = true,
                    IncludeBuiltinProperties = true
                };

                // add options to list
                List<SearchOptions> listOptions = new List<SearchOptions>();
                listOptions.Add(textOptions);
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrCodeOptions);
                listOptions.Add(metadataOptions);

                // search for signatures in document
                SearchResult result = signature.Search(listOptions);
                if (result.Signatures.Count > 0)
                {
                    Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                    foreach (var resSignature in result.Signatures)
                    {
                        Console.WriteLine($"Signature found at page {resSignature.PageNumber} with type {resSignature.SignatureType} and Id#: {resSignature.SignatureId}");
                    }
                }
                else
                {
                    Console.WriteLine("No one signature was found.");
                }                
            }
        }
    }
}