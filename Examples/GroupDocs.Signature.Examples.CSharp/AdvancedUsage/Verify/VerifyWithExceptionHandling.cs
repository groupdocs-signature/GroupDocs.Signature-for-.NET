using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class VerifyWithExceptionHandling
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_DOCX;            
            try
            {
                using (Signature signature = new Signature(filePath))
                {
                    DigitalVerifyOptions options = new DigitalVerifyOptions()
                    {
                        CertificateFilePath = "dummy.pfx",
                        // skip password specification
                        // Password = "1234567890"
                    };
                    // sign document to file
                    VerificationResult result = signature.Verify(options);
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