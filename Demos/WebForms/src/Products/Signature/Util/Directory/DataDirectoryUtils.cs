using GroupDocs.Signature.WebForms.Products.Common.Util.Directory;
using GroupDocs.Signature.WebForms.Products.Signature.Config;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Directory;
using System;
using System.IO;

namespace GroupDocs.Signature.WebForms.Products.Signature.Util.Directory
{
    /// <summary>
    /// DataDirectoryUtils
    /// </summary>
    public class DataDirectoryUtils : IDirectoryUtils
    {
        private readonly string DATA_FOLDER = "/SignatureData";
        private readonly SignatureConfiguration signatureConfiguration;

        public CertificateDataDirectoryEntity CertificateDirectory { get; set; }
        public ImageDataDirectoryEntity ImageDirectory { get; set; }
        public UploadedImageDataDirectoryEntity UploadedImageDirectory { get; set; }
        public StampDataDirectoryEntity StampDirectory { get; set; }
        public QrCodeDataDirectoryEntity QrCodeDirectory { get; set; }
        public BarcodeDataDirectoryEntity BarcodeDirectory { get; set; }
        public TextDataDirectoryEntity TextDirectory { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureConfig">SignatureConfiguration</param>
        public DataDirectoryUtils(SignatureConfiguration signatureConfig)
        {
            signatureConfiguration = signatureConfig;

            // check if data directory was set, if not set new directory
            if (String.IsNullOrEmpty(signatureConfiguration.dataDirectory))
            {
                signatureConfiguration.dataDirectory = signatureConfiguration.filesDirectory + DATA_FOLDER;
            }

            // create directory objects
            BarcodeDirectory = new BarcodeDataDirectoryEntity(signatureConfiguration);
            CertificateDirectory = new CertificateDataDirectoryEntity(signatureConfiguration);
            ImageDirectory = new ImageDataDirectoryEntity(signatureConfiguration);
            UploadedImageDirectory = new UploadedImageDataDirectoryEntity(signatureConfiguration);
            StampDirectory = new StampDataDirectoryEntity(signatureConfiguration);
            QrCodeDirectory = new QrCodeDataDirectoryEntity(signatureConfiguration);
            BarcodeDirectory = new BarcodeDataDirectoryEntity(signatureConfiguration);
            TextDirectory = new TextDataDirectoryEntity(signatureConfiguration);

            // create directories
            System.IO.Directory.CreateDirectory(CertificateDirectory.Path);
            System.IO.Directory.CreateDirectory(ImageDirectory.Path);

            System.IO.Directory.CreateDirectory(StampDirectory.XmlPath);
            System.IO.Directory.CreateDirectory(StampDirectory.PreviewPath);

            System.IO.Directory.CreateDirectory(QrCodeDirectory.XmlPath);
            System.IO.Directory.CreateDirectory(QrCodeDirectory.PreviewPath);

            System.IO.Directory.CreateDirectory(BarcodeDirectory.XmlPath);
            System.IO.Directory.CreateDirectory(BarcodeDirectory.PreviewPath);

            System.IO.Directory.CreateDirectory(TextDirectory.XmlPath);

            string uploadedImagePath = ImageDirectory.Path + ImageDirectory.GetUploadedImageFolder();
            System.IO.Directory.CreateDirectory(uploadedImagePath);
        }

        /// <summary>
        /// Get path
        /// </summary>
        /// <returns>string</returns>
        public string GetPath()
        {
            return signatureConfiguration.dataDirectory;
        }
    }
}