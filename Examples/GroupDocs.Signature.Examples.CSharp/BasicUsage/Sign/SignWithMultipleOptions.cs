using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithMultipleOptions
    {
        /// <summary>
        /// Sign document with multiple signature types
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWithMultipleOptions : Sign document with multiple signature types \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithMultiple", "SignWithMultiple.docx");

            using (Signature signature = new Signature(filePath))
            {
                // define several signature options of different types and settings
                TextSignOptions textOptions = new TextSignOptions("Text signature")
                {
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Left
                };                
                BarcodeSignOptions barcodeOptions = new BarcodeSignOptions("123456")
                {                    
                    EncodeType = BarcodeTypes.Code128,
                    Left = 0,
                    Top = 150,
                    Height = 50,
                    Width = 200
                };
                QrCodeSignOptions qrcodeOptions = new QrCodeSignOptions("JohnSmith")
                {                    
                    EncodeType = QrCodeTypes.QR,
                    Left = 0,
                    Top = 220
                };
                DigitalSignOptions digitalOptions = new DigitalSignOptions(Constants.CertificatePfx)
                {
                    ImageFilePath = Constants.ImageHandwrite,
                    Left = 20,
                    Top = 400,
                    Height = 100,
                    Width = 100,
                    Password = "1234567890"
                };
                ImageSignOptions imageOptions = new ImageSignOptions(Constants.ImageStamp)
                {
                    Left = 20,
                    Top = 550,
                    Height = 100,
                    Width = 100
                };
                MetadataSignOptions metaOptions = new MetadataSignOptions();
                WordProcessingMetadataSignature[] metaSignatures = new WordProcessingMetadataSignature[]
                {
                    new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes"),
                    new WordProcessingMetadataSignature("CreatedOn", DateTime.Now)
                };
                metaOptions.Signatures.AddRange(metaSignatures);

                // define list of signature options
                List<SignOptions> listOptions = new List<SignOptions>();

                listOptions.Add(textOptions);                
                listOptions.Add(barcodeOptions);
                listOptions.Add(qrcodeOptions);
                listOptions.Add(digitalOptions);
                listOptions.Add(imageOptions);
                listOptions.Add(metaOptions);

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, listOptions);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}