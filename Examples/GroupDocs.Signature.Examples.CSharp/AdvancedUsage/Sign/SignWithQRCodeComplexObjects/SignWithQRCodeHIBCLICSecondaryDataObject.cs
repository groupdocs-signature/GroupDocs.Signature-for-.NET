#if SUPPORT_COMPLEX_DATA
using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeHIBCLICSecondaryDataObject
    {
        /// <summary>
        /// Sign document with QR-Code containing complex HIBCLICSecondaryAdditionalData object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeHIBCLICSecondaryDataObject : Sign document with QR-Code containing HIBC LIC SecondaryData object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeHIBCLICSecondaryData", "SignWithQRCodeHIBCLICSecondaryData.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create HIBC LIC Secondary data object
                HIBCLICSecondaryAdditionalData secondaryAdditionalData = new HIBCLICSecondaryAdditionalData()
                {
                    ExpiryDate = DateTime.Now,
                    ExpiryDateFormat = HIBCLICDateFormat.MMDDYY,
                    Quantity = 30,
                    LotNumber = "LOT123",
                    SerialNumber = "SERIAL123",
                    DateOfManufacture = DateTime.Now,
                    LinkCharacter = 'S'
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.HIBCLICQR,
                    // setup Data property to HIBC LIC SecondaryAdditionalData instance
                    Data = secondaryAdditionalData
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
#endif