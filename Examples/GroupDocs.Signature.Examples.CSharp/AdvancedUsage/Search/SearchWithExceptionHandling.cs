using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchWithExceptionHandling
    {
        /// <summary>
        /// Sign document with text signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_PWD_PDF;
            try
            {
                // dont specify Password on protected document
                LoadOptions loadOptions = new LoadOptions();
                using (Signature signature = new Signature(filePath))
                {
                    DigitalSearchOptions options = new DigitalSearchOptions()
                    {
                    };

                    // sign document to file
                    List<DigitalSignature> signatures = signature.Search<DigitalSignature>(options);
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