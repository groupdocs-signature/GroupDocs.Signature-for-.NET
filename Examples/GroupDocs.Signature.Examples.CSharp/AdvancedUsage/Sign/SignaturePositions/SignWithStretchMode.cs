using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Collections.Generic;

    public class SignWithStretchMode
    {
        /// <summary>
        /// Sign document with barcode signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithStretch", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // define several signature options of different types and settings
                TextSignOptions textOptions = new TextSignOptions("This is test message")
                {
                    AllPages = true,
                    VerticalAlignment = VerticalAlignment.Top,
                    Margin = new Padding(50),
                    Stretch = StretchMode.PageWidth
                };
                BarcodeSignOptions barcodeOptions = new BarcodeSignOptions("123456")
                {
                    AllPages = true,
                    EncodeType = BarcodeTypes.Code128,
                    VerticalAlignment = VerticalAlignment.Bottom,
                    Margin = new Padding(50),
                    Stretch = StretchMode.PageWidth
                };
                ImageSignOptions imageOptions = new ImageSignOptions()
                {
                    AllPages = true,
                    Stretch = StretchMode.PageHeight,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    ImageFilePath = Constants.ImageHandwrite
                };
                
                // define list of signature options
                List<SignOptions> listOptions = new List<SignOptions>();

                listOptions.Add(textOptions);
                listOptions.Add(barcodeOptions);
                listOptions.Add(imageOptions);

                // sign document to file
                signature.Sign(outputFilePath, listOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}