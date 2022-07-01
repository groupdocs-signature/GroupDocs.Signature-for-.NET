using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using System.Collections.Generic;

    public class DeleteBySignatureTypes
    {
        /// <summary>
        /// Delete signatures of the certain types
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # DeleteBySignatureTypes : Delete signatures of the certain types \n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SIGNED_MULTI;
            string fileName = Path.GetFileName(filePath);
            // copy source file since Delete method works with same Document
            string outputFilePath = Path.Combine(Constants.OutputPath, "DeleteBySignatureTypes", fileName);
            Constants.CheckDir(outputFilePath);
            File.Copy(filePath, outputFilePath, true);
            // processing QR-Code signatures
            using (Signature signature = new Signature(outputFilePath))
            {
                // compose the list of signature types to delete
                var signedTypes = new List<SignatureType>
                {
                    SignatureType.Text, 
                    SignatureType.Image,
                    SignatureType.Barcode,
                    SignatureType.QrCode,
                    SignatureType.Digital
                };
                // deleting QR-Code signatures from the document by signature types
                DeleteResult result = signature.Delete(signedTypes);
                if (result.Succeeded.Count > 0)
                {
                    Console.WriteLine("Following signatures were removed:");
                    int number = 1;
                    foreach (BaseSignature temp in result.Succeeded)
                    {
                        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}. Created: {temp.CreatedOn.ToShortDateString()}");
                    }
                }
                else
                {
                    Helper.WriteError("No one signature was deleted.");
                }
            }
        }
    }
}