using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class DeleteByListIds
    {
        /// <summary>
        /// Delete signatures from the document by known list of the signature Identifiers
        /// The list of signatures Ids could be obtained by GetDocumentInfo or as result from the Sign method.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteByListIds : Delete signatures from the document by known list of the signature Identifiers\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteByListIds", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // read from some data source signature Id value
                List<string> signatureIdList = new List<string>()
                {
                    "ff988ab1-7403-4c8d-8db7-f2a56b9f8530",
                    "07f83369-318b-41ad-a843-732417b912c2",
                    "e3ad0ec7-9abf-426d-b9aa-b3328f3f1470",
                    "eff64a14-dad9-47b0-88e5-2ee4e3604e71"
                };
                // delete required signatures
                DeleteResult deleteResult = signature.Delete(signatureIdList);
                if (deleteResult.Succeeded.Count == signatureIdList.Count)
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