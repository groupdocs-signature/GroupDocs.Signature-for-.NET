using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Collections.Generic;

    public class SignWithMultipleOptions
    {
        /// <summary>
        /// Sign document with barcode signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithMultiple", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // define several signature options of different types and settings
                TextSignOptions textOptions = new TextSignOptions("This is test message")
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Left
                };                
                BarcodeSignOptions barcodeOptions = new BarcodeSignOptions("123456")
                {                    
                    EncodeType = BarcodeTypes.Code128,
                    Left = 100,
                    Top = 100
                };
                QrCodeSignOptions qrcodeOptions = new QrCodeSignOptions("JohnSmith")
                {                    
                    EncodeType = QrCodeTypes.QR,
                    Left = 100,
                    Top = 200
                };
                DigitalSignOptions digitalOptions = new DigitalSignOptions(Constants.CertificatePfx)
                {
                    ImageFilePath = Constants.ImageHandwrite,
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Password = "1234567890"
                };

                // define list of signature options
                List<SignOptions> listOptions = new List<SignOptions>();

                listOptions.Add(textOptions);                
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrcodeOptions);
                listOptions.Add(digitalOptions);
                
                // sign document to file
                signature.Sign(outputFilePath, listOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}