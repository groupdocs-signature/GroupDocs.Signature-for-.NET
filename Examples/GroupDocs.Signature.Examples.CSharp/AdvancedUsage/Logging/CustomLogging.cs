#if !NET462
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Logging;
    using GroupDocs.Signature.Options;

    public class CustomLogging
    {
        /// <summary>
        /// Sign password-protected document
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # CustomLogging : Using Custom Logging\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF_SIGNED_PWD;
            string fileName = Path.GetFileName(filePath);
            string outputFilePath = Path.Combine(Constants.OutputPath, "CustomLogging", fileName);
            LoadOptions loadOptions = new LoadOptions()
            {
                //specify wrong password
                Password = "12345678901"
            };
            var logger = new ConsoleLogger();
            var settings = new SignatureSettings(logger);
            // setup custom log level
            settings.LogLevel = LogLevel.Warning | LogLevel.Error; 
            try
            {
                using (Signature signature = new Signature(filePath, loadOptions, settings))
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
            catch
            {
                // skip the Exception - check the custom log
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }

        /// <summary>
        /// Writes log messages to API endpoint.
        /// </summary>
        public class APILogger : ILogger
        {
            private object _lock = new object();
            private HttpClient _client;
            /// <summary>
            /// Create logger to API endpoint.
            /// </summary>
            public APILogger()
            {
                _client = new HttpClient()
                {
                    BaseAddress = new Uri("http://localhost:64195/")
                };
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }

            /// <summary>
            /// Writes an error message to the console.
            /// Error log messages provide information about unrecoverable events in application flow.
            /// </summary>
            /// <param name="message">The error message.</param>
            /// <param name="exception">The exception.</param>
            /// <exception cref="System.ArgumentNullException">Thrown when <paramref name="message"/> is null.</exception>
            /// <exception cref="System.ArgumentNullException">Thrown when <paramref name="exception"/> is null.</exception>
            public void Error(string message, Exception exception)
            {
                if (message == null)
                    throw new ArgumentNullException(nameof(message));
                if (exception == null)
                    throw new ArgumentNullException(nameof(exception));

                var line = $"{message}. Exception: {exception}";
                PostMessage(LogLevel.Error, line);
            }

            /// <summary>
            /// Writes trace message to the console.
            /// Trace log messages provide generally useful information about application flow.
            /// </summary>
            /// <param name="message">The trace message.</param>
            /// <exception cref="System.ArgumentNullException">Thrown when <paramref name="message"/> is null.</exception>
            public void Trace(string message)
            {
                if (message == null)
                    throw new ArgumentNullException(nameof(message));
                PostMessage(LogLevel.Trace, message);
            }

            /// <summary>
            /// Writes warning message to the console;
            /// Warning log messages provide information about the unexpected and recoverable event in application flow.
            /// </summary>
            /// <param name="message">The warning message.</param>
            /// <exception cref="System.ArgumentNullException">Thrown when <paramref name="message"/> is null.</exception>
            public void Warning(string message)
            {
                if (message == null)
                    throw new ArgumentNullException(nameof(message));
                PostMessage(LogLevel.Warning, message);
            }

            private string PostMessage(LogLevel level, string message)
            {
                string result = string.Empty;
                string hdrs = "INFO";
                switch (level)
                {
                    case LogLevel.Warning: hdrs = "WARNING"; break;
                    case LogLevel.Error: hdrs = "ERROR"; break;
                }
                string date = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt");
                string line = $"GroupDocs.Signature {hdrs} [{date}]. Message: {message}";
                var quer = new StringContent(line);
                
                lock (this._lock)
                {
                    HttpResponseMessage response = _client.PostAsync("api/logging", quer).Result;
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    response.EnsureSuccessStatusCode();
                    result = response.Content.ReadAsStringAsync().Result;
                }
                return result;
            }
        }
    }
}
#endif