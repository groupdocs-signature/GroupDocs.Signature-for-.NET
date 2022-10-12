using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithMetadataCustomSerializationObject
    {
        // Define custom data signature class with custom serialization
        [CustomSerialization]
        private class DocumentSignatureData
        {
            [Format("SignID")]
            public string ID { get; set; }

            [Format("SAuth")]
            public string Author { get; set; }

            [Format("SDate", "yyyy-MM-dd")]
            public DateTime Signed { get; set; }

            [Format("SDFact", "N2")]
            public decimal DataFactor { get; set; }

            [SkipSerialization]
            public string Comments { get; set; }
        }

        /// <summary>
        /// Sign pdf document with metadata signature with customer object and encryption
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithMetadataCustomSerializationObject : Sign pdf document with metadata signature with customer object and encryption\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithMetadataSecureCustom", "MetadataCustomSerializationObject.docx");

            using (Signature signature = new Signature(filePath))
            {
                // create data encryption
                IDataEncryption encryption = new CustomXOREncryption();

                // setup options with text of signature
                MetadataSignOptions options = new MetadataSignOptions()
                {
                    // set encryption for all metadata signatures for this options
                    // if you need separate encryption use own MetadataSignature.DataEncryption property
                    DataEncryption = encryption
                };

                // create custom object
                DocumentSignatureData documentSignatureData = new DocumentSignatureData()
                {
                    ID = Guid.NewGuid().ToString(),
                    Author = Environment.UserName,
                    Signed = DateTime.Now,
                    DataFactor = 11.22M
                };

                // setup signature metadata
                WordProcessingMetadataSignature mdSignature = new WordProcessingMetadataSignature("Signature", documentSignatureData);

                // setup signature metadata
                WordProcessingMetadataSignature mdAuthor = new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes");

                // setup data of document id
                WordProcessingMetadataSignature mdDocId = new WordProcessingMetadataSignature("DocumentId", Guid.NewGuid().ToString());

                // add signatures to options
                options
                    .Add(mdSignature)
                    .Add(mdAuthor)
                    .Add(mdDocId);

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}