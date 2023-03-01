using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class VerifyWithMultipleOptions
    {
        /// <summary>
        /// Verify document with Text signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;

            using (Signature signature = new Signature(filePath))
            {
                TextVerifyOptions textVerifyOptions = new TextVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    SignatureImplementation = TextSignatureImplementation.Native,
                    Text = "Text signature",
                    MatchType = TextMatchType.Contains
                };

                BarcodeVerifyOptions barcVerifyOptions = new BarcodeVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    Text = "12345",
                    MatchType = TextMatchType.Contains
                };

                QrCodeVerifyOptions qrcdVerifyOptions = new QrCodeVerifyOptions()
                {
                    AllPages = true, // this value is set by default
                    Text = "John",
                    MatchType = TextMatchType.Contains
                };

                DigitalVerifyOptions digtVerifyOptions = new DigitalVerifyOptions(Constants.CertificatePfx)
                {
                    SignDateTimeFrom = new DateTime(year: 2020, month: 01, day: 01),
                    SignDateTimeTo = new DateTime(year: 2020, month: 12, day: 31),
                    Password = "1234567890"
                };

                // verify document signatures
                List<VerifyOptions> listOptions = new List<VerifyOptions>();
                listOptions.Add(textVerifyOptions);
                listOptions.Add(barcVerifyOptions);
                listOptions.Add(qrcdVerifyOptions);
                listOptions.Add(digtVerifyOptions);

                VerificationResult result = signature.Verify(listOptions);
                if (result.IsValid)
                {
                    Console.WriteLine("\nDocument was verified successfully!");
                    Console.WriteLine($"\n{result.Succeeded.Count} signatures have passed through verification process.");
                }
                else
                {
                    Console.WriteLine("\nDocument failed verification process.");
                }
            }
        }
    }
}