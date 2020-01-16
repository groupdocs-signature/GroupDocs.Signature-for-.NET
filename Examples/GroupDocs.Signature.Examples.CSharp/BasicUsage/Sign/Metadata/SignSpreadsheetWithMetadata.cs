using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignSpreadsheetWithMetadata
    {
        /// <summary>
        /// Sign spreadsheets document with metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignSpreadsheetWithMetadata : Sign spreadsheets document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignSpreadsheetWithMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Create few Spreadsheet Metadata signatures
                SpreadsheetMetadataSignature[] signatures = new SpreadsheetMetadataSignature[]
                {
                    new SpreadsheetMetadataSignature("Author", "Mr.Scherlock Holmes"),
                    new SpreadsheetMetadataSignature("DateCreated", DateTime.Now),
                    new SpreadsheetMetadataSignature("DocumentId", 123456),
                    new SpreadsheetMetadataSignature("SignatureId", 123.456M)
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}