using System;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyText
    {
        /// <summary>
        /// Verify document with Text signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # VerifyText : Verify document with Text signature \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                TextVerifyOptions options = new TextVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    SignatureImplementation = TextSignatureImplementation.Native,
                    Text = "signature",
                    MatchType = TextMatchType.Contains
                };
                // verify document signatures

                VerificationResult result = signature.Verify(options);
                if(result.IsValid)
                {
                    Console.WriteLine($"\nDocument {filePath} was verified successfully!");
                    foreach (TextSignature item in result.Succeeded)
                    {
                        Console.WriteLine($"\nValid signature is found with text: {item.Text}");
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