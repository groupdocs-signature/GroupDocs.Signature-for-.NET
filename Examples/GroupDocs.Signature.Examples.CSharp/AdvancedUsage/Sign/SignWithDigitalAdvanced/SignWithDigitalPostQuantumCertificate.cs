using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalPostQuantumCertificate
    {
        /// <summary>
        /// Sign Word document with a post-quantum ML-DSA certificate
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalPostQuantumCertificate : Sign Word document with a post-quantum ML-DSA certificate\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);
            // Test certificate with an ML-DSA-65 key
            string certificatePath = Constants.CertificateMlDsaPfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalPostQuantumCertificate", fileName);

            // Since version 26.9 Word documents can be signed with ML-DSA-44, ML-DSA-65 and ML-DSA-87 certificates
            // on every supported platform. PDF, spreadsheets and presentations cannot be signed with ML-DSA yet.
            // There is no standard XML-DSig identifier for ML-DSA yet, so Microsoft Word may not validate such a signature.
            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
                    Password = "1234567890"
                };

                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }

            // Search the signed document for its digital signatures
            using (Signature signature = new Signature(outputFilePath))
            {
                List<DigitalSignature> signatures = signature.Search<DigitalSignature>(SignatureType.Digital);
                foreach (DigitalSignature digitalSignature in signatures)
                {
                    Console.WriteLine($"Digital signature found. Certificate: {digitalSignature.Certificate?.Subject}, valid: {digitalSignature.IsValid}");
                }
            }
        }
    }
}
