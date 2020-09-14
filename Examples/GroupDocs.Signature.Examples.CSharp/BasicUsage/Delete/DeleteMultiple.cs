using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteMultiple
    {
        /// <summary>
        /// Delete multiple signatures from the document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # DeleteMultiple : Delete multiple signatures from the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteMultiple", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // processing signatures
            using (Signature signature = new Signature(outputFilePath))
            {
                // define few search options
                TextSearchOptions textSearchOptions = new TextSearchOptions();
                ImageSearchOptions imageSearchOptions = new ImageSearchOptions();
                BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions();
                QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions();
                
                // add options to list
                List<SearchOptions> listOptions = new List<SearchOptions>();
                listOptions.Add(textSearchOptions);
                listOptions.Add(imageSearchOptions);
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrCodeOptions);

                // search for signatures in document
                SearchResult result = signature.Search(listOptions);
                if (result.Signatures.Count > 0)
                {
                    Console.WriteLine("\nTrying to delete all signatures...");
                    DeleteResult deleteResult = signature.Delete(result.Signatures);
                    if(deleteResult.Succeeded.Count == result.Signatures.Count)
                    {
                        Console.WriteLine("\nAll signatures were successfully deleted!");                        
                    }
                    else
                    {
                        Console.WriteLine($"Successfully deleted signatures : {deleteResult.Succeeded.Count}");
                        Helper.WriteError($"Not deleted signatures : {deleteResult.Failed.Count}");
                    }
                    Console.WriteLine("\nList of deleted signatures:");
                    int number = 1;
                    foreach(BaseSignature temp in deleteResult.Succeeded)
                    {
                        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                    }
                }
                else
                {
                    Helper.WriteError("No one signature was found.");
                }
            }
        }
    }
}