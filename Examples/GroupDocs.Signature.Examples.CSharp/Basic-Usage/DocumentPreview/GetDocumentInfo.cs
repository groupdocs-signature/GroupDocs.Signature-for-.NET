using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class GetDocumentInfo
    {
        /// <summary>
        /// Search document for Bar-Code signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            
            using (Signature signature = new Signature(filePath))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine("Document properties {0}:", Path.GetFileName(filePath));
                Console.WriteLine(" - format : {0}", documentInfo.FileType.FileFormat);
                Console.WriteLine(" - extension : {0}", documentInfo.FileType.Extension);
                Console.WriteLine(" - size : {0}", documentInfo.Size);
                Console.WriteLine(" - page count : {0}", documentInfo.PageCount);
                foreach (PageInfo pageInfo in documentInfo.Pages)
                {
                    Console.WriteLine(" - page-{0} Width {1}, Height {2}", pageInfo.PageNumber, pageInfo.Width, pageInfo.Height);
                }
            }           
        }
    }
}