using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Options.Appearances;
    using System.Collections.Generic;

    public class SignWithTextFormField
    {
        /// <summary>
        /// Sign document with text signature with updating existing Form Field document component.
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_FORMS_DOCX;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextFormField", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions ffOptions1 = new TextSignOptions("John Smith")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.FormField,
                    FormTextFieldType = FormTextFieldType.PlainText,
                    FormTextFieldTitle = "UserSignatureFullName"
                };

                TextSignOptions ffOptions2 = new TextSignOptions("Document is approved")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.FormField,
                    FormTextFieldType = FormTextFieldType.RichText,
                    FormTextFieldTitle = "UserSignatureComment"
                };

                List<SignOptions> listOptions = new List<SignOptions>();
                listOptions.Add(ffOptions1);
                listOptions.Add(ffOptions2);
                // sign document to file
                signature.Sign(outputFilePath, listOptions);
            }
            Console.WriteLine($"Source document signed successfully.\nFile saved at {outputFilePath}");
        }
    }
}