using GroupDocs.Signature.WebForms.Products.Signature.Config;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Directory
{
    /// <summary>
    /// ImageDataDirectoryEntity
    /// </summary>
    public class ImageDataDirectoryEntity : DataDirectoryEntity
    {
        private string UPLOADED_IMAGE = "/Uploaded";

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureConfiguration">SignatureConfiguration</param>
        public ImageDataDirectoryEntity(SignatureConfiguration signatureConfiguration)
            : base(signatureConfiguration, "/Image")
        {
        }

        public string GetUploadedImageFolder()
        {
            return this.UPLOADED_IMAGE;
        }

        public void SetUploadedImageFolder(string path)
        {
            this.UPLOADED_IMAGE = path;
        }
    }
}