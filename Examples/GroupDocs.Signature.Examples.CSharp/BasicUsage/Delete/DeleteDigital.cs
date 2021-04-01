using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class DeleteDigital
    {
        /// <summary>
        /// Delete Digital signature from the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteDigital : Delete Digital signature from the document");
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_DIGITAL;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteDigital", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                // search for electronic Digital signatures in the document
                List<DigitalSignature> signatures = signature.Search<DigitalSignature>(SignatureType.Digital);
                if (signatures.Count > 0)
                {
                    DigitalSignature digitalSignature = signatures[0];
                    bool result = signature.Delete(digitalSignature);
                    if (result)
                    {
                        Console.WriteLine($"Digital signature #{digitalSignature.Thumbprint} from the {digitalSignature.SignTime.ToShortDateString()} was deleted from document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not deleted from the document! Signature# {digitalSignature.Thumbprint} was not found!");
                    }
                }
            }
        }
    }
}
