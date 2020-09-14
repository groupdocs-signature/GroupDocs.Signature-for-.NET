using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForQRCode
    {
        /// <summary>
        /// Search document for QR_Code signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SearchForQRCode : Search document for QR_Code signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                // search for signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (var QrCodeSignature in signatures)
                {
                    Console.WriteLine($"QRCode signature found at page {QrCodeSignature.PageNumber} with type {QrCodeSignature.EncodeType.TypeName} and text {QrCodeSignature.Text}");
                }
            }
        }
    }
}