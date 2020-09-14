using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateImageAfterSearch
    {
        /// <summary>
        /// Update Image signature in the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # UpdateImageAfterSearch : Update Image signature in the document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateImageAfterSearch", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // 
            using (Signature signature = new Signature(outputFilePath))
            {
                ImageSearchOptions options = new ImageSearchOptions();
                // search for image signatures in document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(options);
                // adjust signature properties
                foreach (ImageSignature temp in signatures)
                {
                    // apply some condition to adjust signature properties
                    temp.Left = temp.Left + 100;
                    temp.Top = temp.Top + 100;
                    if (temp.Size > 10000)
                    {
                        temp.IsSignature = false;
                    }
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