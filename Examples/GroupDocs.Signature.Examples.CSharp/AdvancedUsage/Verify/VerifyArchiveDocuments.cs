using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyArchiveDocuments
    {
        /// <summary>
        /// Verify documents at the archive documents with various options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyArchiveDocuments : Verify signatures at document packed to archive\n");
            Console.WriteLine("ZIP, 7Z and TAR archive formats are supported \n");

            // The path to the archive with signed documents
            string filePath = Constants.SAMPLE_SIGNED_ZIP;

            using (Signature signature = new Signature(filePath))
            {
                // create list of verification options
                BarcodeVerifyOptions barOptions = new BarcodeVerifyOptions()
                {
                    Text = "12345",
                    MatchType = TextMatchType.Contains
                };
                QrCodeVerifyOptions qrOptions = new QrCodeVerifyOptions()
                {
                    Text = "12345",
                    MatchType = TextMatchType.Contains
                };
                List<VerifyOptions> listOptions = new List<VerifyOptions>() { barOptions, qrOptions };

                // Verify documents at the archive
                VerificationResult result = signature.Verify(listOptions);

                // check the result                
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                    Console.WriteLine("\nList of Succeeded signatures:");
                    foreach (BaseSignature temp in result.Succeeded)
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