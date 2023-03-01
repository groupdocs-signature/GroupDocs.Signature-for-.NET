using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForBarcodeAdvanced
    {
        /// <summary>
        /// Search document for Barcode signature with applying specific options
        /// Please be aware that this example works only on licensed product due to limitation with Barcode processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForBarcodeAdvanced : Search document for Barcode signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                BarcodeSearchOptions options = new BarcodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    // single page number
                    PageNumber = 1,
                    // setup extended search in pages setup
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },
                    // specify special barcode type to search
                    EncodeType = BarcodeTypes.Code128,
                    // specify text match type
                    MatchType = TextMatchType.Contains,
                    // specify text pattern to search
                    Text = "12345",
                    // set field for barcode images returning
                    ReturnContent = true,
                    // specify type of returned barcode images
                    ReturnContentType = FileType.PNG
                };

                // search for signatures in document
                List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
                Console.WriteLine("\nSource document contains following Barcode signatures:");
                foreach (var bcSignature in signatures)
                {
                    Console.WriteLine($"\t #{bcSignature.SignatureId} at {bcSignature.PageNumber}-page, {bcSignature.EncodeType.TypeName} type, Text = '{bcSignature.Text}', created {bcSignature.CreatedOn.ToShortDateString()}, modified {bcSignature.ModifiedOn.ToShortDateString()}");
                }
                //Save Barcode images
                string outputPath = Path.Combine(Constants.OutputPath, "SearchForBarcodeAdvanced");
                if (!Directory.Exists(outputPath))
                {
                    Directory.CreateDirectory(outputPath);
                }
                int i = 0;
                foreach (BarcodeSignature barcodeSignature in signatures)
                {
                    if (barcodeSignature.Content != null)
                    {
                        string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{barcodeSignature.Format?.Extension}");

                        using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
                        {
                            fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
                        }
                    }
                    ++i;
                }
            }
        }
    }
}