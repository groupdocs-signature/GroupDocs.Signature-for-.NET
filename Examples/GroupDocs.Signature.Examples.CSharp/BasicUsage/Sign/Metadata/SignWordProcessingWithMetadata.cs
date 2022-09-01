using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWordProcessingWithMetadata
    {
        /// <summary>
        /// Sign word-processing document with metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWordProcessingWithMetadata : Sign word-processing document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;            
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWordProcessingWithMetadata", "SignedWithMetadata.docx");

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Create few WordProcessing Metadata signatures
                options
                    .Add(new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes")) // String value
                    .Add(new WordProcessingMetadataSignature("CreatedOn", DateTime.Now))       // DateTime values
                    .Add(new WordProcessingMetadataSignature("DocumentId", 123456))            // Integer value
                    .Add(new WordProcessingMetadataSignature("SignatureId", 123.456D))         // Double value
                    .Add(new WordProcessingMetadataSignature("Amount", 123.456M))              // Decimal value
                    .Add(new WordProcessingMetadataSignature("Total", 123.456F));              // Float value
                
                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}