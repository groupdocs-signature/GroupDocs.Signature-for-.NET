using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeAdvanced
    {
        /// <summary>
        /// Sign document with QR-Code signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create QRCode option with predefined QRCode text
                QrCodeSignOptions options = new QrCodeSignOptions("12345678")
                {
                    // setup QRCode encoding type
                    EncodeType = QrCodeTypes.QR,

                    // set signature position
                    Left = 100,
                    Top = 100,

                    // set signature alignment

                    // when VerticalAlignment is set the Top coordinate will be ignored. 
                    // Use Margin properties Top, Bottom to provide vertical offset
                    VerticalAlignment = VerticalAlignment.Top,

                    // when HorizontalAlignment is set the Left coordinate will be ignored. 
                    // Use Margin properties Left, Right to provide horizontal offset
                    HorizontalAlignment = HorizontalAlignment.Right,

                    Margin = new Padding() { Top = 20, Right = 20 },

                    // adjust signature appearance

                    // setup signature border
                    Border = new Border()
                    {
                        Color = Color.DarkGreen,
                        DashStyle = DashStyle.DashLongDashDot,
                        Transparency = 0.5,
                        Visible = true,
                        Weight = 2
                    },

                    // set text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },

                    // setup background
                    Background = new Background()
                    {
                        Color = Color.LimeGreen,
                        Transparency = 0.5,
                        Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
                    }
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully.\nFile saved at {outputFilePath}");
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