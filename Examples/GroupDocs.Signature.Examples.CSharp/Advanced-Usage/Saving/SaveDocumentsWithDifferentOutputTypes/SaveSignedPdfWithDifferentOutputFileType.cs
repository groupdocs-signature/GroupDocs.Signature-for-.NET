using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SaveSignedPdfWithDifferentOutputFileType
    {
        /// <summary>
        /// Sign document with qr-code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SaveSignedOutputType", "SamplePdf.docx");

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

                PdfSaveOptions pdfSaveOptions = new PdfSaveOptions()
                {
                    FileFormat = PdfSaveFileFormat.DocX,
                    OverwriteExistingFiles = true
                };
                // sign document to file
                signature.Sign(outputFilePath, signOptions, pdfSaveOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}