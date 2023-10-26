using System;
using System.IO;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalUsingCertificateStore
    {
        /// <summary>
        /// Sign document with digital signatures got from one of certificate stores
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalUsingCertificateStore : Sign document with digital signatures got from one of certificate stores\n");

            //The document to be signed.            
            string filePath = Constants.SAMPLE_PDF;

            List<DigitalSignature> signatures = new List<DigitalSignature>();
            try
            {
                //Get digital signatures from common storage
                //If such storage does not exist at your system an exception will be thrown
                List<DigitalSignature> signaturesMy =
                DigitalSignature.LoadDigitalSignatures(StoreName.My, StoreLocation.CurrentUser);
                signatures.AddRange(signaturesMy);

                //Get digital signatures from custom storage
                //If such storage does not exist at your system an exception will be thrown
                List<DigitalSignature> signaturesCustom =
                DigitalSignature.LoadDigitalSignatures("My", StoreLocation.CurrentUser);
                signatures.AddRange(signaturesCustom);
            }
            catch (Exception)
            {
                Console.WriteLine("Something wrong with your certificates storage");
            }

            int signatureNumber = 0;
            //sign document with all signatures
            foreach (DigitalSignature digitalSignature in signatures)
            {
                signatureNumber++;
                string outputFilePath = 
                    Path.Combine(Constants.OutputPath, "SignWithDigitalUsingCertificateStore", $"digitallySigned_{signatureNumber}.pdf");

                using (Signature signature = new Signature(filePath))
                {
                    //Only certificates with private key are good for digital signing
                    if (digitalSignature?.Certificate?.HasPrivateKey != true) 
                    {
                        continue;
                    }
                    //Signatures might be filtered by properties
                    if (digitalSignature?.Certificate?.FriendlyName?.Contains("No SIGN") == true) 
                    {
                        continue;
                    }
                    try
                    {
                        DigitalSignOptions options = new DigitalSignOptions()
                        {
                            Signature = digitalSignature,
                            // digital certificate details
                            Reason = "Approved",
                            Contact = "John Smith",
                            Location = "New York",
                        };

                        SignResult signResult = signature.Sign(outputFilePath, options);
                        Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"\nCertificate #{signatureNumber} is not suitable for signing. Perhaps it does not have exportable private key.");
                    }
                }
                return;
            }
        }
    }
}