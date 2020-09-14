using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    /// <summary>
    /// Following example shows searching document for QR-Code signature with applying specific options.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>
    public class SearchForQRCodeAdvanced
    {
        /// <summary>
        /// Search document for QR-Code signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeAdvanced : Search document for QR-Code signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                QrCodeSearchOptions options = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = false,
                    PageNumber = 1,
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },
                    // specify special QRCode type to search
                    EncodeType = QrCodeTypes.QR,
                    // specify text match type
                    MatchType = TextMatchType.Contains,
                    // specify text pattern to search
                    Text = "John",
                    // set field for QRCode images returning
                    ReturnContent = true,
                    // specify type of returned QRCode images
                    ReturnContentType = FileType.PNG
                };

                // search for signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options); //For evaluation version is 0
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (QrCodeSignature qrSignature in signatures)
                {
                    Console.WriteLine($"\t #{qrSignature.SignatureId} at {qrSignature.PageNumber}-page, {qrSignature.EncodeType.TypeName} type, Text = '{qrSignature.Text}', created {qrSignature.CreatedOn.ToShortDateString()}, modified {qrSignature.ModifiedOn.ToShortDateString()}");
                }
                //Save QRCode images
                string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SearchForQRCodeAdvanced");
                if (!Directory.Exists(outputPath))
                {
                    Directory.CreateDirectory(outputPath);
                }
                int i = 0;
                foreach (QrCodeSignature qrCodeSignature in signatures)
                {
                    string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{qrCodeSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
                    {
                        fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
                    }
                    i++;
                }
            }
        }
    }
}