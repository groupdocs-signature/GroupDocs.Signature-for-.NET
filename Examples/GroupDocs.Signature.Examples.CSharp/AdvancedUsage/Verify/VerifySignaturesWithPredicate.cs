using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifySignaturesWithPredicate
    {
        /// <summary>
        /// Verify signatures with predicate function
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # VerifySignaturesWithPredicate : Verify signatures with predicate function\n");

            // The path to the documents directory.
            string signedFile = Constants.SAMPLE_PDF_SIGNED_DIGITAL;

            try
            {
                using (Signature signature = new Signature(signedFile))
                {
                    // Option 1: Verify all digital signatures and filter with predicate
                    // Create verify options for digital signatures
                    DigitalVerifyOptions verifyOptions = new DigitalVerifyOptions();

                    // Verify and filter: only signatures on page 1
                    List<BaseSignature> verifiedSignatures = signature.Verify(
                        verifyOptions,
                        sig => sig.PageNumber == 1
                    );

                    Console.WriteLine($"Verified {verifiedSignatures.Count} digital signatures on page 1");

                    // Option 2: Verify image digital signatures with predicate
                    // For images with digital steganography signatures
                    ImageDigitalVerifyOptions imageVerifyOptions = new ImageDigitalVerifyOptions
                    {
                        Password = "MySecurePassword123",
                        DetectionThresholdPercent = 75
                    };

                    // Verify and filter: only valid signatures
                    List<BaseSignature> validImageSignatures = signature.Verify(
                        imageVerifyOptions,
                        sig => sig is DigitalSignature digitalSig && digitalSig.IsValid
                    );

                    Console.WriteLine($"Verified {validImageSignatures.Count} valid image digital signatures");

                    // Option 3: Verify multiple signature types with complex predicate
                    List<VerifyOptions> verifyOptionsList = new List<VerifyOptions>
                    {
                        new DigitalVerifyOptions(),
                        new TextVerifyOptions { Text = "Approved" }
                    };

                    // Verify and filter: signatures on first 3 pages that are valid
                    List<BaseSignature> filteredVerifiedSignatures = signature.Verify(
                        verifyOptionsList,
                        sig => sig.PageNumber >= 1 &&
                               sig.PageNumber <= 3 &&
                               (sig is DigitalSignature digitalSig ? digitalSig.IsValid : true)
                    );

                    Console.WriteLine($"Verified {filteredVerifiedSignatures.Count} signatures on pages 1-3");

                    // Process verified results
                    foreach (var sig in filteredVerifiedSignatures)
                    {
                        Console.WriteLine($"  ✓ Verified signature on page {sig.PageNumber}");
                        Console.WriteLine($"    Type: {sig.SignatureType}");

                        if (sig is DigitalSignature digitalSig)
                        {
                            Console.WriteLine($"    Is Valid: {digitalSig.IsValid}");
                            Console.WriteLine($"    Sign Time: {digitalSig.SignTime}");
                        }
                    }
                }
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Validation error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}

