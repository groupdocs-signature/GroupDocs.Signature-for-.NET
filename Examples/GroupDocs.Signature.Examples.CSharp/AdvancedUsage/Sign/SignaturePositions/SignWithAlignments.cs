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
        /// Sign document with setting position of signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithAlignments : Sign document with setting position of signature\n");

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
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}