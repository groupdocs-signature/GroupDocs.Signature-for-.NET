using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithBase64ImageSample
    {
        /// <summary>
        /// Sign document with image signature applying image from base64 string content
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithBase64ImageSample : Sign document with base64 image\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string imageBase64 = "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";
            byte[] imageBytes = Convert.FromBase64String(imageBase64);
            MemoryStream imageStream = new MemoryStream(imageBytes);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithBase64ImageSample", fileName);

            using (Signature signature = new Signature(filePath))
            {
                ImageSignOptions options = new ImageSignOptions(imageStream)
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

                // dispose Image
                imageStream.Dispose();

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