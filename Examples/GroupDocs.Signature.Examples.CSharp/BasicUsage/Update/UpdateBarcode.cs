using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateBarcode
    {
        /// <summary>
        /// Update Barcode signature from the document.
        /// Update method supports changing Barcode location and size.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # UpdateBarcode : Update Barcode signature from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateBarcode", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                BarcodeSearchOptions options = new BarcodeSearchOptions()
                {
                    Text = "12345",
                    MatchType = TextMatchType.Contains
                };

                List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
                if (signatures.Count > 0)
                {
                    BarcodeSignature barcodeSignature = signatures[0];
                    // change position
                    barcodeSignature.Left = 100;
                    barcodeSignature.Top = 100;
                    // change size. Please note not all documents support changing signature size
                    barcodeSignature.Width = 400;
                    barcodeSignature.Height = 100;

                    bool result = signature.Update(barcodeSignature);
                    if (result)
                    {
                        Console.WriteLine($"Signature with Barcode '{barcodeSignature.Text}' and encode type '{barcodeSignature.EncodeType.TypeName}' was updated in the document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not updated in the document! Signature with Barcode '{barcodeSignature.Text}' and encode type '{barcodeSignature.EncodeType.TypeName}' was not found!");
                    }
                }
            }
        }
    }
}