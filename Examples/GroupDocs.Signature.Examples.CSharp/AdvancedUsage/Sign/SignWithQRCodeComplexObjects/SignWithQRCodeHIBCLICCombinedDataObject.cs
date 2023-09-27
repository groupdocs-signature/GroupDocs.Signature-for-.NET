using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeHIBCLICCombinedDataObject
    {
        /// <summary>
        /// Sign document with QR-Code containing complex HIBCLICCombinedData object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeHIBCLICCombinedDataObject : Sign document with QR-Code containing HIBC LIC CombinedData object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeHIBCLICCombinedData", "SignWithQRCodeHIBCLICCombinedData.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create HIBC LIC Combined data object
                HIBCLICCombinedData combinedData = new HIBCLICCombinedData()
                {
                    PrimaryData = new HIBCLICPrimaryData()
                    {
                        ProductOrCatalogNumber = "12345",
                        LabelerIdentificationCode = "A999",
                        UnitOfMeasureID = 1
                    },
                    SecondaryAdditionalData = new HIBCLICSecondaryAdditionalData()
                    {
                        ExpiryDate = DateTime.Now,
                        ExpiryDateFormat = HIBCLICDateFormat.MMDDYY,
                        Quantity = 30,
                        LotNumber = "LOT123",
                        SerialNumber = "SERIAL123",
                        DateOfManufacture = DateTime.Now,
                        LinkCharacter = 'S'
                    }
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.HIBCLICQR,
                    // setup Data property to HIBCLICCombinedData instance
                    Data = combinedData
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}