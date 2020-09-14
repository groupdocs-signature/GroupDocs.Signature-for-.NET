using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPdfWithFormField
    {
        /// <summary>
        /// Sign pdf document with form-field signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignPdfWithFormField : Sign pdf document with form-field signature\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithFormField", "SignedWithFormField.pdf");

            using (Signature signature = new Signature(filePath))
            {
                // instantiate text form field signature
                FormFieldSignature textSignature = new TextFormFieldSignature("FieldText", "Value1");
                // instantiate options based on text form field signature
                FormFieldSignOptions options = new FormFieldSignOptions(textSignature)
                {
                    Top = 150,
                    Left = 50,
                    Height = 50,
                    Width = 200
                };

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}