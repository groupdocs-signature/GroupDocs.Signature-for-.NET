using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalAdvancedPdfHashAlgorithm
    {
        /// <summary>
        /// Sign PDF document with digital signature using a specific hash algorithm
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAdvancedPdfHashAlgorithm : Sign PDF document with digital signature using SHA-512\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalAdvancedPdfHashAlgorithm", fileName);

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
                    Password = "1234567890",
                    // PDF digital signatures use SHA-256 by default since version 26.9.
                    // Sha384 and Sha512 are also available. Sha1 is kept only for legacy validators.
                    HashAlgorithm = HashAlgorithm.Sha512,
                    // digital certificate details
                    Reason = "Approved",
                    Location = "New York",
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
