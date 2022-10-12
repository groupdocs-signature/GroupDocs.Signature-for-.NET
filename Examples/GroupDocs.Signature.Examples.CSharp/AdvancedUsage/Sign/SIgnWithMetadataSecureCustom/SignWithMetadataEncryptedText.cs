using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithMetadataEncryptedText
    {
        /// <summary>
        /// Sign pdf document with metadata signature with customer object and encryption
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithMetadataEncryptedText : Sign pdf document with metadata signature with customer object and encryption\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithMetadataSecureCustom", "MetadataEncryptedText.docx");

            using (Signature signature = new Signature(filePath))
            {
                // setup key and passphrase
                string key = "1234567890";
                string salt = "1234567890";
                // create data encryption
                IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);

                // setup options with text of signature
                MetadataSignOptions options = new MetadataSignOptions()
                {
                    // set encryption for all metadata signatures for this options
                    // if you need separate encryption use own MetadataSignature.DataEncryption property
                    DataEncryption = encryption
                };
                // setup signature metadata
                WordProcessingMetadataSignature mdAuthor = new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes");

                // setup data of document id
                WordProcessingMetadataSignature mdDocId = new WordProcessingMetadataSignature("DocumentId", Guid.NewGuid().ToString());

                // add signatures to options
                options
                    .Add(mdAuthor)
                    .Add(mdDocId);

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}