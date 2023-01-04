using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class GetDocumentInfoAdvanced
    {
        /// <summary>
        /// Get document form fields and signatures information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetDocumentInfoAdvanced : Get document form fields and signatures information\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            SignatureSettings signatureSettings = new SignatureSettings()
            {
                IncludeStandardMetadataSignatures = true
            };
            using (Signature signature = new Signature(filePath))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine($"Document properties {Path.GetFileName(filePath)}:");
                Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
                Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
                Console.WriteLine($" - size : {documentInfo.Size}");
                Console.WriteLine($" - page count : {documentInfo.PageCount}");
                foreach (PageInfo pageInfo in documentInfo.Pages)
                {
                    Console.WriteLine($" - page-{pageInfo.PageNumber} Width {pageInfo.Width}, Height {pageInfo.Height}");
                }
                // display document Form Field signatures information
                Console.WriteLine($"Document Form Fields information: count = {documentInfo.FormFields.Count}");
                foreach (FormFieldSignature formField in documentInfo.FormFields)
                {
                    Console.WriteLine($" - type #{formField.Type}: Name: {formField.Name} Value: {formField.Value}");
                }
                // display document Text signatures information
                Console.WriteLine($"Document Text signatures : {documentInfo.TextSignatures.Count}");
                foreach (TextSignature textSignature in documentInfo.TextSignatures)
                {
                    Console.WriteLine($" - #{textSignature.SignatureId}: Text: {textSignature.Text} Location: {textSignature.Left}x{textSignature.Top}. Size: {textSignature.Width}x{textSignature.Height}. CreatedOn/ModifiedOn: {textSignature.CreatedOn.ToShortDateString()} / {textSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document Image signatures information
                Console.WriteLine($"Document Image signatures : {documentInfo.ImageSignatures.Count}");
                foreach (ImageSignature imageSignature in documentInfo.ImageSignatures)
                {
                    Console.WriteLine($" - #{imageSignature.SignatureId}: Size: {imageSignature.Size} bytes, Format: {imageSignature.Format}. CreatedOn/ModifiedOn: {imageSignature.CreatedOn.ToShortDateString()} / {imageSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document Digital signatures information
                Console.WriteLine($"Document Digital signatures : {documentInfo.DigitalSignatures.Count}");
                foreach (DigitalSignature digitalSignature in documentInfo.DigitalSignatures)
                {
                    Console.WriteLine($" - #{digitalSignature.SignatureId}. CreatedOn/ModifiedOn: {digitalSignature.CreatedOn.ToShortDateString()} / {digitalSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document Barcode signatures information
                Console.WriteLine($"Document Barcode signatures : {documentInfo.BarcodeSignatures.Count}");
                foreach (BarcodeSignature barcodeSignature in documentInfo.BarcodeSignatures)
                {
                    Console.WriteLine($" - #{barcodeSignature.SignatureId}: Type: {barcodeSignature.EncodeType?.TypeName}. Text: {barcodeSignature.Text}. CreatedOn/ModifiedOn: {barcodeSignature.CreatedOn.ToShortDateString()} / {barcodeSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document QrCode signatures information
                Console.WriteLine($"Document QR-Code signatures : {documentInfo.QrCodeSignatures.Count}");
                foreach (QrCodeSignature qrCodeSignature in documentInfo.QrCodeSignatures)
                {
                    Console.WriteLine($" - #{qrCodeSignature.SignatureId}: Type: {qrCodeSignature.EncodeType?.TypeName}. Text: {qrCodeSignature.Text}. CreatedOn/ModifiedOn: {qrCodeSignature.CreatedOn.ToShortDateString()} / {qrCodeSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document Form Fields signatures information
                Console.WriteLine($"Document Form Fields signatures : {documentInfo.FormFieldSignatures.Count}");
                foreach (FormFieldSignature formFieldSignature in documentInfo.FormFields)
                {
                    Console.WriteLine($" - #{formFieldSignature.SignatureId} Type {formFieldSignature.Type}: Name: {formFieldSignature.Name} Value: {formFieldSignature.Value}. CreatedOn/ModifiedOn: {formFieldSignature.CreatedOn.ToShortDateString()} / {formFieldSignature.ModifiedOn.ToShortDateString()}");
                }
                // display document Metadata signatures information
                Console.WriteLine($"Document Metadata signatures : {documentInfo.MetadataSignatures.Count}");
                foreach (MetadataSignature metadataSignature in documentInfo.MetadataSignatures)
                {
                    Console.WriteLine($" - #{metadataSignature.Name} = {metadataSignature.Value} ({metadataSignature.Type})");
                }
            }
        }
    }
}