#if SUPPORT_COMPLEX_DATA
using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeMailmark2DObject
    {
        /// <summary>
        /// Sign document with QR-Code containing complex Mailmark2D object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeMailmark2DObject : Sign document with QR-Code containing HIBC LIC PrimaryData object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeMailmark2D", "SignWithQRCodeMailmark2D.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create HIBC LIC Primary data object
                Mailmark2D mailmark2D = new Mailmark2D()
                {
                    UPUCountryID = "JGB ",
                    InformationTypeID = "0",
                    Class = "1",
                    SupplyChainID = 123,
                    ItemID = 1234,
                    DestinationPostCodeAndDPS = "QWE1",
                    RTSFlag = "0",
                    ReturnToSenderPostCode = "QWE2",
                    DataMatrixType = Mailmark2DType.Type_7,
                    CustomerContentEncodeMode = DataMatrixEncodeMode.C40,
                    CustomerContent = "CUSTOM DATA CONTENT"
                };

                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to Mailmark2D instance
                    Data = mailmark2D
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
#endif