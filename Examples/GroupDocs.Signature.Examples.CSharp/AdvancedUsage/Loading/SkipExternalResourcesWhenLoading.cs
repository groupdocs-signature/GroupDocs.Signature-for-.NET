using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class SkipExternalResourcesWhenLoading
    {
        /// <summary>
        /// Load document without the external resources it links to (the default since version 26.9)
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SkipExternalResourcesWhenLoading : Load document without the external resources it links to\n");

            // The document links to a picture on GitHub instead of storing it.
            string filePath = Constants.SAMPLE_WORDPROCESSING_EXTERNAL_IMAGE;
            string outputFolder = Path.Combine(Constants.OutputPath, "SkipExternalResourcesWhenLoading");
            string previewFilePath = Path.Combine(outputFolder, "page-1.png");
            Directory.CreateDirectory(outputFolder);

            // External resources - linked pictures, INCLUDEPICTURE fields, images and style sheets of SVG images -
            // are skipped by default, so the addresses written in a document are never requested.
            // Setting SkipExternalResources = true explicitly does the same.
            // Set SkipExternalResources = false to load every external resource, for trusted documents only.
            LoadOptions loadOptions = new LoadOptions()
            {
                SkipExternalResources = true
            };

            using (Signature signature = new Signature(filePath, loadOptions))
            {
                // Generate the page preview (the sample has one page): the linked picture is not drawn.
                PreviewOptions previewOptions = new PreviewOptions(
                    pageData => File.Create(previewFilePath),
                    (pageData, pageStream) => pageStream.Dispose())
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.PNG
                };
                signature.GeneratePreview(previewOptions);
            }
            Console.WriteLine("\nPage preview generated without the linked picture.\nFile saved at " + previewFilePath);
        }
    }
}
