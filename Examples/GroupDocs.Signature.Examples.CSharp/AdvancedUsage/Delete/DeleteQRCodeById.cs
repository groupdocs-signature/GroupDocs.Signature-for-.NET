using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class DeleteQRCodeById
    {
        /// <summary>
        /// Delete QR-code signature in the document by known SignatureId
        /// SignatureId could be obtained by Search or Sign method
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteQRCodeById : Delete QR-code signature in the document by known SignatureId\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteQRCodeById", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // read from some data source signature Id value
                string[] signatureIdList = new string[]
                {
                    "eff64a14-dad9-47b0-88e5-2ee4e3604e71"
                };
                // create list of QR-code Signature by known SignatureId
                List<BaseSignature> signatures = new List<BaseSignature>();
                signatureIdList.ToList().ForEach(p => signatures.Add(new QrCodeSignature(p)));
                // delete required signatures
                DeleteResult deleteResult = signature.Delete(signatures);
                if (deleteResult.Succeeded.Count == signatures.Count)
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