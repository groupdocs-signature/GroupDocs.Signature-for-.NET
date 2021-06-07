using System;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// BarCodeSigner
    /// </summary>
    public class BarCodeSigner : BaseSigner
    {
        private readonly OpticalXmlEntity QrCodeData;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="qrCodeData">OpticalXmlEntity</param>
        /// <param name="signatureData">SignatureDataEntity</param>
        public BarCodeSigner(OpticalXmlEntity qrCodeData, SignatureDataEntity signatureData)
                : base(signatureData)
        {
            QrCodeData = qrCodeData;
        }

        /// <summary>
        /// Add signature data for pdf document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignPdf()
        {
            return SignWord();
        }

        /// <summary>
        /// Add signature data for image file
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignImage()
        {
            return SignWord();
        }

        /// <summary>
        /// Add signature data for word document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignWord()
        {
            // setup options
            BarcodeSignOptions signOptions = new BarcodeSignOptions(QrCodeData.text);
            SetOptions(signOptions);
            return signOptions;
        }

        /// <summary>
        /// Add signature data for cells document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignCells()
        {
            return SignWord();
        }

        /// <summary>
        /// Add signature data for slides document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignSlides()
        {
            return SignWord();
        }

        private static void SetOptions(BarcodeSignOptions signOptions)
        {
            signOptions.EncodeType = BarcodeTypes.Code39Standard;
            signOptions.HorizontalAlignment = SignatureData.getHorizontalAlignment();
            signOptions.VerticalAlignment = SignatureData.getVerticalAlignment();
            signOptions.Width = Convert.ToInt32(SignatureData.ImageWidth);
            signOptions.Height = Convert.ToInt32(SignatureData.ImageHeight);
            signOptions.Top = Convert.ToInt32(SignatureData.Top);
            signOptions.Left = Convert.ToInt32(SignatureData.Left);
            signOptions.PageNumber = SignatureData.PageNumber;
            if (SignatureData.Angle != 0)
            {
                signOptions.RotationAngle = SignatureData.Angle;
            }
        }
    }
}