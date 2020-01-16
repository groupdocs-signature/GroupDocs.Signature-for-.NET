using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithImageAdvanced
    {
        /// <summary>
        /// Sign document with image signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithImageAdvanced : Sign document with image signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageHandwrite;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithImageAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions options = new ImageSignOptions(imagePath)
                {
                    // set signature position 
                    Left = 100,
                    Top = 100,

                    // set signature rectangle
                    Width = 100,
                    Height = 30,

                    // set signature alignment
                    // when VerticalAlignment is set the Top coordinate will be ignored. 
                    // Use Margin properties Top, Bottom to provide vertical offset
                    VerticalAlignment = Domain.VerticalAlignment.Top,

                    // when HorizontalAlignment is set the Left coordinate will be ignored. 
                    // Use Margin properties Left, Right to provide horizontal offset
                    HorizontalAlignment = Domain.HorizontalAlignment.Right,

                    Margin = new Padding() { Top = 20, Right = 20 },

                    // set rotation
                    RotationAngle = 45,

                    // setup image additional appearance as Brightness and Border
                    Appearance = new ImageAppearance()
                    {
                        Brightness = 0.9f,
                        Border = new Border()
                        {
                            Color = Color.DarkGreen,
                            DashStyle = DashStyle.DashLongDashDot,
                            Transparency = 0.5,
                            Visible = true,
                            Weight = 2
                        },
                    }
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
        }
    }
}
