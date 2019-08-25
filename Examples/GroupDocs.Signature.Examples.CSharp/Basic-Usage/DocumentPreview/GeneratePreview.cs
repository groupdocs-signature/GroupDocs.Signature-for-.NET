using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class GeneratePreview
    {
        /// <summary>
        /// Search document for Bar-Code signature
        /// </summary>
        public static void Run()
        {
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
            Console.WriteLine("Image file {0} is ready for preview", imageFilePath);
        }
    }
}
