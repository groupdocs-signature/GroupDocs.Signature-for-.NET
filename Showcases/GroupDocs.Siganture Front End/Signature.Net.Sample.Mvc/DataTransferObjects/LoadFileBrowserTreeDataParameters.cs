using Groupdocs.Web.UI.DataTransferObjects.Abstract;

namespace Groupdocs.Web.UI.DataTransferObjects
{
    public class LoadFileBrowserTreeDataParameters : DocumentParameters
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public bool OrderAsc { get; set; }
        public string Filter { get; set; }
        public string FileTypes { get; set; }
        public bool Extended { get; set; }
        public string InstanceIdToken { get; set; }
        public string Callback { get; set; }
    }
}
