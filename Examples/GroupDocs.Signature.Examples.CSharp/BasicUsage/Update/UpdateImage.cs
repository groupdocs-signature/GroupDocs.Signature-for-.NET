using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateImage
    {
        /// <summary>
        /// Update Image signature from the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # UpdateImage : Update Image signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateImage", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                ImageSearchOptions options = new ImageSearchOptions();

                // search for image signatures in document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(options);
                if (signatures.Count > 0)
                {
                    ImageSignature imageSignature = signatures[0];
                    // change position
                    imageSignature.Left = 200;
                    imageSignature.Top = 250;
                    // change size. Please note not all documents support changing signature size
                    imageSignature.Width = 200;
                    imageSignature.Height = 200;

                    bool result = signature.Update(imageSignature);
                    if (result)
                    {
                        Console.WriteLine($"Image signature at location {imageSignature.Left}x{imageSignature.Top} and Size {imageSignature.Size}' was updated in the document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not updated in the document! Signature at location {imageSignature.Left}x{imageSignature.Top} and Size {imageSignature.Size} was not found!");
                    }
                }
            }
        }
    }
}