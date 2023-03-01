using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingDigitalSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Digital Signature over all signature life-cycle.
        /// First document is being signed with Digital Signature, then verified for it, searched for same and then finally deleting this signature.
        /// Please be aware the digital siganture can not be updated.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingDigitalSignatureOverCRUD : Process Image Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageStamp;
            string certificatePath = Constants.CertificatePfx;
            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingDigitalSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Digital Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions signOptions = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
                    Password = "1234567890",
                    // digital certificate details
                    Reason = "Approved",
                    Contact = "John Smith",
                    Location = "New York",
                    // image as digital certificate appearance on document pages
                    ImageFilePath = imagePath,
                    //
                    Width = 160,
                    Height = 80

                };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, signOptions);
                Console.WriteLine("\nDocument {filePath} was signed with following signatures:");
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    // collect newly created signature' Id
                    signatureIds.Add(temp.SignatureId);
                    Console.WriteLine($"Signature : {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 2. Search document for Digital Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            List<DigitalSignature> signatures;

            using (Signature signature = new Signature(outputFilePath))
            {
                DigitalSearchOptions searchOptions = new DigitalSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true
                };
                // search for Digital signatures in document
                signatures = signature.Search<DigitalSignature>(searchOptions);
                Console.WriteLine("\nSource document contains following Digital signature(s).");
                // enumerate all signature for output                
                foreach (DigitalSignature digitalSignature in signatures)
                {
                    if (digitalSignature != null)
                    {
                        Console.WriteLine($"Found Digital signature #{digitalSignature.SignatureId} and '{digitalSignature.Thumbprint}'.");
                    }
                }
            }
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 3. Delete document Digital Signature by id                
            // create list of Digital Signature by known SignatureId
            List<BaseSignature> signaturesToRemove = signatures.Select( p => p as BaseSignature).ToList();
            using (Signature signature = new Signature(outputFilePath))
            {
                // delete all signatures
                DeleteResult deleteResult = signature.Delete(signaturesToRemove);
                if (deleteResult.Succeeded.Count == signatures.Count)
                {
                    Console.WriteLine("\nAll signatures were successfully deleted!");
                }
                else
                {
                    Console.WriteLine($"Successfully deleted signatures : {deleteResult.Succeeded.Count}");
                    Helper.WriteError($"Not deleted signatures : {deleteResult.Failed.Count}");
                }
                Console.WriteLine("List of deleted signatures:");
                foreach (BaseSignature temp in deleteResult.Succeeded)
                {
                    Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
        }
    }
}