using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class GeneratePreviewAdvanced
    {
        /// <summary>
        /// Generate document pages preview with using HideSignature feature
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORD_SIGNED;

            using (Signature signature = new Signature(filePath))
            {
                // create preview options object
                PreviewOptions previewOption = new PreviewOptions(GeneratePreviewAdvanced.CreatePageStream, GeneratePreviewAdvanced.ReleasePageStream)
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.JPEG,
                    // set property to hide all known signatures
                    HideSignatures = true
                };
                // generate preview
                signature.GeneratePreview(previewOption);
            }
        }

        private static Stream CreatePageStream(int pageNumber)
        {
            string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewHideSignatures", "image-" + pageNumber.ToString() + ".jpg");
            string folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        private static void ReleasePageStream(int pageNumber, Stream pageStream)
        {
            pageStream.Dispose();
            string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewHideSignatures", "image-" + pageNumber.ToString() + ".jpg");
            Console.WriteLine($"Image file {imageFilePath} is ready for preview");
        }
    }
}