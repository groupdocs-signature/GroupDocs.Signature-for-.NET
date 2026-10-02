using System;
using System.Collections.Generic;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class LoadWhitelistedExternalResources
    {
        /// <summary>
        /// Load document together with the external resources from trusted addresses only
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # LoadWhitelistedExternalResources : Load document with external resources from trusted addresses only\n");

            // The document links to a picture on GitHub instead of storing it.
            string filePath = Constants.SAMPLE_WORDPROCESSING_EXTERNAL_IMAGE;
            string outputFolder = Path.Combine(Constants.OutputPath, "LoadWhitelistedExternalResources");
            string previewFilePath = Path.Combine(outputFolder, "page-1.png");
            Directory.CreateDirectory(outputFolder);

            // External resources are skipped by default, except the ones whose address contains
            // one of the listed fragments (ignoring case). Prefer long fragments: a short one
            // such as "github" would also match unrelated addresses.
            LoadOptions loadOptions = new LoadOptions()
            {
                WhitelistedResources = new List<string>
                {
                    "https://raw.githubusercontent.com/groupdocs-signature/"
                }
            };

            using (Signature signature = new Signature(filePath, loadOptions))
            {
                // Generate the page preview (the sample has one page): the linked picture is downloaded and drawn.
                // This needs access to raw.githubusercontent.com.
                PreviewOptions previewOptions = new PreviewOptions(
                    pageData => File.Create(previewFilePath),
                    (pageData, pageStream) => pageStream.Dispose())
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.PNG
                };
                signature.GeneratePreview(previewOptions);
            }
            Console.WriteLine("\nPage preview generated with the linked picture from a trusted address.\nFile saved at " + previewFilePath);
        }
    }
}
