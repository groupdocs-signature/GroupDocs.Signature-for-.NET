using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    

    public class SignWithAlignments
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithAlignment", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // define qr-code size
                int qrWidth = 100;
                int qrHeight = 100;
                // define list of options
                List<SignOptions> listOptions = new List<SignOptions>();
                // walk through all alignment values to locate signature at all page alignment areas
                foreach (HorizontalAlignment horizontalAlignment in Enum.GetValues(typeof(HorizontalAlignment)))
                {
                    foreach (VerticalAlignment verticalAlignment in Enum.GetValues(typeof(VerticalAlignment)))
                    {
                        if (verticalAlignment != VerticalAlignment.None && horizontalAlignment != HorizontalAlignment.None)
                        {
                            listOptions.Add(
                                new QrCodeSignOptions("Left-Top")
                                {
                                // set signature rectangle
                                Width = qrWidth,
                                    Height = qrHeight,

                                // set signature alignment
                                HorizontalAlignment = horizontalAlignment,
                                    VerticalAlignment = verticalAlignment,

                                    Margin = new Padding(5),
                                });
                        }
                    }
                }
                // sign document to file
                signature.Sign(outputFilePath, listOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}