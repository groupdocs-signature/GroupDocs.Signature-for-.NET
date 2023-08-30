using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignPdfWithFormFieldAdvancedCombobox
    {
        /// <summary>
        /// Sign pdf document with combo box signatures applying specific options
        /// Please be aware that this example works only on licensed product due to limitation with Pdf processing
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignPdfWithFormFieldAdvancedCombobox : Sign pdf document with form-field signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignPdfWithFormFieldAdvancedCombobox", fileName);

            try
            {
                using (Signature signature = new Signature(filePath))
                {
                    // instantiate combo box form field signature
                    List<string> items = new List<string>() { "Red", "Green", "Blue" };

                    ComboboxFormFieldSignature combobox = new ComboboxFormFieldSignature("combo1", items, "Blue");

                    // instantiate options based on text form field signature
                    FormFieldSignOptions options = new FormFieldSignOptions(combobox)
                    {
                        Top = 200,
                        Left = 50,
                        Height = 20,
                        Width = 200
                    };

                    // sign document to file
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
            catch
            {
                Helper.WriteError("\nThis example requires license to properly run. " +
                              "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                              "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                              "\nLearn how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
            }
        }
    }
}