using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class ProcessingQrCodeSignatureOverCRUD
    {
        /// <summary>
        /// Following example shows how to process QR-Code Signature over all signature life-cycle.
        /// First document is being signed with QR-Code Signature, then verified for it, searched for same, updating and finally deleting this signature.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ProcessingQrCodeSignatureOverCRUD : Process QR-Code Signature over all signature life-cycle\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "ProcessingQRCodeSignatureOverCRUD", fileName);
            List<string> signatureIds = new List<string>();
            // -----------------------------------------------------------------------------------------------------------------------------
            // STEP 1. Sign document with QR-Code Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            string bcText = "John Smith";
            using (Signature signature = new Signature(filePath))
            {
                QrCodeSignOptions signOptions = new QrCodeSignOptions(bcText, QrCodeTypes.QR)
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Width = 100,
                    Height = 40,
                    Margin = new Padding(20),
                    // set QR-Code color and Font
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
            // STEP 2. Verify document for QrCode Signature
            // -----------------------------------------------------------------------------------------------------------------------------
            using (Signature signature = new Signature(outputFilePath))
            {
                QrCodeVerifyOptions verifyOptions = new QrCodeVerifyOptions()
                {
                    // specify if all pages should be verified
                    AllPages = false,
                    PageNumber = 1,
                    // QrCode type
                    EncodeType = QrCodeTypes.QR,
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
                // STEP 3. Search document for QrCode Signature
                // -----------------------------------------------------------------------------------------------------------------------------
                QrCodeSearchOptions searchOptions = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true
                };
                // search for QrCode signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(searchOptions);
                Console.WriteLine("\nSource document contains following QrCode signature(s).");
                // enumerate all signature for output                
                foreach (QrCodeSignature qrSignature in signatures)
                {
                    if (qrSignature != null)
                    {
                        Console.WriteLine($"Found QrCode signature at page {qrSignature.PageNumber} with type [{qrSignature.EncodeType.TypeName}] and QrCode Text '{qrSignature.Text}'.");
                        Console.WriteLine($"Location at {qrSignature.Left}-{qrSignature.Top}. Size is {qrSignature.Width}x{qrSignature.Height}.");
                    }
                }
                // -----------------------------------------------------------------------------------------------------------------------------
                // STEP 4. Update document QrCode Signature after searching it
                // -----------------------------------------------------------------------------------------------------------------------------
                foreach (QrCodeSignature qrSignature in signatures)
                {
                    // change position
                    qrSignature.Left = qrSignature.Left + 100;
                    qrSignature.Top = qrSignature.Top + 100;
                    // change size. Please note not all documents support changing signature size
                    qrSignature.Width = 200;
                    qrSignature.Height = 50;
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
                // STEP 5. Update document QrCode Signature on saved SignatureId
                // create list of QrCode Signature by known SignatureId
                // -----------------------------------------------------------------------------------------------------------------------------
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    QrCodeSignature temp = new QrCodeSignature(item)
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
                // STEP 6. Delete document QrCode Signature by id                
                // create list of QrCode Signature by known SignatureId
                signaturesToUpdate.Clear();
                foreach (var item in signatureIds)
                {
                    QrCodeSignature temp = new QrCodeSignature(item);
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