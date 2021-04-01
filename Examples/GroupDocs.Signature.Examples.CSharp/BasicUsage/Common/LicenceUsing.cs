using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Drawing;

    /// <summary>
    /// Using GroupDocs license for various file formats
    /// </summary>
    public static class LicenceUsing
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # LicenceUsing : Using GroupDocs license for various file formats\n");

            //Signing documents in trial mode
            string trialOutPath = Path.Combine(Constants.OutputPath, "LicenceUsing", "Trial");
            SignFiles(trialOutPath);

            //Setting license
            License lic = new License();
            lic.SetLicense(Constants.LicensePath);

            //Signing documents in licensed mode
            string licenseOutPath = Path.Combine(Constants.OutputPath, "LicenceUsing", "License");
            SignFiles(licenseOutPath);

        }

        private static void SignFiles(string outPath)
        {
            List<string> files = new List<string>();
            files.Add(Constants.SAMPLE_PDF);
            files.Add(Constants.SAMPLE_IMAGE);
            files.Add(Constants.SAMPLE_SPREADSHEET);
            files.Add(Constants.SAMPLE_PRESENTATION);
            files.Add(Constants.SAMPLE_WORDPROCESSING);

            foreach (string item in files)
            {
                string fileName = Path.GetFileName(item);
                string outputFilePath = System.IO.Path.Combine(outPath, fileName);
                SignFile(item, outputFilePath);
            }
        }

        private static void SignFile(string filePath, string outputFilePath) {

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith")
                {
                    SignatureImplementation = TextSignatureImplementation.Image,
                    // set signature position
                    Left = 100,
                    Top = 100,
                    // set signature rectangle
                    Width = 100,
                    Height = 30,
                    // set Text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" }
                };

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
