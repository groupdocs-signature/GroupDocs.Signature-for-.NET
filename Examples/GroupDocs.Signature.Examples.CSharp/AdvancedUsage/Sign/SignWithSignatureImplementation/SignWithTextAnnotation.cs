using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;
    

    public class SignWithTextAnnotation
    {
        /// <summary>
        /// Sign document with text signature applying Annotation implementation type
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithTextAnnotation : Sign document with text signature applying Annotation implementation type\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextAnnotation", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.Annotation,
                    // for Pdf document type there is ability to setup extended appearances
                    Appearance = new PdfTextAnnotationAppearance()
                    {
                        Border = new Border()
                        {
                            Color = Color.Blue,
                            DashStyle = DashStyle.Dash,
                            Weight = 2,
                        },
                        BorderEffect = PdfTextAnnotationBorderEffect.Cloudy,
                        BorderEffectIntensity = 2,
                        HCornerRadius = 10,
                        // text content of an annotation
                        Contents = "Sample",
                        Subject = "Sample subject",
                        Title = "Sample Title",
                    },
                    // set alignment
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    // set margin with 20 pixels for all sides
                    Margin = new Padding(20)
                };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}