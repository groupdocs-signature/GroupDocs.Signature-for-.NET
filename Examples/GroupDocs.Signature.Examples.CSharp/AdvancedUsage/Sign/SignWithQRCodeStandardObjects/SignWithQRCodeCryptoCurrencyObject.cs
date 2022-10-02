using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeCryptoCurrencyObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard Crypt currency transfer object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeCryptoCurrencyObject : Sign document with QR-Code containing crypto currency object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeCryptoCurrencyObject", "QRCodeCryptoCurrencyObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create crypto currency object
                CryptoCurrencyTransfer transfer = new CryptoCurrencyTransfer()
                {
                    Type = CryptoCurrencyType.Bitcoin,
                    Address = "1JHG2qjdk5Khiq7X5xQrr1wfigepJEK3t",
                    Amount = 1234.56M,
                    Message = "Consulting services"
                };

                // create alternative crypto currency object
                CryptoCurrencyTransfer customTransfer = new CryptoCurrencyTransfer()
                {
                    Type = CryptoCurrencyType.Custom,
                    CustomType = @"SuperCoin",
                    Address = @"15N3yGu3UFHeyUNdzQ5sS3aRFRzu5Ae7EZ",
                    Amount = 6543.21M,
                    Message = @"Accounting services"
                };

                // create QR-code options
                QrCodeSignOptions options1 = new QrCodeSignOptions
                {
                    // setup Data property to Address instance
                    Data = transfer,
                    Left = 10,
                    Top = 10,
                };

                // create alternative QR-code options
                QrCodeSignOptions options2 = new QrCodeSignOptions
                {
                    // setup Data property to crypto currency instance
                    Data = customTransfer,
                    Left = 10,
                    Top = 200
                };

                List<SignOptions> listOptions = new List<SignOptions>() { options1, options2 };

                // sign document to file
                signature.Sign(outputFilePath, listOptions);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}