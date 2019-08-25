using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPdfWithFormFieldAdvanced
    {
        /// <summary>
        /// Sign pdf document with form-field signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithFormFieldAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                List<SignOptions> listOptions = new List<SignOptions>();


                // instantiate text form field signature
                FormFieldSignature textSignature = new TextFormFieldSignature("tbData1", "Value-1");
                // instantiate options based on text form field signature
                FormFieldSignOptions optionsTextFF = new FormFieldSignOptions(textSignature)
                {
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Top,
                    Margin = new Padding(10, 20, 0, 0),
                    Height = 10,
                    Width = 100
                };

                // instantiate text form field signature
                CheckboxFormFieldSignature chbSignature = new CheckboxFormFieldSignature("chbData1", true);
                // instantiate options based on text form field signature
                FormFieldSignOptions optionsTextCHB = new FormFieldSignOptions(chbSignature)
                {
                    HorizontalAlignment = HorizontalAlignment.Center,
                    VerticalAlignment = VerticalAlignment.Top,
                    Margin = new Padding(0, 0, 0, 0),
                    Height = 10,
                    Width = 100,
                };


                // instantiate text form field signature
                DigitalFormFieldSignature digSignature = new DigitalFormFieldSignature("dgData1");
                // instantiate options based on text form field signature
                FormFieldSignOptions optionsTextDIG = new FormFieldSignOptions(digSignature)
                {
                    HorizontalAlignment = HorizontalAlignment.Right,
                    VerticalAlignment = VerticalAlignment.Top,
                    Margin = new Padding(0, 50, 0, 0),
                    Height = 10,
                    Width = 100,
                };

                listOptions.Add(optionsTextFF);
                listOptions.Add(optionsTextCHB);
                listOptions.Add(optionsTextDIG);

                // sign document to file
                signature.Sign(outputFilePath, listOptions);
                Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
            }
        }
    }
}