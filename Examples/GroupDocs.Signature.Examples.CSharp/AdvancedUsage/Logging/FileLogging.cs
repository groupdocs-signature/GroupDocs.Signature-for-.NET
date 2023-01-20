using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Logging;
    using GroupDocs.Signature.Options;

    public class FileLogging
    {
        /// <summary>
        /// Sign password-protected document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # FileLogging : Using file Logging\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_PWD;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "FileLogging", fileName);
            string outputLogFile = Path.Combine(Constants.OutputPath, "Logging", "signature-log.txt");
            LoadOptions loadOptions = new LoadOptions()
            {
                Password = "12345678901" // wrong password
            };
            var logger = new FileLogger(outputLogFile);
            var settings = new SignatureSettings(logger);
            // setup custom log level
            settings.LogLevel = LogLevel.Trace | LogLevel.Error;
            try
            {
                using (Signature signature = new Signature(filePath, loadOptions, settings))
                {
                    QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                    {
                        EncodeType = QrCodeTypes.QR,
                        Left = 100,
                        Top = 100
                    };

                    // sign document to file
                    signature.Sign(outputFilePath, options);
                }
            }
            catch
            { 
                
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}