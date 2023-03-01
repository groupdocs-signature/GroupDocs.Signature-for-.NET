using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyBarcodeAdvanced
    {
        /// <summary>
        /// Verify document with Barcode signature with applying specific options
        /// Please be aware that this example works only on licensed product due to limitation with Barcode processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyBarcodeAdvanced : Verify document with Barcode signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            using (Signature signature = new Signature(filePath))
            {
                BarcodeVerifyOptions options = new BarcodeVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    Text = "12345",
                    MatchType = TextMatchType.Contains
                };

                // verify document signatures
                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                    Console.WriteLine("\nList of Succeded sigantures:");
                    foreach(BaseSignature temp in result.Succeeded)
                    {
                        Console.WriteLine($" -#{temp.SignatureId}-{temp.SignatureType} at: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                    }
                }
                else
                {
                    Helper.WriteError("\nDocument failed verification process.");
                }
            }
        }
    }
}