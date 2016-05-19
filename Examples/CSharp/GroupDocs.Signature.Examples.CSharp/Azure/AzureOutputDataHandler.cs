using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Handler.Output;
using GroupDocs.Signature.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupDocs.Signature.Examples.CSharp
{
    //ExStart:outputdatahandler
    public class AzureOutputDataHandler : AzureDataHandler, IOutputDataHandler
    {
        /// <summary>
        /// Handles azure output data
        /// </summary>
        /// <param name="endpoint">End point</param>
        /// <param name="accountName">Account name</param>
        /// <param name="accountKey">Key</param>
        /// <param name="containerName">Container Name</param>
        public AzureOutputDataHandler(string endpoint,
                                           string accountName,
                                           string accountKey,
                                           string containerName) :
            base(endpoint, accountName, accountKey, containerName)
        {
        }

        /// <summary>
        /// Creates file
        /// </summary>
        /// <param name="fileDescription">Description of the file</param>
        /// <param name="signOptions">Sign options</param>
        /// <param name="saveOptions">Save options</param>
        /// <returns>writeable append blob</returns>
        public Stream CreateFile(FileDescription fileDescription, SignOptions signOptions = null,
            SaveOptions saveOptions = null)
        {
            CloudBlobContainer container = GetContainerReference();
            string name = fileDescription.GUID.ToLower();
            CloudBlockBlob blob = container.GetBlockBlobReference(name);
            using (MemoryStream emptyStream = new MemoryStream())
            {
                blob.UploadFromStream(emptyStream);
            }
            try
            {
                CloudAppendBlob appendBlob = container.GetAppendBlobReference(name);
                appendBlob.CreateOrReplace();
                return appendBlob.OpenWrite(true);
            }
            catch (Microsoft.WindowsAzure.Storage.StorageException exception)
            {
                // Azure Storage Emulator does not support append BLOBs,
                // so we emulate appending
                return new CachingAzureStream(blob);
            }
        }

        /// <summary>
        /// Creats stream
        /// </summary>
        /// <param name="fileDescription"></param>
        /// <param name="signOptions"></param>
        /// <param name="saveOptions"></param>
        /// <returns></returns>
        public Stream CreateStream(FileDescription fileDescription, SignOptions signOptions = null,
            SaveOptions saveOptions = null)
        {
            throw new NotImplementedException();
        }
    }
    //ExEnd:outputdatahandler
}
