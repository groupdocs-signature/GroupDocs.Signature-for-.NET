using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Xml;
using System;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// QrCodeSigner
    /// </summary>
    public class QrCodeSigner : BaseSigner
    {
        private readonly OpticalXmlEntity qrCodeData;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="qrCodeData">OpticalXmlEntity</param>
        /// <param name="signatureData">SignatureDataEntity</param>
        public QrCodeSigner(OpticalXmlEntity qrCodeData, SignatureDataEntity signatureData)
            : base(signatureData)
        {
            this.qrCodeData = qrCodeData;
        }

        /// <summary>
        /// Add pdf signature data
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignPdf()
        {
            return SignWord();
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
            // setup options
            QrCodeSignOptions signOptions = new QrCodeSignOptions(qrCodeData.text);
            SetOptions(signOptions);
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

        private static void SetOptions(QrCodeSignOptions signOptions)
        {
            signOptions.EncodeType = QrCodeTypes.QR;
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