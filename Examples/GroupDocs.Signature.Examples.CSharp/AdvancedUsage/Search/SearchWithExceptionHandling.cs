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
        /// Search document with exception handling
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchWithExceptionHandling : Search document with exception handling\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_PWD_PDF;
            try
            {
                // don't specify Password on protected document
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