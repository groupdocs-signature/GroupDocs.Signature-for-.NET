using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Domain.Extensions;

    /// <summary>
    /// Following example shows searching document for QR-Code signature with applying specific options.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>
    public class SearchForQRCodeSMSObject
    {
        /// <summary>
        /// Search document for QR-Code signature with SMS data object.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeSMSObject : Search document for QR-Code signature with SMS data object.\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_SMS_OBJECT;

            // instantiating the signature object
            using (Signature signature = new Signature(filePath))
            {
                // search document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
                try
                {
                    foreach (QrCodeSignature qrSignature in signatures)
                    {
                        SMS sms = qrSignature.GetData<SMS>();
                        if (sms != null)
                        {
                            Console.WriteLine($"Found SMS signature for number: {sms.Number} with Message: {sms.Message}");
                        }
                        else
                        {
                            Helper.WriteError($"SMS object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
                        }
                    }
                }
                catch
                {
                    Helper.WriteError("\nThis example requires license to properly run. " +
                                  "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                                  "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                                  "\nLearn how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
                }
            }
        }
    }
}