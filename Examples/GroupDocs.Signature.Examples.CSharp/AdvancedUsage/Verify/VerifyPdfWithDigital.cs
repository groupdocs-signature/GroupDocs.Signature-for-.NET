using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyPdfWithDigital
    {
        /// <summary>
        /// Verify PDF document digital signature by the signer certificate and the signing reason
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyPdfWithDigital : Verify PDF document digital signature by certificate subject, issuer and reason\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_DIGITAL;
            using (Signature signature = new Signature(filePath))
            {
                // Verify checks every PDF digital signature cryptographically first (since version 26.9):
                // a document changed after signing is not valid, whatever criteria are set.
                // Then the criteria are matched. SubjectName and IssuerName match when the subject or issuer
                // of the signing certificate contains the value (case-sensitive).
                DigitalVerifyOptions options = new DigitalVerifyOptions()
                {
                    SubjectName = "ProfJamesMoriarty",
                    IssuerName = "ProfMoriarty",
                    Reason = "Approved"
                };

                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully: the signature is intact and matches the certificate and the reason.");
                }
                else
                {
                    Helper.WriteError("\nDocument failed verification process.");
                }

                // The same document does not pass when another signer is expected
                DigitalVerifyOptions otherSigner = new DigitalVerifyOptions()
                {
                    SubjectName = "John Smith"
                };

                result = signature.Verify(otherSigner);
                Console.WriteLine(result.IsValid
                    ? "Document is signed by John Smith."
                    : "Document is not signed by John Smith.");
            }
        }
    }
}
