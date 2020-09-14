using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateQRCodeAfterSearch
    {
        /// <summary>
        /// Update QR-code signature from the document.
        /// Update method supports changing QR-code location and size.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # UpdateQRCodeAfterSearch : Update QR-code signature from the document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateQRCodeAfterSearch", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                QrCodeSearchOptions options = new QrCodeSearchOptions();

                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                // adjust signature properties
                foreach (QrCodeSignature temp in signatures)
                {
                    // apply some condition to adjust signature properties
                    temp.Left = temp.Left + 100;
                    temp.Top = temp.Top + 100;
                    temp.IsSignature = true;
                }
                // update all found signatures
                UpdateResult updateResult = signature.Update(signatures.ConvertAll(p => (BaseSignature)p));
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
            }
        }
    }
}