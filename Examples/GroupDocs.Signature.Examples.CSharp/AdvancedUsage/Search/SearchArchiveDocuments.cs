using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchArchiveDocuments
    {
        /// <summary>
        /// Search within the archive documents with various search options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchArchiveDocuments : Search archive document for various signatures\n");
            Console.WriteLine("ZIP, 7Z and TAR archive formats are supported \n");

            // The path to the archive with signed documents
            string filePath = Constants.SAMPLE_SIGNED_ZIP;
            
            using (Signature signature = new Signature(filePath))
            {
                // create list of search options
                BarcodeSearchOptions bcOptions = new BarcodeSearchOptions(BarcodeTypes.Code128);
                QrCodeSearchOptions qrOptions = new QrCodeSearchOptions(QrCodeTypes.QR);
                List<SearchOptions> listOptions = new List<SearchOptions>() { bcOptions, qrOptions };

                // search archive for documents
                SearchResult searchResult = signature.Search(listOptions);

                // check the result                
                Console.WriteLine("\nList of successfully processed documents:");
                int number = 1;
                foreach (DocumentResultSignature document in searchResult.Succeeded)
                {
                    Console.WriteLine($"Document #{number++}: {document.FileName}. Processed: {document.ProcessingTime}, mls");
                    foreach (BaseSignature temp in document.Succeeded)
                    {
                        Console.WriteLine($"\t\t#{temp.SignatureId}: {temp.SignatureType}");
                    }
                }
                if (searchResult.Failed.Count > 0)
                {
                    Console.WriteLine("\nList of failed documents:");
                    number = 1;
                    foreach (DocumentResultSignature document in searchResult.Failed)
                    {
                        Console.WriteLine($"ERROR in Document #{number++}-{document.FileName}: {document.ErrorMessage}, mls");
                    }
                }
            }
        }
    }
}
