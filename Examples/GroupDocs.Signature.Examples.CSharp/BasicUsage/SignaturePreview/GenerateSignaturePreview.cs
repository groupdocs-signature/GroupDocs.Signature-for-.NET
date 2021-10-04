using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class GenerateSignaturePreview
    {
        /// <summary>
        /// Generate signature preview
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # GenerateSignaturePreview : Generate signature preview");
            // no need Signature object since method is static

            // create options
            QrCodeSignOptions signOptions = new QrCodeSignOptions
            {
                EncodeType = QrCodeTypes.QR,
                // setup Data property with Address object
                Data = new GroupDocs.Signature.Domain.Extensions.Address()
                {
                    Street = "221B Baker Street",
                    City = "London",
                    State = "NW",
                    ZIP = "NW16XE",
                    Country = "England"
                },
                // set right bottom corner
                HorizontalAlignment = HorizontalAlignment.Left,
                VerticalAlignment = VerticalAlignment.Center,
                Width = 100,
                Height = 100,
                Margin = new Padding(10)
            };

            // create signature preview options object
            PreviewSignatureOptions previewOption = new PreviewSignatureOptions(signOptions, GenerateSignaturePreview.CreateSignatureStream, GenerateSignaturePreview.ReleaseSignatureStream)
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
            string imageFilePath = Path.Combine(Constants.OutputPath, "GenerateSignaturePreview", $"signature-{previewOptions.SignatureId}-{previewOptions.SignOptions.SignatureType}.jpg");
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