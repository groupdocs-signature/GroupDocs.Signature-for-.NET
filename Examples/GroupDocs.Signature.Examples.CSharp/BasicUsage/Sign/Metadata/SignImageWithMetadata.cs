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
            string filePath = Constants.SAMPLE_IMAGE;            
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignImageWithMetadata", "SignedWithMetadata.png");

            using (Signature signature = new Signature(filePath))
            {
                // Specify different Metadata Signatures and add them to options signature collection
                ushort imgsMetadataId = 41996;
                // create Metadata option with predefined Metadata text
                MetadataSignOptions options = new MetadataSignOptions();
                // Create several Image Metadata signatures with different types
                options
                    .Add(new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes")) // String value
                    .Add(new ImageMetadataSignature(imgsMetadataId++, DateTime.Now))          // Date Time value
                    .Add(new ImageMetadataSignature(imgsMetadataId++, 123456))                // Integer value
                    .Add(new ImageMetadataSignature(imgsMetadataId++, 123.456D))              // Double value
                    .Add(new ImageMetadataSignature(imgsMetadataId++, 123.456M))              // Decimal value
                    .Add(new ImageMetadataSignature(imgsMetadataId++, 123.456F));             // Float value
                
                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}