using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class HandlingPasswordRequiredException
    {
        /// <summary>
        /// Sign document and handle password required exception
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # HandlingPasswordRequiredException : Sign document and handle password required exception\n");

            // The path to the documents directory
            // This file is secured with password
            string filePath = Constants.SAMPLE_PDF_SIGNED_PWD;
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "HandlingExceptions", fileName);
            // skip initialization of LoadOptions with Password 
            // LoadOptions loadOptions = new LoadOptions(){ Password  = "1234567890" }            
            using (Signature signature = new Signature(filePath))
            {
                try
                {
                    QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                    {
                        EncodeType = QrCodeTypes.QR,
                        Left = 100,
                        Top = 100
                    };
                    // try to sign document to file, we expect for PasswordRequiredException
                    signature.Sign(outputFilePath, options);
                    Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
                }
                catch(PasswordRequiredException ex)
                {
                    Console.WriteLine($"PasswordRequiredException: {ex.Message}");
                }
                catch(GroupDocsSignatureException ex)
                {
                    Console.WriteLine($"Common GroupDocsSignatureException: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Common Exception happens only at user code level: {ex.Message}");
                }
                finally
                {

                }
            }
        }
    }
}