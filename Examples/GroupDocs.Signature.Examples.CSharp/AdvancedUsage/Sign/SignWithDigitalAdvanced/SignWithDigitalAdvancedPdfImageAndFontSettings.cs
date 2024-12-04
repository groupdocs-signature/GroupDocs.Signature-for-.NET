using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithDigitalAdvancedPdfImageAndFontSettings
    {
        /// <summary>
        /// Sign PDF Document incrementally with digital signature applying special signature appearance settings.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithPdfDigitalAdvanced : Sign PDF document with digital signature applying special signature appearance settings, image and font settings\n");
            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            
            string imageFilePath = Constants.ImageHandwrite;
            string sourceFile = Constants.SAMPLE_PDF;
            string outputFile = Path.Combine(Constants.OutputPath, "SignWithPdfDigitalAdvanced", fileName);
            string outputFile1 = Path.Combine(Constants.OutputPath, "SignWithPdfDigitalAdvanced", "1" + fileName);
            
            string[] certificatePaths = { Constants.CertificatePfx, Constants.CertificatePfx };
            int iteration = 0;
            foreach (var certificatePath in certificatePaths)
            {
                using (Signature signature = new Signature(sourceFile))
                {
                    DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                    {
                        // certificate password
                        Password = "1234567890",
                        // digital certificate details
                        Reason = "Sign",
                        Contact = "JohnSmith" + iteration,
                        Location = "Office1" + iteration,
                        Visible = true,
                        Left = 400,
                        Top = 20 + iteration * 70,
                        Height = 70,
                        Width = 200,
                        // image as digital certificate appearance on document pages
                        ImageFilePath = imageFilePath,
                        Appearance = new PdfDigitalSignatureAppearance()
                        {
                            // apply custom font color
                            Foreground = Color.FromArgb(50, Color.Gray),
                            // apply custom font settings
                            FontFamilyName = "TimesNewRoman",
                            FontSize = 12
                        },
                    };

                    if (iteration == 1)
                    {
                        outputFile = outputFile1;
                    }

                    SignResult signResult = signature.Sign(outputFile, options);
                    Console.WriteLine(
                        $"\nSource document signed successfully {iteration++}-time with " +
                        $"{signResult.Succeeded.Count} signature(s).\nFile saved at {outputFile}.");
                }

                sourceFile = outputFile;
            }
        }
    }
}