using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;
using GroupDocs.Signature.WebForms.Products.Common.Util.Comparator;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml;
using GroupDocs.Signature.WebForms.Products.Signature.Util.Directory;

namespace GroupDocs.Signature.WebForms.Products.Signature.Loader
{
    /// <summary>
    /// SignatureLoader.
    /// </summary>
    public class SignatureLoader
    {
        private readonly string currentPath;
        private readonly Common.Config.GlobalConfiguration globalConfiguration;
        private readonly DirectoryUtils directoryUtils;

        /// <summary>
        /// Initializes a new instance of the <see cref="SignatureLoader"/> class.
        /// Constructor.
        /// </summary>
        /// <param name="path">string.</param>
        /// <param name="globalConfiguration">Common.Config.GlobalConfiguration.</param>
        /// <param name="directoryUtils">DirectoryUtils.</param>
        public SignatureLoader(string path, Common.Config.GlobalConfiguration globalConfiguration, DirectoryUtils directoryUtils)
        {
            this.currentPath = path;
            this.globalConfiguration = globalConfiguration;
            this.directoryUtils = directoryUtils;
        }

        /// <summary>
        /// Load image signatures.
        /// </summary>
        /// <returns>List[SignatureFileDescriptionEntity].</returns>
        public List<SignatureFileDescriptionEntity> LoadImageSignatures()
        {
            string[] files = Directory.GetFiles(this.currentPath, "*.*", SearchOption.TopDirectoryOnly);
            List<string> allFiles = new List<string>(files);
            List<SignatureFileDescriptionEntity> fileList = new List<SignatureFileDescriptionEntity>();
            try
            {
                allFiles.Sort(new FileDateComparator());
                allFiles.Sort(new FileNameComparator());

                foreach (string file in allFiles)
                {
                    FileInfo fileInfo = new FileInfo(file);

                    // check if current file/folder is hidden
                    if (!(fileInfo.Attributes.HasFlag(FileAttributes.Hidden) || file.Equals(this.globalConfiguration.Signature.dataDirectory)))
                    {
                        SignatureFileDescriptionEntity fileDescription = new SignatureFileDescriptionEntity();
                        fileDescription.guid = Path.GetFullPath(file);
                        fileDescription.name = Path.GetFileName(file);

                        // set is directory true/false
                        fileDescription.isDirectory = fileInfo.Attributes.HasFlag(FileAttributes.Directory);

                        // set file size
                        fileDescription.size = fileInfo.Length;

                        // get image Base64 incoded string
                        byte[] imageArray = File.ReadAllBytes(file);
                        string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                        fileDescription.image = base64ImageRepresentation;

                        // add object to array list
                        fileList.Add(fileDescription);
                    }
                }

                return fileList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Load digital signatures or documents.
        /// </summary>
        /// <returns>List[SignatureFileDescriptionEntity].</returns>
        public List<SignatureFileDescriptionEntity> LoadFiles()
        {
            List<string> allFiles = new List<string>(Directory.GetFiles(this.currentPath));
            allFiles.AddRange(Directory.GetDirectories(this.currentPath));
            List<SignatureFileDescriptionEntity> fileList = new List<SignatureFileDescriptionEntity>();
            string dataDirectory = this.globalConfiguration.Signature.dataDirectory;
            string outputDirectory = this.globalConfiguration.Signature.filesDirectory + this.directoryUtils.GetTempFolder().OUTPUT_FOLDER;

            try
            {
                allFiles.Sort(new FileNameComparator());
                allFiles.Sort(new FileDateComparator());

                foreach (string file in allFiles)
                {
                    FileInfo fileInfo = new FileInfo(file);

                    // check if current file/folder is hidden
                    if (!fileInfo.Attributes.HasFlag(FileAttributes.Hidden) &&
                        !Path.GetFileName(file).StartsWith(".") &&
                        !Path.GetFileName(file).Equals(Path.GetFileName(dataDirectory), StringComparison.OrdinalIgnoreCase) &&
                        !Path.GetFileName(file).Equals(Path.GetFileName(outputDirectory), StringComparison.OrdinalIgnoreCase))
                    {
                        SignatureFileDescriptionEntity fileDescription = new SignatureFileDescriptionEntity();
                        fileDescription.guid = Path.GetFullPath(file);
                        fileDescription.name = Path.GetFileName(file);

                        // set is directory true/false
                        fileDescription.isDirectory = fileInfo.Attributes.HasFlag(FileAttributes.Directory);

                        // set file size
                        if (!fileDescription.isDirectory)
                        {
                            fileDescription.size = fileInfo.Length;
                        }

                        // add object to array list
                        fileList.Add(fileDescription);
                    }
                }

                return fileList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Load stamps.
        /// </summary>
        /// <param name="previewFolder">Preview folder.</param>
        /// <param name="xmlFolder">XML folder.</param>
        /// <param name="signatureType">Signature type.</param>
        /// <returns>List[SignatureFileDescriptionEntity].</returns>
        public List<SignatureFileDescriptionEntity> LoadStampSignatures(string previewFolder, string xmlFolder, string signatureType)
        {
            string imagesPath = this.currentPath + previewFolder;
            string xmlPath = this.currentPath + xmlFolder;
            string[] imageFiles = Directory.GetFiles(imagesPath, "*.png", SearchOption.TopDirectoryOnly);

            // get all files from the directory
            List<SignatureFileDescriptionEntity> fileList = new List<SignatureFileDescriptionEntity>();
            try
            {
                if (imageFiles != null && imageFiles.Length > 0)
                {
                    string[] xmlFiles = Directory.GetFiles(xmlPath);
                    List<string> filesList = new List<string>();
                    foreach (string imageFile in imageFiles)
                    {
                        foreach (string xmlFile in xmlFiles)
                        {
                            if (Path.GetFileNameWithoutExtension(xmlFile).Equals(Path.GetFileNameWithoutExtension(imageFile)))
                            {
                                filesList.Add(imageFile);
                            }
                        }
                    }

                    // sort list of files and folders
                    filesList.Sort(new FileDateComparator());
                    filesList.Sort(new FileNameComparator());
                    foreach (string file in filesList)
                    {
                        FileInfo fileInfo = new FileInfo(file);

                        // check if current file/folder is hidden
                        if (fileInfo.Attributes.HasFlag(FileAttributes.Hidden) || file.Equals(this.globalConfiguration.Signature.dataDirectory))
                        {
                            // ignore current file and skip to next one
                            continue;
                        }
                        else
                        {
                            SignatureFileDescriptionEntity fileDescription = new SignatureFileDescriptionEntity();
                            fileDescription.guid = Path.GetFullPath(file);
                            fileDescription.name = Path.GetFileName(file);

                            // set is directory true/false
                            fileDescription.isDirectory = fileInfo.Attributes.HasFlag(FileAttributes.Directory);

                            // set file size
                            fileDescription.size = fileInfo.Length;

                            // get image Base64 incoded string
                            byte[] imageArray = File.ReadAllBytes(file);
                            string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                            fileDescription.image = base64ImageRepresentation;
                            if ("qrCode".Equals(signatureType) || "barCode".Equals(signatureType))
                            {
                                // get stream of the xml file
                                StreamReader xmlStream = new StreamReader(Path.Combine(xmlPath, Path.GetFileNameWithoutExtension(file) + ".xml"));

                                // initiate serializer
                                XmlSerializer serializer = null;
                                serializer = new XmlSerializer(typeof(OpticalXmlEntity));

                                // deserialize XML into the object
                                OpticalXmlEntity xmlData = (OpticalXmlEntity)serializer.Deserialize(xmlStream);
                                fileDescription.text = xmlData.text;
                                xmlStream.Close();
                                xmlStream.Dispose();
                            }

                            // add object to array list
                            fileList.Add(fileDescription);
                        }
                    }
                }

                return fileList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SignatureFileDescriptionEntity> LoadTextSignatures(string xmlFolder)
        {
            try
            {
                string xmlPath = this.currentPath + xmlFolder;
                string[] xmlFiles = Directory.GetFiles(xmlPath);

                // get all files from the directory
                List<SignatureFileDescriptionEntity> fileList = new List<SignatureFileDescriptionEntity>();
                foreach (string xmlFile in xmlFiles)
                {
                    SignatureFileDescriptionEntity fileDescription = new SignatureFileDescriptionEntity();
                    fileDescription.guid = xmlFile;
                    fileDescription.name = Path.GetFileName(xmlFile);

                    // get stream of the xml file
                    StreamReader xmlStream = new StreamReader(xmlFile);

                    // initiate serializer
                    XmlSerializer serializer = new XmlSerializer(typeof(TextXmlEntity));

                    // deserialize XML into the object
                    TextXmlEntity xmlData = (TextXmlEntity)serializer.Deserialize(xmlStream);
                    fileDescription.text = xmlData.text;
                    fileDescription.fontColor = xmlData.fontColor;
                    xmlStream.Close();
                    xmlStream.Dispose();

                    // add object to array list
                    fileList.Add(fileDescription);
                }

                return fileList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}