using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingFormFieldSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Metadata Signature over all signature life-cycle.
        /// First document is being signed with Metadata Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingFormFieldSignatureOverCRUD : Process Metadata Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingFormFieldSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Metadata Signature(s)
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(filePath))
            {
                // instantiate text form field signature
                FormFieldSignature textSignature = new TextFormFieldSignature("FieldText", "Value1");
                // instantiate options based on text form field signature
                FormFieldSignOptions signOptions = new FormFieldSignOptions(textSignature)
                {
                    Top = 150,
                    Left = 50,
                    Height = 50,
                    Width = 200
                };

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
            // STEP 2. Search document for FormField Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                // search for signatures in document
                List<FormFieldSignature> signatures = signature.Search<FormFieldSignature>(SignatureType.FormField);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (var FormFieldSignature in signatures)
                {
                    Console.WriteLine($"FormField signature found. Name : {FormFieldSignature.Name}. Value: {FormFieldSignature.Value}");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 3. Update document Metadata Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------

                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document Metadata Signature on saved SignatureId
                // create list of Image Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------

                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 5. Delete document Metadata Signature by id                
                // create list of Image Signature by known SignatureId

            }
        }
    }
}