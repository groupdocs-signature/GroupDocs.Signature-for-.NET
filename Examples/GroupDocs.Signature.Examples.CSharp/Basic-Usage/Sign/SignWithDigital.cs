using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigital
    {
        /// <summary>
        /// Sign document with digital signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigital", fileName);

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // optional: setup image file path
                    ImageFilePath = imagePath,
                    //
                    Left = 100,
                    Top = 100,
                    PageNumber = 1,
                    Password = "1234567890"
                };
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
