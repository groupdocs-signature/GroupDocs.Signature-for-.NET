using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingTextSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process Text Signature over all signature life-cycle.
        /// First document is being signed with Text Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingTextSignatureOverCRUD : Process Text Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingTextSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with Text Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            string textLabel = "John Smith";
            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions signOptions = new TextSignOptions(textLabel)
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Width = 100,
                    Height = 40,
                    Margin = new Padding(20),
                    // set text color and Font
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
            // STEP 2. Verify document for Text Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                TextVerifyOptions verifyOptions = new TextVerifyOptions()
                {
                    // specify if all pages should be verified
                    AllPages = false,
                    PageNumber = 1,
                    // specify text pattern
                    Text = textLabel,
                    // specify verification text pattern
                    MatchType = TextMatchType.Exact
                };
                // verify document signatures
                VerificationResult verifyResult = signature.Verify(verifyOptions);
                if (verifyResult.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                }
                else
                {
                    Console.WriteLine("\nDocument failed verification process.");
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 3. Search document for Text Signature
                // -----------------------------------------------------------------------------------------------------------------------------
                TextSearchOptions searchOptions = new TextSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true,
                    // specify text match type
                    MatchType = TextMatchType.Exact,
                    // specify text pattern to search
                    Text = textLabel
                };
                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(searchOptions);
                Console.WriteLine("\nSource document contains following text signature(s).");
                // enumerate all signature for output                
                foreach (TextSignature textSignature in signatures)
                {
                    if (textSignature != null)
                    {
                        Console.WriteLine($"Found Text signature at page {textSignature.PageNumber} with type [{textSignature.SignatureImplementation}] and text '{textSignature.Text}'.");
                        Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
                    }
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document Text Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------
                foreach (TextSignature textSignature in signatures)
                {
                    // change Text property
                    textSignature.Text = "John Walkman";
                    // change position
                    textSignature.Left = textSignature.Left + 100;
                    textSignature.Top = textSignature.Top + 100;
                    // change size. Please note not all documents support changing signature size
                    textSignature.Width = 200;
                    textSignature.Height = 50;
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
                // STEP 5. Update document Text Signature on saved SignatureId
                // create list of Text Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    TextSignature temp = new TextSignature(item)
                    {
                        Width = 150,
                        Height = 30,
                        Left = 100,
                        Top = 100,
                        Text = "Mr.John Smith"
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
                // STEP 6. Delete document Text Signature by id                
                // create list of Text Signature by known SignatureId
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    TextSignature temp = new TextSignature(item);
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