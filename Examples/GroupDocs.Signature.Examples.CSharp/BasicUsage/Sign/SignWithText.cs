using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithText
    {
        /// <summary>
        /// Sign document with text signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithText", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set signature position
                    Left = 100,
                    Top = 100,
                    // set signature rectangle
                    Width = 100,
                    Height = 30,
                    // set Text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" }
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine($"\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}