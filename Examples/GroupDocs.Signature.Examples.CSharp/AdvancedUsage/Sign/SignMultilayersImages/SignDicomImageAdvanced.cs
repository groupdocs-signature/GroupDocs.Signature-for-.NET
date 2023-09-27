using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignDicomImageAdvanced
    {
        /// <summary>
        /// Following example demonstrates how to sign multilayer image document DICOM format with several signatures
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignDicomImageAdvanced : Sign multilayer image document DICOM format with several signatures\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DICOM;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignDicomImageAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                QrCodeSignOptions options = new QrCodeSignOptions("Patient #36363393. R: No-Issues")
                {
                    AllPages = true,
                    // set QR area
                    Width = 100,
                    Height = 100,
                    // put right bottom corner
                    VerticalAlignment = VerticalAlignment.Bottom,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    Margin = new Padding() { Right = 5, Left = 5 }
                };

                //Add Xmp meta-data to signed document
                DicomSaveOptions dicomSaveOptions = new DicomSaveOptions()
                {
                    XmpEntries = new List<DicomXmpEntry>() { new DicomXmpEntry(DicomXmpType.PatientName, "Patient #4") }
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options, dicomSaveOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
                Console.WriteLine("\nList of newly created signatures:");
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"{temp.SignatureType} at page #{temp.PageNumber}: Id:{temp.SignatureId}.");
                }
            }

            //Get signed DICOM image info
            DocumentInfo(outputFilePath);

            //Search for signatures at signed DICOM
            Search(outputFilePath);

            //Verify signed DICOM
            Verify(outputFilePath);

            //Preview signed DICOM
            Preview(outputFilePath);
        }

        private static void DocumentInfo(string filePath)
        {
            //Get signed DICOM image info
            using (Signature signature = new Signature(filePath))
            {
                IDocumentInfo signedDocumentInfo = signature.GetDocumentInfo();

                //Print XMP data
                Console.WriteLine($"\nList of DICOM xmp metadata:");
                foreach (var item in signedDocumentInfo.MetadataSignatures)
                {
                    Console.WriteLine(item.ToString());
                }
            }
        }

        private static void Verify(string filePath)
        {
            // verify document signatures
            using (Signature signature = new Signature(filePath))
            {
                QrCodeVerifyOptions options = new QrCodeVerifyOptions()
                {
                    AllPages = true,
                    Text = "Patient #36363393",
                    MatchType = TextMatchType.Contains
                };

                VerificationResult result = signature.Verify(options);
                if (result.IsValid)
                {
                    Console.WriteLine($"\nDICOM {filePath} has {result.Succeeded.Count} successfully verified signatures!");
                }
                else
                {
                    Helper.WriteError($"\nDocument {filePath} failed verification process.");
                }
            }
        }

        private static void Search(string filePath)
        {
            // search for signatures in document
            using (Signature signature = new Signature(filePath))
            {
                List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
                Console.WriteLine($"\nDICOM ['{filePath}'] contains following signatures.");
                foreach (var QrCodeSignature in signatures)
                {
                    Console.WriteLine($"QRCode signature found at page {QrCodeSignature.PageNumber} with type {QrCodeSignature.EncodeType.TypeName} and text {QrCodeSignature.Text}");
                }
            }
        }

        private static void Preview(string filePath)
        {
            // generate preview
            using (Signature signature = new Signature(filePath))
            {
                PreviewOptions previewOption = new PreviewOptions(CreatePageStream, ReleasePageStream)
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.PNG,
                };
                signature.GeneratePreview(previewOption);
                Console.WriteLine($"\nDICOM ['{filePath}'] pages previews were successfully generated!");
            }
        }

        private static Stream CreatePageStream(int pageNumber)
        {
            string imageFilePath = Path.Combine(Constants.OutputPath, "SignDicomImageAdvanced", "preview-" + pageNumber.ToString() + ".jpg");
            var folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        private static void ReleasePageStream(int pageNumber, Stream pageStream)
        {
            pageStream.Dispose();
        }

    }
}