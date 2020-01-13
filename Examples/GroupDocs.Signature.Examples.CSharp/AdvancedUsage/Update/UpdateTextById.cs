using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class UpdateTextById
    {
        /// <summary>
        /// Update Text signature in the document by known SignatureId
        /// SignatureId could be obtained by Search or Sign method
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORD_SIGNED;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateTextById", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // read from some data source signature Id value
                string[] signatureIdList = new string[]
                {                    
                    "a6fec431-111e-4572-950c-5cc5f1c85d36"
                };
                // create list of Text Signature by known SignatureId
                List<BaseSignature> signatures = new List<BaseSignature>();
                foreach (var item in signatureIdList)
                {
                    TextSignature temp = new TextSignature(item)
                    {
                        Width = 150,
                        Height = 150,
                        Left = 200,
                        Top = 200,
                        Text = "Mr. John Smith"
                    };
                    signatures.Add(temp);
                }
                // update all found signatures
                UpdateResult updateResult = signature.Update(signatures);
                if (updateResult.Succeeded.Count == signatures.Count)
                {
                    Console.WriteLine("\nAll signatures were successfully updated!");
                }
                else
                {
                    Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                    Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
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
