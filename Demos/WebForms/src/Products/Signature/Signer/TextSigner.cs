using System;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// TextSigner
    /// </summary>
    public class TextSigner : BaseSigner
    {
        public static TextXmlEntity TextData { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="textData">TextXmlEntity</param>
        /// <param name="signatureData">SignatureDataEntity</param>
        public TextSigner(TextXmlEntity textData, SignatureDataEntity signatureData)
            : base(signatureData)
        {
            TextData = textData;
        }

        /// <summary>
        /// Add pdf signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignPdf()
        {
            TextSignOptions signOptions = new TextSignOptions(TextData.text);
            SetOptions(signOptions);
            // specify extended appearance options
            Options.Appearances.PdfTextAnnotationAppearance appearance = new Options.Appearances.PdfTextAnnotationAppearance();
            signOptions.Appearance = appearance;
            signOptions.SignatureImplementation = TextSignatureImplementation.Image;
            return signOptions;
        }

        /// <summary>
        /// Add image signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignImage()
        {
            return SignWord();
        }

        /// <summary>
        /// Add word signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignWord()
        {
            TextSignOptions signOptions = new TextSignOptions(TextData.text);
            SetOptions(signOptions);
            signOptions.SignatureImplementation = TextSignatureImplementation.Image;
            return signOptions;
        }

        /// <summary>
        /// Add cells signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignCells()
        {
            return SignWord();
        }

        /// <summary>
        /// Add slides signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignSlides()
        {
            return SignWord();
        }

        private static void SetOptions(TextSignOptions signOptions)
        {
            signOptions.Left = Convert.ToInt32(SignatureData.Left);
            signOptions.Top = Convert.ToInt32(SignatureData.Top);
            signOptions.Height = Convert.ToInt32(SignatureData.ImageHeight);
            signOptions.Width = Convert.ToInt32(SignatureData.ImageWidth);
            signOptions.RotationAngle = SignatureData.Angle;
            signOptions.PageNumber = SignatureData.PageNumber;
            signOptions.VerticalAlignment = VerticalAlignment.None;
            signOptions.HorizontalAlignment = HorizontalAlignment.None;
            // setup colors settings
            signOptions.Background.Color = getColor(TextData.backgroundColor);
            // setup text color
            signOptions.ForeColor = getColor(TextData.fontColor);
            // setup Font options
            signOptions.Font.Bold = TextData.bold;
            signOptions.Font.Italic = TextData.italic;
            signOptions.Font.Underline = TextData.underline;
            signOptions.Font.FamilyName = TextData.font;
            signOptions.Font.Size = TextData.fontSize;
        }
    }
}