using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignPdfWithCustomMetadata
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
        /// Sign pdf document with metadata signature with customer object and encryption
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignPdfWithCustomMetadata : Sign pdf document with metadata signature with customer object and encryption\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithCustomMetadata", fileName);

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
                // setup Author property
                PdfMetadataSignature mdDocument = new PdfMetadataSignature("DocumentSignature", documentSignature);
                // set encryption
                mdDocument.DataEncryption = encryption;



                // setup Author property
                PdfMetadataSignature mdAuthor = new PdfMetadataSignature("Author", "Mr.Scherlock Holmes");
                // set encryption
                mdAuthor.DataEncryption = encryption;

                // setup data of document id
                PdfMetadataSignature mdDocId = new PdfMetadataSignature("DocumentId", Guid.NewGuid().ToString());
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