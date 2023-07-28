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
            using (Signature signature = new Signature(outputFilePath))
            {
                Console.WriteLine($"\nList of DICOM xmp metadata:");
                IDocumentInfo signedDocumentInfo = signature.GetDocumentInfo();
                foreach (var item in signedDocumentInfo.MetadataSignatures)
                {
                    Console.WriteLine(item.ToString());
                }
                
            }
        }
    }
}