using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class UpdateText
    {
        /// <summary>
        /// Update Text signature in the document.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # UpdateText : Update Text signature in the document \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            // copy source file since Update method works with same Document
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "UpdateText", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // 
            using (Signature signature = new Signature(outputFilePath))
            {
                TextSearchOptions options = new TextSearchOptions();
                // search for text signatures in document
                List<TextSignature> signatures = signature.Search<TextSignature>(options);
                if (signatures.Count > 0)
                {
                    TextSignature textSignature = signatures[0];
                    // change Text property
                    textSignature.Text = "John Walkman";
                    // change position
                    textSignature.Left = textSignature.Left + 10;
                    textSignature.Top = textSignature.Top + 10;
                    // change size. Please note not all documents support changing signature size
                    textSignature.Width = 200;
                    textSignature.Height = 100;

                    bool result = signature.Update(textSignature);
                    if (result)
                    {
                        Console.WriteLine($"Signature with Text '{textSignature.Text}' was updated in the document ['{fileName}'].");
                    }
                    else
                    {
                        Helper.WriteError($"Signature was not updated in  the document! Signature with Text '{textSignature.Text}' was not found!");
                    }
                }
            }
        }
    }
}