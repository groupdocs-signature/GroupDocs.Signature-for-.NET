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
        /// Sign pdf document with form-field signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignPdfWithFormFieldAdvanced : Sign pdf document with form-field signature applying specific options\n");

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
                    Top = 200,
                    Left = 50,
                    Height = 20,
                    Width = 200
                };

                // instantiate text form field signature
                CheckboxFormFieldSignature chbSignature = new CheckboxFormFieldSignature("chbData1", true);
                // instantiate options based on text form field signature
                FormFieldSignOptions optionsTextCHB = new FormFieldSignOptions(chbSignature)
                {
                    Top = 300,
                    Left = 50,
                    Height = 20,
                    Width = 200
                };

                // instantiate text form field signature
                DigitalFormFieldSignature digSignature = new DigitalFormFieldSignature("dgData1");
                // instantiate options based on text form field signature
                FormFieldSignOptions optionsTextDIG = new FormFieldSignOptions(digSignature)
                {
                    Top = 400,
                    Left = 50,
                    Height = 20,
                    Width = 200
                };

                listOptions.Add(optionsTextFF);
                listOptions.Add(optionsTextCHB);
                listOptions.Add(optionsTextDIG);

                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
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