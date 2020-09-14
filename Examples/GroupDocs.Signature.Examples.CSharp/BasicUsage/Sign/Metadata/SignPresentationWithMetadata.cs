using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPresentationWithMetadata
    {
        /// <summary>
        /// Sign presentation document with metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignPresentationWithMetadata : Sign presentation document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PRESENTATION;            
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPresentationWithMetadata", "SignedWithMetadata.pptx");

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Create few Presentation Metadata signatures
                PresentationMetadataSignature[] signatures = new PresentationMetadataSignature[]
                {
                    new PresentationMetadataSignature("Author", "Mr.Scherlock Holmes"), // String value
                    new PresentationMetadataSignature("CreatedOn", DateTime.Now), // DateTime values
                    new PresentationMetadataSignature("DocumentId", 123456), // Integer value
                    new PresentationMetadataSignature("SignatureId", 123.456D), // Double value
                    new PresentationMetadataSignature("Amount", 123.456M), // Decimal value
                    new PresentationMetadataSignature("Total", 123.456F) // Float value
                        
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}