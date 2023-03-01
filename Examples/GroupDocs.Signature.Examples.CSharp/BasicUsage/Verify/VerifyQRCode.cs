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
        /// Please be aware that this example works only on licensed product due to limitation with QR-Code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # VerifyQRCode : Verify document with QR-Code signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

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
                    foreach (QrCodeSignature item in result.Succeeded)
                    {
                        Console.WriteLine($"\nValid signature is found with text: {item.Text} and type: {item.EncodeType.TypeName}.");
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