using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithStamp
    {
        /// <summary>
        /// Sign document with stamp signature
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # SignWithStamp : Sign document with stamp\n");

            // The path to the documents directory.            
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithStamp", fileName);

            using (Signature signature = new Signature(filePath))
            {
                StampSignOptions options = new StampSignOptions()
                {
                    // set stamp signature position
                    Left = 50,
                    Top = 150,                    
                    Width = 200,
                    Height = 200
                };

                // setup first external line of Stamp
                StampLine outerLine = new StampLine();
                outerLine.Text = " * European Union ";
                outerLine.TextRepeatType = StampTextRepeatType.FullTextRepeat;
                outerLine.Font.Size = 12;
                outerLine.Height = 22;
                outerLine.TextBottomIntent = 6;
                outerLine.TextColor = Color.WhiteSmoke;
                outerLine.BackgroundColor = Color.DarkSlateBlue;
                options.OuterLines.Add(outerLine);

                //Inner square lines - horizontal lines inside the rings
                StampLine innerLine = new StampLine();
                innerLine.Text = "John Smith";
                innerLine.TextColor = Color.MediumVioletRed;
                innerLine.Font.Size = 20;
                innerLine.Font.Bold = true;
                innerLine.Height = 40;
                options.InnerLines.Add(innerLine);

                // sign document to file
                SignResult result = signature.Sign(outputFilePath, options);

                Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
            }
        }
    }
}
