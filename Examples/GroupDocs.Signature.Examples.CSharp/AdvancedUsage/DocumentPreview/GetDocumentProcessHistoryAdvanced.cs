using System;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class GetDocumentProcessHistoryAdvanced
    {
        /// <summary>
        /// Get document form fields and signatures information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetDocumentProcessHistoryAdvanced : Get advanced document process history\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_HISTORY;

            using (Signature signature = new Signature(filePath))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();
                // display document process history information
                Console.WriteLine($"Document Process logs information: count = {documentInfo.ProcessLogs.Count}");
                foreach (ProcessLog processLog in documentInfo.ProcessLogs)
                {
                    Console.WriteLine($" - operation [{processLog.Type}] on {processLog.Date.ToShortDateString()}. Succeeded/Failed {processLog.Succeeded}/{processLog.Failed}. Message: {processLog.Message} : ");
                    if (processLog.Signatures != null)
                    {
                        foreach (BaseSignature logSignature in processLog.Signatures)
                        {
                            Console.WriteLine($"\t\t -{logSignature.SignatureType} #{logSignature.SignatureId} at {logSignature.Top} x {logSignature.Left} pos;");
                        }
                    }
                }
            }
        }
    }
}