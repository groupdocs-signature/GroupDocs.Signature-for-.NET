using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Security.Cryptography.X509Certificates;

    public class SignWithDigitalAdvancedSpreadSheets
    {
        /// <summary>
        /// Sign SpreadSheets by using digital signature as a certificate container
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAdvancedSpreadSheets : Sign SpreadSheets by using digital signature as a certificate container\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_SPREADSHEET;
            string certificatePath = Constants.CertificatePfx;
            string password = "1234567890";
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalAdvancedSpreadSheets", "digitalySigned.xlsx");

            //Certify pdf document with digital signature
            using (Signature signature = new Signature(filePath))
            {
                DigitalSignature digitalSignature = new DigitalSignature()
                {
                    Certificate = new X509Certificate2(certificatePath, password)
                };

                //Create digital signing options
                DigitalSignOptions options = new DigitalSignOptions()
                {
                    Signature = digitalSignature,
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