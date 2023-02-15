using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;

    public class GetDocumentSignaturesInfo
    {
        /// <summary>
        /// Get document form fields and signatures information 
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # GetDocumentSignaturesInfo : Get document signatures information\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            SignatureSettings signatureSettings = new SignatureSettings()
            {
                ShowDeletedSignaturesInfo = false
            };
            using (Signature signature = new Signature(filePath, signatureSettings))
            {
                IDocumentInfo documentInfo = signature.GetDocumentInfo();

                // display all document signatures information without deleted ones
                Console.WriteLine($"Document actual Signatures : {documentInfo.Signatures.Count}");
                foreach (BaseSignature baseSignature in documentInfo.Signatures)
                {
                    Console.WriteLine(
                        $" - #{baseSignature.SignatureId}: Type: {baseSignature.SignatureType} Location: {baseSignature.Left}x{baseSignature.Top}. " +
                        $"Size: {baseSignature.Width}x{baseSignature.Height}. " +
                        $"CreatedOn/ModifiedOn: {baseSignature.CreatedOn.ToShortDateString()} / {baseSignature.ModifiedOn.ToShortDateString()}");
                }                
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