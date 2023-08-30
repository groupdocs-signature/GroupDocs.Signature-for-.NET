using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    /// <summary>
    /// Following example shows searching document for QR-Code signature with applying specific options.
    /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
    /// </summary>
    public class SearchForQRCodeEmailObject
    {
        /// <summary>
        /// Search document for QR-Code signature with Email data object.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeEmailObject : Search document for QR-Code signature with Email data object.\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_EMAIL_OBJECT;

            // instantiating the signature object
            using (Signature signature = new Signature(filePath))
            {
                // search document
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
                try
                {
                    foreach (QrCodeSignature qrSignature in signatures)
                    {
                        Console.WriteLine("Found QRCode signature: {0} with text {1}", qrSignature.EncodeType.TypeName, qrSignature.Text);
                        Email email = qrSignature.GetData<Email>();
                        if (email != null)
                        {
                            Console.WriteLine($"Found Email signature: {email.Address}: [{email.Subject}] : {email.Body}");
                        }
                        else
                        {
                            Helper.WriteError($"Email object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
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