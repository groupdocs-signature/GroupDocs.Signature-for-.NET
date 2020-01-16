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
    public class SearchForMetadataCustomEncryptionObject
    {
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
        /// Search document for metadata signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForMetadataCustomEncryptionObject : Search document for metadata signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX_METADATA_CUSTOM_ENCRYPTION_OBJECT;

            using (Signature signature = new Signature(filePath))
            {
                // create data encryption
                IDataEncryption encryption = new CustomXOREncryption();

                MetadataSearchOptions options = new MetadataSearchOptions()
                {
                    DataEncryption = encryption
                };

                // search for signatures in document
                List<WordProcessingMetadataSignature> signatures = signature.Search<WordProcessingMetadataSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");

                // get required metadata signatures
                WordProcessingMetadataSignature mdSignature = signatures.FirstOrDefault(p => p.Name == "Signature");
                if (mdSignature != null)
                {
                    DocumentSignatureData documentSignatureData = mdSignature.GetData<DocumentSignatureData>();
                    if (documentSignatureData != null)
                    {
                        Console.WriteLine("Signature has DocumentSignatureData object:\n ID = {0}, Author = {1}, Signed = {2}, DataFactor {3}",
                            documentSignatureData.ID, documentSignatureData.Author, documentSignatureData.Signed.ToShortDateString(), documentSignatureData.DataFactor);
                    }
                }
                // get required metadata signatures
                WordProcessingMetadataSignature mdAuthor = signatures.FirstOrDefault(p => p.Name == "Author");
                if (mdAuthor != null)
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