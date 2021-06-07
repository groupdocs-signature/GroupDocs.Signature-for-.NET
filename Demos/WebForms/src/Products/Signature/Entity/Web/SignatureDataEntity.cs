
using GroupDocs.Signature.Domain;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Web
{
    /// <summary>
    /// SignatureDataEntity
    /// </summary>
    public class SignatureDataEntity
    {
        public string Reason{ get; set; }
        public string Contact{ get; set; }
        public string Address{ get; set; }
        public string Date{ get; set; }
        public string SignaturePassword{ get; set; }
        public string SignatureComment{ get; set; }       
        public string SignatureGuid{ get; set; }
        public string SignatureType{ get; set; }
        public int PageNumber{ get; set; }
        public double Left { get; set; }
        public double Top { get; set; }
        public double ImageWidth { get; set; }
        public double ImageHeight { get; set; }
        public int Angle{ get; set; }       

        private HorizontalAlignment horizontalAlignment = HorizontalAlignment.None;
        private VerticalAlignment verticalAlignment = VerticalAlignment.None;

        public HorizontalAlignment getHorizontalAlignment()
        {
            return horizontalAlignment;
        }

        public void setHorizontalAlignment(HorizontalAlignment horizontalAlignment)
        {
            this.horizontalAlignment = horizontalAlignment;
        }

        public VerticalAlignment getVerticalAlignment()
        {
            return verticalAlignment;
        }

        public void setVerticalAlignment(VerticalAlignment verticalAlignment)
        {
            this.verticalAlignment = verticalAlignment;
        }
    }
}