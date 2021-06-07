using System;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// ImageSigner
    /// </summary>
    public class ImageSigner : BaseSigner
    {

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureData">SignatureDataEntity</param>
        public ImageSigner(SignatureDataEntity signatureData)
                : base(signatureData)
        {

        }

        /// <summary>
        /// Add pdf signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignPdf()
        {
            return SignWord();
        }

        /// <summary>
        /// Add image signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignImage()
        {
            return SignWord();
        }

        /// <summary>
        /// Add word signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignWord()
        {
            ImageSignOptions signOptions = new ImageSignOptions(SignatureData.SignatureGuid);
            SetOptions(signOptions);
            return signOptions;
        }

        /// <summary>
        /// Add cells signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignCells()
        {
            return SignWord();
        }

        /// <summary>
        /// Add slides signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignSlides()
        {
            return SignWord();
        }

        private static void SetOptions(ImageSignOptions signOptions)
        {
            signOptions.Left = Convert.ToInt32(SignatureData.Left);
            signOptions.Top = Convert.ToInt32(SignatureData.Top);
            signOptions.Width = Convert.ToInt32(SignatureData.ImageWidth);
            signOptions.Height = Convert.ToInt32(SignatureData.ImageHeight);
            signOptions.PageNumber = SignatureData.PageNumber;
            signOptions.RotationAngle = SignatureData.Angle;
        }
    }
}