using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithAdvancedBarAndQRCodeTypes
    {
        /// <summary>
        /// Sign document with advanced Barcodes and QR-Codes.
        /// This example demonstrates how to use specific Barcodes and QR-Code formats.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GroupDocs.Signature.Examples.CSharp.AdvancedUsage : Sign document with advanced Barcodes and QR-Codes\n");

            // The path to the documents directory.
            string sourceFilePath = Constants.SAMPLE_PRESENTATION;
            string outputPath = Path.Combine(Constants.OutputPath, "SignWithAdvancedBarAndQRCodeTypes");
            string destinFilePath = Path.Combine(Constants.OutputPath, "SignWithAdvancedBarAndQRCodeTypes", "AdvancedBarCodeTypes.pptx");

            using (Signature signature = new Signature(sourceFilePath))
            {

                // create GS1DotCode BarCode options
                var GS1DotCodeOptions = new BarcodeSignOptions("(01)04912345123459(15)970331(30)128(10)ABC123", BarcodeTypes.GS1DotCode)
                {
                    Left = 1,
                    Top = 1,
                    Height = 150,
                    Width = 200,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };

                // create GS1DotCode BarCode options
                var HanXinCodeOptions = new QrCodeSignOptions("(01)04912345123459(15)970331(30)128(10)ABC123", QrCodeTypes.HanXin)
                {
                    Left = 201,
                    Top = 1,
                    Height = 200,
                    Width = 200,
                    ReturnContent = true,
                    ReturnContentType = FileType.PNG
                };
                // compose list of options
                var listOptions = new List<SignOptions>()
                {
                    GS1DotCodeOptions, HanXinCodeOptions
                };
                // sign document to file with list of all specific QR-Codes
                var signResult = signature.Sign(destinFilePath, listOptions);

                Console.WriteLine("\nSource document signed successfully.\nFile saved at " + destinFilePath);

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (var item in signResult.Succeeded)
                {
                    switch (item)
                    {
                        case BarcodeSignature barcodeSignature:
                            string barOutputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{barcodeSignature.Format.Extension}");
                            using (FileStream fs = new FileStream(barOutputImagePath, FileMode.Create))
                            {
                                fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
                            }
                            number++;
                            break;
                        case QrCodeSignature qrCodeSignature:
                            string qrOutputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{qrCodeSignature.Format.Extension}");
                            using (FileStream fs = new FileStream(qrOutputImagePath, FileMode.Create))
                            {
                                fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
                            }
                            number++;
                            break;
                        default:
                            break;
                    }


                }
            }
        }
    }
}