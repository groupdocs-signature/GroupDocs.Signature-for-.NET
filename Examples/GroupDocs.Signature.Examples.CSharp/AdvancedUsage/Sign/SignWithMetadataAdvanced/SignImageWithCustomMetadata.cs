using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignImageWithCustomMetadata
    {
        // Define customer data class
        public class DocumentSignatureData
        {
            [Format("SignID")]
            public string ID { get; set; }

            [Format("SAuth")]
            public string Author { get; set; }

            [Format("SDate", "yyyy-MM-dd")]
            public DateTime Signed { get; set; }

            [Format("SDFact", "N2")]
            public decimal DataFactor { get; set; }
        }


        /// <summary>
        /// Sign Image document with metadata signature with customer object and encryption
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignImageWithCustomMetadata : Sign Image document with metadata signature with customer object and encryption\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_IMAGE;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignImageWithCustomMetadata", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // setup key and passphrase
                string key = "1234567890";
                string salt = "1234567890";
                // create data encryption
                IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);

                // setup options with text of signature
                MetadataSignOptions options = new MetadataSignOptions();

                // create custom object
                DocumentSignatureData documentSignature = new DocumentSignatureData()
                {
                    ID = Guid.NewGuid().ToString(),
                    Author = Environment.UserName,
                    Signed = DateTime.Now,
                    DataFactor = 11.22M
                };

                // Specify different Metadata Signatures and add them to options signature collection
                ushort imgsMetadataId = 41996;

                // Specify different Metadata Signatures and add them to options signature collection
                // setup Author property
                ImageMetadataSignature mdDocument = new ImageMetadataSignature(imgsMetadataId++, documentSignature);
                // set encryption
                mdDocument.DataEncryption = encryption;

                // setup Author property
                ImageMetadataSignature mdAuthor = new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes");
                // set encryption
                mdAuthor.DataEncryption = encryption;

                // setup data of document id
                ImageMetadataSignature mdDocId = new ImageMetadataSignature(imgsMetadataId++, Guid.NewGuid().ToString());
                // set encryption
                mdDocId.DataEncryption = encryption;

                // add signatures to options
                options
                    .Add(mdDocument)
                    .Add(mdAuthor)
                    .Add(mdDocId);

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}