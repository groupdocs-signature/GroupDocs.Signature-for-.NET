using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Collections.Generic;

    public class SignWithTextFormField
    {
        /// <summary>
        /// Sign document with text signature with updating existing Form Field document component
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithTextFormField : Sign document with text signature with updating existing Form Field document component\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_FORMS_DOCX;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextFormField", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions ffOptions1 = new TextSignOptions("Document is approved")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.FormField,
                    FormTextFieldType = FormTextFieldType.PlainText
                };

                TextSignOptions ffOptions2 = new TextSignOptions("John Smith")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.FormField,
                    FormTextFieldType = FormTextFieldType.RichText,
                    FormTextFieldTitle = "UserSignatureFullName"
                };

                List<SignOptions> listOptions = new List<SignOptions>();
                listOptions.Add(ffOptions1);
                listOptions.Add(ffOptions2);
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, listOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}