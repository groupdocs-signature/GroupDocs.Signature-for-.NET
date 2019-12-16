#if !NETCOREAPP
using System;
using System.IO;


namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using Amazon.S3;
    using Amazon.S3.Model;

    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    /// <summary>
    /// This example demonstrates how to download document from Amazon S3 storage and render document.
    /// </summary>
    class LoadDocumentFromAmazonS3
    {
        public static void Run()
        {
            string key = "sample.docx";
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignFromStream", "signedSample.docx");
            using (Stream stream = DownloadFile(key))
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
                
        public static Stream DownloadFile(string key)
        {
            AmazonS3Client client = new AmazonS3Client();
            string bucketName = "my-bucket";

            GetObjectRequest request = new GetObjectRequest
            {
                Key = key,
                BucketName = bucketName
            };
            using (GetObjectResponse response = client.GetObject(request))
            {
                MemoryStream stream = new MemoryStream();
                response.ResponseStream.CopyTo(stream);
                stream.Position = 0;
                return stream;
            }
        }
    }
}
#endif