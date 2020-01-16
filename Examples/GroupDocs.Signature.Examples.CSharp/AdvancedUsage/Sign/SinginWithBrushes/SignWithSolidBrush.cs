using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithSolidBrush
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithSolidBrush : Sign document with text signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithBrushes", "SignedSolidBrush.pdf");

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // adjust signature appearance brush
                    
                    // setup background
                    Background = new Background()
                    {
                        Color = Color.LimeGreen,
                        Transparency = 0.5,
                        Brush = new SolidBrush(Color.LimeGreen)
                    },

                    // locate signature
                    Width = 100,
                    Height = 80,
                    VerticalAlignment = Domain.VerticalAlignment.Center,
                    HorizontalAlignment = Domain.HorizontalAlignment.Center,
                    Margin = new Padding() { Top = 20, Right = 20 },
                    
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.Image

                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}