using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Groupdocs.Web.UI;
using Groupdocs.Web.UI.DataTransferObjects.Responses;

namespace Signature.Net.Sample.Mvc.Core
{
    public interface IFileBrowserListCreator
    {
        FileBrowserTreeDataResponse GetFileBrowserList(string path,
                                                 int pageIndex = 0,
                                                 int pageSize = -1,
                                                 string orderBy = null,
                                                 bool orderAsc = true,
                                                 string filter = null,
                                                 string fileTypes = null,
                                                 bool extended = false,
                                                 string instanceId = null);
    }

    public class FileBrowserListCreator : IFileBrowserListCreator
    {
        private readonly string _basePath;

        public FileBrowserListCreator()
        {
            _basePath = HttpContext.Current.Server.MapPath("~/App_Data");
        }

        public FileBrowserTreeDataResponse GetFileBrowserList(string path,
                                                 int pageIndex = 0,
                                                 int pageSize = -1,
                                                 string orderBy = null,
                                                 bool orderAsc = true,
                                                 string filter = null,
                                                 string fileTypes = null,
                                                 bool extended = false,
                                                 string instanceId = null)
        {
            if (path == null)
                path = String.Empty;
            FileBrowserTreeNode[] result = GetEntities(path, pageIndex, pageSize, orderBy, orderAsc, filter, fileTypes, extended, instanceId);
            if (result == null)
                return null;
            FileBrowserTreeDataResponse data = new FileBrowserTreeDataResponse();
            data.count = result.Length;
            data.nodes = result;
            Array.ForEach<FileBrowserTreeNode>(data.nodes, n => n.path = String.IsNullOrEmpty(path) ? n.name : String.Format("{0}/{1}", path, n.name));
            return data;
        }

        #region Private methods
        private FileBrowserTreeNode[] GetEntities(string path, int pageIndex = 0, int pageSize = -1, string orderBy = null, bool orderAsc = true, string filter = null, string fileTypes = null, bool extended = false, string instanceId = null)
        {
            Storage storage = new Storage(_basePath);
            string pathToBrowse = path;
            if (!String.IsNullOrEmpty(path) && !storage.FolderExists(pathToBrowse))
                return null;
            FileSystemEntity[] entities = storage.ListEntities(pathToBrowse);
            int i = 1;
            IEnumerable<FileSystemEntity> filesUnsorted = entities.Where(x => !x.IsDirectory);
            IEnumerable<FileSystemEntity> filesSorted;
            switch (orderBy)
            {
                case "Name":
                    if (orderAsc)
                        filesSorted = filesUnsorted.OrderBy(f => f.Name);
                    else
                        filesSorted = filesUnsorted.OrderByDescending(f => f.Name);
                    break;

                case "ModifiedOn":
                    if (orderAsc)
                        filesSorted = filesUnsorted.OrderBy(f => f.DateModified);
                    else
                        filesSorted = filesUnsorted.OrderByDescending(f => f.DateModified);
                    break;

                case "Size":
                    if (orderAsc)
                        filesSorted = filesUnsorted.OrderBy(f => f.Size);
                    else
                        filesSorted = filesUnsorted.OrderByDescending(f => f.Size);
                    break;
                    
                default:
                    filesSorted = filesUnsorted;
                    break;
            }

            FileBrowserTreeNode[] files = filesSorted.Select(x => new FileBrowserTreeNode()
            {
                name = x.Name,
                path = Path.Combine(path, x.Name),
                //fileType = TypesMapper.GetFileTypesByExt(Path.GetExtension(x.Name)).FirstOrDefault().ToString(),
                //docType = TypesMapper.GetDocumentTypes(Path.GetExtension(x.Name)).FirstOrDefault().ToString(),
                size = x.Size,
                modifyTime = GetJavaScriptDateTime(x.DateModified),
                type = "file"
            }).ToArray();

            FileBrowserTreeNode[] folders = entities.Where(x => x.IsDirectory).Select(x => new FileBrowserTreeNode()
            {
                name = x.Name,
                type = "folder"
            }).ToArray();

            List<FileBrowserTreeNode> nodesList = new List<FileBrowserTreeNode>();
            nodesList.AddRange(folders);
            nodesList.AddRange(files);
            return nodesList.ToArray();
        }

        protected long GetJavaScriptDateTime(DateTime dateTime)
        {
            return (long)(dateTime - Constants.Epoch).TotalMilliseconds;
        }

        #endregion
    }
}
