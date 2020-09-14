using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingBarcodeSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Barcode Signature over all signature life-cycle.
        /// First document is being signed with Barcode Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// Please be aware that this example works only on licensed product due to limitation with Barcode processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingBarcodeSignatureOverCRUD : Process Barcode Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingBarcodeSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Barcode Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            string bcText = "John Smith";
            using (Signature signature = new Signature(filePath))
            {
                BarcodeSignOptions signOptions = new BarcodeSignOptions(bcText, BarcodeTypes.Code128)
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Width = 100,
                    Height = 40,
                    Margin = new Padding(20),
                    // set barcode color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" }
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
            // STEP 2. Verify document for Barcode Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                BarcodeVerifyOptions verifyOptions = new BarcodeVerifyOptions()
                {
                    // specify if all pages should be verified
                    AllPages = false,
                    PageNumber = 1,
                    // barcode type
                    EncodeType = BarcodeTypes.Code128,
                    // 
                    Text = bcText
                };
                // verify document signatures
                VerificationResult verifyResult = signature.Verify(verifyOptions);
                if (verifyResult.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                }
                else
                {
                    Helper.WriteError("\nDocument failed verification process.");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 3. Search document for Barcode Signature
                // -----------------------------------------------------------------------------------------------------------------------------
                BarcodeSearchOptions searchOptions = new BarcodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true
                };
                // search for barcode signatures in document
                List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(searchOptions);
                Console.WriteLine("\nSource document contains following Barcode signature(s).");
                // enumerate all signature for output                
                foreach (BarcodeSignature bcSignature in signatures)
                {
                    if (bcSignature != null)
                    {
                        Console.WriteLine($"Found Barcode signature at page {bcSignature.PageNumber} with type [{bcSignature.EncodeType.TypeName}] and Barcode Text '{bcSignature.Text}'.");
                        Console.WriteLine($"Location at {bcSignature.Left}-{bcSignature.Top}. Size is {bcSignature.Width}x{bcSignature.Height}.");
                    }
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document Barcode Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------
                foreach (BarcodeSignature bcSignature in signatures)
                {
                    // change position
                    bcSignature.Left = bcSignature.Left + 100;
                    bcSignature.Top = bcSignature.Top + 100;
                    // change size. Please note not all documents support changing signature size
                    bcSignature.Width = 200;
                    bcSignature.Height = 50;
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
                // STEP 5. Update document Barcode Signature on saved SignatureId
                // create list of Barcode Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    BarcodeSignature temp = new BarcodeSignature(item)
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
                // STEP 6. Delete document barcode Signature by id                
                // create list of Barcode Signature by known SignatureId
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    BarcodeSignature temp = new BarcodeSignature(item);
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