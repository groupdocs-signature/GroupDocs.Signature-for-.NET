using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class SignWithImage
    {
        /// <summary>
        /// Sign document with image signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithImage", fileName);

            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions options = new ImageSignOptions(imagePath)
                {
                    // set signature position
                    Left = 100,
                    Top = 100,
                    //
                    PageNumber = 1,
                    AllPages = true
                };
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
