using System.Xml.Serialization;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml
{
    /// <summary>
    /// OpticalXmlEntity
    /// </summary>
    [XmlRoot("OpticalXmlEntity")]
    public class OpticalXmlEntity : XmlEntity
    { 
        [XmlElement("EncodedImage")]
        public string encodedImage { get; set; }

        [XmlElement("temp")]
        public bool temp { get; set; }
    }
}