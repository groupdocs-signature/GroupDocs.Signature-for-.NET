using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class DeleteDigitalAfterSearch
    {
        /// <summary>
        /// Delete Digital signature from the PDF Document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteDigitalAfterSearch : Delete Digital Signature from the PDF Document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_DIGITAL;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteDigitalAfterSearch", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                List<DigitalSignature> signatures = signature.Search<DigitalSignature>(SignatureType.Digital);
                List<BaseSignature> signaturesToDelete = new List<BaseSignature>();
                // collect signatures to delete
                signatures.ForEach(p => signaturesToDelete.Add(p));
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