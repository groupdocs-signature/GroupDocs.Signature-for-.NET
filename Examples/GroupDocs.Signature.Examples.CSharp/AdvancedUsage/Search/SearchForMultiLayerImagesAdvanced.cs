using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForMultiLayerImagesAdvanced
    {
        /// <summary>
        /// Search multi-layer image document for signatures.
        /// This example provided for formats like DICOM
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n-------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForMultiLayerImagesAdvanced : Search multi-layer image document for signatures\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DICOM_SIGNED;
            string fileName = Path.GetFileName(filePath);

            using (Signature signature = new Signature(filePath))
            {
                // setup search options
                QrCodeSearchOptions searchOptions = new QrCodeSearchOptions()
                {
                    // enable grabbing image content feature
                    ReturnContent = true,
                    // specify exact image type to be returned
                    ReturnContentType = FileType.PNG
                };
                // search multi-layer document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(searchOptions);
                Console.WriteLine($"\nSource document ['{fileName}'] contains following QR-code signature(s).");
                // output signatures
                foreach (QrCodeSignature qrSignature in signatures)
                {
                    // due to multi-layers each signature will contain the page number
                    Console.Write($"Found Qr-Code {qrSignature.Text} signature at page {qrSignature.PageNumber} and id# {qrSignature.SignatureId}.");
                    Console.WriteLine($"Location at {qrSignature.Left}-{qrSignature.Top}. Size is {qrSignature.Width}x{qrSignature.Height}.");
                }
            }
        }
    }
}