using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalAdvancedPdfCertificate
    {
        /// <summary>
        /// Sign document with digital signature applying PDF document-specific options
        /// Please be aware that this example works only on licensed product due to limitation with Pdf processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAdvancedPdfCertificate : Sign document with digital signature applying PDF certificate options\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalAdvancedPdf", "digitallyCertified.pdf");

            //Certify pdf document with digital signature
            using (Signature signature = new Signature(filePath))
            {
                PdfDigitalSignature pdfDigitalSignature = new PdfDigitalSignature()
                {
                    ContactInfo = "Contact",
                    Location = "Location",
                    Reason = "Reason",
                    // Setting pdf digital signature type as Certificate
                    Type = PdfDigitalSignatureType.Certificate
                };

                //Create digital signing options
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
                    Password = "1234567890",
                    // Setting document-specific options
                    Signature = pdfDigitalSignature,
                    // Page position
                    VerticalAlignment = VerticalAlignment.Bottom,
                    HorizontalAlignment = HorizontalAlignment.Right
                };

                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
        }
    }
}