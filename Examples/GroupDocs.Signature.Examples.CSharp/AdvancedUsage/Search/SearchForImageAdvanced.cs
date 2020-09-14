using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchForImageAdvanced
    {
        /// <summary>
        /// Search document for Barcode signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForImageAdvanced : Search document for Barcode signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            
            using (Signature signature = new Signature(filePath))
            {
                // setup search options
                ImageSearchOptions searchOptions = new ImageSearchOptions()
                {
                    // enable grabbing image content feature
                    ReturnContent = true,
                    // set minimum size if needed
                    MinContentSize = 0,
                    // set maximum size if needed
                    MaxContentSize = 0,                    
                    // specify exact image type to be returned
                    ReturnContentType = FileType.JPEG,                                   
                };

                // search document
                List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
                Console.WriteLine($"\nSource document ['{fileName}'] contains following image signature(s).");
                // output signatures
                foreach (ImageSignature imageSignature in signatures)
                {
                    Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
                    Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
                }

                //Save signature images
                string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SearchForImageAdvanced");
                if (!Directory.Exists(outputPath))
                {
                    Directory.CreateDirectory(outputPath);
                }
                int i = 0;
                foreach (ImageSignature imageSignature in signatures)
                {
                    Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
                    Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");

                    string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{imageSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
                    {
                        fs.Write(imageSignature.Content, 0, imageSignature.Content.Length);
                    }
                    i++;
                }
            }
        }
    }
}