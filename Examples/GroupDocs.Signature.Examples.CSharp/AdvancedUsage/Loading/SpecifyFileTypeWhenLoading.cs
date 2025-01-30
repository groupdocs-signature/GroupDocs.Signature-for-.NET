using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SpecifyFileTypeWhenLoading
    {
        /// <summary>
        /// Specify file type when loading a document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
                Console.WriteLine("[Example Advanced Usage] # LoadDocumentWithFileType : Specify file type when loading a document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "LoadDocumentWithFileType", fileName);
            LoadOptions loadOptions = new LoadOptions(FileType.PDF);
            using (Signature signature = new Signature(filePath, loadOptions))
            {
                QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                {
                    EncodeType = QrCodeTypes.QR,
                    Left = 100,
                    Top = 100
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}