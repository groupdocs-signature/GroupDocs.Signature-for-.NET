using GroupDocs.Signature.MVC.Products.Signature.Config;

namespace GroupDocs.Signature.MVC.Products.Signature.Util.Directory
{
    /// <summary>
    /// DirectoryUtils
    /// </summary>
    public class DirectoryUtils
    {
        public FilesDirectoryUtils FilesDirectory;        
        public DataDirectoryUtils DataDirectory;
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