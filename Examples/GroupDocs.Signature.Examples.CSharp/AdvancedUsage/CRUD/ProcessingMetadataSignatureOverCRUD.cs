using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingMetadataSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Metadata Signature over all signature life-cycle.
        /// First document is being signed with Metadata Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingMetadataSignatureOverCRUD : Process Metadata Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingMetadataSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Metadata Signature(s)
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(filePath))
            {
                // create Metadata option with predefined Metadata text
                MetadataSignOptions signOptions = new MetadataSignOptions();

                signOptions
                    .Add(new PdfMetadataSignature("Author", "Mr.Scherlock Holmes")) // String value
                    .Add(new PdfMetadataSignature("CreatedOn", DateTime.Now))       // DateTime values
                    .Add(new PdfMetadataSignature("DocumentId", 123456))            // Integer value
                    .Add(new PdfMetadataSignature("SignatureId", 123.456D))         // Double value
                    .Add(new PdfMetadataSignature("Amount", 123.456M))              // Decimal value
                    .Add(new PdfMetadataSignature("Total", 123.456F));              // Float value

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, signOptions);
                Console.WriteLine("\nDocument {filePath} was signed with following signatures:");
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    // collect newly created signature' Id
                    signatureIds.Add(temp.SignatureId);
                    Console.WriteLine($"Signature : {temp.SignatureType} Id:{temp.SignatureId}");
                }
            }
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 2. Search document for Metadata Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                List<PdfMetadataSignature> signatures = signature.Search<PdfMetadataSignature>(SignatureType.Metadata);

                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (PdfMetadataSignature mdSignature in signatures)
                {
                    Console.WriteLine($"\t[{mdSignature.TagPrefix} : {mdSignature.Name}] = {mdSignature.Value} ({mdSignature.Type})");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 3. Update document Metadata Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------

                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document Metadata Signature on saved SignatureId
                // create list of Metadata Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------

                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 5. Delete document Metadata Signature by id                
                // create list of Metadata Signature by known SignatureId

            }
        }
    }
}