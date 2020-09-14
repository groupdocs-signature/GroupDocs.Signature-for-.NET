using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteImageAfterSearch
    {
        /// <summary>
        /// Delete Image signature from the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteImageAfterSearch : Delete Image signature from the document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteImageAfterSearch", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                ImageSearchOptions options = new ImageSearchOptions();

                List<ImageSignature> signatures = signature.Search<ImageSignature>(options);
                List<BaseSignature> signaturesToDelete = new List<BaseSignature>();
                // collect signatures to delete
                foreach (ImageSignature temp in signatures)
                {
                    if (temp.Size > 10000)
                    {
                        signaturesToDelete.Add(temp);
                    }
                }
                // delete signatures
                DeleteResult deleteResult = signature.Delete(signaturesToDelete);
                if (deleteResult.Succeeded.Count == signaturesToDelete.Count)
                {
                    Console.WriteLine("All signatures were successfully deleted!");
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