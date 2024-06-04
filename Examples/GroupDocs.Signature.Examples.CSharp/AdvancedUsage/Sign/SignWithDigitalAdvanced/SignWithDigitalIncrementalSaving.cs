using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalIncrementalSaving
    {
        /// <summary>
        /// Sign document incrementally with digital certificates only
        /// </summary>
        public static void Run()
        {
            string [] certificates = new string[] {Constants.CertificatePfx, Constants.CertificatePfx};

            string[] passwords = new string[]
            {
                "1234567890",
                "1234567890"
            };
            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            int iteration = 0;
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalIncrementalSaving", fileName);

            foreach (var certificate in certificates)
            {
                using (Signature signature = new Signature(filePath))
                {
                    DigitalSignOptions options = new DigitalSignOptions(certificate)
                    {
                        // certificate password
                        Password = passwords[iteration],
                        // digital certificate details
                        Reason = $"Approved-{iteration}",
                        Contact = $"John{iteration} Smith{iteration}",
                        Location = $"Location-{iteration}",
                        // no image
                        AllPages = true, 
                        Left = 10 + 100 * (iteration - 1),
                        Top = 10 + 100 * (iteration - 1),
                        Width = 160,
                        Height = 80,
                        Margin = new Padding() { Bottom = 10, Right = 10 }
                    };

                    string outputPath = Path.Combine(outputFilePath, $"result-{iteration}.pdf");
                    SignResult signResult = signature.Sign(outputPath, options);                    
                    filePath = outputPath;
                    Console.WriteLine($"\nSource document signed successfully {iteration++}-time with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputPath}.");
                }
            }
        }
    }
}