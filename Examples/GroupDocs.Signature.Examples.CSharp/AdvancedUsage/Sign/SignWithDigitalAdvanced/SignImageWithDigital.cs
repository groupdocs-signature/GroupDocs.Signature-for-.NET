using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignImageWithDigital
    {
        /// <summary>
        /// Sign image with digital signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignImageWithDigital : Sign image with digital signature\n");

            // The path to the documents directory.
            string inputFile = Constants.SAMPLE_IMAGE;
            string fileName = Path.GetFileName(inputFile);
            string outputFile = Path.Combine(Constants.OutputPath, "SignImageWithDigital", $"signed_{fileName}");
            string password = "MySecurePassword123";

            Constants.CheckDir(outputFile);

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

                // Sign with SaveOptions
                SignResult signResult = signature.Sign(outputFile, signOptions, saveOptions);

                // Check results
                if (signResult.Succeeded != null && signResult.Succeeded.Count > 0)
                {
                    Console.WriteLine($"Image signed successfully!");
                    Console.WriteLine($"Signatures added: {signResult.Succeeded.Count}");
                    Console.WriteLine($"File saved at {outputFile}.");
                }
                else
                {
                    Console.WriteLine("Signing failed.");
                    if (signResult.Failed != null && signResult.Failed.Count > 0)
                    {
                        Console.WriteLine($"Failed: {signResult.Failed.Count}");
                    }
                }
            }
        }
    }
}

