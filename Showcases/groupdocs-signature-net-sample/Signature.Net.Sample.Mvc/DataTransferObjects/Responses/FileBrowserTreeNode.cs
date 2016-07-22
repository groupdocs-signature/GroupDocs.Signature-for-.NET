using System.Collections.Generic;

namespace Groupdocs.Web.UI.DataTransferObjects.Responses
{
    public class FileBrowserTreeNode
	{
		public string path { get; set; }
		public string name { get; set; }
		public string type { get; set; }
        public string docType { get; set; }
        public string fileType { get; set; }
        public long size { get; set; }
        public long modifyTime { get; set; }
        
        public List<FileBrowserTreeNode> nodes
		{
			get;set;
		}
    }
}
