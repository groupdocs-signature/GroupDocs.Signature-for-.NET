using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithImageAppearance
    {
        /// <summary>
        /// Sign document with image signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithImageAppearance : Sign document with image signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithAppearances", "DocxImageAppearance.docx");

            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions options = new ImageSignOptions(imagePath)
                {
                    // set signature position 
                    Left = 50,
                    Top = 200,
                    // set signature rectangle
                    Width = 100,
                    Height = 30,
                    Margin = new Padding() { Bottom = 20, Right = 20 },
                    Border = new Border()
                    {
                        Color = Color.DarkGreen,
                        DashStyle = DashStyle.DashLongDashDot,
                        Transparency = 0.5,
                        Visible = true,
                        Weight = 2
                    },
                    // setup image additional appearance as Brightness and Border
                    Appearance = new ImageAppearance()
                    {
                        Grayscale = true,
                        Contrast = 0.2f,
                        GammaCorrection = 0.3f,
                        Brightness = 0.9f,
                    }
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}