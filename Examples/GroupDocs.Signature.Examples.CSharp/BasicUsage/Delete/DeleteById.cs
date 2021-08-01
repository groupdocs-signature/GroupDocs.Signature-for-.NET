using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteById
    {
        /// <summary>
        /// Delete signature from the document by known Id
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteById : Delete signature from the document by known Id \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteById", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                string id = @"eff64a14-dad9-47b0-88e5-2ee4e3604e71";
                bool result = signature.Delete(id);
                if (result)
                {
                    Console.WriteLine($"Signature with Id# '{id}' was deleted from document ['{fileName}'].");
                }
                else
                {
                    Helper.WriteError($"Signature was not deleted from the document! Signature with id# '{id}' was not found!");
                }
            }
        }
    }
}