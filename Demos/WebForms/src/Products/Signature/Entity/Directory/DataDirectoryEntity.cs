using GroupDocs.Signature.WebForms.Products.Signature.Config;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Directory
{
    /// <summary>
    /// DataDirectoryEntity
    /// </summary>
    public abstract class DataDirectoryEntity
    {
        public string Path { get; set; }
        public string PreviewPath { get; set; }
        public string XmlPath { get; set; }
        public static readonly string DATA_PREVIEW_FOLDER = "/Preview";
        public static readonly string DATA_XML_FOLDER = "/XML";       
        protected SignatureConfiguration signatureConfiguration;
        protected string currentDirectoryPath;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureConfiguration">SignatureConfiguration</param>
        /// <param name="currentDirectoryPath">string</param>
        protected DataDirectoryEntity(SignatureConfiguration signatureConfiguration, string currentDirectoryPath)
        {
            this.signatureConfiguration = signatureConfiguration;
            this.currentDirectoryPath = currentDirectoryPath;
            Path = signatureConfiguration.dataDirectory + currentDirectoryPath;
            PreviewPath = signatureConfiguration.dataDirectory + currentDirectoryPath + DATA_PREVIEW_FOLDER;
            XmlPath = signatureConfiguration.dataDirectory + currentDirectoryPath + DATA_XML_FOLDER;            
        }       
    }
}