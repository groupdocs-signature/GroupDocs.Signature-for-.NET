using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithBarcodeAdvanced
    {
        /// <summary>
        /// Sign document with Barcode signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithBarcodeAdvanced : Sign document with Barcode signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SignWithBarcodeAdvanced");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create barcode option with predefined barcode text
                BarcodeSignOptions options = new BarcodeSignOptions("12345678")
                {
                    // setup Barcode encoding type
                    EncodeType = BarcodeTypes.Code128,

                    // set signature position
                    Left = 100,
                    Top = 100,

                    // set signature alignment

                    // when VerticalAlignment is set the Top coordinate will be ignored. 
                    // Use Margin properties Top, Bottom to provide vertical offset
                    VerticalAlignment = Domain.VerticalAlignment.Top,

                    // when HorizontalAlignment is set the Left coordinate will be ignored. 
                    // Use Margin properties Left, Right to provide horizontal offset
                    HorizontalAlignment = Domain.HorizontalAlignment.Right,

                    Margin = new Padding() { Top = 20, Right = 20 },

                    // adjust signature appearance

                    // setup signature border
                    Border = new Border()
                    {
                        Visible = true,
                        Color = Color.DarkGreen,
                        DashStyle = DashStyle.DashLongDashDot,
                        Weight = 2
                    },

                    // set text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
                    // specify position of text with barcode line
                    CodeTextAlignment = CodeTextAlignment.Above,
                    // setup background
                    Background = new Background()
                    {
                        Color = Color.LimeGreen,
                        Transparency = 0.5,
                        Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
                    },
                    // set field for barcode images returning
                    ReturnContent = true,
                    // specify type of returned barcode images
                    ReturnContentType = FileType.PNG

                };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BarcodeSignature barcodeSignature in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {barcodeSignature.SignatureType} Id:{barcodeSignature.SignatureId}, Location: {barcodeSignature.Left}x{barcodeSignature.Top}. Size: {barcodeSignature.Width}x{barcodeSignature.Height}");
                    Console.WriteLine($"Location at {barcodeSignature.Left}-{barcodeSignature.Top}. Size is {barcodeSignature.Width}x{barcodeSignature.Height}.");

                    string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{barcodeSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
                    {
                        fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
                    }
                    number++;
                }
            }
        }
    }
}