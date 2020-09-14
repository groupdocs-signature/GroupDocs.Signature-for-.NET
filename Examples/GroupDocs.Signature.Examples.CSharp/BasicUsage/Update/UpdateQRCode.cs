using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateQRCode
    {
        /// <summary>
        /// Update QR-Code signature from the document
        /// Update method supports changing QR-Code location and size.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # UpdateQRCode : Update QR-Code signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateQRCode", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                QrCodeSearchOptions options = new QrCodeSearchOptions();
                // search for QRCode signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                if (signatures.Count > 0)
                {
                    QrCodeSignature qrCodeSignature = signatures[0];
                    // change position
                    qrCodeSignature.Left = 200;
                    qrCodeSignature.Top = 250;
                    // change size. Please note not all documents support changing signature size
                    qrCodeSignature.Width = 200;
                    qrCodeSignature.Height = 200;

                    bool result = signature.Update(qrCodeSignature);
                    if (result)
                    {
                        Console.WriteLine($"Signature with QR-Code '{qrCodeSignature.Text}' and encode type '{qrCodeSignature.EncodeType.TypeName}' was deleted from document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not deleted from the document! Signature with Barcode '{qrCodeSignature.Text}' and encode type '{qrCodeSignature.EncodeType.TypeName}' was not found!");
                    }
                }
            }
        }
    }
}