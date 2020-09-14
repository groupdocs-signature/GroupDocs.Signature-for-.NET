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
        /// Sign PDF document and save it to different output type
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SaveSignedPdfWithDifferentOutputFileType : Sign PDF document and save it to different output type\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SaveSignedOutputType", "Sample_PdfToDocx.docx");

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
                SignResult result = signature.Sign(outputFilePath, signOptions, pdfSaveOptions);
                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}