using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPdfWithMetadata
    {
        /// <summary>
        /// Sign pdf document with metadata signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Create few Pdf Metadata signatures
                PdfMetadataSignature[] signatures = new PdfMetadataSignature[]
                {
                    new PdfMetadataSignature("Author", "Mr.Scherlock Holmes"),
                    new PdfMetadataSignature("DateCreated", DateTime.Now),
                    new PdfMetadataSignature("DocumentId", 123456),
                    new PdfMetadataSignature("SignatureId", 123.456M)
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                signature.Sign(outputFilePath, options);
                Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
            }
        }
    }
}