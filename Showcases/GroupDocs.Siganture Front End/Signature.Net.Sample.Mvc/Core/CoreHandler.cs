using System;
using System.IO;
using System.Linq;
using System.Web;
using Groupdocs.Web.UI.DataTransferObjects;
using Groupdocs.Web.UI.DataTransferObjects.Responses;
using Groupdocs.Web.UI.DataTransferObjects.Responses.Statuses;
using Signature.Net.Sample.Mvc.Core;

namespace Groupdocs.Web.UI.Core
{
    public class CoreHandler: ICoreHandler
    {
        private readonly IFileBrowserListCreator _fileBrowserListCreator;
        protected readonly string _rootStoragePath;
        private readonly string _cachePath;

        public CoreHandler(IFileBrowserListCreator fileBrowserListCreator)
        {
            _fileBrowserListCreator = fileBrowserListCreator;
        }

        public FileBrowserTreeDataResponse LoadFileBrowserTreeData(LoadFileBrowserTreeDataParameters parameters)
        {
            FileBrowserTreeDataResponse data = _fileBrowserListCreator.GetFileBrowserList(parameters.Path, parameters.PageIndex, parameters.PageSize, parameters.OrderBy, parameters.OrderAsc,
                                                                                    parameters.Filter, parameters.FileTypes, parameters.Extended, parameters.InstanceIdToken);
            return data ?? new FileBrowserTreeDataResponse { nodes = new FileBrowserTreeNode[0] };
        }

        //public OperationStatusResponse GetImageUrls(IUrlsCreator urlsCreator,
        //                            GetImageUrlsParameters parameters)
        //{
        //    string[] pageImageUrls;
        //    int? pageCpunt = parameters.PageCount;
        //    pageImageUrls = urlsCreator.GetImageUrlsInternal(parameters.Path, parameters.FirstPage, (int)pageCpunt, parameters.Width, parameters.Quality);
        //    OperationStatusResponse data = pageImageUrls == null ?
        //        null : new GetImageUrlsResponse()
        //        {
        //            imageUrls = pageImageUrls
        //        };

        //    return data;
        //}
    }
}
