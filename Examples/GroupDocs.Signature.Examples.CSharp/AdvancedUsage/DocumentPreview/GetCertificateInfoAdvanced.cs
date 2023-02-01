using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    internal class GetCertificateInfoAdvanced
    {
        /// <summary>
        /// Get digital certificates information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetCertificateInfoAdvanced : Get Digital Certificates information\n");

            // The path to certificate.
            string certificatePath = Constants.CertificatePfx;

            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "1234567890"
            };

            using (Signature signature = new Signature(certificatePath, loadOptions))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                Console.WriteLine($"Certificate properties {Path.GetFileName(certificatePath)}:");
                Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
                Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
                Console.WriteLine($" - size : {documentInfo.Size}");
                Console.WriteLine($" - page count : {documentInfo.PageCount}");

                // display document MetaData signatures information
                Console.WriteLine($"Certificate information:");
                foreach (MetadataSignature metadataSignature in documentInfo.MetadataSignatures)
                {
                    Console.WriteLine($" - Name: {metadataSignature.Name} Value: {metadataSignature.Value} Type: {metadataSignature.Type}");
                }
            }
        }
    }
}
