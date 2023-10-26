using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Domain.Extensions;
    using GroupDocs.Signature.Options;

    public class SignSpreadsheetsVBAProject
    {
        /// <summary>
        /// Sign Spreadsheet document with macro support and VBA Project in it
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignSpreadsheetsVBAProject : Sign Spreadsheet document with macro support and VBA Project in it\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_SPREADSHEET_MACRO_SUPPORT;
            string certificatePath = Constants.CertificatePfx;
            string password = "1234567890";

            //Sign only VBA project
            string outputFilePath = Path.Combine(Constants.OutputPath, "SignSpreadsheetsVBAProject", "OnlyVBAProject.xlsm");
            using (Signature signature = new Signature(filePath))
            {
                //Create digital signature options without digital certificate
                DigitalSignOptions signOptions = new DigitalSignOptions();
                //Add extension for signing VBA project digitally
                DigitalVBA digitalVBA = new DigitalVBA(certificatePath, password);
                //Set to true only for signing VBA project
                digitalVBA.SignOnlyVBAProject = true; 
                digitalVBA.Comments = "VBA Comment";
                signOptions.Extensions.Add(digitalVBA);

                signature.Sign(outputFilePath, signOptions);
            }
            
            //Sign SpreadSheet document and VBA project
            outputFilePath = Path.Combine(Constants.OutputPath, "SignSpreadsheetsVBAProject", "DocumentAndVBAProject.xlsm");
            using (Signature signature = new Signature(filePath))
            {
                // setup digital signature options
                DigitalSignOptions signOptions = new DigitalSignOptions(certificatePath);
                signOptions.Signature.Comments = "Comment";
                signOptions.Password = "1234567890";

                //Add extension for signing VBA project digitally
                DigitalVBA digitalVBA = new DigitalVBA(certificatePath, password);
                digitalVBA.Comments = "VBA Comment";
                signOptions.Extensions.Add(digitalVBA);

                signature.Sign(outputFilePath, signOptions);
            }
        }
    }
}