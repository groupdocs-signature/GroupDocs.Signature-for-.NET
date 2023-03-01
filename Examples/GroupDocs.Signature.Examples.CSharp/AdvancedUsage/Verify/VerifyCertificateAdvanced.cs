using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    internal class VerifyCertificateAdvanced
    {
        /// <summary>
        /// Verify digital certificates file
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyCertificateAdvanced : Verify Digital Certificate\n");

            // The path to certificate.
            string certificatePath = Constants.CertificatePfx;

            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "1234567890"
            };

            using (Signature signature = new Signature(certificatePath, loadOptions))
            {
                CertificateVerifyOptions options = new CertificateVerifyOptions()
                {
                    // do not provide X.509 chain validation
                    PerformChainValidation = false,
                    // find exact math
                    MatchType = TextMatchType.Exact,
                    // check the serial number
                    SerialNumber = "00AAD0D15C628A13C7"
                };

                // verify certificate
                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine("\nCertificate was verified successfully!");
                }
                else
                {
                    Helper.WriteError("\nCertificate failed verification process.");
                }
            }
        }
    }
}