using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithTextFontStyles
    {
        /// <summary>
        /// Sign document with text signatures using different font styles
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithTextFontStyles : Sign document with text signatures using different font styles\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextFontStyles", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // Fonts are set with the SignatureFont properties. Since version 26.9 the .NET 6, .NET 8 and .NET 10
                // builds no longer convert System.Drawing.Font to SignatureFont.
                List<SignOptions> listOptions = new List<SignOptions>
                {
                    new TextSignOptions("John Smith")
                    {
                        Left = 100,
                        Top = 100,
                        ForeColor = Color.DarkBlue,
                        Font = new SignatureFont { FamilyName = "Arial", Size = 16, Bold = true, Italic = true }
                    },
                    new TextSignOptions("Approved")
                    {
                        Left = 100,
                        Top = 150,
                        ForeColor = Color.Green,
                        Font = new SignatureFont { FamilyName = "Arial", Size = 14, Underline = true }
                    },
                    new TextSignOptions("Draft")
                    {
                        Left = 100,
                        Top = 200,
                        ForeColor = Color.Red,
                        Font = new SignatureFont { FamilyName = "Arial", Size = 14, Strikeout = true }
                    }
                };

                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
