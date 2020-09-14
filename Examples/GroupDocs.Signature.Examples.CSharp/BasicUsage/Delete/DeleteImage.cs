using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteImage
    {
        /// <summary>
        /// Delete Image signature from the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteImage : Delete Image signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteImage", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                ImageSearchOptions options = new ImageSearchOptions();

                // search for image signatures in document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(options);
                if (signatures.Count > 0)
                {
                    ImageSignature imageSignature = signatures[0];
                    bool result = signature.Delete(imageSignature);
                    if (result)
                    {
                        Console.WriteLine($"Image signature at location {imageSignature.Left}x{imageSignature.Top} and Size {imageSignature.Size}' was deleted from document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not deleted from the document! Signature at location {imageSignature.Left}x{imageSignature.Top} and Size {imageSignature.Size} was not found!");
                    }
                }
            }
        }
    }
}