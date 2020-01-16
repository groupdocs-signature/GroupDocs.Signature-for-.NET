using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithPercents
    {
        /// <summary>
        /// Sign document with setting position of signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithPercents : Sign document with setting position of signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithPercents", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // create barcode option with predefined barcode text
                BarcodeSignOptions options = new BarcodeSignOptions("12345678")
                {
                    // setup Barcode encoding type
                    EncodeType = BarcodeTypes.Code128,


                    // set signature position in absolute position
                    LocationMeasureType = MeasureType.Percents,
                    Left = 5,
                    Top = 5,

                    // set signature area in millimeters
                    SizeMeasureType = MeasureType.Percents,
                    Width = 10,
                    Height = 5,

                    // set margin in millimeters
                    MarginMeasureType = MeasureType.Percents,
                    Margin = new Padding() { Left = 1, Top = 1, Right = 1 },
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}