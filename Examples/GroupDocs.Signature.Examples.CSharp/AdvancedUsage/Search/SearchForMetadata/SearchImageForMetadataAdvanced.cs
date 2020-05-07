using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class SearchImageForMetadataAdvanced
    {
        /// <summary>
        /// Search Image document for metadata signature advanced.
        /// This example shows how to get various data type values from metadata signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchImageForMetadataAdvanced : Search Image document for metadata signature(s)\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_IMAGE_SIGNED_METADATA;
            using (Signature signature = new Signature(filePath))
            {
                // search for signatures in document
                List<ImageMetadataSignature> signatures = signature.Search<ImageMetadataSignature>(SignatureType.Metadata);
                // try to get each Image signature with proper data type added in Basic usage example SignImageWithMetadata
                // specify Id we started to sign 
                ushort imgsMetadataId = 41996;
                ImageMetadataSignature mdSignature;
                // See example SignImageWithMetadata with added various data type values to signatures
                try
                {
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as String = {mdSignature.ToString()}");
                    ++imgsMetadataId;
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as DateTime = {mdSignature.ToDateTime().ToShortDateString()}");
                    ++imgsMetadataId;
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as Integer = {mdSignature.ToInteger()}");
                    ++imgsMetadataId;
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as Double = {mdSignature.ToDouble()}");
                    ++imgsMetadataId;
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as Decimal = {mdSignature.ToDecimal()}");
                    ++imgsMetadataId;
                    mdSignature = signatures.FirstOrDefault(p => p.Id == imgsMetadataId);
                    Console.WriteLine($"\t[{mdSignature.Id}] as Float = {mdSignature.ToSingle()}");
                    ++imgsMetadataId;
                }
                catch(Exception ex)
                {
                    Helper.WriteError($"Error obtaining signature: {ex.Message}");
                }
            }
        }
    }
}