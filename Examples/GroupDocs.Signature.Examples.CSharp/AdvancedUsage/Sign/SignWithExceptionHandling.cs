using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class SignWithExceptionHandling
    {
        /// <summary>
        /// Sign document with exception handling
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithExceptionHandling : Sign document with exception handling\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithExceptionsHandling", fileName);
            try
            {
                using (Signature signature = new Signature(filePath))
                {
                    DigitalSignOptions options = new DigitalSignOptions()
                    {
                        CertificateFilePath = Constants.CertificatePfx,
                        ImageFilePath = Constants.ImageHandwrite,
                        // skip password specification
                        //Password = "123456780"
                    };

                    // sign document to file
                    signature.Sign(outputFilePath, options);
                }
            }
            catch (GroupDocsSignatureException ex)
            {
                Console.WriteLine("GroupDocs Signature Exception: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("System Exception: " + ex.Message);
            }
        }
    }
}