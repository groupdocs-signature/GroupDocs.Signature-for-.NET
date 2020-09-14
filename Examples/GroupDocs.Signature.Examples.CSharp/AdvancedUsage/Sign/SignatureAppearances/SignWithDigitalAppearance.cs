using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithDigitalAppearance
    {
        /// <summary>
        /// Sign document with digital signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAppearance : Sign document with digital signature applying specific options\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithAppearances", "DigitalAppearance.docx");

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
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
                    Margin = new Padding() { Bottom = 10, Right = 10 },
                    // Setup signature line appearance.
                    // This appearance will add Signature Line on the first page.
                    // Could be useful for .xlsx files.
                    Appearance = new DigitalSignatureAppearance("John Smith", "Title", "jonny@test.com")

                };
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}