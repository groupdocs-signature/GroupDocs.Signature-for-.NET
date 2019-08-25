using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithMillimeters
    {
        /// <summary>
        /// Sign document with Bar-Code signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithMillimeters", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create barcode option with predefined barcode text
                BarcodeSignOptions options = new BarcodeSignOptions("12345678")
                {
                    // setup Barcode encoding type
                    EncodeType = BarcodeTypes.Code128,


                    // set signature position in absolute position
                    LocationMeasureType = MeasureType.Millimeters,
                    Left = 40,
                    Top = 50,

                    // set signature area in millimeters
                    SizeMeasureType = MeasureType.Millimeters,
                    Width = 20,
                    Height = 10,

                    // set margin in millimeters
                    MarginMeasureType = MeasureType.Millimeters,
                    Margin = new Padding() { Left =5, Top = 5, Right = 5 },
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}