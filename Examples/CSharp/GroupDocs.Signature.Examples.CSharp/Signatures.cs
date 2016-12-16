using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroupDocs.Signature.Config;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.Handler;
using System.IO;
using GroupDocs.Signature.Handler.Input;
using GroupDocs.Signature.Handler.Output;
using GroupDocs.Signature.Domain;

namespace GroupDocs.Signature.Examples.CSharp
{
    class Signatures
    {
        #region WorkingWithTextSignature

        /// <summary>
        /// Signing a pdf document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignPdfDocumentWithText(string fileName)
        {
            //ExStart:signingandsavingpdfdocumentwithtext
            float size = 100;
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options 
            var signOptions = new PdfSignTextOptions("coca cola");
            signOptions.Left = 100;
            signOptions.Top = 100;
            //this feature is supported in 16.12.0
            signOptions.VerticalAlignment = Domain.VerticalAlignment.Top;
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 25 };
            //---------------------------
            signOptions.ForeColor = System.Drawing.Color.Red;
            signOptions.BackgroundColor = System.Drawing.Color.Black; 
            signOptions.Font = new Domain.SignatureFont { FontSize = size, FontFamily = "Comic Sans MS" };
            string fileExtension = Path.GetExtension(fileName);
            // save document
            Utilities.SaveFile(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingpdfdocumentwithtext
        }

        /// <summary>
        /// Signing a cell document with text
        /// </summary>
        /// <param name="fileName">Name of the input filel</param>
        public static void SignCellDocumentWithText(string fileName)
        {
            //ExStart:signingandsavingcellsdocumentwithtext
            float size = 100;
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options
            var signOptions = new CellsSignTextOptions("coca cola");
            // text position
            signOptions.RowNumber = 3;
            signOptions.ColumnNumber = 6;
            // text rectangle size
            signOptions.Height = 100;
            signOptions.Width = 100;
            //this feature is supported in 16.12.0
            signOptions.VerticalAlignment = Domain.VerticalAlignment.Top;
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 25 }; 
            //----------------------------
            // if you need to sign all sheets set it to true
            signOptions.SignAllPages = false;
            signOptions.ForeColor = System.Drawing.Color.Red;
            signOptions.BackgroundColor = System.Drawing.Color.Black;
            signOptions.BorderColor = System.Drawing.Color.Green;
            signOptions.Font = new Domain.SignatureFont { FontSize = size, FontFamily = "Comic Sans MS" };
            // sign first sheet
            signOptions.SheetNumber = 1; 
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingcellsdocumentwithtext
        }

        /// <summary>
        /// Signing a slide document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentWithText(string fileName)
        {
            //ExStart:signingandsavingslidesdocumentwithtext
            SignatureConfig config = Utilities.GetConfigurations();
            float size = 100;
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options 
            var signOptions = new SlidesSignTextOptions("coca cola");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            //this feature is supported in 16.12.0
            signOptions.VerticalAlignment = Domain.VerticalAlignment.Top;
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 25 };
            //----------------------------
            signOptions.ForeColor = System.Drawing.Color.Red;
            signOptions.BackgroundColor = System.Drawing.Color.Black;
            signOptions.BorderColor = System.Drawing.Color.Green;
            signOptions.Font = new Domain.SignatureFont { FontSize = size, FontFamily = "Comic Sans MS" };
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingslidesdocumentwithtext
        }

        /// <summary>
        /// Signing a word document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentWithText(string fileName)
        {
            //ExStart:signingandsavingworddocumentwithtext
            float size = 5;
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options
            var signOptions = new WordsSignTextOptions("coca cola");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            //this feature is supported in 16.12.0
            signOptions.VerticalAlignment = Domain.VerticalAlignment.Top;
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 25 };
            //----------------------------
            signOptions.ForeColor = System.Drawing.Color.Red;
            signOptions.BackgroundColor = System.Drawing.Color.Black;
            signOptions.BorderColor = System.Drawing.Color.Green;
            signOptions.Font = new Domain.SignatureFont { FontSize = size, FontFamily = "Comic Sans MS" };
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingworddocumentwithtext
        }

        #endregion

        #region WorkingWithImageSignature

        /// <summary>
        /// Signing a pdf document with image
        /// </summary>
        /// <param name="fileName">Name of the input filed</param>
        public static void SignPdfDocumentWithImage(string fileName)
        {
            //ExStart:signingandsavingpdfdocumentwithimage
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new PdfSignImageOptions("sign.png");
            // image position
            signOptions.Left = 300;
            signOptions.Top = 200;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 25};
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Left;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingpdfdocumentwithimage
        }

        /// <summary>
        /// Signing a cell document with image
        /// </summary>
        /// <param name="fileName">Name of the inut file</param>
        public static void SignCellDocumentWithImage(string fileName)
        {
            //ExStart:signingandsavingcelldocumentwithimage
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new CellsSignImageOptions("sign.png");
            // image position
            signOptions.RowNumber = 10;
            signOptions.ColumnNumber = 10;
            signOptions.SignAllPages = true;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 8 };
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingcelldocumentwithimage
        }

        /// <summary>
        /// Signing a slide document with image
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentWithImage(string fileName)
        {
            //ExStart:signingandsavingslidedocumentwithimage
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new SlidesSignImageOptions("sign.png");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 15 };
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingslidedocumentwithimage
        }

        /// <summary>
        /// Signing word document with image
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentWithImage(string fileName)
        {
            //ExStart:signingandsavingworddocumentwithimage
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new WordsSignImageOptions("sign.png");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.Margin = new Domain.Padding { Top = 2, Left = 500 };
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Right;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingworddocumentwithimage
        }

        #endregion

        #region WorkingWithDigitalSignatures

        /// <summary>
        /// Signing a cell document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignCellDocumentDigitally(string fileName)
        {
            //ExStart:signingcelldocumentwithdigitalcertificate
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new CellsSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingcelldocumentwithdigitalcertificate
        }

        /// <summary>
        /// Signing a pdf document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignPdfDocumentDigitally(string fileName)
        {
            //ExStart:signingpdfdocumentwithdigitalcertificate
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new PdfSignDigitalOptions("acer.pfx", "sign.png");
            signOptions.Password = null;
            // image position
            signOptions.Left = 100;
            signOptions.Top = 100;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.Visible = true;
            signOptions.SignAllPages = true;
            signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center;
            signOptions.VerticalAlignment = Domain.VerticalAlignment.Top;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingpdfdocumentwithdigitalcertificate
        }

        /// <summary>
        /// Signing a word document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentDigitally(string fileName)
        {
            //ExStart:signingworddocumentwithdigitalcertificate
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new WordsSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingworddocumentwithdigitalcertificate
        }

        /// <summary>
        /// Signing a slide document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentDigitally(string fileName)
        {
            //ExStart:signingslidedocumentwithdigitalcertificate
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new SlidesSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 2;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingslidedocumentwithdigitalcertificate
        }

        #endregion

        #region Azure

        /// <summary>
        /// Custom input handling 
        /// </summary>
        /// <param name="inputFileName">Name of the input file</param>
        public static void CustomInputHandler(string inputFileName)
        {
            //ExStart:custominputhandler
            const string DevStorageEmulatorUrl = "http://127.0.0.1:10000/devstoreaccount1/";
            const string DevStorageEmulatorAccountName = "devstoreaccount1";
            const string DevStorageEmulatorAccountKey =
                "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==";

            SignatureConfig config = Utilities.GetConfigurations();

            // instantiating the signature handler
            var handler = new SignatureHandler(config);

            SaveOptions saveOptions = new SaveOptions(OutputType.String);
            IInputDataHandler customInputStorageProvider = new AzureInputDataHandler(DevStorageEmulatorUrl,
                DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "testbucket");
            SignatureHandler handlerWithCustomStorage = new SignatureHandler(config, customInputStorageProvider);

            // setup image signature options
            var signOptions = new PdfSignImageOptions("sign.png");
            signOptions.DocumentPageNumber = 1;
            signOptions.Top = 500;
            signOptions.Width = 200;
            signOptions.Height = 100;
            string fileExtension = Path.GetExtension(inputFileName);
            Utilities.SaveFile(fileExtension, inputFileName, handler, null, signOptions, null);
            //ExEnd:custominputhandler
        }

        /// <summary>
        /// Custome output handling
        /// </summary>
        /// <param name="inputFileName">Name of the input file</param>
        public static void CustomOutputHandler(string inputFileName)
        {
            //ExStart:customoutputhandler
            const string DevStorageEmulatorUrl = "http://127.0.0.1:10000/devstoreaccount1/";
            const string DevStorageEmulatorAccountName = "devstoreaccount1";
            const string DevStorageEmulatorAccountKey =
                "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==";

            SignatureConfig config = Utilities.GetConfigurations();

            // instantiating the signature handler
            var handler = new SignatureHandler(config);

            SaveOptions saveOptions = new SaveOptions(OutputType.String);
            IOutputDataHandler customOutputStorageProvider = new AzureOutputDataHandler(
                DevStorageEmulatorUrl, DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "tempbucket");
            SignatureHandler handlerWithCustomStorage = new SignatureHandler(config, customOutputStorageProvider);
            // setup image signature options
            var signOptions = new PdfSignImageOptions("sign.png");
            signOptions.DocumentPageNumber = 1;
            signOptions.Top = 500;
            signOptions.Width = 200;
            signOptions.Height = 100;
            string fileExtension = Path.GetExtension(inputFileName);
            Utilities.SaveFile(fileExtension, inputFileName, handler, null, signOptions, null);
            //ExEnd:customoutputhandler
        }

        #endregion

        #region OpenPasswordProtectedDocuments
        public static void GetPasswordProtectedDocs(string fileName)
        {
            //ExStart:GetPasswordProtectedDocs
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            var signOptions = new WordsSignTextOptions("John Smith");
            // specify load options
            LoadOptions loadOptions = new LoadOptions();
            loadOptions.Password = "1234567890";
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFile(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:GetPasswordProtectedDocs
        }
        #endregion

        #region SaveTextSignedOutputWithFormatOptions

        /// <summary>
        /// Signing a pdf document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignPdfDocumentWithTextWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingpdfdocumentwithtext
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options 
            var signOptions = new PdfSignTextOptions("coca cola");
            signOptions.Left = 100;
            signOptions.Top = 100;
            string fileExtension = Path.GetExtension(fileName);
            // save document
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingpdfdocumentwithtext
        }

        /// <summary>
        /// Signing a cell document with text
        /// </summary>
        /// <param name="fileName">Name of the input filel</param>
        public static void SignCellDocumentWithTextWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingcellsdocumentwithtext
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options
            var signOptions = new CellsSignTextOptions("coca cola");
            // text position
            signOptions.RowNumber = 3;
            signOptions.ColumnNumber = 6;
            // text rectangle size
            signOptions.Height = 100;
            signOptions.Width = 100;
            // if you need to sign all sheets set it to true
            signOptions.SignAllPages = false;
            // sign first sheet
            signOptions.SheetNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingcellsdocumentwithtext
        }

        /// <summary>
        /// Signing a slide document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentWithTextWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingslidesdocumentwithtext
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options 
            var signOptions = new SlidesSignTextOptions("coca cola");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingslidesdocumentwithtext
        }

        /// <summary>
        /// Signing a word document with text
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentWithTextWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingworddocumentwithtext
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup text signature options
            var signOptions = new WordsSignTextOptions("coca cola");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, null, null);
            //ExEnd:signingandsavingworddocumentwithtext
        }


        #endregion

        #region SaveImageSignedOutputWithFormatOptions

        /// <summary>
        /// Signing a pdf document with image
        /// </summary>
        /// <param name="fileName">Name of the input filed</param>
        public static void SignPdfDocumentWithImageWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingpdfdocumentwithimageWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new PdfSignImageOptions("sign.png");
            // image position
            signOptions.Left = 300;
            signOptions.Top = 200;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingpdfdocumentwithimageWithSaveFormat
        }

        /// <summary>
        /// Signing a cell document with image
        /// </summary>
        /// <param name="fileName">Name of the inut file</param>
        public static void SignCellDocumentWithImageWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingcelldocumentwithimageWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new CellsSignImageOptions("sign.png");
            // image position
            signOptions.RowNumber = 10;
            signOptions.ColumnNumber = 10;
            signOptions.SignAllPages = true;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingcelldocumentwithimageWithSaveFormat
        }

        /// <summary>
        /// Signing a slide document with image
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentWithImageWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingslidedocumentwithimageWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new SlidesSignImageOptions("sign.png");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingslidedocumentwithimageWithSaveFormat
        }

        /// <summary>
        /// Signing word document with image
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentWithImageWithSaveFormat(string fileName)
        {
            //ExStart:signingandsavingworddocumentwithimageWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup image signature options
            var signOptions = new WordsSignImageOptions("sign.png");
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, signOptions, null);
            //ExEnd:signingandsavingworddocumentwithimageWithSaveFormat
        }

        #endregion

        #region SaveDigitalSignedOutputWithFormatOptions

        /// <summary>
        /// Signing a cell document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignCellDocumentDigitallyWithSaveFormat(string fileName)
        {
            //ExStart:signingcelldocumentwithdigitalcertificateWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new CellsSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingcelldocumentwithdigitalcertificateWithSaveFormat
        }

        /// <summary>
        /// Signing a pdf document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignPdfDocumentDigitallyWithSaveFormat(string fileName)
        {
            //ExStart:signingpdfdocumentwithdigitalcertificateWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new PdfSignDigitalOptions("acer.pfx", "sign.png");
            signOptions.Password = null;
            // image position
            signOptions.Left = 100;
            signOptions.Top = 100;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingpdfdocumentwithdigitalcertificateWithSaveFormat
        }

        /// <summary>
        /// Signing a word document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignWordDocumentDigitallyWithSaveFormat(string fileName)
        {
            //ExStart:signingworddocumentwithdigitalcertificateWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new WordsSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 1;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingworddocumentwithdigitalcertificateWithSaveFormat
        }

        /// <summary>
        /// Signing a slide document with digital certificate
        /// </summary>
        /// <param name="fileName">Name of the input file</param>
        public static void SignSlideDocumentDigitallyWithSaveFormat(string fileName)
        {
            //ExStart:signingslidedocumentwithdigitalcertificateWithSaveFormat
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // setup digital signature options
            var signOptions = new SlidesSignDigitalOptions("ali.pfx");
            signOptions.Password = "";
            signOptions.Left = 10;
            signOptions.Top = 10;
            signOptions.Width = 100;
            signOptions.Height = 100;
            signOptions.DocumentPageNumber = 2;
            string fileExtension = Path.GetExtension(fileName);
            Utilities.SaveFileWithFormat(fileExtension, fileName, handler, null, null, signOptions);
            //ExEnd:signingslidedocumentwithdigitalcertificateWithSaveFormat
        }

        #endregion

        #region SetupMultipleSignatureOptions
        //Multiple sign options Pdf documents 
        public static void MultiplePdfSignOptoins()
        {
            //ExStart:multiplepdfsignoptions
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // define Signature Options Collection
            var collection = new SignatureOptionsCollection();
            // specify text option
            var signTextOptions = new PdfSignTextOptions("Mr. John", 100, 100, 100, 100);
            // add to collection
            collection.Add(signTextOptions);
            // specify image options
            var signImageOptions = new PdfSignImageOptions("sign.png");
            signImageOptions.Left = 200;
            signImageOptions.Top = 200;
            signImageOptions.Width = 100;
            signImageOptions.Height = 100;
            // add to collection
            collection.Add(signImageOptions);
            // specify digital options
            var signDigitalOptions = new PdfSignDigitalOptions("acer.pfx");
            signDigitalOptions.Password = "1234567890";
            signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom;
            signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center;
            // add to collection
            collection.Add(signDigitalOptions);
            // sign document
            var signedPath = handler.Sign<string>("test.pdf", collection, new SaveOptions { OutputType = OutputType.String });
            Console.WriteLine("Signed file path is: " + signedPath);
            //ExEnd:multiplepdfsignoptions
        }

        //Multiple sign options Cells
        public static void MultipleCellSignOptoins()
        {
            //ExStart:MultipleCellSignOptoins
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // define Signature Options Collection
            var collection = new SignatureOptionsCollection();
            // specify text option
            var signTextOptions = new CellsSignTextOptions("some person");
            // add to collection
            collection.Add(signTextOptions);
            // specify image options
            var signImageOptions = new CellsSignImageOptions("sign.png");
            signImageOptions.Left = 200;
            signImageOptions.Top = 200;
            signImageOptions.Width = 100;
            signImageOptions.Height = 100;
            // add to collection
            collection.Add(signImageOptions);
            // specify digital options
            var signDigitalOptions = new CellsSignDigitalOptions("acer.pfx");
            signDigitalOptions.Password = "1234567890";
            signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom;
            signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center;
            // add to collection
            collection.Add(signDigitalOptions);
            // sign document
            var signedPath = handler.Sign<string>("test.xlsx", collection, new SaveOptions { OutputType = OutputType.String });
            Console.WriteLine("Signed file path is: " + signedPath);
            //ExEnd:MultipleCellSignOptoins
        }
        //Multiple sign options Word
        public static void MultipleWordSignOptoins()
        {
            //ExStart:MultipleWordSignOptoins
            SignatureConfig config = Utilities.GetConfigurations();
            // instantiating the signature handler
            var handler = new SignatureHandler(config);
            // define Signature Options Collection
            var collection = new SignatureOptionsCollection();
            // specify text option
            var signTextOptions = new WordsSignTextOptions("some person");
            // add to collection
            collection.Add(signTextOptions);
            // specify image options
            var signImageOptions = new WordsSignImageOptions("sign.png");
            signImageOptions.Left = 200;
            signImageOptions.Top = 200;
            signImageOptions.Width = 100;
            signImageOptions.Height = 100;
            // add to collection
            collection.Add(signImageOptions);
            // specify digital options
            var signDigitalOptions = new WordsSignDigitalOptions("acer.pfx");
            signDigitalOptions.Password = "1234567890";
            signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom;
            signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center;
            // add to collection
            collection.Add(signDigitalOptions);
            // sign document
            var signedPath = handler.Sign<string>("test.docx", collection, new SaveOptions { OutputType = OutputType.String });
            Console.WriteLine("Signed file path is: " + signedPath);
            //ExEnd:MultipleWordSignOptoins
        }
        #endregion
    }
}
