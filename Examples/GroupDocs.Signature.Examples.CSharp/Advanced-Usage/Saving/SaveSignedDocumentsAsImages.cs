using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;    
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SaveSignedDocumentsAsImages
    {
        /// <summary>
        /// Sign document with qr-code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignSaveToImage", "SignedAndSavedAsImage");

            using (Signature signature = new Signature(filePath))
            {
                QrCodeSignOptions signOptions = new QrCodeSignOptions("JohnSmith")
                {
                    EncodeType = QrCodeTypes.QR,
                    Left = 100,
                    Top = 100
                };

                //Export to image options
                ExportImageSaveOptions exportImageSaveOptions = new ExportImageSaveOptions(ImageSaveFileFormat.Png)
                {
                    //set pages border style
                    Border = new Border() { Color = Color.Brown, Weight = 5, DashStyle = DashStyle.Solid, Transparency = 0.5 },
                    // sepcify pages to export
                    PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true },
                    // specify output image view - all pages could be located on one column or each by each on several columns
                    PageColumns = 2
                };
                
                // sign document to file
                signature.Sign(outputFilePath, signOptions, exportImageSaveOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}