using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;
using System.Xml.Serialization;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Common.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Common.Resources;
using GroupDocs.Signature.WebForms.Products.Signature.Config;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Directory;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml;
using GroupDocs.Signature.WebForms.Products.Signature.Loader;
using GroupDocs.Signature.WebForms.Products.Signature.Signer;
using GroupDocs.Signature.WebForms.Products.Signature.Util.Directory;
using Newtonsoft.Json;

namespace GroupDocs.Signature.WebForms.Products.Signature.Controllers
{
    /// <summary>
    /// SignatureApiController.
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SignatureApiController : ApiController
    {
        private static readonly Common.Config.GlobalConfiguration GlobalConfiguration = new Common.Config.GlobalConfiguration();
        private readonly List<string> supportedImageFormats = new List<string> { ".bmp", ".jpeg", ".jpg", ".tiff", ".tif", ".png" };
        private readonly DirectoryUtils directoryUtils = new DirectoryUtils(GlobalConfiguration.Signature);

        /// <summary>
        /// Load Signature configuration.
        /// </summary>
        /// <returns>Signature configuration.</returns>
        [HttpGet]
        [Route("loadConfig")]
        public SignatureConfiguration LoadConfig()
        {
            return GlobalConfiguration.Signature;
        }

        /// <summary>
        /// Get all files and directories from storage.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>List of files and directories.</returns>
        [HttpPost]
        [Route("loadFileTree")]
        public HttpResponseMessage LoadFileTree(SignaturePostedDataEntity postedData)
        {
            // get request body
            string relDirPath = postedData.path;
            string signatureType = string.Empty;
            if (!string.IsNullOrEmpty(postedData.signatureType))
            {
                signatureType = postedData.signatureType;
            }

            // get file list from storage path
            try
            {
                string rootDirectory;
                switch (signatureType)
                {
                    case "digital":
                        rootDirectory = this.directoryUtils.DataDirectory.CertificateDirectory.Path;
                        break;
                    case "image":
                        rootDirectory = this.directoryUtils.DataDirectory.UploadedImageDirectory.Path;
                        break;
                    case "hand":
                        rootDirectory = this.directoryUtils.DataDirectory.ImageDirectory.Path;
                        break;
                    case "stamp":
                        rootDirectory = this.directoryUtils.DataDirectory.StampDirectory.Path;
                        break;
                    case "text":
                        rootDirectory = this.directoryUtils.DataDirectory.TextDirectory.Path;
                        break;
                    case "qrCode":
                        rootDirectory = this.directoryUtils.DataDirectory.QrCodeDirectory.Path;
                        break;
                    case "barCode":
                        rootDirectory = this.directoryUtils.DataDirectory.BarcodeDirectory.Path;
                        break;
                    default:
                        rootDirectory = this.directoryUtils.FilesDirectory.GetPath();
                        break;
                }

                // get all the files from a directory
                if (string.IsNullOrEmpty(relDirPath))
                {
                    relDirPath = rootDirectory;
                }
                else
                {
                    relDirPath = Path.Combine(rootDirectory, relDirPath);
                }

                SignatureLoader signatureLoader = new SignatureLoader(relDirPath, GlobalConfiguration, this.directoryUtils);
                List<SignatureFileDescriptionEntity> fileList;
                switch (signatureType)
                {
                    case "digital":
                        fileList = signatureLoader.LoadFiles();
                        break;
                    case "image":
                    case "hand":
                        fileList = signatureLoader.LoadImageSignatures();
                        break;
                    case "text":
                        fileList = signatureLoader.LoadTextSignatures(DataDirectoryEntity.DATA_XML_FOLDER);
                        break;
                    case "qrCode":
                    case "barCode":
                    case "stamp":
                        fileList = signatureLoader.LoadStampSignatures(DataDirectoryEntity.DATA_PREVIEW_FOLDER, DataDirectoryEntity.DATA_XML_FOLDER, signatureType);
                        break;
                    default:
                        fileList = signatureLoader.LoadFiles();
                        break;
                }

                return this.Request.CreateResponse(HttpStatusCode.OK, fileList);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Load document description.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>All info about the document.</returns>
        [HttpPost]
        [Route("loadDocumentDescription")]
        public HttpResponseMessage LoadDocumentDescription(SignaturePostedDataEntity postedData)
        {
            string password = string.Empty;
            try
            {
                // get/set parameters
                string documentGuid = postedData.guid;
                password = postedData.password;
                LoadDocumentEntity loadDocumentEntity = new LoadDocumentEntity();
                using (FileStream fileStream = File.Open(documentGuid, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
                {
                    // get document info container
                    using (GroupDocs.Signature.Signature signature = new GroupDocs.Signature.Signature(fileStream, GetLoadOptions(password)))
                    {
                        IDocumentInfo documentInfo = signature.GetDocumentInfo();
                        List<SignatureLoadedPageEntity> pagesDescription = new List<SignatureLoadedPageEntity>();
                        for (int i = 0; i < documentInfo.PageCount; i++)
                        {
                            // initiate custom Document description object
                            SignatureLoadedPageEntity description = new SignatureLoadedPageEntity
                            {
                                // set current page size
                                height = documentInfo.Pages[i].Height,
                                width = documentInfo.Pages[i].Width,
                                number = i + 1,
                            };
                            if (GlobalConfiguration.Signature.preloadPageCount == 0)
                            {
                                byte[] pageBytes = RenderPageToMemoryStream(signature, i).ToArray();
                                string encodedImage = Convert.ToBase64String(pageBytes);
                                description.SetData(encodedImage);
                            }

                            pagesDescription.Add(description);
                        }

                        loadDocumentEntity.SetGuid(documentGuid);
                        foreach (SignatureLoadedPageEntity pageDescription in pagesDescription)
                        {
                            loadDocumentEntity.SetPages(pageDescription);
                        }
                    }
                }

                // return document description
                return this.Request.CreateResponse(HttpStatusCode.OK, loadDocumentEntity);
            }
            catch (PasswordRequiredException ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.Forbidden, Resources.GenerateException(ex, password));
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex, password));
            }
        }

        /// <summary>
        /// Load document page.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Document page image encoded in Base64.</returns>
        [HttpPost]
        [Route("loadDocumentPage")]
        public HttpResponseMessage LoadDocumentPage(SignaturePostedDataEntity postedData)
        {
            string password = string.Empty;
            try
            {
                // get/set parameters
                string documentGuid = postedData.guid;
                int pageNumber = postedData.page;
                password = postedData.password;
                SignatureLoadedPageEntity loadedPage = new SignatureLoadedPageEntity();

                using (FileStream fileStream = File.Open(documentGuid, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
                {
                    using (GroupDocs.Signature.Signature signature = new GroupDocs.Signature.Signature(fileStream, GetLoadOptions(password)))
                    {
                        // get page image
                        byte[] bytes = RenderPageToMemoryStream(signature, pageNumber - 1).ToArray();

                        // encode ByteArray into string
                        string encodedImage = Convert.ToBase64String(bytes);
                        loadedPage.SetData(encodedImage);

                        IDocumentInfo documentInfo = signature.GetDocumentInfo();

                        // set current page info for result
                        loadedPage.height = documentInfo.Pages[pageNumber - 1].Height;
                        loadedPage.width = documentInfo.Pages[pageNumber - 1].Width;
                        loadedPage.number = pageNumber;
                    }
                }

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, loadedPage);
            }
            catch (PasswordRequiredException ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.Forbidden, Resources.GenerateException(ex, password));
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex, password));
            }
        }

        /// <summary>
        /// Download document.
        /// </summary>
        /// <param name="path">string.</param>
        /// <returns>HttpResponseMessage.</returns>
        [HttpGet]
        [Route("downloadDocument")]
        public HttpResponseMessage DownloadDocument(string path)
        {
            if (!string.IsNullOrEmpty(path))
            {
                // check if file exists
                if (File.Exists(path))
                {
                    // prepare response message
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                    // add file into the response
                    var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    response.Content = new StreamContent(fileStream);
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                    response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                    {
                        FileName = Path.GetFileName(path),
                    };
                    return response;
                }
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        [HttpPost]
        [Route("downloadSigned")]
        public HttpResponseMessage DownloadSigned(SignaturePostedDataEntity signDocumentRequest)
        {
            SignatureDataEntity[] signaturesData = signDocumentRequest.signaturesData;
            if (signaturesData == null || signaturesData.Count() == 0)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.OK, Resources.GenerateException(new ArgumentNullException("Signature data is empty")));
            }

            // get document path
            string documentGuid = signDocumentRequest.guid;
            string fileName = Path.GetFileName(documentGuid);
            try
            {
                Stream inputStream = this.SignByStream(signDocumentRequest);
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(inputStream),
                };

                // add file into the response
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = Path.GetFileName(fileName),
                };
                return response;
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Upload document.
        /// </summary>
        /// <returns>Uploaded document object.</returns>
        [HttpPost]
        [Route("uploadDocument")]
        public HttpResponseMessage UploadDocument()
        {
            try
            {
                // get posted data
                string url = HttpContext.Current.Request.Form["url"];
                string signatureType = HttpContext.Current.Request.Form["signatureType"];
                bool rewrite = bool.Parse(HttpContext.Current.Request.Form["rewrite"]);

                // get path for where to save the file
                string fileSavePath = string.Empty;
                switch (signatureType)
                {
                    case "digital":
                        fileSavePath = this.directoryUtils.DataDirectory.CertificateDirectory.Path;
                        break;
                    case "image":
                        fileSavePath = this.directoryUtils.DataDirectory.UploadedImageDirectory.Path;
                        break;
                    default:
                        fileSavePath = this.directoryUtils.FilesDirectory.GetPath();
                        break;
                }

                // check if file selected or URL
                if (string.IsNullOrEmpty(url))
                {
                    if (HttpContext.Current.Request.Files.AllKeys != null)
                    {
                        // Get the uploaded document from the Files collection
                        var httpPostedFile = HttpContext.Current.Request.Files["file"];
                        if (httpPostedFile != null)
                        {
                            if (rewrite)
                            {
                                // Get the complete file path
                                fileSavePath = Path.Combine(fileSavePath, httpPostedFile.FileName);
                            }
                            else
                            {
                                fileSavePath = Common.Resources.Resources.GetFreeFileName(fileSavePath, httpPostedFile.FileName);
                            }

                            // Save the uploaded file to "UploadedFiles" folder
                            httpPostedFile.SaveAs(fileSavePath);
                            httpPostedFile.InputStream.Close();
                        }
                    }
                }
                else
                {
                    using (WebClient client = new WebClient())
                    {
                        // get file name from the URL
                        Uri uri = new Uri(url);
                        string fileName = Path.GetFileName(uri.LocalPath);
                        if (rewrite)
                        {
                            // Get the complete file path
                            fileSavePath = Path.Combine(fileSavePath, fileName);
                        }
                        else
                        {
                            fileSavePath = Common.Resources.Resources.GetFreeFileName(fileSavePath, fileName);
                        }

                        // Download the Web resource and save it into the current filesystem folder.
                        client.DownloadFile(url, fileSavePath);
                    }
                }

                // initiate uploaded file description class
                SignatureFileDescriptionEntity uploadedDocument = new SignatureFileDescriptionEntity
                {
                    guid = fileSavePath,
                };
                MemoryStream ms = new MemoryStream();
                using (FileStream file = new FileStream(fileSavePath, FileMode.Open, FileAccess.ReadWrite))
                {
                    file.CopyTo(ms);
                    byte[] imageBytes = ms.ToArray();

                    // Convert byte[] to Base64 String
                    uploadedDocument.image = Convert.ToBase64String(imageBytes);
                }

                ms.Close();
                return this.Request.CreateResponse(HttpStatusCode.OK, uploadedDocument);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Load selected signature image preview.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Signature image preview in Base64.</returns>
        [HttpPost]
        [Route("loadSignatureImage")]
        public HttpResponseMessage LoadSignatureImage(SignaturePostedDataEntity postedData)
        {
            try
            {
                // get/set parameters
                string documentGuid = postedData.guid;
                SignatureLoadedPageEntity loadedPage = new SignatureLoadedPageEntity();
                MemoryStream ms = new MemoryStream();
                using (FileStream file = new FileStream(documentGuid, FileMode.Open, FileAccess.ReadWrite))
                {
                    file.CopyTo(ms);
                    byte[] imageBytes = ms.ToArray();

                    // Convert byte[] to Base64 String
                    loadedPage.SetData(Convert.ToBase64String(imageBytes));
                }

                ms.Close();
                if (postedData.signatureType.Equals("text"))
                {
                    // get xml data of the Text signature
                    string xmlFileName = Path.GetFileNameWithoutExtension(Path.GetFileName(documentGuid));
                    string xmlPath = this.directoryUtils.DataDirectory.TextDirectory.XmlPath;

                    // Load xml data
                    TextXmlEntity textData = LoadXmlData<TextXmlEntity>(xmlPath, xmlFileName);
                    loadedPage.props = textData;
                }

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, loadedPage);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Save image signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Image signature preview.</returns>
        [HttpPost]
        [Route("saveImage")]
        public HttpResponseMessage SaveImage(SignaturePostedDataEntity postedData)
        {
            try
            {
                // get/set parameters
                string encodedImage = postedData.image.Replace("data:image/png;base64,", string.Empty);
                FileDescriptionEntity savedImage = new FileDescriptionEntity();
                string[] files = Directory.GetFiles(this.directoryUtils.DataDirectory.ImageDirectory.Path);
                string imageName = string.Empty;
                if (files.Length == 0)
                {
                    imageName = string.Format("{0:000}.png", 1);
                }
                else
                {
                    for (int i = 0; i <= files.Length; i++)
                    {
                        string path = Path.Combine(this.directoryUtils.DataDirectory.ImageDirectory.Path, string.Format("{0:000}.png", i + 1));
                        if (files.Contains(path))
                        {
                            continue;
                        }
                        else
                        {
                            imageName = string.Format("{0:000}.png", i + 1);
                        }
                    }
                }

                string imagePath = Path.Combine(this.directoryUtils.DataDirectory.ImageDirectory.Path, imageName);
                if (File.Exists(imagePath))
                {
                    imageName = Path.GetFileName(Common.Resources.Resources.GetFreeFileName(this.directoryUtils.DataDirectory.ImageDirectory.Path, imageName));
                    imagePath = Path.Combine(this.directoryUtils.DataDirectory.ImageDirectory.Path, imageName);
                }

                File.WriteAllBytes(imagePath, Convert.FromBase64String(encodedImage));
                savedImage.guid = imagePath;

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, savedImage);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Save stamp signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Stamp signature preview image.</returns>
        [HttpPost]
        [Route("saveStamp")]
        public HttpResponseMessage SaveStamp(SignaturePostedDataEntity postedData)
        {
            string previewPath = this.directoryUtils.DataDirectory.StampDirectory.PreviewPath;
            string xmlPath = this.directoryUtils.DataDirectory.StampDirectory.XmlPath;
            try
            {
                // get/set parameters
                string encodedImage = postedData.image.Replace("data:image/png;base64,", string.Empty);
                StampXmlEntity[] stampData = postedData.stampData;

                string newFileName = string.Empty;
                FileDescriptionEntity savedImage = new FileDescriptionEntity();
                string filePath = string.Empty;
                string[] listOfFiles = Directory.GetFiles(previewPath);
                for (int i = 0; i <= listOfFiles.Length; i++)
                {
                    int number = i + 1;
                    newFileName = string.Format("{0:000}", number);
                    filePath = previewPath + "/" + newFileName + ".png";
                    if (!File.Exists(filePath))
                    {
                        break;
                    }
                }

                File.WriteAllBytes(filePath, Convert.FromBase64String(encodedImage));
                savedImage.guid = filePath;

                // stamp data to xml file saving
                this.SaveXmlData(xmlPath, newFileName, stampData);

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, savedImage);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Save optical signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Signature preview image.</returns>
        [HttpPost]
        [Route("saveOpticalCode")]
        public HttpResponseMessage SaveOpticalCode([FromBody] dynamic postedData)
        {
            try
            {
                OpticalXmlEntity opticalCodeData = JsonConvert.DeserializeObject<OpticalXmlEntity>(postedData.properties.ToString());
                string signatureType = postedData.signatureType;

                // initiate signature data wrapper with default values
                SignatureDataEntity signaturesData = new SignatureDataEntity
                {
                    ImageHeight = 200,
                    ImageWidth = 200,
                    Left = 0,
                    Top = 0,
                };

                signaturesData.setHorizontalAlignment(HorizontalAlignment.Center);
                signaturesData.setVerticalAlignment(VerticalAlignment.Center);

                // initiate signer object
                string previewPath;
                string xmlPath;
                QrCodeSigner qrSigner;
                BarCodeSigner barCodeSigner;

                // initiate signature options collection
                var signOptionsCollection = new List<SignOptions>();

                // check optical signature type
                if (signatureType.Equals("qrCode"))
                {
                    qrSigner = new QrCodeSigner(opticalCodeData, signaturesData);

                    // get preview path
                    previewPath = this.directoryUtils.DataDirectory.QrCodeDirectory.PreviewPath;

                    // get xml file path
                    xmlPath = this.directoryUtils.DataDirectory.QrCodeDirectory.XmlPath;

                    // generate unique file names for preview image and xml file
                    signOptionsCollection.Add(qrSigner.SignImage());
                }
                else
                {
                    barCodeSigner = new BarCodeSigner(opticalCodeData, signaturesData);

                    // get preview path
                    previewPath = this.directoryUtils.DataDirectory.BarcodeDirectory.PreviewPath;

                    // get xml file path
                    xmlPath = this.directoryUtils.DataDirectory.BarcodeDirectory.XmlPath;

                    // generate unique file names for preview image and xml file
                    signOptionsCollection.Add(barCodeSigner.SignImage());
                }

                string[] listOfFiles = Directory.GetFiles(previewPath);
                string fileName = string.Empty;
                string filePath = string.Empty;
                if (!string.IsNullOrEmpty(opticalCodeData.imageGuid))
                {
                    filePath = opticalCodeData.imageGuid;
                    fileName = Path.GetFileNameWithoutExtension(opticalCodeData.imageGuid);
                }
                else
                {
                    for (int i = 0; i <= listOfFiles.Length; i++)
                    {
                        // set file name, for example 001
                        fileName = opticalCodeData.text;
                        filePath = Path.Combine(previewPath, fileName + ".png");

                        // check if file with such name already exists
                        if (File.Exists(filePath))
                        {
                            continue;
                        }
                        else
                        {
                            break;
                        }
                    }
                }

                // generate empty image for future signing with Optical signature, such approach required to get QR-Code as image
                using (Bitmap bitMap = new Bitmap(200, 200))
                {
                    using (MemoryStream memory = new MemoryStream())
                    {
                        using (FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite))
                        {
                            bitMap.Save(memory, ImageFormat.Png);
                            byte[] bytes = memory.ToArray();
                            fs.Write(bytes, 0, bytes.Length);
                        }
                    }
                }

                // Optical data to xml file saving
                this.SaveXmlData(xmlPath, fileName, opticalCodeData);

                // set signing save options
                SaveOptions saveOptions = new SaveOptions
                {
                    AddMissingExtenstion = true,
                    OverwriteExistingFiles = true,
                };

                string tempFile = Path.Combine(previewPath, fileName + "signed.png");

                // sign generated image with Optical signature
                using (FileStream outputStream = File.Create(Path.Combine(tempFile)))
                {
                    using (GroupDocs.Signature.Signature signature = new GroupDocs.Signature.Signature(filePath))
                    {
                        signature.Sign(outputStream, signOptionsCollection, saveOptions);
                    }
                }

                File.Delete(filePath);
                File.Move(tempFile, filePath);

                // set data for response
                opticalCodeData.imageGuid = filePath;
                opticalCodeData.height = Convert.ToInt32(signaturesData.ImageHeight);
                opticalCodeData.width = Convert.ToInt32(signaturesData.ImageWidth);

                // get signature preview as Base64 string
                byte[] imageArray = File.ReadAllBytes(filePath);
                string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                opticalCodeData.encodedImage = base64ImageRepresentation;

                if (opticalCodeData.temp)
                {
                    File.Delete(filePath);
                    File.Delete(Path.Combine(xmlPath, fileName + ".xml"));
                }

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, opticalCodeData);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Save text signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Text signature preview image.</returns>
        [HttpPost]
        [Route("saveText")]
        public HttpResponseMessage SaveText([FromBody] dynamic postedData)
        {
            string xmlPath = this.directoryUtils.DataDirectory.TextDirectory.XmlPath;
            try
            {
                TextXmlEntity textData = JsonConvert.DeserializeObject<TextXmlEntity>(postedData.properties.ToString());
                string[] listOfFiles = Directory.GetFiles(xmlPath);
                string fileName = string.Empty;
                string filePath = string.Empty;
                if (File.Exists(textData.imageGuid))
                {
                    fileName = Path.GetFileNameWithoutExtension(textData.imageGuid);
                    filePath = textData.imageGuid;
                }
                else
                {
                    for (int i = 0; i <= listOfFiles.Length; i++)
                    {
                        int number = i + 1;

                        // set file name, for example 001
                        fileName = string.Format("{0:000}", number);
                        filePath = Path.Combine(xmlPath, fileName + ".xml");

                        // check if file with such name already exists
                        if (File.Exists(filePath))
                        {
                            continue;
                        }
                        else
                        {
                            break;
                        }
                    }
                }

                // Save text data to an xml file
                this.SaveXmlData(xmlPath, fileName, textData);

                // set Text data for response
                textData.imageGuid = filePath;

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, textData);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Save text signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Text signature preview image.</returns>
        [HttpGet]
        [Route("getFonts")]
        public HttpResponseMessage GetFonts()
        {
            try
            {
                List<string> fonts = new List<string>();

                foreach (FontFamily font in FontFamily.Families)
                {
                    fonts.Add(font.Name);
                }

                return this.Request.CreateResponse(HttpStatusCode.OK, fonts);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Delete signature.
        /// </summary>
        /// <param name="deleteSignatureFileRequest">DeleteSignatureFileRequest.</param>
        /// <returns>Text signature preview image.</returns>
        [HttpPost]
        [Route("deleteSignatureFile")]
        public HttpResponseMessage DeleteSignatureFile(DeleteSignatureFileRequest deleteSignatureFileRequest)
        {
            try
            {
                string signatureType = deleteSignatureFileRequest.getSignatureType();
                switch (signatureType)
                {
                    case "image":
                    case "digital":
                    case "hand":
                        if (File.Exists(deleteSignatureFileRequest.getGuid()))
                        {
                            File.Delete(deleteSignatureFileRequest.getGuid());
                        }

                        break;
                    default:
                        if (File.Exists(deleteSignatureFileRequest.getGuid()))
                        {
                            File.Delete(deleteSignatureFileRequest.getGuid());
                        }

                        string xmlFilePath = this.GetXmlFilePath(
                            signatureType,
                            Path.GetFileNameWithoutExtension(deleteSignatureFileRequest.getGuid()) + ".xml");
                        File.Delete(xmlFilePath);
                        break;
                }

                return this.Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        /// <summary>
        /// Sign document with digital signature.
        /// </summary>
        /// <param name="postedData">SignaturePostedDataEntity.</param>
        /// <returns>Signed document info.</returns>
        [HttpPost]
        [Route("sign")]
        public HttpResponseMessage Sign(SignaturePostedDataEntity postedData)
        {
            try
            {
                // get/set parameters
                string documentGuid = postedData.guid;
                string password = postedData.password;
                SignatureDataEntity[] signaturesData = postedData.signaturesData;
                var signsCollection = new List<SignOptions>();

                // check if document type is image
                if (this.supportedImageFormats.Contains(Path.GetExtension(documentGuid)))
                {
                    postedData.documentType = "image";
                }

                // set signature password if required
                for (int i = 0; i < signaturesData.Length; i++)
                {
                    switch (signaturesData[i].SignatureType)
                    {
                        case "image":
                        case "hand":
                            SignImage(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "stamp":
                            this.SignStamp(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "qrCode":
                        case "barCode":
                            this.SignOptical(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "text":
                            this.SignText(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "digital":
                            SignDigital(postedData.documentType, password, signaturesData[i], signsCollection);
                            break;
                        default:
                            SignImage(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                    }
                }

                // return loaded page object
                SignedDocumentEntity signedDocument = SignDocument(documentGuid, password, signsCollection);

                // return loaded page object
                return this.Request.CreateResponse(HttpStatusCode.OK, signedDocument);
            }
            catch (System.Exception ex)
            {
                // set exception message
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, Resources.GenerateException(ex));
            }
        }

        private static MemoryStream RenderPageToMemoryStream(GroupDocs.Signature.Signature signature, int pageNumberToRender)
        {
            MemoryStream result = new MemoryStream();
            PreviewOptions previewOptions = new PreviewOptions(pageNumber => result)
            {
                PreviewFormat = PreviewOptions.PreviewFormats.PNG,
                PageNumbers = new[] { pageNumberToRender },
            };

            signature.GeneratePreview(previewOptions);

            return result;
        }

        /// <summary>
        /// Add digital signature.
        /// </summary>
        /// <param name="documentType">Document type.</param>
        /// <param name="password">Password.</param>
        /// <param name="signaturesData">SignatureDataEntity.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        private static void SignDigital(string documentType, string password, SignatureDataEntity signaturesData, List<SignOptions> signsCollection)
        {
            try
            {
                // initiate digital signer
                DigitalSigner signer = new DigitalSigner(signaturesData, password);
                AddSignOptions(documentType, signsCollection, signer);
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Add image signature.
        /// </summary>
        /// <param name="documentType">string.</param>
        /// <param name="signaturesData">SignatureDataEntity.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        private static void SignImage(string documentType, SignatureDataEntity signaturesData, List<SignOptions> signsCollection)
        {
            try
            {
                // initiate image signer object
                ImageSigner signer = new ImageSigner(signaturesData);

                // prepare signing options and sign document
                AddSignOptions(documentType, signsCollection, signer);
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Add signature options to the signatures collection.
        /// </summary>
        /// <param name="documentType">string.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        /// <param name="signer">SignatureSigner.</param>
        private static void AddSignOptions(string documentType, List<SignOptions> signsCollection, BaseSigner signer)
        {
            switch (documentType)
            {
                case "Portable Document Format":
                    signsCollection.Add(signer.SignPdf());
                    break;
                case "Microsoft Word":
                    signsCollection.Add(signer.SignWord());
                    break;
                case "Microsoft PowerPoint":
                    signsCollection.Add(signer.SignSlides());
                    break;
                case "image":
                    signsCollection.Add(signer.SignImage());
                    break;
                case "Microsoft Excel":
                    signsCollection.Add(signer.SignCells());
                    break;
                default:
                    signsCollection.Add(signer.SignWord());
                    break;
            }
        }

        /// <summary>
        /// Sign document.
        /// </summary>
        /// <param name="documentGuid">Document guid.</param>
        /// <param name="password">Password.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        /// <returns>SignedDocumentEntity.</returns>
        private static SignedDocumentEntity SignDocument(string documentGuid, string password, List<SignOptions> signsCollection)
        {
            // set save options
            SaveOptions saveOptions = new SaveOptions
            {
                OverwriteExistingFiles = false,
            };

            // sign document
            string tempFilename = Path.GetFileNameWithoutExtension(documentGuid) + "_tmp";
            string tempPath = Path.Combine(Path.GetDirectoryName(documentGuid), tempFilename + Path.GetExtension(documentGuid));
            SignedDocumentEntity signedDocument = new SignedDocumentEntity();
            using (GroupDocs.Signature.Signature signature = new GroupDocs.Signature.Signature(documentGuid, GetLoadOptions(password)))
            {
                signature.Sign(tempPath, signsCollection, saveOptions);
            }

            File.Delete(documentGuid);
            File.Move(tempPath, documentGuid);

            signedDocument.guid = documentGuid;

            return signedDocument;
        }

        /// <summary>
        /// Sign document.
        /// </summary>
        /// <param name="documentGuid">Document guid.</param>
        /// <param name="password">Password.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        /// <returns>Stream.</returns>
        private static Stream SignDocumentStream(string documentGuid, string password, List<SignOptions> signsCollection)
        {
            // set save options
            SaveOptions saveOptions = new SaveOptions();

            FileStream fileStream = File.Open(documentGuid, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);

            using (GroupDocs.Signature.Signature signature = new GroupDocs.Signature.Signature(fileStream, GetLoadOptions(password)))
            {
                signature.Sign(documentGuid, signsCollection, saveOptions);

                return fileStream;
            }
        }

        /// <summary>
        /// Load signature XML data from file.
        /// </summary>
        /// <typeparam name="T">Type.</typeparam>
        /// <param name="xmlPath">XML path.</param>
        /// <param name="xmlFileName">XML file name.</param>
        /// <returns>Signature data object.</returns>
        private static T LoadXmlData<T>(string xmlPath, string xmlFileName)
        {
            // initiate return object type
            T returnObject = default(T);
            if (string.IsNullOrEmpty(xmlFileName))
            {
                return default(T);
            }

            try
            {
                // get stream of the xml file
                using (StreamReader xmlStream = new StreamReader(Path.Combine(xmlPath, xmlFileName + ".xml")))
                {
                    // initiate serializer
                    XmlSerializer serializer = new XmlSerializer(typeof(T));

                    // deserialize XML into the object
                    returnObject = (T)serializer.Deserialize(xmlStream);
                }
            }
            catch (System.Exception ex)
            {
                Console.Error.Write(ex.Message);
            }

            return returnObject;
        }

        private static LoadOptions GetLoadOptions(string password)
        {
            LoadOptions loadOptions = new LoadOptions
            {
                Password = password,
            };

            return loadOptions;
        }

        private Stream SignByStream(SignaturePostedDataEntity postedData)
        {
            try
            {
                // get/set parameters
                string documentGuid = postedData.guid;
                string password = postedData.password;
                SignatureDataEntity[] signaturesData = postedData.signaturesData;
                List<SignOptions> signsCollection = new List<SignOptions>();

                // check if document type is image
                if (this.supportedImageFormats.Contains(Path.GetExtension(documentGuid)))
                {
                    postedData.documentType = "image";
                }

                // set signature password if required
                for (int i = 0; i < signaturesData.Length; i++)
                {
                    switch (signaturesData[i].SignatureType)
                    {
                        case "image":
                        case "hand":
                            SignImage(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "stamp":
                            this.SignStamp(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "qrCode":
                        case "barCode":
                            this.SignOptical(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "text":
                            this.SignText(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                        case "digital":
                            SignDigital(postedData.documentType, password, signaturesData[i], signsCollection);
                            break;
                        default:
                            SignImage(postedData.documentType, signaturesData[i], signsCollection);
                            break;
                    }
                }

                // return loaded page object
                Stream signedDocument = SignDocumentStream(documentGuid, password, signsCollection);

                // return loaded page object
                return signedDocument;
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Add stamp signature.
        /// </summary>
        /// <param name="documentType">string.</param>
        /// <param name="signaturesData">SignatureDataEntity.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        private void SignStamp(string documentType, SignatureDataEntity signaturesData, List<SignOptions> signsCollection)
        {
            string xmlPath = this.directoryUtils.DataDirectory.StampDirectory.XmlPath;
            try
            {
                string xmlFileName = Path.GetFileNameWithoutExtension(Path.GetFileName(signaturesData.SignatureGuid));

                // Load xml data
                StampXmlEntity[] stampData = LoadXmlData<StampXmlEntity[]>(xmlPath, xmlFileName);

                // since stamp ine are added stating from the most outer line we need to reverse the stamp data array
                Array.Reverse(stampData);

                // initiate stamp signer
                StampSigner signer = new StampSigner(stampData, signaturesData);

                // prepare signing options and sign document
                AddSignOptions(documentType, signsCollection, signer);
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Add Optical signature.
        /// </summary>
        /// <param name="documentType">string.</param>
        /// <param name="signaturesData">SignatureDataEntity.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        private void SignOptical(string documentType, SignatureDataEntity signaturesData, List<SignOptions> signsCollection)
        {
            try
            {
                string signatureType = signaturesData.SignatureType;

                // get xml files root path
                string xmlPath = signatureType.Equals("qrCode") ? this.directoryUtils.DataDirectory.QrCodeDirectory.XmlPath : this.directoryUtils.DataDirectory.BarcodeDirectory.XmlPath;

                // prepare signing options and sign document
                // get xml data of the QR-Code
                string xmlFileName = Path.GetFileNameWithoutExtension(Path.GetFileName(signaturesData.SignatureGuid));

                // Load xml data
                OpticalXmlEntity opticalCodeData = LoadXmlData<OpticalXmlEntity>(xmlPath, xmlFileName);

                // initiate QRCode signer object
                BaseSigner signer = null;
                if (signatureType.Equals("qrCode"))
                {
                    signer = new QrCodeSigner(opticalCodeData, signaturesData);
                }
                else
                {
                    signer = new BarCodeSigner(opticalCodeData, signaturesData);
                }

                // prepare signing options and sign document
                AddSignOptions(documentType, signsCollection, signer);
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Add text signature.
        /// </summary>
        /// <param name="documentType">string.</param>
        /// <param name="signaturesData">SignatureDataEntity.</param>
        /// <param name="signsCollection">SignatureOptionsCollection.</param>
        private void SignText(string documentType, SignatureDataEntity signaturesData, List<SignOptions> signsCollection)
        {
            string xmlPath = this.directoryUtils.DataDirectory.TextDirectory.XmlPath;
            try
            {
                // get xml data of the Text signature
                string xmlFileName = Path.GetFileNameWithoutExtension(signaturesData.SignatureGuid);

                // Load xml data
                TextXmlEntity textData = LoadXmlData<TextXmlEntity>(xmlPath, xmlFileName);

                // initiate QRCode signer object
                TextSigner signer = new TextSigner(textData, signaturesData);

                // prepare signing options and sign document
                AddSignOptions(documentType, signsCollection, signer);
            }
            catch (System.Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        private string GetXmlFilePath(string signatureType, string fileName)
        {
            string path;
            switch (signatureType)
            {
                case "stamp":
                    path = Path.Combine(this.directoryUtils.DataDirectory.StampDirectory.XmlPath, fileName);
                    break;
                case "text":
                    path = Path.Combine(this.directoryUtils.DataDirectory.TextDirectory.XmlPath, fileName);
                    break;
                case "qrCode":
                    path = Path.Combine(this.directoryUtils.DataDirectory.QrCodeDirectory.XmlPath, fileName);
                    break;
                case "barCode":
                    path = Path.Combine(this.directoryUtils.DataDirectory.BarcodeDirectory.XmlPath, fileName);
                    break;
                default:
                    throw new ArgumentNullException("Signature type is not defined");
            }

            return path;
        }

        /// <summary>
        /// Save signature data into the XML.
        /// </summary>
        /// <typeparam name="T">Type.</typeparam>
        /// <param name="xmlPath">XML path.</param>
        /// <param name="xmlFileName">XML file name.</param>
        /// <param name="serializableObject">Object.</param>
        private void SaveXmlData<T>(string xmlPath, string xmlFileName, T serializableObject)
        {
            if (object.Equals(serializableObject, default(T)))
            {
                return;
            }

            try
            {
                // initiate xml
                XmlDocument xmlDocument = new XmlDocument();

                // initiate serializer
                XmlSerializer serializer = new XmlSerializer(serializableObject.GetType());

                // save xml file
                using (MemoryStream stream = new MemoryStream())
                {
                    // serialize data into the xml
                    serializer.Serialize(stream, serializableObject);
                    stream.Position = 0;
                    xmlDocument.Load(stream);
                    xmlDocument.Save(Path.Combine(xmlPath, xmlFileName + ".xml"));
                    stream.Close();
                }
            }
            catch (System.Exception ex)
            {
                Console.Error.Write(ex.Message);
            }
        }
    }
}