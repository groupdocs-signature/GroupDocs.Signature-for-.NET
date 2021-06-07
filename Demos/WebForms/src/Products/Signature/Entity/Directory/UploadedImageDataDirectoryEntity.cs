using GroupDocs.Signature.WebForms.Products.Signature.Config;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Directory
{
    /// <summary>
    /// BarcodeDataDirectoryEntity
    /// </summary>
    public class UploadedImageDataDirectoryEntity : DataDirectoryEntity
    {

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureConfiguration">SignatureConfiguration</param>
        public UploadedImageDataDirectoryEntity(SignatureConfiguration signatureConfiguration)
            : base(signatureConfiguration, "/Image/Uploaded")
        {
        }
    }
}