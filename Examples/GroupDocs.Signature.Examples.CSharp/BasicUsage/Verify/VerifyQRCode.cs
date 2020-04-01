using System;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyQRCode
    {
        /// <summary>
        /// Verify document with QR-Code signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # VerifyQRCode : Verify document with QR-Code signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                QrCodeVerifyOptions options = new QrCodeVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    Text = "John",
                    MatchType = TextMatchType.Contains
                };
                // verify document signatures

                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine($"\nDocument {filePath} was verified successfully!");
                }
                else
                {
                    Helper.WriteError($"\nDocument {filePath} failed verification process.");
                }
            }
        }
    }
}