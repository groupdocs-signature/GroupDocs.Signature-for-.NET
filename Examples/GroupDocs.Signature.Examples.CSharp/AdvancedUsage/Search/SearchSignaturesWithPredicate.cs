using System;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SearchSignaturesWithPredicate
    {
        /// <summary>
        /// Search signatures with predicate function
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SearchSignaturesWithPredicate : Search signatures with predicate function\n");

            // The path to the documents directory.
            // Assume document is already signed with:
            // - TextSignOptions("Signature1") at Top=100, Left=100, PageNumber=1
            // - TextSignOptions("Signature2") at Top=200, Left=200, PageNumber=1
            // - TextSignOptions("Signature3") at Top=300, Left=300, PageNumber=1
            string signedFile = Constants.SAMPLE_PDF_SIGNED_FORMFIELD;

            try
            {
                using (Signature signature = new Signature(signedFile))
                {
                    // Option 1: Search all signatures and filter with predicate
                    // Filter text signatures on page 1
                    List<BaseSignature> allSignatures = signature.Search(sig =>
                        sig.PageNumber == 1 && sig.SignatureType == SignatureType.Text);

                    Console.WriteLine($"Found {allSignatures.Count} text signatures on page 1");

                    // Option 2: Search with specific options and filter with predicate
                    // Create search options for text signatures
                    TextSearchOptions searchOptions = new TextSearchOptions();

                    // Search and filter: only signatures with specific text "Signature1"
                    List<BaseSignature> filteredSignatures = new List<BaseSignature>(signature.Search(
                        new List<SearchOptions> { searchOptions },
                        sig => sig is TextSignature textSig && textSig.Text == "Signature1"
                    ));

                    Console.WriteLine($"Found {filteredSignatures.Count} signatures with text 'Signature1'");

                    // Option 3: Complex predicate - filter by text content and position
                    // Find signatures matching specific parameters
                    List<BaseSignature> complexFilteredSignatures = signature.Search(sig =>
                    {
                        // Filter signatures that:
                        // - Are text signatures
                        // - Are on page 1
                        // - Match specific text content (Signature2 or Signature3)
                        if (sig.SignatureType != SignatureType.Text)
                            return false;

                        if (sig.PageNumber != 1)
                            return false;

                        if (sig is TextSignature textSig)
                        {
                            return textSig.Text == "Signature2" || textSig.Text == "Signature3";
                        }

                        return false;
                    });

                    Console.WriteLine($"Found {complexFilteredSignatures.Count} matching text signatures on page 1");

                    // Option 4: Filter by position parameters (Top, Left)
                    List<BaseSignature> positionFilteredSignatures = signature.Search(sig =>
                    {
                        if (sig.SignatureType != SignatureType.Text || sig.PageNumber != 1)
                            return false;

                        if (sig is TextSignature textSig)
                        {
                            // Find signature at specific position (Top=100, Left=100)
                            return textSig.Top == 100 && textSig.Left == 100 && textSig.Text == "Signature1";
                        }

                        return false;
                    });

                    Console.WriteLine($"Found {positionFilteredSignatures.Count} signatures at position Top=100, Left=100");

                    // Process the filtered results
                    foreach (var sig in complexFilteredSignatures)
                    {
                        if (sig is TextSignature textSignature)
                        {
                            Console.WriteLine($"  Signature: '{textSignature.Text}' on page {sig.PageNumber}, " +
                                              $"Position: Top={textSignature.Top}, Left={textSignature.Left}, " +
                                              $"Type: {sig.SignatureType}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}

