using System;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyDigital
    {
        /// <summary>
        /// Verify document with digital signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # VerifyDigital : Verify document with digital signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                DigitalVerifyOptions options = new DigitalVerifyOptions(Constants.CertificatePfx)
                {
                    Contact = "Mr.Smith",
                    Password = "1234567890"
                };

                // verify document signatures
                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine($"\nDocument {filePath} was verified successfully!");
                    foreach (DigitalSignature item in result.Succeeded)
                    {
                        Console.WriteLine($"\nValid signature is found.");
                    }
                }
                else
                {
                    Helper.WriteError($"\nDocument {filePath} failed verification process.");
                }
            }
        }
    }
}