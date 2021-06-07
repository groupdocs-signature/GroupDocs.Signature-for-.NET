using System;
using System.IO;
using System.Linq;
using GroupDocs.Signature.WebForms.Products.Common.Config;
using GroupDocs.Signature.WebForms.Products.Common.Util.Parser;
using Newtonsoft.Json;

namespace GroupDocs.Signature.WebForms.Products.Signature.Config
{
    /// <summary>
    /// SignatureConfiguration.
    /// </summary>
    public class SignatureConfiguration : CommonConfiguration
    {
        [JsonProperty]
        internal string filesDirectory = "DocumentSamples/Signature";

        [JsonProperty]
        private string defaultDocument = string.Empty;

        [JsonProperty]
        internal string dataDirectory = string.Empty;

        [JsonProperty]
        internal int preloadPageCount;

        [JsonProperty]
        private bool textSignature = true;

        [JsonProperty]
        private bool imageSignature = true;

        [JsonProperty]
        private bool digitalSignature = true;

        [JsonProperty]
        private bool qrCodeSignature = true;

        [JsonProperty]
        private bool barCodeSignature = true;

        [JsonProperty]
        private bool stampSignature = true;

        [JsonProperty]
        private bool handSignature = true;

        [JsonProperty]
        private bool downloadOriginal = true;

        [JsonProperty]
        private bool downloadSigned = true;

        [JsonProperty]
        private string tempFilesDirectory = string.Empty;

        [JsonProperty]
        private bool zoom = true;

        /// <summary>
        /// Initializes a new instance of the <see cref="SignatureConfiguration"/> class.
        /// Get signature configuration section from the Web.config.
        /// </summary>
        public SignatureConfiguration()
        {
            YamlParser parser = new YamlParser();
            dynamic configuration = parser.GetConfiguration("signature");
            ConfigurationValuesGetter valuesGetter = new ConfigurationValuesGetter(configuration);

            // get Comparison configuration section from the web.config
            this.filesDirectory = valuesGetter.GetStringPropertyValue("filesDirectory", this.filesDirectory);
            if (!IsFullPath(this.filesDirectory))
            {
                this.filesDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, this.filesDirectory);
                if (!Directory.Exists(this.filesDirectory))
                {
                    Directory.CreateDirectory(this.filesDirectory);
                }
            }
            this.dataDirectory = valuesGetter.GetStringPropertyValue("dataDirectory", this.dataDirectory);
            this.defaultDocument = valuesGetter.GetStringPropertyValue("defaultDocument", this.defaultDocument);
            this.textSignature = valuesGetter.GetBooleanPropertyValue("textSignature", this.textSignature);
            this.imageSignature = valuesGetter.GetBooleanPropertyValue("imageSignature", this.imageSignature);
            this.digitalSignature = valuesGetter.GetBooleanPropertyValue("digitalSignature", this.digitalSignature);
            this.qrCodeSignature = valuesGetter.GetBooleanPropertyValue("qrCodeSignature", this.qrCodeSignature);
            this.barCodeSignature = valuesGetter.GetBooleanPropertyValue("barCodeSignature", this.barCodeSignature);
            this.stampSignature = valuesGetter.GetBooleanPropertyValue("stampSignature", this.stampSignature);
            this.handSignature = valuesGetter.GetBooleanPropertyValue("handSignature", this.handSignature);
            this.downloadOriginal = valuesGetter.GetBooleanPropertyValue("downloadOriginal", this.downloadOriginal);
            this.downloadSigned = valuesGetter.GetBooleanPropertyValue("downloadSigned", this.downloadSigned);
            this.preloadPageCount = valuesGetter.GetIntegerPropertyValue("preloadPageCount", this.preloadPageCount);
            this.zoom = valuesGetter.GetBooleanPropertyValue("zoom", this.zoom);
        }

        private static bool IsFullPath(string path)
        {
            return !string.IsNullOrWhiteSpace(path)
                && path.IndexOfAny(Path.GetInvalidPathChars().ToArray()) == -1
                && Path.IsPathRooted(path)
                && !Path.GetPathRoot(path).Equals(Path.DirectorySeparatorChar.ToString(), StringComparison.Ordinal);
        }

        public void SetTempFilesDirectory(string tempFilesDirectory)
        {
            this.tempFilesDirectory = tempFilesDirectory;
        }

        public string GetTempFilesDirectory()
        {
            return this.tempFilesDirectory;
        }
    }
}