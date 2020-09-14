using System;
using System.IO;
using System.Text;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithQRCodeVCardObject
    {
        /// <summary>
        /// Sign document with QR-Code containing standard VCard object
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithQRCodeVCard : Sign document with QR-Code containing standard VCard object\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithQRCodeVCard", "QRCodeVCardObject.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // create VCard object
                VCard vCard = new VCard()
                {
                    FirstName = "Sherlock",
                    MidddleName = "Jay",
                    LastName = "Holmes",
                    Initials = "Mr.",
                    Company = "Watson Inc.",
                    JobTitle = "Detective",
                    HomePhone = "0333 003 3577",
                    WorkPhone = "0333 003 3512",
                    Email = "watson@sherlockholmes.com",
                    Url = "http://sherlockholmes.com/",
                    BirthDay = new DateTime(1854, 1, 6),
                    HomeAddress = new Address()
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
                    // setup Data property to VCard instance
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