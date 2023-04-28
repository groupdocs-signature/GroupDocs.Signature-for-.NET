using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    internal class GetArchiveInfoAdvanced
    {
        /// <summary>
        /// Get digital certificates information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetArchiveInfoAdvanced : Get Archive file documents information\n");

            // The path to certificate.
            string archivePath = Constants.SAMPLE_ZIP;

            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "1234567890"
            };

            using (Signature signature = new Signature(archivePath, loadOptions))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine($"Archive properties {Path.GetFileName(archivePath)}:");
                Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
                Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
                Console.WriteLine($" - size : {documentInfo.Size}");
                Console.WriteLine($" - documents count : {documentInfo.PageCount}");

                // display each document information
                Console.WriteLine($"Documents information:");
                foreach (DocumentResultSignature document in documentInfo.Documents)
                {
                    Console.WriteLine($" - Document: {document.FileName} Size: {document.SourceDocumentSize} archive-size: {document.DestinDocumentSize}");
                }
            }
        }
    }
}