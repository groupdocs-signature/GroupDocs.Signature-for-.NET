using GroupDocs.Signature.MVC.Products.Signature.Config;

namespace GroupDocs.Signature.MVC.Products.Signature.Util.Directory
{
    /// <summary>
    /// OutputDirectoryUtils.
    /// </summary>
    public class TempDirectoryUtils : IDirectoryUtils
    {
        internal readonly string OUTPUT_FOLDER = "/SignedTemp";
        private SignatureConfiguration signatureConfiguration;

        /// <summary>
        /// Initializes a new instance of the <see cref="TempDirectoryUtils"/> class.
        /// Constructor.
        /// </summary>
        /// <param name="signatureConfiguration">SignatureConfiguration.</param>
        public TempDirectoryUtils(SignatureConfiguration signatureConfiguration)
        {
            this.signatureConfiguration = signatureConfiguration;

            // create output directories
            if (string.IsNullOrEmpty(signatureConfiguration.GetTempFilesDirectory()))
            {
                signatureConfiguration.SetTempFilesDirectory(signatureConfiguration.filesDirectory + this.OUTPUT_FOLDER);
            }
        }

        /// <summary>
        /// Get path.
        /// </summary>
        /// <returns>string.</returns>
        public string GetPath()
        {
            return this.signatureConfiguration.GetTempFilesDirectory();
        }
    }
}