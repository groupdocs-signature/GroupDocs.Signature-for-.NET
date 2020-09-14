using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithDigitalAdvanced
    {
        /// <summary>
        /// Sign document with digital signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithDigitalAdvanced : Sign document with digital signature applying specific options\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string imagePath = Constants.ImageStamp;
            string certificatePath = Constants.CertificatePfx;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithDigitalAdvanced", fileName);

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

                    // image as digital certificate appearance on document pages
                    ImageFilePath = imagePath,
                    //                    
                    AllPages = true,
                    Width = 160,
                    Height = 80,
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Margin = new Padding() {  Bottom = 10, Right = 10},

                    // setup signature border
                    Border = new Border()
                    {
                        Visible = true,
                        Color = Color.Red,
                        DashStyle = DashStyle.DashDot,
                        Weight = 2
                    },

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