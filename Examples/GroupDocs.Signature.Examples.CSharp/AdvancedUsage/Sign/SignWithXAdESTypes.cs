using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithXAdESTypes
    {
        /// <summary>
        /// Sign document with XML Advanced Electronic Signatures (XAdES)
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithXAdESTypes : Sign document with XML Advanced Electronic Signatures (XAdES)\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_SPREADSHEET;
            string fileName = Path.GetFileName(filePath);
            string certificatePath = Constants.CertificatePfx;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithXAdESTypes", fileName);

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // set XAdES type
                    XAdESType = XAdESType.XAdES,
                    // certificate password
                    Password = "1234567890",
                    // digital certificate details
                    Reason = "Sign",
                    Contact = "JohnSmith",
                    Location = "Office1"
                };

                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}");
                }
            }
        }
    }
}