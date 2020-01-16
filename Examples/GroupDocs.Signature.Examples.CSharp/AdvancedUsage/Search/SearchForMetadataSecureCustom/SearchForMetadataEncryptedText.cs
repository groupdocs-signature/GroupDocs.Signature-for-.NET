using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    /// <summary>
    /// Search document for metadata signature with applying specific options
    /// </summary>
    public class SearchForMetadataEncryptedText
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForMetadataEncryptedText : Search document for metadata signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX_METADATA_ENCRYPTED_TEXT;

            using (Signature signature = new Signature(filePath))
            {
                // setup key and passphrase
                string key = "1234567890";
                string salt = "1234567890";
                // create data encryption
                IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);

                MetadataSearchOptions options = new MetadataSearchOptions()
                {
                    DataEncryption = encryption
                };

                // search for signatures in document
                List<WordProcessingMetadataSignature> signatures = signature.Search<WordProcessingMetadataSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");

                // get required metadata signatures
                WordProcessingMetadataSignature mdAuthor = signatures.FirstOrDefault(p => p.Name == "Author");
                if(mdAuthor != null)
                {
                    Console.WriteLine("Metadata signature found. Name : {0}. Value: {1}", mdAuthor.Name, mdAuthor.GetData<string>());
                }
                // get required metadata signatures
                WordProcessingMetadataSignature mdDocId = signatures.FirstOrDefault(p => p.Name == "DocumentId");
                if (mdDocId != null)
                {
                    Console.WriteLine("Metadata signature found. Name : {0}. Value: {1}", mdDocId.Name, mdDocId.GetData<string>());
                }
            }
        }
    }
}