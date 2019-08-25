using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.Advanced_Usage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalAdvanced
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
                    // certifiate password
                    Password = "1234567890",
                    // digital certificate details
                    Reason = "Sign",
                    Contact = "JohnSmith",
                    Location = "Office1",

                    // image as digital certificate appearance on document pages
                    ImageFilePath = imagePath,
                    //                    
                    AllPages = true,
                    Width = 80,
                    Height = 60,
                    VerticalAlignment = VerticalAlignment.Bottom,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    Margin = new Padding() {  Bottom = 10, Right = 10},

                };
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}