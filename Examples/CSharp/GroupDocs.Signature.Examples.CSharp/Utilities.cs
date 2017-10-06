using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroupDocs.Signature.Config;
using GroupDocs.Signature;
using GroupDocs.Signature.Handler;
using GroupDocs.Signature.Options;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp
{
    //ExStart:completeclass
    public class Utilities
    {
        //ExStart:commonutilities
        public const string storagePath = "../../../../Data/Storage/";
        public const string outputPath = "../../../../Data/Output/";
        public const string licensePath = "E:/GroupDocs.Total.lic";
        public const string imagePath = "../../../../Data/Images/";
        public const string certificatePath = "../../../../Data/Certificates/";
        //ExEnd:commonutilities

        /// <summary>
        /// Initialize, populate and return the SignatureConfig object
        /// </summary>
        /// <returns>Populated SignatureConfig object</returns>
        public static SignatureConfig GetConfigurations()
        {
            //ExStart:Configurations
            SignatureConfig config = new SignatureConfig();
            //set the storage path
            config.StoragePath = storagePath;
            config.OutputPath = outputPath;
            config.ImagesPath = imagePath;
            config.CertificatesPath = certificatePath;

            return config;
            //ExEnd:Configurations
        }

        //ExStart:Applylicense
        /// <summary>
        /// Set product's license
        /// </summary>
        public static void ApplyLicense()
        {
            try
            {
                //initialize License
                License lic = new License();
                //apply license
                lic.SetLicense(licensePath);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        //ExEnd:Applylicense

        #region GetSourceDocsFromDifferentResources
        /// <summary>
        /// Get source document from absolute path
        /// </summary>
        public static void GetSrcDocFromAbsolutePath()
        {
            // instantiating the signature handler without Signature Config object
            var handler = new SignatureHandler();
            // setup image signature options
            var signOptions = new PdfSignImageOptions(@"C:\signature.jpg");
            // sign document with image
            var signedPath = handler.Sign<string>(@"C:\test.pdf", signOptions, new SaveOptions { OutputType = OutputType.String });
            Console.WriteLine("Signed file path is: " + signedPath);
        }

        /// <summary>
        /// Get source document from relative path
        /// </summary>
        public static void GetSrcDocFromRelaticePath()
        {
            var storagePath = @"c:\Test\Storage";
            var outputPath = @"c:\Test\Output";
            var imagesPath = @"c:\Test\Images";
            // setup Signature configuration
            var signConfig = new SignatureConfig
            {
                StoragePath = storagePath,
                OutputPath = outputPath,
                ImagesPath = imagesPath
            };
            // instantiating the conversion handler
            var handler = new SignatureHandler(signConfig);
            // setup image signature options with relative path - image file stores in config.ImagesPath folder
            var signOptions = new PdfSignImageOptions("signature.jpg");
            // sign document
            var signedPath = handler.Sign<string>("test.pdf", signOptions, new SaveOptions { OutputType = OutputType.String });
            Console.WriteLine("Signed file path is: " + signedPath);
        }

        /// <summary>
        /// Get source document from URI
        /// </summary>
        public static void GetSrcDocFromUri()
        {
            // setup Signature configuration
            var signConfig = new SignatureConfig
            {
                OutputPath = @"c:\Test\Output"
            };
            // instantiating the signature handler without Signature Config object
            var handler = new SignatureHandler(signConfig);
            // setup image signature options
            var signOptions = new PdfSignImageOptions(@"http://groupdocs.com/images/banner/carousel2/conversion.png");
            // save options
            var saveOptions = new SaveOptions(OutputType.String);
            // sign document with image
            var signedPath = handler.Sign<string>("https://www.adobe.com/content/dam/Adobe/en/feature-details/acrobatpro/pdfs/combine-multiple-documents-into-one-pdf-file.pdf", signOptions, saveOptions);
            Console.WriteLine("Signed file path is: " + signedPath);
        }

        /// <summary>
        /// Get source document from Stream
        /// </summary>
        public static void GetSrcDocFromStream() 
        {
            // setup Signature configuration
            var signConfig = new SignatureConfig
            {
                OutputPath = @"c:\Test\Output"
            };
            // instantiating the signature handler without Signature Config object
            var handler = new SignatureHandler(signConfig);
            // setup image signature options
            var signOptions = new PdfSignImageOptions(@"http://groupdocs.com/images/banner/carousel2/conversion.png");
            // save options
            var saveOptions = new SaveOptions(OutputType.String);
            using (var fileStream = new FileStream(@"C:\test.pdf", FileMode.Open, FileAccess.Read))
            {
                // sign document with image
                var signedPath = handler.Sign<string>(fileStream, signOptions, saveOptions);
                Console.WriteLine("Signed file path is: " + signedPath);
            }
        }

        #endregion

        /// <summary>
        /// Saves the output/signed file
        /// </summary>
        /// <param name="fileExtension">Extension of the file</param>
        /// <param name="fileName">Name of the file</param>
        /// <param name="handler">Signature's handler</param>
        /// <param name="textSignOptions">Text sign true or false</param>
        /// <param name="imageSignOptions">Image sign true or false</param>
        /// <param name="digitalSignOptions">Digital sign true or false</param>
        public static void SaveFile(string fileExtension, string fileName, SignatureHandler handler, object textSignOptions, object imageSignOptions, object digitalSignOptions)
        {
            //ExStart:saveoutputfile
            try
            {
                switch (fileExtension)
                {
                    case ".docx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingworddocwithtext
                            WordsSignTextOptions wordTextSignOptions = (WordsSignTextOptions)textSignOptions;
                            var wordTextSignedPath = handler.Sign<string>(fileName, wordTextSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingworddocwithtext
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingworddocwithimage
                            WordsSignImageOptions wordImageSignOptions = (WordsSignImageOptions)imageSignOptions;
                            var wordImageSignedPath = handler.Sign<string>(fileName, wordImageSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingworddocwithimage
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingworddocwithdigitalcertificates
                            WordsSignDigitalOptions wordDigitalSignOptions = (WordsSignDigitalOptions)digitalSignOptions;
                            var wordDigitalSignedPath = handler.Sign<string>(fileName, wordDigitalSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingworddocwithdigitalcertificates
                        }

                        break;
                    case ".pdf":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithtext
                            PdfSignTextOptions pdfTextSignOptions = (PdfSignTextOptions)textSignOptions;
                            var pdfTextSignedPath = handler.Sign<string>(fileName, pdfTextSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingpdfdocwithtext
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithimage
                            PdfSignImageOptions pdfImageSignOptions = (PdfSignImageOptions)imageSignOptions;
                            var pdfImageSignedPath = handler.Sign<string>(fileName, pdfImageSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingpdfdocwithimage
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithdigitalcertificates
                            PdfSignDigitalOptions pdfDigitalSignOptions = (PdfSignDigitalOptions)digitalSignOptions;
                            var pdfDigitalSignedPath = handler.Sign<string>(fileName, pdfDigitalSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingpdfdocwithdigitalcertificates
                        }

                        break;
                    case ".xlsx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingexceldocwithtext
                            CellsSignTextOptions cellTextSignOptions = (CellsSignTextOptions)textSignOptions;
                            var cellTextSignedPath = handler.Sign<string>(fileName, cellTextSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingexceldocwithtext
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingexceldocwithimage
                            CellsSignImageOptions cellImageSignOptions = (CellsSignImageOptions)imageSignOptions;
                            var cellImageSignedPath = handler.Sign<string>(fileName, cellImageSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingexceldocwithimage
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingexceldocwithdigitalcertificates
                            CellsSignDigitalOptions cellDigitalSignOptions = (CellsSignDigitalOptions)digitalSignOptions;
                            var cellDigitalSignedPath = handler.Sign<string>(fileName, cellDigitalSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingexceldocwithdigitalcertificates
                        }

                        break;
                    case ".pptx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithtext
                            SlidesSignTextOptions slildeTextSignOptions = (SlidesSignTextOptions)textSignOptions;
                            var slideTextSignedPath = handler.Sign<string>(fileName, slildeTextSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingslidesdocwithtext
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithimage
                            SlidesSignImageOptions slideImageSignOptions = (SlidesSignImageOptions)imageSignOptions;
                            var slideImageSignedPath = handler.Sign<string>(fileName, slideImageSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingslidesdocwithimage
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithdigitalcertificates
                            SlidesSignDigitalOptions slideDigitalSignOptions = (SlidesSignDigitalOptions)digitalSignOptions;
                            var slideDigitalSignedPath = handler.Sign<string>(fileName, slideDigitalSignOptions, new SaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingslidesdocwithdigitalcertificates
                        }

                        break;
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            //ExEnd:saveoutputfile
        }

        /// <summary>
        /// Saves the output/signed file with document save options
        /// </summary>
        /// <param name="fileExtension">Extension of the file</param>
        /// <param name="fileName">Name of the file</param>
        /// <param name="handler">Signature's handler</param>
        /// <param name="textSignOptions">Text sign true or false</param>
        /// <param name="imageSignOptions">Image sign true or false</param>
        /// <param name="digitalSignOptions">Digital sign true or false</param>
        public static void SaveFileWithFormat(string fileExtension, string fileName, SignatureHandler handler, object textSignOptions, object imageSignOptions, object digitalSignOptions)
        {
            //ExStart:SaveFileWithFormat
            try
            {
                switch (fileExtension)
                {
                    case ".docx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingworddocwithtextandsaveformatoption
                            WordsSignTextOptions wordTextSignOptions = (WordsSignTextOptions)textSignOptions;
                            var wordTextSignedPath = handler.Sign<string>(fileName, wordTextSignOptions, new WordsSaveOptions {OutputType = OutputType.String, FileFormat = Domain.WordsSaveFileFormat.Pdf});
                            //ExEnd:signingworddocwithtextandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingworddocwithimageandsaveformatoption
                            WordsSignImageOptions wordImageSignOptions = (WordsSignImageOptions)imageSignOptions;
                            var wordImageSignedPath = handler.Sign<string>(fileName, wordImageSignOptions, new WordsSaveOptions { OutputType = OutputType.String, FileFormat = Domain.WordsSaveFileFormat.Dot });
                            //ExEnd:signingworddocwithimageandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingworddocwithdigitalcertificatesandsaveformatoption
                            WordsSignDigitalOptions wordDigitalSignOptions = (WordsSignDigitalOptions)digitalSignOptions;
                            var wordDigitalSignedPath = handler.Sign<string>(fileName, wordDigitalSignOptions, new WordsSaveOptions { OutputType = OutputType.String, FileFormat = Domain.WordsSaveFileFormat.Dotm });
                            //ExEnd:signingworddocwithdigitalcertificatesandsaveformatoption
                        }

                        break;
                    case ".pdf":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithtextandsaveformatoption
                            PdfSignTextOptions pdfTextSignOptions = (PdfSignTextOptions)textSignOptions;
                            var pdfTextSignedPath = handler.Sign<string>(fileName, pdfTextSignOptions, new PdfSaveOptions { OutputType = OutputType.String, FileFormat = Domain.PdfSaveFileFormat.Doc });
                            //ExEnd:signingpdfdocwithtextandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithimageandsaveformatoption
                            PdfSignImageOptions pdfImageSignOptions = (PdfSignImageOptions)imageSignOptions;
                            var pdfImageSignedPath = handler.Sign<string>(fileName, pdfImageSignOptions, new PdfSaveOptions { OutputType = OutputType.String, FileFormat = Domain.PdfSaveFileFormat.Doc });
                            //ExEnd:signingpdfdocwithimageandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingpdfdocwithdigitalcertificatesandsaveformatoption
                            PdfSignDigitalOptions pdfDigitalSignOptions = (PdfSignDigitalOptions)digitalSignOptions;
                            var pdfDigitalSignedPath = handler.Sign<string>(fileName, pdfDigitalSignOptions, new PdfSaveOptions { OutputType = OutputType.String, FileFormat = Domain.PdfSaveFileFormat.Pdf });
                            //ExEnd:signingpdfdocwithdigitalcertificatesandsaveformatoption
                        }

                        break;
                    case ".xlsx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingexceldocwithtextandsaveformatoption
                            CellsSignTextOptions cellTextSignOptions = (CellsSignTextOptions)textSignOptions;
                            var cellTextSignedPath = handler.Sign<string>(fileName, cellTextSignOptions, new CellsSaveOptions { OutputType = OutputType.String, FileFormat = Domain.CellsSaveFileFormat.Xlsm });
                            //ExEnd:signingexceldocwithtextandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingexceldocwithimageandsaveformatoption
                            CellsSignImageOptions cellImageSignOptions = (CellsSignImageOptions)imageSignOptions;
                            var cellImageSignedPath = handler.Sign<string>(fileName, cellImageSignOptions, new CellsSaveOptions { OutputType = OutputType.String, FileFormat = Domain.CellsSaveFileFormat.Xlsm });
                            //ExEnd:signingexceldocwithimageandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingexceldocwithdigitalcertificatesandsaveformatoption
                            CellsSignDigitalOptions cellDigitalSignOptions = (CellsSignDigitalOptions)digitalSignOptions;
                            var cellDigitalSignedPath = handler.Sign<string>(fileName, cellDigitalSignOptions, new CellsSaveOptions { OutputType = OutputType.String, FileFormat = Domain.CellsSaveFileFormat.Xlsm });
                            //ExEnd:signingexceldocwithdigitalcertificatesandsaveformatoption
                        }

                        break;
                    case ".pptx":
                        if (textSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithtextandsaveformatoption
                            SlidesSignTextOptions slildeTextSignOptions = (SlidesSignTextOptions)textSignOptions;
                            var slideTextSignedPath = handler.Sign<string>(fileName, slildeTextSignOptions, new SlidesSaveOptions { OutputType = OutputType.String, FileFormat = Domain.SlidesSaveFileFormat.Odp });
                            //ExEnd:signingslidesdocwithtextandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithimageandsaveformatoption
                            SlidesSignImageOptions slideImageSignOptions = (SlidesSignImageOptions)imageSignOptions;
                            var slideImageSignedPath = handler.Sign<string>(fileName, slideImageSignOptions, new SlidesSaveOptions { OutputType = OutputType.String, FileFormat = Domain.SlidesSaveFileFormat.Odp });
                            //ExEnd:signingslidesdocwithimageandsaveformatoption
                        }
                        else if (textSignOptions == null && imageSignOptions == null && digitalSignOptions != null)
                        {
                            //ExStart:signingslidesdocwithdigitalcertificatesandsaveformatoption
                            SlidesSignDigitalOptions slideDigitalSignOptions = (SlidesSignDigitalOptions)digitalSignOptions;
                            var slideDigitalSignedPath = handler.Sign<string>(fileName, slideDigitalSignOptions, new SlidesSaveOptions { OutputType = OutputType.String });
                            //ExEnd:signingslidesdocwithdigitalcertificatesandsaveformatoption
                        }

                        break;
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            //ExEnd:SaveFileWithFormat
        }
    }
    //ExEnd:completeclass
}

