using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class DeleteMultipleAdvanced
    {
        /// <summary>
        /// Delete multiple signatures in the document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteMultipleAdvanced : Delete multiple signatures in the document\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Delete method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteMultipleAdvanced", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // initialize Signature instance
            using (Signature signature = new Signature(outputFilePath))
            {
                // add options to list
                List<SearchOptions> listOptions = new List<SearchOptions>();
                listOptions.Add(new TextSearchOptions());
                listOptions.Add(new BarcodeSearchOptions());
                listOptions.Add(new QrCodeSearchOptions());
                listOptions.Add(new ImageSearchOptions());

                // search for signatures in document
                SearchResult result = signature.Search(listOptions);
                if (result.Signatures.Count > 0)
                {
                    Console.WriteLine("Trying to delete signatures...");
                    List<BaseSignature> signaturesToDelete = new List<BaseSignature>();
                    // collect image signatures to delete
                    foreach (BaseSignature temp in result.Signatures)
                    {
                        signaturesToDelete.Add(temp);
                    }
                    // delete signatures
                    DeleteResult deleteResult = signature.Delete(signaturesToDelete);
                    if (deleteResult.Succeeded.Count == signaturesToDelete.Count)
                    {
                        Console.WriteLine("All signatures were successfully deleted!");
                    }
                    else
                    {
                        Console.WriteLine($"Successfully deleted signatures : {deleteResult.Succeeded.Count}");
                        Helper.WriteError($"Not deleted signatures : {deleteResult.Failed.Count}");
                    }
                    Console.WriteLine("List of deleted signatures:");
                    foreach (BaseSignature temp in deleteResult.Succeeded)
                    {
                        Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
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