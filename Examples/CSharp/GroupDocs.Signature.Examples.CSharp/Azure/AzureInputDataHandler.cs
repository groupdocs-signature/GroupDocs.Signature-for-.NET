using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Handler.Input;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupDocs.Signature.Examples.CSharp
{
    public class AzureInputDataHandler : AzureDataHandler, IInputDataHandler
    {
        /// <summary>
        /// Handles azure input data
        /// </summary>
        /// <param name="endpoint">End point</param>
        /// <param name="accountName">Account name</param>
        /// <param name="accountKey">Key</param>
        /// <param name="containerName">Container Name</param>
        public AzureInputDataHandler(string endpoint,
                                           string accountName,
                                           string accountKey,
                                           string containerName) :
            base(endpoint, accountName, accountKey, containerName)
        {
        }
        public FileDescription GetFileDescription(string guid)
        {
            FileDescription result = new FileDescription(guid);
            return result;
        }

        /// <summary>
        /// Gets stream
        /// </summary>
        /// <param name="guid">ID</param>
        /// <returns>Returns memory stream</returns>
        public Stream GetStream(string guid)
        {
            MemoryStream result = new MemoryStream();
            CloudBlobContainer container = GetContainerReference();
            CloudBlockBlob blob = container.GetBlockBlobReference(guid);
            using (Stream content = blob.OpenRead())
            {
                content.CopyTo(result);
            }
            result.Seek(0, SeekOrigin.Begin);
            return result;
        }
    }
}