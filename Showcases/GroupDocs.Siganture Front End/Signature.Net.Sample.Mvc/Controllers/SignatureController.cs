using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Script.Serialization;
using Groupdocs.Web.UI.Core;
using Groupdocs.Web.UI.DataTransferObjects;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Handler;
using Signature.Net.Sample.Mvc.Models;
using Signature.Net.Sample.Mvc.Engine;
using Signature.Net.Sample.Mvc.Infrastructure;

namespace Signature.Net.Sample.Mvc.Controllers
{
    public class SignatureController : Controller
    {
        private const string AppDataVirtualPath = "~/App_Data/";
        private readonly SigningEngine _signingEngine;
        private readonly ICoreHandler _coreHandler;

        public SignatureController(ISigningEngine signingEngine,
                                   ISvgRenderer svgRenderer,
                                   ICoreHandler coreHandler)
        {
            _signingEngine = (SigningEngine)signingEngine;
            _coreHandler = coreHandler;
        }

        [HttpPost]
        public ActionResult PublicGetDocument(string documentGuid, string recipientGuid)
        {
            var result = new
            {
                status = "Ok",
                result = new
                {
                    document = new
                    {
                        guid = documentGuid,
                        name = documentGuid,
                        signedName = documentGuid + "_signed1.pdf",
                        signedFromAll = false,
                        recipient = new
                        {
                            id = 0,
                            guid = "71d1f3ef88a5d7fe32f4c46588a69887",
                            documentGuid,
                            firstName = "",
                            lastName = "",
                            email = "",
                            signed = false
                        }
                    }
                }
            };
            return Json(result);
        }

        [HttpPost]
        public ActionResult PublicGetDocumentFields()
        {
            var result = new
            {
                status = "Ok",
                result = new
                {
                    fields = new[]
                    {
                        new
                        {
                            id = "1c9b463ac3c1e9ebaf51e34ea352de3a",
                            name = "Signature1",
                            fieldType = 1,
                            mandatory = true,
                            data = (object) null,
                            minGraphSizeW = 0,
                            minGraphSizeH = 0,
                            recipientGuid = "71d1f3ef88a5d7fe32f4c46588a69887",
                            locations = new[]
                            {
                                new
                                {
                                    page = 1,
                                    locationHeight = 50.0,
                                    locationWidth = 150.0,
                                    locationX = 0.4,
                                    locationY = 0.3,
                                    fontBold = (object) null,
                                    fontColor = (object) null,
                                    fontItalic = (object) null,
                                    fontName = (object) null,
                                    fontSize = (object) null,
                                    fontUnderline = (object) null,
                                    id = "ff4dd6a4a44ecd682a4be3a19a801e6f",
                                    align = 0
                                }
                            },
                            lockDuringSign = false,
                            acceptableValues = (object) null,
                            tooltip = (object) null,
                            settings = (object) null,
                            groupName = (object) null,
                            guidanceText = (object) null,
                            regularExpression = (object) null,
                            defaultValue = ""
                        }
                    }
                }

            };
            return Json(result);
        }


        [HttpPost]
        public ActionResult ViewDocument(string path,
            int quality, int width)
        {
            string fileNameExtension = Path.GetExtension(path).TrimStart('.');
            fileNameExtension = fileNameExtension.ToLower();
            string appDataPath = Server.MapPath(AppDataVirtualPath);
            DocumentDescription documentDescription = SignatureHandler.GetPageDescriptions(Path.Combine(appDataPath, path));
            int pageCount = documentDescription.Pages.Count;
            string[] pageImageUrls = GetImageUrls(path, 0, pageCount, width, quality);
            UrlHelper urlHelper = new UrlHelper(Request.RequestContext);
            string documentDownloadUrl = urlHelper.Action("GetDocument", "Signature", new { path });
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string documentDescriptionJs = LowerCaseJsonSerializer.SerializeObject(documentDescription);
            var result = new
            {
                path,
                docType = "Pdf",
                fileType = fileNameExtension,
                url = documentDownloadUrl,
                pdfDownloadUrl = (string)null,
                name = path,
                imageUrls= pageImageUrls,
                lic = true,
                pdfPrintUrl = (string)null,
                pageHtml = (object)null,
                pageCss = (object)null,
                documentDescription = documentDescriptionJs,
                urlForResourcesInHtml = (object)null,
                sharedCss = (object)null,
                success = true
            };
            return Json(result);
        }

        [HttpPost]
        public ActionResult GetImageUrls(string path,
                                         string dimension,
                                         int firstPage,
                                         int pageCount,
                                         int? quality)
        {
            int? width = null;
            if (!String.IsNullOrEmpty(dimension))
                width = Int32.Parse(dimension.Substring(0, dimension.Length - 1));
            string[] pageImageUrls = GetImageUrls(path, 0, pageCount, width, quality);
            var result = new {imageUrls = pageImageUrls, success = true };
            return Json(result);
        }


        public ActionResult GetSignatureBackgroundSvg()
        {
            return File(Server.MapPath("~/gd-signature/signature2/resource/signature.svg"), "image/svg+xml");
        }

        public ActionResult GetStampBackgroundSvg()
        {
            return File(Server.MapPath("~/gd-signature/signature2/resource/stamp.png"), "image/png");
        }

        public ActionResult GetDocumentPageImage(string path, int? width, int? quality, int pageIndex)
        {
            string appDataPath = Server.MapPath(AppDataVirtualPath);
            byte[] fileBytes = SignatureHandler.GetDocumentPageImage(Path.Combine(appDataPath, path), width, quality, pageIndex);
            if (fileBytes == null)
                return new EmptyResult();
            else
                return File(fileBytes, "image/jpeg");
        }

        public ActionResult PublicSignDocument(string documentGuid,
            string documentId,
            string name,
            SignatureField[] fields)
        {
            if (fields == null || fields.Length == 0)
                return new EmptyResult();
            string appDataPath = Server.MapPath(AppDataVirtualPath);

            UrlHelper urlHelper = new UrlHelper(Request.RequestContext);
            Func<string, string> urlCreator = (filePath) => urlHelper.Action("GetDocument", "Signature", new { path = filePath});
            object resultData = _signingEngine.SignDocument(appDataPath, documentGuid, 
                documentId, name, fields, urlCreator);

            return Json(resultData);
        }


        public ActionResult GetDocument(string path)
        {
            string appDataPath = Server.MapPath(AppDataVirtualPath);
            string documentPath = Path.Combine(appDataPath, path);
            return File(documentPath, "application/octet-stream", Path.GetFileName(path));
        }


        [HttpPost]
        public ActionResult LoadFileBrowserTreeData(LoadFileBrowserTreeDataParameters parameters)
        {
            object data = _coreHandler.LoadFileBrowserTreeData(parameters);
            if (data == null)
                return new EmptyResult();

            return Json(data);
        }
        #region Private methods

        private string[] GetImageUrls(string path, int startingPageNumber, int pageCount, int? pageWidth, int? quality)
        {
            RouteValueDictionary routeValueDictionary = new RouteValueDictionary()
            {
                {"path", path},
                {"width", pageWidth},
                {"quality", quality},
            };

            string[] pageUrls = new string[pageCount];
            for (int i = 0; i < pageCount; i++)
            {
                routeValueDictionary["pageIndex"] = startingPageNumber + i;
                pageUrls[i] = ConvertUrlToAbsolute(new UrlHelper(Request.RequestContext).Action("GetDocumentPageImage", routeValueDictionary));
            }
            return pageUrls;
        }


        private string ConvertUrlToAbsolute(string inputUrl)
        {
            HttpRequestBase request = Request;
            string applicationHost = String.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Host,
                                                    request.Url.Port == 80 ? String.Empty : ":" + request.Url.Port);

            if (applicationHost.EndsWith("/"))
            {
                applicationHost = applicationHost.Substring(0, applicationHost.Length - 1);
            }
            string result = string.Format("{0}{1}", applicationHost, inputUrl);
            return result;
        }
        
        #endregion
    }
}
