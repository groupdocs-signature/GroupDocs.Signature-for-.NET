using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Logging;
    using GroupDocs.Signature.Options;

    public class ConsoleLoggingWithLogLevels
    {
        /// <summary>
        /// Choose which kinds of messages are written to the log
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # ConsoleLoggingWithLogLevels : Choose which kinds of messages are written to the log\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "ConsoleLoggingWithLogLevels", fileName);

            // LogLevel decides which kinds of messages reach the logger (it takes effect since version 26.9).
            // Its values are flags: Error, Warning and Trace. LogLevel.All is the default, LogLevel.None logs nothing.
            // Signing with an expired certificate that is explicitly allowed writes a warning.
            Console.WriteLine("Signing with LogLevel.None:");
            SignatureSettings noLog = new SignatureSettings(new ConsoleLogger())
            {
                LogLevel = LogLevel.None
            };
            using (Signature signature = new Signature(filePath, noLog))
            {
                signature.Sign(outputFilePath, new DigitalSignOptions(Constants.CertificateExpiredPfx) { AllowExpired = true });
            }

            Console.WriteLine("\nSigning with LogLevel.Error | LogLevel.Warning:");
            SignatureSettings warnings = new SignatureSettings(new ConsoleLogger())
            {
                // errors and warnings, without the step-by-step traces
                LogLevel = LogLevel.Error | LogLevel.Warning
            };
            using (Signature signature = new Signature(filePath, warnings))
            {
                signature.Sign(outputFilePath, new DigitalSignOptions(Constants.CertificateExpiredPfx) { AllowExpired = true });
            }

            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}
