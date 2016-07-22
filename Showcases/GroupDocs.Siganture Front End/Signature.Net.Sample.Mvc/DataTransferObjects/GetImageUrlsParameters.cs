using Groupdocs.Web.UI.DataTransferObjects.Abstract;

namespace Groupdocs.Web.UI.DataTransferObjects
{
    public class GetImageUrlsParameters: DocumentParameters
    {
        public int? Width { get; set; }
        public int FirstPage { get; set; }
        public int? PageCount { get; set; }
        public int? Quality { get; set; }
        public bool UsePdf { get; set; }
        public bool IgnoreDocumentAbsence { get; set; }
        public bool UseHtmlBasedEngine { get; set; }
        public bool SupportPageRotation { get; set; }
        public string InstanceIdToken { get; set; }
        public string Locale { get; set; }
        public string Callback { get; set; }
    }
}
