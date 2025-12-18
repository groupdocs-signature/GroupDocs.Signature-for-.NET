using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyImageWithDigital
    {
        /// <summary>
        /// Verify digital signature on image
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifyImageWithDigital : Verify digital signature on image\n");

            // First, sign an image to have a signed file for verification
            string inputFile = Constants.SAMPLE_IMAGE;
            string fileName = Path.GetFileName(inputFile);
            string signedFile = Path.Combine(Constants.OutputPath, "SignImageWithDigital", $"signed_{fileName}");
            string password = "MySecurePassword123";

            // Ensure the signed file exists by signing it first if it doesn't exist
            if (!File.Exists(signedFile))
            {
                Constants.CheckDir(signedFile);
                using (Signature signature = new Signature(inputFile))
                {
                    ImageDigitalSignOptions signOptions = new ImageDigitalSignOptions
                    {
                        Password = password
                    };

                    ImageSaveOptions saveOptions = new ImageSaveOptions
                    {
                        FileFormat = ImageSaveFileFormat.Png
                    };

                    signature.Sign(signedFile, signOptions, saveOptions);
                }
            }

            try
            {
                // Load the signed image
                using (Signature signature = new Signature(signedFile))
                {
                    // Create verify options with the same password used for signing
                    ImageDigitalVerifyOptions verifyOptions = new ImageDigitalVerifyOptions
                    {
                        Password = password,
                        DetectionThresholdPercent = 75 // Optional: set detection threshold (0-100%)
                    };

                    // Verify the signature
                    VerificationResult verifyResult = signature.Verify(verifyOptions);

                    // Check results
                    if (verifyResult.IsValid)
                    {
                        Console.WriteLine("Digital signature is valid!");
                        Console.WriteLine($"Verified signatures: {verifyResult.Succeeded.Count}");

                        foreach (var sig in verifyResult.Succeeded)
                        {
                            if (sig is DigitalSignature digitalSig)
                            {
                                Console.WriteLine($"  Signature ID: {digitalSig.SignatureId}");
                                Console.WriteLine($"  Sign Time: {digitalSig.SignTime}");
                                Console.WriteLine($"  Is Valid: {digitalSig.IsValid}");
                            }
                        }
                    }
                    else
                    {
                        Helper.WriteError("Digital signature is invalid or not found.");

                        if (verifyResult.Failed != null && verifyResult.Failed.Count > 0)
                        {
                            Console.WriteLine($"  Failed verifications: {verifyResult.Failed.Count}");
                            foreach (var failure in verifyResult.Failed)
                            {
                                Console.WriteLine($"    - {failure}");
                            }
                        }
                    }
                }
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Password validation error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}

