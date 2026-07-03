using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SaveWordProcessingWithOoxmlCompliance
    {
        /// <summary>
        /// Sign a WordProcessing document and override the OOXML compliance level on save.
        /// When <see cref="WordProcessingSaveOptions.OoxmlCompliance"/> is null (default) the
        /// loaded document's compliance is preserved; when set, it overrides the original.
        /// Only honoured for OOXML output formats (Docx, Docm, Dotx, Dotm and FlatOpc variants).
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SaveWordProcessingWithOoxmlCompliance : Sign WordProcessing document with explicit OOXML compliance\n");

            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SaveWordProcessingWithOoxmlCompliance", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // simple text signature
                TextSignOptions signOptions = new TextSignOptions("John Smith")
                {
                    Left = 100,
                    Top = 100,
                    Width = 200,
                    Height = 60
                };

                // Force ISO 29500:2008 Strict on save regardless of the source's compliance.
                // Other allowed values: OoxmlCompliance.Ecma, OoxmlCompliance.Transitional.
                WordProcessingSaveOptions saveOptions = new WordProcessingSaveOptions(WordProcessingSaveFileFormat.Docx)
                {
                    OoxmlCompliance = OoxmlCompliance.Strict
                };

                SignResult result = signature.Sign(outputFilePath, signOptions, saveOptions);
                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
