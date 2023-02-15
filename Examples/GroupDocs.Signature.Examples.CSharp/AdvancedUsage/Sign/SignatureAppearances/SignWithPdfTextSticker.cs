using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;

    public class SignWithPdfTextSticker
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithPdfTextSticker : Sign document with text signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithAppearances", "PdfSticker.pdf");

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set signature position 
                    Left = 50,
                    Top = 200,
                    // set signature rectangle
                    Width = 100,
                    Height = 30,
                    // setup proper signature implementation
                    SignatureImplementation = TextSignatureImplementation.Sticker,
                    Appearance = new PdfTextStickerAppearance()
                    {
                        // select sticker icon
                        Icon = PdfTextStickerIcon.Star,
                        // setup if pop-up annotation will be opened by default
                        Opened = false,
                        // text content of an annotation
                        Contents = "Sample",
                        Subject = "Sample subject",
                        Title = "Sample Title"
                    },
                    Margin = new Padding() { Bottom = 20, Right = 20 },
                    // set text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
                };

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}