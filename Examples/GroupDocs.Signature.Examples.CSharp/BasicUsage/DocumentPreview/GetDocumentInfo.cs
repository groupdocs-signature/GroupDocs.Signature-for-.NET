using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class GetDocumentInfo
    {
        /// <summary>
        /// Get document basic info
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # GetDocumentInfo : Get document basic info\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine($"Document properties {Path.GetFileName(filePath)}:");
                Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
                Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
                Console.WriteLine($" - size : {documentInfo.Size}");
                Console.WriteLine($" - page count : {documentInfo.PageCount}");
                Console.WriteLine($" - Form Fields count : {documentInfo.FormFields.Count}");
                Console.WriteLine($" - Text signatures count : {documentInfo.TextSignatures.Count}");
                Console.WriteLine($" - Image signatures count : {documentInfo.ImageSignatures.Count}");
                Console.WriteLine($" - Digital signatures count : {documentInfo.DigitalSignatures.Count}");
                Console.WriteLine($" - Barcode signatures count : {documentInfo.BarcodeSignatures.Count}");
                Console.WriteLine($" - QrCode signatures count : {documentInfo.QrCodeSignatures.Count}");
                Console.WriteLine($" - FormField signatures count : {documentInfo.FormFieldSignatures.Count}");
                foreach (PageInfo pageInfo in documentInfo.Pages)
                {
                    Console.WriteLine($" - page-{pageInfo.PageNumber} Width {pageInfo.Width}, Height {pageInfo.Height}");
                }
            }           
        }
    }
}