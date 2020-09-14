using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteText
    {
        /// <summary>
        /// Delete Text signature from the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteText : Delete Text signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteText", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                TextSearchOptions options = new TextSearchOptions();

                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                if(signatures.Count > 0)
                {
                    TextSignature textSignature = signatures[0];
                    bool result = signature.Delete(textSignature);
                    if(result)
                    {
                        Console.WriteLine($"Signature with Text '{textSignature.Text}' was deleted from document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not deleted from the document! Signature with Text '{textSignature.Text}' was not found!");
                    }
                }
            }
        }
    }
}