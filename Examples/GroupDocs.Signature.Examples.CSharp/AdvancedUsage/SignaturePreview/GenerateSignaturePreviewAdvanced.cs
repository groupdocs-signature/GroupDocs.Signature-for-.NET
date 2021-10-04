using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class GenerateSignaturePreviewAdvanced
    {
        /// <summary>
        /// Generate signature preview
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GenerateSignaturePreviewAdvanced : Generate Pdf Digital Signature preview");
            // no need Signature object since method is static
            // get certificate to check simulation preview with its data
            string certificatePath = Constants.CertificatePfx;
            // create options
            DigitalSignOptions signOptions = new DigitalSignOptions(certificatePath)
            {
                // set the DocumentType property to specify simulating PDF signature appearance
                DocumentType = DocumentType.Pdf,
                // certificate password
                Password = "1234567890",
                // digital certificate details
                Reason = "Approved",
                Contact = "John Smith",
                Location = "New York",

                // apply custom PDF signature appearance
                Appearance = new Options.Appearances.PdfDigitalSignatureAppearance()
                {
                    // do now show contact details
                    ContactInfoLabel = "Contact",
                    // simplify reason label
                    ReasonLabel = "R:",
                    // change location label
                    LocationLabel = "@=>",
                    DigitalSignedLabel = "By:",
                    DateSignedAtLabel = "On:",
                    // apply custom appearance color
                    Background = Color.LightGray,
                    // apply custom font settings
                    FontFamilyName = "Courier",
                    FontSize = 8
                },
                //
                AllPages = false,
                Width = 200,
                Height = 130,
                VerticalAlignment = VerticalAlignment.Center,
                HorizontalAlignment = HorizontalAlignment.Left,
                Margin = new Padding() { Bottom = 10, Right = 10 },

                // setup signature border
                Border = new Border()
                {
                    Visible = true,
                    Color = Color.FromArgb(80, Color.DarkGray),
                    DashStyle = DashStyle.DashDot,
                    Weight = 2
                }
            };

            // create signature preview options object
            PreviewSignatureOptions previewOption = new PreviewSignatureOptions(signOptions, GenerateSignaturePreviewAdvanced.CreateSignatureStream, GenerateSignaturePreviewAdvanced.ReleaseSignatureStream)
            {
                SignatureId = Guid.NewGuid().ToString(),
                PreviewFormat = PreviewSignatureOptions.PreviewFormats.JPEG,
            };
            // generate preview
            Signature.GenerateSignaturePreview(previewOption);
        }

        private static Stream CreateSignatureStream(PreviewSignatureOptions previewOptions)
        {
            SignOptions signOptions = previewOptions.SignOptions;
            string imageFilePath = Path.Combine(Constants.OutputPath, "GenerateSignaturePreviewAdvanced", $"signature-{previewOptions.SignatureId}-{previewOptions.SignOptions.SignatureType}.jpg");
            var folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        private static void ReleaseSignatureStream(PreviewSignatureOptions previewOptions, Stream signatureStream)
        {
            signatureStream.Dispose();
            Console.WriteLine($"Signature {previewOptions.SignatureId}-{previewOptions.SignOptions.SignatureType} is ready for preview");
        }
    }
}