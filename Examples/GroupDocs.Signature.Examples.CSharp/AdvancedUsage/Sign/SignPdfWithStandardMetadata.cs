using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPdfWithStandardMetadata
    {
        /// <summary>
        /// Sign pdf document with metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignPdfWithStandardMetadata : Sign pdf document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithStandardMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // setup options with text of signature
                MetadataSignOptions options = new MetadataSignOptions();

                // Using standard Pdf Metadata Signatures with new values
                MetadataSignature[] signatures = new MetadataSignature[]
                {
                    PdfMetadataSignatures.Author.Clone("Mr.Scherlock Holmes"),
                    PdfMetadataSignatures.CreateDate.Clone(DateTime.Now.AddDays(-1)),
                    PdfMetadataSignatures.MetadataDate.Clone(DateTime.Now.AddDays(-2)),
                    PdfMetadataSignatures.CreatorTool.Clone("GD.Signature-Test"),
                    PdfMetadataSignatures.ModifyDate.Clone(DateTime.Now.AddDays(-13)),
                    PdfMetadataSignatures.Producer.Clone("GroupDocs-Producer"),
                    PdfMetadataSignatures.Entry.Clone("Signature"),
                    PdfMetadataSignatures.Keywords.Clone("GroupDocs, Signature, Metadata, Creation Tool"),
                    PdfMetadataSignatures.Title.Clone("Metadata Example"),
                    PdfMetadataSignatures.Subject.Clone("Metadata Test Example"),
                    PdfMetadataSignatures.Description.Clone("Metadata Test example description"),
                    PdfMetadataSignatures.Creator.Clone("GroupDocs.Signature"),
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}