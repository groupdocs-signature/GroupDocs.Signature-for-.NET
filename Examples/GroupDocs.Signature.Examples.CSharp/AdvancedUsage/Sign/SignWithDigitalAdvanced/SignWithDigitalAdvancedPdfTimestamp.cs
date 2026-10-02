using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalAdvancedPdfTimestamp
    {
        /// <summary>
        /// Sign document with digital signature applying PDF document-specific options
        /// Please be aware that this example works only on licensed product due to limitation with Pdf processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAdvancedPdfTimestamp : Sign document with digital signature applying PDF TimeStamp\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalAdvancedPdfTimestamp", "digitallySignedTimeStamp.pdf");

            //Sign pdf document with digital signature and time stamp
            using (Signature signature = new Signature(filePath))
            {
                PdfDigitalSignature pdfDigitalSignature = new PdfDigitalSignature()
                {
                    ContactInfo = "Contact",
                    Location = "Location",
                    Reason = "Reason",
                    // Time stamp from a time-stamp authority (RFC 3161), requested while the document is signed.
                    // User name and password are optional: set either, both or neither, as the authority requires.
                    // The time stamp uses the same digest as the signature (SHA-256 by default).
                    TimeStamp = new TimeStamp("https://freetsa.org/tsr", "", "")
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
                SignResult signResult = null;
                try
                {
                    signResult = signature.Sign(outputFilePath, options);
                }
                catch(Exception ex)
                {
                    Console.WriteLine($"Unexpected error signing with TimeStamp {pdfDigitalSignature.TimeStamp.Url} : {ex.Message}");
                }
                if (signResult != null)
                {
                    Console.WriteLine($"Source document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                    Console.WriteLine("List of newly created signatures:");
                    int number = 1;
                    foreach (BaseSignature temp in signResult.Succeeded)
                    {
                        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                    }
                }
            }
        }
    }
}