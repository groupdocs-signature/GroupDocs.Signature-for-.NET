using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class DeleteImageById
    {
        /// <summary>
        /// Delete Image signature in the document by known SignatureId
        /// SignatureId could be obtained by Search or Sign method
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteImageById", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // read from some data source signature Id value
                string[] signatureIdList = new string[]
                {
                    "1dd21cf3-b904-4da9-9413-1ff1dab51974",
                    "9e386726-a773-4971-b2fc-eaadfce65ffd"
                };
                // create list of Image Signature by known SignatureId
                List<BaseSignature> signatures = new List<BaseSignature>();
                signatureIdList.ToList().ForEach(p => signatures.Add(new ImageSignature(p)));
                // delete required signatures
                DeleteResult deleteResult = signature.Delete(signatures);
                if (deleteResult.Succeeded.Count == signatures.Count)
                {
                    Console.WriteLine("All signatures were successfully deleted!");
                }
                else
                {
                    Console.WriteLine($"Successfully deleted signatures : {deleteResult.Succeeded.Count}");
                    Console.WriteLine($"Not deleted signatures : {deleteResult.Failed.Count}");
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