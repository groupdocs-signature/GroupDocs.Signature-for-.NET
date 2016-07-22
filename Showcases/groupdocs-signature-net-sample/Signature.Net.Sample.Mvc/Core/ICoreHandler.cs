using System;
using Groupdocs.Web.UI.DataTransferObjects;
using Groupdocs.Web.UI.DataTransferObjects.Responses;
using Groupdocs.Web.UI.DataTransferObjects.Responses.Statuses;

namespace Groupdocs.Web.UI.Core
{
    public interface ICoreHandler
    {
        FileBrowserTreeDataResponse LoadFileBrowserTreeData(LoadFileBrowserTreeDataParameters parameters);

        //OperationStatusResponse GetImageUrls(IUrlsCreator urlsCreator,
        //    GetImageUrlsParameters parameters);
    }
}