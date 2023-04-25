#if SUPPORT_COMPLEX_DATA
using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeHIBCPASObject
    {
        /// <summary>
        /// Sign document with QR-Code containing complex HIBCPASData object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeHIBCPASObject : Sign document with QR-Code containing HIBC PAS Data object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeHIBCPASObjects", "SignWithQRCodeHIBCPASObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create HIBC PAS data object
                HIBCPASData data = new HIBCPASData()
                {
                    DataLocation = HIBCPASDataLocation.Patient,
                    Records = new List<HIBCPASRecord>()
                    {
                        new HIBCPASRecord(HIBCPASDataType.LabelerIdentificationCode, "A1"),
                        new HIBCPASRecord(HIBCPASDataType.ServiceIdentification, "B3"),
                        new HIBCPASRecord(HIBCPASDataType.DemographicData, "A212312"),
                        new HIBCPASRecord(HIBCPASDataType.SpecimenIdentification, "221")
                    }
                };
                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.HIBCLICQR,
                    // setup Data property to HIBCPASData instance
                    Data = data
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
#endif