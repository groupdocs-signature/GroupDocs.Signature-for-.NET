using GroupDocs.Signature.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage.DocumentPreview
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain;

    internal class GetCertificateInfoAdvanced
    {
        /// <summary>
        /// Get digital certificates information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetCertificateInfoAdvanced : Get digital certificates information\n");

            // The path to certificate.
            string certificatePath = Constants.CertificatePfx;

            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "1234567890"
            };

            using (Signature signature = new Signature(certificatePath, loadOptions))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine($"Document properties {Path.GetFileName(certificatePath)}:");
                Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
                Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
                Console.WriteLine($" - size : {documentInfo.Size}");
                Console.WriteLine($" - page count : {documentInfo.PageCount}");

                // display document MetaData signatures information
                Console.WriteLine($"Document MetaData information: count = {documentInfo.MetadataSignatures.Count}");
                foreach (MetadataSignature metadataSignature in documentInfo.MetadataSignatures)
                {
                    Console.WriteLine($" - Name: {metadataSignature.Name} Value: {metadataSignature.Value} Type: {metadataSignature.Type}");
                }
            }
        }
    }
}
