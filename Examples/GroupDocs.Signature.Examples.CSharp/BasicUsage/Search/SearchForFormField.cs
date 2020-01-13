using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;


    public class SearchForFormField
    {
        /// <summary>
        /// Search document for form-field signature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_FORMFIELD;

            using (Signature signature = new Signature(filePath))
            {
                FormFieldSearchOptions options = new FormFieldSearchOptions()
                {

                };

                // search for signatures in document
                List<FormFieldSignature> signatures = signature.Search<FormFieldSignature>(options);
                Console.WriteLine($"\nSource document ['{filePath}'] contains following signatures.");
                foreach (var FormFieldSignature in signatures)
                {
                    Console.WriteLine($"FormField signature found. Name : {FormFieldSignature.Name}. Value: {FormFieldSignature.Value}");
                }
            }
        }
    }
}