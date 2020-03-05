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
    public class SearchForQRCodeVCardObject
    {
        /// <summary>
        /// Search document for QR-Code signature with VCard data object.
        /// Please be aware that this example works only on licensed product due to limitation with QR-code processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForQRCodeVcardObject : Search document for QR-Code signature with VCard data object.\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_QRCODE_VCARD_OBJECT;

            // instantiating the signature object
            using (Signature signature = new Signature(filePath))
            {
                // setup search options
                QrCodeSearchOptions searchOptions = new QrCodeSearchOptions()
                {
                    // specify special pages to search on 
                    AllPages = true,
                };

                // search document
                List<BaseSignature> result = signature.Search<BaseSignature>(searchOptions);

                try
                {
                    foreach (BaseSignature item in result)
                    {
                        QrCodeSignature qrCodeSignature = item as QrCodeSignature;
                        if (qrCodeSignature != null)
                        {
                            Console.WriteLine("Found QRCode signature: {0} with text {1}", qrCodeSignature.EncodeType.TypeName, qrCodeSignature.Text);

                            VCard vcard = qrCodeSignature.GetData<VCard>();
                            if (vcard != null)
                            {
                                Console.WriteLine("Found VCard signature: {0} {1} from {2}. Email: {3}", vcard.FirstName, vcard.LastName, vcard.Company, vcard.Email);
                            }
                        }
                    }
                }
                catch
                {
                    Console.WriteLine("\nThis example requires license to properly run. " +
                                  "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                                  "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                                  "\nLear how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
                }
            }
        }
    }
}