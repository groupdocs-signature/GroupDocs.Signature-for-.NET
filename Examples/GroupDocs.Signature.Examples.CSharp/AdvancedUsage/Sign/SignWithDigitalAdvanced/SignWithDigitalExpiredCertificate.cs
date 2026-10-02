using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Logging;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalExpiredCertificate
    {
        /// <summary>
        /// Sign document with a certificate whose validity period has ended
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalExpiredCertificate : Sign document with an expired certificate\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            // This certificate expired in 2016. It has no password.
            string certificatePath = Constants.CertificateExpiredPfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalExpiredCertificate", fileName);

            // Validators report a signature made with an expired or not-yet-valid certificate as not valid.
            // So, since version 26.9, Sign throws GroupDocsSignatureException for such a certificate by default,
            // and nothing is signed or saved.
            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath);
                try
                {
                    signature.Sign(outputFilePath, options);
                }
                catch (GroupDocsSignatureException ex)
                {
                    Helper.WriteError("The document was not signed: " + ex.Message);
                }
            }

            // To sign anyway, for example to test with an old certificate, set AllowExpired
            // (or AllowNotYetValid for a certificate whose validity period has not started yet).
            // The document is then signed, and a warning is written to the logger.
            SignatureSettings settings = new SignatureSettings(new ConsoleLogger())
            {
                // log warnings and errors only
                LogLevel = LogLevel.Warning | LogLevel.Error
            };
            using (Signature signature = new Signature(filePath, settings))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    AllowExpired = true,
                    // Page position
                    VerticalAlignment = VerticalAlignment.Bottom,
                    HorizontalAlignment = HorizontalAlignment.Right
                };

                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
