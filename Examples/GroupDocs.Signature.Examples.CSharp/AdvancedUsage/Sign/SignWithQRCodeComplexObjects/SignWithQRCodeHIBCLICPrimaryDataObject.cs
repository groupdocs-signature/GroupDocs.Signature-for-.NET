#if SUPPORT_COMPLEX_DATA
using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeHIBCLICPrimaryDataObject
    {
        /// <summary>
        /// Sign document with QR-Code containing complex HIBCLICPrimaryData object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeHIBCLICPrimaryDataObject : Sign document with QR-Code containing HIBC LIC PrimaryData object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeHIBCLICPrimaryData", "SignWithQRCodeHIBCLICPrimaryData.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create HIBC LIC Primary data object
                HIBCLICPrimaryData primaryData = new HIBCLICPrimaryData()
                {
                    ProductOrCatalogNumber = "12345",
                    LabelerIdentificationCode = "A999",
                    UnitOfMeasureID = 1
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.HIBCLICQR,
                    // setup Data property to HIBCLICPrimaryData instance
                    Data = primaryData                    
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
#endif