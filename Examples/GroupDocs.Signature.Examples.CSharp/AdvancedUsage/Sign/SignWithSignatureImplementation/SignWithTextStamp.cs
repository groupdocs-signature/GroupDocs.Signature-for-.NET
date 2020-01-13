﻿using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithTextStamp
    {
        /// <summary>
        /// Sign document with text signature applying Stamp implementation type (this is default value)
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextStamp", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    // set alternative signature implementation on document page
                    SignatureImplementation = TextSignatureImplementation.Stamp,
                    // set alignment
                    VerticalAlignment = VerticalAlignment.Top,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    // set margin with 20 pixels for all sides
                    Margin = new Padding(20)
                };
                // sign document to file
                signature.Sign(outputFilePath, options);
            }
            Console.WriteLine($"\nSource document signed successfully.\nFile saved at {outputFilePath}");
        }
    }
}