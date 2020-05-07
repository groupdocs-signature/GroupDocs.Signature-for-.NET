using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class SearchWordProcessingForMetadataAdvanced
    {
        /// <summary>
        /// Search document for metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchWordProcessingForMetadataAdvanced : Search Word Processing document for metadata signature(s)\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDSPROCESSING_SIGNED_METADATA;
            using (Signature signature = new Signature(filePath))
            {
                // search for signatures in document
                List<WordProcessingMetadataSignature> signatures = signature.Search<WordProcessingMetadataSignature>(SignatureType.Metadata);
                // try to get each WordProcessing signature with proper data type added in Basic usage example SignWordProcessingWithMetadata                
                WordProcessingMetadataSignature mdSignature;
                // See example SignWordProcessingWithMetadata with added various data type values to signatures
                try
                {
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "Author");
                    Console.WriteLine($"\t[{mdSignature.Name}] as String = {mdSignature.ToString()}");
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "CreatedOn");
                    Console.WriteLine($"\t[{mdSignature.Name}] as String = {mdSignature.ToDateTime().ToShortDateString()}");
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "DocumentId");
                    Console.WriteLine($"\t[{mdSignature.Name}] as Integer = {mdSignature.ToInteger()}");
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "SignatureId");
                    Console.WriteLine($"\t[{mdSignature.Name}] as Double = {mdSignature.ToDouble()}");
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "Amount");
                    Console.WriteLine($"\t[{mdSignature.Name}] as Decimal = {mdSignature.ToDouble()}");
                    mdSignature = signatures.FirstOrDefault(p => p.Name == "Total");
                    Console.WriteLine($"\t[{mdSignature.Name}] as Float = {mdSignature.ToDouble()}");
                }
                catch (Exception ex)
                {
                    Helper.WriteError($"Error obtaining signature: {ex.Message}");
                }
            }
        }
    }
}