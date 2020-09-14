using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingImageSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Image Signature over all signature life-cycle.
        /// First document is being signed with Image Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingImageSignatureOverCRUD : Process Image Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingImageSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Image Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions signOptions = new ImageSignOptions(Constants.ImageStamp)
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Width = 100,
                    Height = 40,
                    Margin = new Padding(20)
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
            // STEP 2. Search document for Image Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                ImageSearchOptions searchOptions = new ImageSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true
                };
                // search for image signatures in document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
                Console.WriteLine("\nSource document contains following Image signature(s).");
                // enumerate all signature for output                
                foreach (ImageSignature imageSignature in signatures)
                {
                    if (imageSignature != null)
                    {
                        Console.WriteLine($"Found Image signature at page {imageSignature.PageNumber} and Image Size '{imageSignature.Size}'.");
                        Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
                    }
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 3. Update document Image Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------
                foreach (ImageSignature imageSignature in signatures)
                {
                    // change position
                    imageSignature.Left = imageSignature.Left + 100;
                    imageSignature.Top = imageSignature.Top + 100;
                    // change size. Please note not all documents support changing signature size
                    imageSignature.Width = 200;
                    imageSignature.Height = 50;
                }
                List<BaseSignature> signaturesToUpdate = signatures.ConvertAll(p => (BaseSignature)p);
                UpdateResult updateResult;
                updateResult = signature.Update(signaturesToUpdate);
                if (updateResult.Succeeded.Count == signatures.Count)
                {
                    Console.WriteLine("\nAll signatures were successfully updated!");
                }
                else
                {
                    Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                    Helper.WriteError($"Not updated signatures : {updateResult.Failed.Count}");
                }
                Console.WriteLine("List of updated signatures:");
                foreach (BaseSignature temp in updateResult.Succeeded)
                {
                    Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document Image Signature on saved SignatureId
                // create list of Image Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    ImageSignature temp = new ImageSignature(item)
                    {
                        Width = 150,
                        Height = 30,
                        Left = 100,
                        Top = 100
                    };
                    signaturesToUpdate.Add(temp);
                }
                // update all found signatures
                updateResult = signature.Update(signaturesToUpdate);
                if (updateResult.Succeeded.Count == signatures.Count)
                {
                    Console.WriteLine("\nAll signatures were successfully updated!");
                }
                else
                {
                    Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                    Helper.WriteError($"Not updated signatures : {updateResult.Failed.Count}");
                }
                Console.WriteLine("List of updated signatures:");
                foreach (BaseSignature temp in updateResult.Succeeded)
                {
                    Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 5. Delete document Image Signature by id                
                // create list of Image Signature by known SignatureId
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    ImageSignature temp = new ImageSignature(item);
                    signaturesToUpdate.Add(temp);
                }
                // delete all signatures
                DeleteResult deleteResult = signature.Delete(signaturesToUpdate);
                if (deleteResult.Succeeded.Count == signaturesToUpdate.Count)
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