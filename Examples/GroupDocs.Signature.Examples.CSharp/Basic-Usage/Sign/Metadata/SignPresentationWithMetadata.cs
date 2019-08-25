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
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PRESENTATION;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPresentationWithMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Create few Presentation Metadata signatures
                PresentationMetadataSignature[] signatures = new PresentationMetadataSignature[]
                {
                    new PresentationMetadataSignature("Author", "Mr.Scherlock Holmes"),
                    new PresentationMetadataSignature("DateCreated", DateTime.Now),
                    new PresentationMetadataSignature("DocumentId", 123456),
                    new PresentationMetadataSignature("SignatureId", 123.456M)
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                signature.Sign(outputFilePath, options);
                Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
            }
        }
    }
}