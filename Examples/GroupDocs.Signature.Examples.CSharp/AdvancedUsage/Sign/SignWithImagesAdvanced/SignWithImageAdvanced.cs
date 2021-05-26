using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

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
            string filePath = Constants.SAMPLE_PDF;
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
                    Width = 200,
                    Height = 100,

                    // set signature alignment
                    // when VerticalAlignment is set the Top coordinate will be ignored. 
                    // Use Margin properties Top, Bottom to provide vertical offset
                    VerticalAlignment = VerticalAlignment.Top,

                    // when HorizontalAlignment is set the Left coordinate will be ignored. 
                    // Use Margin properties Left, Right to provide horizontal offset
                    HorizontalAlignment = HorizontalAlignment.Center,

                    Margin = new Padding() { Top = 120, Right = 120 },

                    // set rotation
                    RotationAngle = 45,

                    // setup signature border
                    Border = new Border()
                    {
                        Visible = true,
                        Color = Color.OrangeRed,
                        DashStyle = DashStyle.DashDotDot,
                        Weight = 5
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
