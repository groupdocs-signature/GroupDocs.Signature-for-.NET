using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Collections.Generic;

    public class SearchForFormFieldAdvanced
    {
        /// <summary>
        /// Search document for form-field signature with applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchForFormFieldAdvanced : Search document for form-field signature with applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_FORMFIELD;
            using (Signature signature = new Signature(filePath))
            {
                FormFieldSearchOptions options = new FormFieldSearchOptions();

                // search for signatures in document
                List<FormFieldSignature> signatures = signature.Search<FormFieldSignature>(options);
                Console.WriteLine("\nSource document contains following signatures.");
                foreach (var FormFieldSignature in signatures)
                {
                    Console.WriteLine("FormField signature found. Name : {0}. Value: {1}", FormFieldSignature.Name, FormFieldSignature.Value);
                }
            }
        }
    }
}
