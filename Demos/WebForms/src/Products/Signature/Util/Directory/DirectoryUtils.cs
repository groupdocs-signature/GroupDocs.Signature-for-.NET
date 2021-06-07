using GroupDocs.Signature.WebForms.Products.Signature.Config;

namespace GroupDocs.Signature.WebForms.Products.Signature.Util.Directory
{
    /// <summary>
    /// DirectoryUtils
    /// </summary>
    public class DirectoryUtils
    {
        public FilesDirectoryUtils FilesDirectory { get; set; }
        public DataDirectoryUtils DataDirectory { get; set; }
        private TempDirectoryUtils TempFolder;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureConfiguration">SignatureConfiguration</param>
        public DirectoryUtils(SignatureConfiguration signatureConfiguration)
        {
            FilesDirectory = new FilesDirectoryUtils(signatureConfiguration);           
            DataDirectory = new DataDirectoryUtils(signatureConfiguration);
            TempFolder = new TempDirectoryUtils(signatureConfiguration);
        }

        public TempDirectoryUtils GetTempFolder() {
            return this.TempFolder;
        }

        public void SetTempFolder(TempDirectoryUtils tempFolder)
        {
            this.TempFolder = tempFolder;
        }
    }
}