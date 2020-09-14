using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SaveSignedImageWithVariousOutputTypes
    {
        /// <summary>
        /// Sign image document with qr-code signature and save it to various image output types
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SaveSignedImageWithVariousOutputTypes : Sign image document with qr-code signature and save it to various image output types\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_IMAGE;
            string fileName = Path.GetFileName(filePath);

            using (Signature signature = new Signature(filePath))
            {   
                QrCodeSignOptions signOptions = new QrCodeSignOptions("JohnSmith")
                {                    
                    EncodeType = QrCodeTypes.QR, Left = 100, Top = 100
                };

                SaveOptions[] listSaveOptions = new SaveOptions[]
                {
                    // create Bmp save options with advanced settings
                    new BmpSaveOptions()
                    {
                        Compression = BitmapCompression.Rgb,
                        HorizontalResolution = 7,
                        VerticalResolution = 7,
                        BitsPerPixel = 16,

                    },
                    // create Gif save options with advanced settings
                    new GifSaveOptions()
                    {
                        BackgroundColorIndex = 2,
                        ColorResolution = 7,
                        DoPaletteCorrection = true,
                        HasTrailer = true,
                        Interlaced = false,
                        IsPaletteSorted = true,
                        PixelAspectRatio = 24
                    },
                    // create Jpeg save options with advanced settings
                    new JpegSaveOptions()
                    {
                        AddMissingExtenstion = true,
                        BitsPerChannel = 8,
                        ColorType = JpegCompressionColorMode.Rgb,
                        Comment = "signed jpeg file",
                        //CompressionType = JpegCompressionMode.Lossless,
                        Quality = 100,
                        SampleRoundingMode = JpegRoundingMode.Extrapolate
                    },
                    // create png save options with advanced settings
                    new PngSaveOptions()
                    {
                        BitDepth = 8,
                        ColorType = PngColorType.Grayscale,
                        CompressionLevel = 9,
                        FilterType = PngFilterType.Adaptive,
                        Progressive = true
                    },
                    new TiffSaveOptions()
                    {
                        ExpectedTiffFormat = TiffFormat.TiffNoCompressionBw
                    }
                };                
                foreach (SaveOptions saveOptions in listSaveOptions)
                {
                    // set flag to overwrite existing files
                    saveOptions.OverwriteExistingFiles = true;
                    // set flag to add missing extension automatically
                    saveOptions.AddMissingExtenstion = true;
                    var outputFilePath = Path.Combine(Constants.OutputPath, "SaveSignedImageOutputType", "sample_PngTo" + saveOptions.GetType().Name.ToString());
                    // sign document to file
                    SignResult result = signature.Sign(outputFilePath, signOptions, saveOptions);
                    Console.WriteLine($"\nSource document signed successfully with {result.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
                }
            }
        }
    }
}