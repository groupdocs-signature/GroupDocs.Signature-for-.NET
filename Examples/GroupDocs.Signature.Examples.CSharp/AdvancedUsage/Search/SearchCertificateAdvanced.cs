using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchCertificateAdvanced
    {
        /// <summary>
        /// Verify digital certificates file
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchCertificateAdvanced : Search Digital Certificate for specifix text\n");

            // The path to certificate.
            string certificatePath = Constants.CertificatePfx;

            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "1234567890"
            };

            using (Signature signature = new Signature(certificatePath, loadOptions))
            {
                CertificateSearchOptions options = new CertificateSearchOptions()
                {
                    // check the serial number
                    Text = "AAD0D15C628A",
                    // find exact math
                    MatchType = TextMatchType.Contains,
                };

                // search for certificate data
                List<MetadataSignature> result = signature.Search<MetadataSignature>(options);
                if (result.Count>0)
                {
                    Console.WriteLine("\nCertificate contains following search results");
                    foreach (MetadataSignature temp in result)
                    {
                        Console.WriteLine($"\t\t-{temp.Name} - {temp.Value}");
                    }
                }
                else
                {
                    Helper.WriteError("\nCertificate failed search process.");
                }
            }
        }
    }
}