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
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeAdvanced : Sign document with QR-Code signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputPath = Path.Combine(Constants.OutputPath, "SignWithQRCodeAdvanced");
            string outputFilePath = System.IO.Path.Combine(outputPath, fileName);

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
                        Visible = true,
                        Color = Color.OrangeRed,
                        DashStyle = DashStyle.DashLongDashDot,
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
                    },
                    // set field for QRCode images returning
                    ReturnContent = true,
                    // specify type of returned QRCode images
                    ReturnContentType = FileType.PNG
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (QrCodeSignature qrCodeSignature in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {qrCodeSignature.SignatureType} Id:{qrCodeSignature.SignatureId}, Location: {qrCodeSignature.Left}x{qrCodeSignature.Top}. Size: {qrCodeSignature.Width}x{qrCodeSignature.Height}");
                    Console.WriteLine($"Location at {qrCodeSignature.Left}-{qrCodeSignature.Top}. Size is {qrCodeSignature.Width}x{qrCodeSignature.Height}.");

                    string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{qrCodeSignature.Format.Extension}");

                    using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
                    {
                        fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
                    }
                    number++;
                }
            }
            
        }
    }
}