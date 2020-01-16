using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class GeneratePreview
    {
        /// <summary>
        /// Generate document pages preview
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # GeneratePreview : Generate document pages preview\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;

            using (Signature signature = new Signature(filePath))
            {
                // create preview options object
                PreviewOptions previewOption = new PreviewOptions(GeneratePreview.CreatePageStream, GeneratePreview.ReleasePageStream)
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.JPEG,
                };
                // generate preview
                signature.GeneratePreview(previewOption);
            }
        }

        private static Stream CreatePageStream(int pageNumber)
        {
            string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewFolder", "image-" + pageNumber.ToString() + ".jpg");
            var folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        private static void ReleasePageStream(int pageNumber, Stream pageStream)
        {
            pageStream.Dispose();
            string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewFolder", "image-" + pageNumber.ToString() + ".jpg");
            Console.WriteLine($"Image file {imageFilePath} is ready for preview");
        }
    }
}
