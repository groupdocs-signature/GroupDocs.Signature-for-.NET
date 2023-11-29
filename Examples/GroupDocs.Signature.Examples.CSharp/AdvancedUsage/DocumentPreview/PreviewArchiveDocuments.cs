using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Options;

    public class PreviewArchiveDocuments
    {
        /// <summary>
        /// Generate pages preview of documents stored at a archive
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # PreviewArchiveDocuments : Generate pages preview of documents stored at archive\n");
            Console.WriteLine("ZIP, 7Z and TAR archive formats are supported \n");

            // The path to the archive with signed documents
            string filePath = Constants.SAMPLE_SIGNED_ZIP;

            using (Signature signature = new Signature(filePath))
            {
                // instantiate preview options
                PreviewOptions previewOption = new PreviewOptions(CreatePageStream, ReleasePageStream)
                {
                    PreviewFormat = PreviewOptions.PreviewFormats.PNG,
                };
                // generate preview
                signature.GeneratePreview(previewOption);
            }
        }

        //Since 23.09 there is possibility to use extended preview page data
        private static Stream CreatePageStream(PreviewPageData pageData)
        {
            string imageFilePath = Path.Combine(Constants.OutputPath, "PreviewArchiveDocuments",
                $"{pageData.FileName}-page-{pageData.PageNumber}.{pageData.PreviewFormat.ToString().ToLower()}");
            string folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        //Since 23.09 there is possibility to use extended preview page data
        private static void ReleasePageStream(PreviewPageData pageData, Stream pageStream)
        {
            pageStream.Dispose();
            string imageFilePath = Path.Combine(Constants.OutputPath, "PreviewArchiveDocuments",
                $"{pageData.FileName}-page-{pageData.PageNumber}.{pageData.PreviewFormat.ToString().ToLower()}");
            Console.WriteLine($"Image file {imageFilePath} is ready for preview");
        }

    }
}