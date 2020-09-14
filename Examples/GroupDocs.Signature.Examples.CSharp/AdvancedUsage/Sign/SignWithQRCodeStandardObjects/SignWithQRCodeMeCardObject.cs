using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeMeCardObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard MeCard object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeMeCardObject : Sign document with QR-Code containing standard QR-Code MeCard object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeMeCard", "QRCodeMeCardObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create MeCard object
                MeCard vCard = new MeCard()
                {
                    Name = "Sherlock",
                    Nickname = "Jay",
                    Reading = "Holmes",
                    Note = "Base Detective",
                    Phone = "0333 003 3577",
                    AltPhone = "0333 003 3512",
                    Email = "watson@sherlockholmes.com",
                    Url = "http://sherlockholmes.com/",
                    BirthDay = new DateTime(1854, 1, 6),
                    Address = new Address()
                    {
                        Street = "221B Baker Street",
                        City = "London",
                        State = "NW",
                        ZIP = "NW16XE",
                        Country = "England"
                    }
                };
                // create options
                QrCodeSignOptions options = new QrCodeSignOptions
                {
                    EncodeType = QrCodeTypes.QR,
                    // setup Data property to MeCard instance
                    Data = vCard,
                    // set right bottom corner
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Center,
                    Width = 100,
                    Height = 100,
                    Margin = new Padding(10)
                };

                // sign document to file
                signature.Sign(outputFilePath, options);
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}