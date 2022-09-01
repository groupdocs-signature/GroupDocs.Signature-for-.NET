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
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignPdfWithMetadata : Sign pdf document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithMetadata", "SignedWithMetadata.pdf");
            // create Signature instance 
            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                options
                    .Add(new PdfMetadataSignature("Author", "Mr.Scherlock Holmes")) // String value
                    .Add(new PdfMetadataSignature("CreatedOn", DateTime.Now))       // DateTime values
                    .Add(new PdfMetadataSignature("DocumentId", 123456))            // Integer value
                    .Add(new PdfMetadataSignature("SignatureId", 123.456D))         // Double value
                    .Add(new PdfMetadataSignature("Amount", 123.456M))              // Decimal value
                    .Add(new PdfMetadataSignature("Total", 123.456F));              // Float value
                
                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}