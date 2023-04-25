#if SUPPORT_COMPLEX_DATA
using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Domain.Extensions;

    /// <summary>
    /// Following example shows searching document for QR-Code signature with specific complex data type HIBC PAS data.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>
    public class SearchForQRCodeHIBCPASDataObject
    {
        /// <summary>
        /// Search document for QR-Code signature with HIBC PAS data object.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeHIBCPASDataObject : Search document for QR-Code signature with HIBC PAS data object.\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_HIBCPASDATA_OBJECT;

            // instantiating the signature object
            using (Signature signature = new Signature(filePath))
            {
                // search document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
                try
                {
                    QrCodeSignature qrSignature = signatures.FirstOrDefault();
                    if (qrSignature != null)
                    {
                        Console.WriteLine("Found QRCode signature: {0} with text {1}", qrSignature.EncodeType.TypeName, qrSignature.Text);
                        HIBCPASData data = qrSignature.GetData<HIBCPASData>();
                        if (data != null)
                        {
                            Console.WriteLine($"Found QR-Code HIBC PAS data : {data.DataLocation}");
                            foreach(HIBCPASRecord record in data.Records)
                            {
                                Console.WriteLine($"\t #: {record.DataType} : {record.Data}");
                            }
                        }
                        else
                        {
                            Helper.WriteError($"HIBCPASData object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
                        }
                    }
                }
                catch
                {
                    Helper.WriteError("\nThis example requires license to properly run. " +
                                  "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                                  "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                                  "\nLear how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
                }
            }
        }
    }
}
#endif