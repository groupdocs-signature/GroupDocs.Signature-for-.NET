using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteQRCode
    {
        /// <summary>
        /// Delete QR-Code signature from the document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteQRCode : Delete QR-Code signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteQRCode", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                QrCodeSearchOptions options = new QrCodeSearchOptions();
                // search for QRCode signatures in document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
                if (signatures.Count > 0)
                {
                    QrCodeSignature qrCodeSignature = signatures[0];
                    bool result = signature.Delete(qrCodeSignature);
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