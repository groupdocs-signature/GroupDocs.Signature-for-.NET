using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;


    public class SignWithTextImage
    {
        /// <summary>
        /// Sign document with text signature applying Image implementation type
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithTextImage : Sign document with text signature applying Image implementation type\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextImage", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.Image,                    
                    // set alignment
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    // set margin with 20 pixels for all sides
                    Margin = new Padding(20),
                    // add special background as an image text implementation advantage
                    Background = new Background()
                    {
                        Color = Color.LimeGreen,
                        Transparency = 0.5,
                        Brush = new RadialGradientBrush(Color.LimeGreen, Color.DarkGreen)
                    },
                };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}