using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupDocs.Signature.Examples.CSharp
{
    public abstract class SampleAzureDataHandler
    {
        private CloudBlobClient _remoteStorage;
        private string _containerName;
       
        /// <summary>
        /// Handles azure data
        /// </summary>
        /// <param name="endpoint"></param>
        /// <param name="accountName"></param>
        /// <param name="accountKey"></param>
        /// <param name="containerName"></param>
        public SampleAzureDataHandler(string endpoint,
            string accountName,
            string accountKey,
            string containerName)
        {
            //ExStart:azuredatahandling
            var credentials = new StorageCredentials(accountName, accountKey);
            CloudStorageAccount account = new CloudStorageAccount(credentials, new Uri(endpoint), null, null, null);
            _remoteStorage = account.CreateCloudBlobClient();
            _containerName = containerName;
            TimeSpan? defTimeout = _remoteStorage.DefaultRequestOptions.ServerTimeout;
            _remoteStorage.DefaultRequestOptions.ServerTimeout = TimeSpan.FromSeconds(10);
            CloudBlobContainer container = _remoteStorage.GetContainerReference(containerName);
            container.CreateIfNotExists();
            _remoteStorage.DefaultRequestOptions.ServerTimeout = defTimeout;
            //ExEnd:azuredatahandling
        }

        /// <summary>
        /// Gets container reference
        /// </summary>
        /// <returns>Returns container</returns>
        public CloudBlobContainer GetContainerReference()
        {
            //ExStart:getcontainerreference
            CloudBlobContainer container = _remoteStorage.GetContainerReference(_containerName);
            return container;
            //ExEnd:getcontainerreference
        }
    } 
}
