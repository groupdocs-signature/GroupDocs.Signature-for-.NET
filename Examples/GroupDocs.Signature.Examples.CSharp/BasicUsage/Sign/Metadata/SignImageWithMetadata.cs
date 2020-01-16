using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignImageWithMetadata
    {
        /// <summary>
        /// Sign image document with metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignImageWithMetadata : Sign image document with metadata signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_JPG;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignImageWithMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();

                // Specify different Metadata Signatures and add them to options signature collection
                ushort imgsMetadataId = 41996;

                // Create several Image Metadata signatures with different types
                ImageMetadataSignature[] signatures = new ImageMetadataSignature[]
                {
                    new ImageMetadataSignature(imgsMetadataId++, 123456), // int
                    new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes"), // string
                    new ImageMetadataSignature(imgsMetadataId++, DateTime.Now), // date time
                    new ImageMetadataSignature(imgsMetadataId++, 123.456M), //decimal value
                };
                options.Signatures.AddRange(signatures);

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}