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
        /// Search document for Bar-Code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                // define few search options
                BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions()
                {
                    AllPages = true,
                    EncodeType = BarcodeTypes.Code128
                };

                QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions()
                {
                    AllPages = true,
                    EncodeType = QrCodeTypes.QR,
                    Text = "John",
                    MatchType = TextMatchType.Contains
                };

                MetadataSearchOptions metadataOptions = new MetadataSearchOptions()
                {
                    AllPages =true,
                    IncludeBuiltinProperties = true
                };

                // add options to list
                List<SearchOptions> listOptions = new List<SearchOptions>();
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrCodeOptions);
                listOptions.Add(metadataOptions);

                // search for signatures in document
                SearchResult result = signature.Search(listOptions);
                if (result.Signatures.Count > 0)
                {
                    Console.WriteLine("\nSource document contains following signatures.");
                    foreach (var resSignature in result.Signatures)
                    {
                        Console.WriteLine("Signature found at page {0} with type {1}", resSignature.PageNumber, resSignature.SignatureType);
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