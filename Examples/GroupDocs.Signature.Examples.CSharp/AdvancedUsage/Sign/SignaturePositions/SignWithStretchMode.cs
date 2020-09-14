using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Collections.Generic;

    public class SignWithStretchMode
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithStretchMode : Sign document with text signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
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
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}