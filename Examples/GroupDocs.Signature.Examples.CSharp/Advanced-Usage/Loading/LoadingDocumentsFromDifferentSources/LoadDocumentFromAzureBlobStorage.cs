#if !NETCOREAPP
using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{    
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Auth;
    using Microsoft.WindowsAzure.Storage.Blob;

    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    /// <summary>
    /// This example demonstrates how to download document from Azure Blob storage and render document.
    /// </summary>
    class LoadDocumentFromAzureBlobStorage
    {
        public static void Run()
        {
            string blobName = "sample.docx";
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignFromStream", "signedSample.docx");
            using (Stream stream = DownloadFile(blobName))
            {
                using (Signature signature = new Signature(stream))
                {
                    QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
                    {
                        EncodeType = QrCodeTypes.QR,
                        Left = 100,
                        Top = 100
                    };
                    // sign document to file
                    signature.Sign(outputFilePath, options);
                }
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
                
        public static Stream DownloadFile(string blobName)
        {
            CloudBlobContainer container = GetContainer();

            CloudBlob blob = container.GetBlobReference(blobName);
            MemoryStream memoryStream = new MemoryStream();
            blob.DownloadToStream(memoryStream);
            memoryStream.Position = 0;
            return memoryStream;
        }

        private static CloudBlobContainer GetContainer()
        {
            string accountName = "***";
            string accountKey = "***";
            string endpoint = $"https://{accountName}.blob.core.windows.net/";
            string containerName = "***";

            StorageCredentials storageCredentials = new StorageCredentials(accountName, accountKey);
            CloudStorageAccount cloudStorageAccount = new CloudStorageAccount(
                storageCredentials, new Uri(endpoint), null, null, null);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();

            CloudBlobContainer container = cloudBlobClient.GetContainerReference(containerName);
            container.CreateIfNotExists();

            return container;
        }
    }
}
#endif