using GroupDocs.Signature.MVC.Products.Common.Entity.Web;
using GroupDocs.Signature.MVC.Products.Signature.Entity.Xml;

namespace GroupDocs.Signature.MVC.Products.Signature.Entity.Web
{
    /// <summary>
    /// SignaturePostedDataEntity
    /// </summary>
    public class SignaturePostedDataEntity : PostedDataEntity
    {
        public string signatureType { get; set; }
        public SignatureDataEntity[] signaturesData { get; set; }
        public string image { get; set; }
        public StampXmlEntity[] stampData { get; set; }
        public XmlEntity properties { get; set; }
        public string documentType { get; set; }      
    }
}