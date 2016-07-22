using System;

namespace Groupdocs.Web.UI
{
    /// <summary>
    /// Contains all constant values, which are used by the GroupDocs.Viewer
    /// </summary>
    public static class Constants
    {
        /// <summary>
        /// Common prefix for all HTTP-requests, which are used by the GroupDocs.Viewer ('document-viewer')
        /// </summary>
        public const string HttpRequestPrefixName = "document-viewer";

        /// <summary>
        /// Common suffix for all HTTP-requests, which use HTTP-handlers for processing ('Handler')
        /// </summary>
        public const string HttpHandlerSuffixName = "Handler";

        /// <summary>
        /// Standard wildcard string for resource path, which is used by the HTML-rendering engine ('(0)')
        /// </summary>
        public const string StandardResourcePath = "(0)";

        public const string JqueryFileDownloadCookieName = "jqueryFileDownloadJSForGD";
        public const string GroupdocsLicensePathKey = "GroupdocsLicensePath";
        public const string GroupdocsLicenseStreamKey = "GroupdocsLicenseStreamKey";
        public const string GroupdocsRootStoragePath = "GroupdocsRootStoragePath";
        public const string GroupdocsFileListRequestHandlingIsEnabled = "GroupdocsFileListRequestHandlingIsEnabled";
        public const string GroupdocsDownloadRequestHandlingIsEnabled = "GroupdocsDownloadRequestHandlingIsEnabled";
        public const string GroupdocsPrintRequestHandlingIsEnabled = "GroupdocsPrintRequestHandlingIsEnabled";
        public const string GroupdocsReorderPageRequestHandlingIsEnabled = "GroupdocsReorderPageRequestHandlingIsEnabled";
        public const string GroupdocsCachePath = "GroupdocsCachePath";
        public const string GroupdocsBaseUrl = "GroupdocsBaseUrl";
        public const string DownloadDirectory = "temp";
        public const string FromStreamDirectory = "S";
        public const string FromRemoteStorageDirectory = "FromRemote";
        public const string StorageProvider = "StorageProvider";
        public const string CustomStorageProvider = "CustomStorageProvider";
        public const string CustomTempStorageProvider = "CustomTempStorageProvider";
        public const string StorageProviderOptions = "StorageProviderOptions";
        public const string FromUrlFolder = "FromURL";
        public const string SetPerRequest = "SetPerRequest";

        public const string ApiKey = "ApiKey";
        public const string ApiSecretKey = "ApiSecret";
        public const string StorageTypeKey = "StorageType";
        public const string StorageModeKey = "StorageMode";
        public const string ServiceHostKey = "ServiceHost";

        public const string GroupdocsLogFilePath = "GroupdocsLogFilePath";
        public const string GroupdocsEventSubscriptions = "GroupdocsEventSubscriptions";

        public const string GroupdocsShowExceptionDetailsOnClient = "GroupdocsShowExceptionDetailsOnClient";

        /// <summary>
        /// String key, which points to the actual status of the CORS technology, which is stored in the application-level session.
        /// </summary>
        public const string EnableCorsKey = "EnableCors";

        /// <summary>
        /// String key, which points to the container (Dictionary) with all Viewer InstanceIDs ('InstanceIdContainer'), which is stored in the application-level session.
        /// </summary>
        public const string InstanceIdContainerKey = "InstanceIdContainer";

        /// <summary>
        /// String key, which identifies the 'instanceId' value in the HTTP-request data ('instanceIdToken')
        /// </summary>
        /// <remarks>'instanceIdToken' value is used, because 'instanceId' is already present in the JS widget and has another meaning and responsibility</remarks>
        public const string InstanceIdRequestKey = "instanceIdToken";

        /// <summary>
        /// String key, which identifies the 'passwordForOpening' value in the HTTP-request data ('passwordForOpening')
        /// </summary>
        public const string PasswordForOpeningRequestKey = "passwordForOpening";

        /// <summary>
        /// String key, which identifies the 'downloadButtonMode' value in the HTTP-request data ('downloadButtonMode')
        /// </summary>
        public const string DownloadButtonModeRequestKey = "downloadButtonMode";

        /// <summary>
        /// String key, which identifies the 'allowDocumentDownloadingOnFailure' value in the HTTP-request data ('allowDocumentDownloadingOnFailure')
        /// </summary>
        public const string AllowDocumentDownloadingOnFailureRequestKey = "allowDocumentDownloadingOnFailure";

        public static readonly DateTime Epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        /// <summary>
        /// Contains textual messages for different exceptions
        /// </summary>
        public static class ExceptionMessages
        {
            public const string RootStoragePathIsInvalid = "Specified root storage path is invalid or cannot be found";

            public const string InvalidPathTemplate = "{0} path cannot be null, empty, or contain only whitespaces";

            public const string DocumentDownloadingDisabledHttp403 = "HTTP 403: document downloading option is disabled on the server";

            public const string DocumentPrintingDisabledHttp403 = "HTTP 403: document printing option is disabled on the server";

            public const string InvalidUrl = "Specified URL is not valid";

            public const string InvalidFilename = "Specified filename is not valid";

            public const string InvalidUsername = "Username cannot be empty";

            public const string InvalidPassword = "Password cannot be empty";

            public const string DocumentNotFound = "Document not found";

            public const string InaccessibleHttpContextTemplate =
                "Cannot obtain current HttpContext - {0} is available only for the ASP.NET Viewer";
        }
    }
}
