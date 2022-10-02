using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteBarcode
    {
        /// <summary>
        /// Delete Barcode signature from the document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteBarcode : Delete Barcode signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteBarcode", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            using (Signature signature = new Signature(outputFilePath))
            {
                BarcodeSearchOptions options = new BarcodeSearchOptions();

                // search for Barcode signatures in document
                List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
                if (signatures.Count > 0)
                {
                    BarcodeSignature barcodeSignature = signatures[0];
                    bool result = signature.Delete(barcodeSignature);
                    if (result)
                    {
                        Console.WriteLine($"Signature with Barcode '{barcodeSignature.Text}' and encode type '{barcodeSignature.EncodeType.TypeName}' was deleted from document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not deleted from the document! Signature with Barcode '{barcodeSignature.Text}' and encode type '{barcodeSignature.EncodeType.TypeName}' was not found!");
                    }
                }
            }
        }
    }
}