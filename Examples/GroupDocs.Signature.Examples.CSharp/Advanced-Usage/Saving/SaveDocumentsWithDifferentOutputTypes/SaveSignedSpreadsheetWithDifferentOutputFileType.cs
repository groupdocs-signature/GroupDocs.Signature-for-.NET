using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SaveSignedSpreadsheetWithDifferentOutputFileType
    {
        /// <summary>
        /// Sign document with qr-code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SaveSignedOutputType", "SampleXlsx.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create QRCode option with predefined QRCode text
                QrCodeSignOptions signOptions = new QrCodeSignOptions("JohnSmith")
                {
                    // setup QRCode encoding type
                    EncodeType = QrCodeTypes.QR,
                    // set signature position
                    Left = 100,
                    Top = 100
                };

                SpreadsheetSaveOptions saveOptions = new SpreadsheetSaveOptions()
                {
                    FileFormat = SpreadsheetSaveFileFormat.Pdf,
                    OverwriteExistingFiles = true
                };
                // sign document to file
                signature.Sign(outputFilePath, signOptions, saveOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}