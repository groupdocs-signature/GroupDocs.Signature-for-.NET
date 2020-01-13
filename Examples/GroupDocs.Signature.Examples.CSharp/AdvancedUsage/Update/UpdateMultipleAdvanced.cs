using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateMultipleAdvanced
    {
        /// <summary>
        /// Update multiple signatures in the document over known Signature Id property
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDS_SIGNED_NO_METAINFO;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateMultipleAdvanced", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // define few search options
                BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions();
                QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions();
                // add options to list
                List<SearchOptions> listOptions = new List<SearchOptions>();
                listOptions.Add(new TextSearchOptions());
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrCodeOptions);
                listOptions.Add(new ImageSearchOptions());
                listOptions.Add(new DigitalSearchOptions());
                listOptions.Add(new MetadataSearchOptions());

                // search for signatures in document
                SearchResult result = signature.Search(listOptions);
                if (result.Signatures.Count > 0)
                {
                    Console.WriteLine("\nTrying to update all signatures...");
                    // mark all signatures as actual Signatures
                    foreach (BaseSignature baseSignature in result.Signatures)
                    {
                        baseSignature.IsSignature = true;
                    }
                    // update all found signatures
                    UpdateResult updateResult = signature.Update(result.Signatures);
                    if (updateResult.Succeeded.Count == result.Signatures.Count)
                    {
                        Console.WriteLine("\nAll signatures were successfully updated!");
                    }
                    else
                    {
                        Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                        Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
                    }
                    Console.WriteLine("\nList of updated signatures:");
                    int number = 1;
                    foreach (BaseSignature temp in updateResult.Succeeded)
                    {
                        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                    }
                }
                else
                {
                    Console.WriteLine("No one signature was found.");
                }
            }
        }
    }
}