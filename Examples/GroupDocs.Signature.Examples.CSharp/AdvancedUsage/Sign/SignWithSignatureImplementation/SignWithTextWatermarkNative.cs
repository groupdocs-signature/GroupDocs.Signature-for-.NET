using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithTextWatermarkNative
    {
        /// <summary>
        /// Sign WordProcessing document with text watermark signature using document specific implementation.
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithTextWatermarkNative : Sign WordProcessing document with text watermark signature using document specific implementation\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_WORDPROCESSING;
            string fileName = Path.GetFileName(filePath);

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithTextWatermarkNative", fileName);

            using (Signature signature = new Signature(filePath))
            {
                TextSignOptions options = new TextSignOptions("John Smith Watermark")
                {
                    // set attribute of using document specific implementation
                    Native = true,
                    //Watermark will be the same for each page
                    SignatureImplementation = TextSignatureImplementation.Watermark,

                    // set text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 72, FamilyName = "Comic Sans MS" },

                    // set rotation
                    // If rotation angle is not 0 it will be converted to 315.
                    RotationAngle = 45,

                    // set transparency
                    // If transparency is not 0 it will be converted to 50%.
                    Transparency = 0.9
                };
                
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (TextSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, isNative: {temp.Native}");
                }
            }
        }
    }


    public class GeneratePreview2
    {
        public static Stream CreatePageStream(int pageNumber)
        {
            string imageFilePath = Path.Combine(Constants.OutputPath, "SignWithTextWatermarkNative", "image-" + pageNumber.ToString() + ".jpg");
            var folder = Path.GetDirectoryName(imageFilePath);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return new FileStream(imageFilePath, FileMode.Create);
        }

        public static void ReleasePageStream(int pageNumber, Stream pageStream)
        {
            pageStream.Dispose();
            string imageFilePath = Path.Combine(Constants.OutputPath, "SignWithTextWatermarkNative", "image-" + pageNumber.ToString() + ".jpg");
            Console.WriteLine($"Image file {imageFilePath} is ready for preview");
        }
    }
}
