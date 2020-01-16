using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using System.Net;

    /// <summary>
    /// This example demonstrates how to render document downloaded from FTP.
    /// </summary>
    class LoadDocumentFromFtp
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # LoadDocumentFromFtp : Load document from ftp\n");

            string filePath = "ftp://localhost/sample.doc";
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignFromStream", "signedSample.doc");
            using (Stream stream = GetFileFromFtp(filePath))
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

        private static Stream GetFileFromFtp(string filePath)
        {
            Uri uri = new Uri(filePath);
            FtpWebRequest request = CreateRequest(uri);

            using (WebResponse response = request.GetResponse())
                return GetFileStream(response);
        }

        private static FtpWebRequest CreateRequest(Uri uri)
        {
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(uri);
            request.Method = WebRequestMethods.Ftp.DownloadFile;
            return request;
        }

        private static Stream GetFileStream(WebResponse response)
        {
            MemoryStream fileStream = new MemoryStream();

            using (Stream responseStream = response.GetResponseStream())
                responseStream.CopyTo(fileStream);

            fileStream.Position = 0;
            return fileStream;
        }
    }
}
