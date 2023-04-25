using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithDigitalAdvancedPdfAppearance
    {
        /// <summary>
        /// Sign PDF Document with digital signature applying special signature appearance settings.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithPdfDigitalAdvanced : Sign PDF document with digital signature applying special signature appearance settings\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithPdfDigitalAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                DigitalSignOptions options = new DigitalSignOptions(certificatePath)
                {
                    // certificate password
                    Password = "1234567890",
                    // digital certificate details
                    Reason = "Approved",
                    Contact = "John Smith",
                    Location = "New York",

                    // apply custom PDF signature appearance
                    Appearance = new PdfDigitalSignatureAppearance()
                    {
                        // do now show contact details
                        ContactInfoLabel = "C",
                        // simplify reason label
                        ReasonLabel = "R",
                        // change location label
                        LocationLabel = "@=>",
                        DigitalSignedLabel = "By",
                        DateSignedAtLabel = "On",
                        // apply custom appearance color
                        Background = Color.FromArgb(50, Color.LightGray),
                        // apply custom font settings
                        FontFamilyName = "Arial",
                        FontSize = 8
                    },
                    //
                    AllPages = true,
                    Width = 160,
                    Height = 80,
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Margin = new Padding() { Bottom = 10, Right = 10 },

                    // setup signature border
                    Border = new Border()
                    {
                        Visible = true,
                        Color = Color.FromArgb(80, Color.DarkGray),
                        DashStyle = DashStyle.DashDot,
                        Weight = 2
                    }
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