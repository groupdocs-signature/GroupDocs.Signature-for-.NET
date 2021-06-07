using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using System;
using System.Globalization;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// DigitalSigner
    /// </summary>
    public class DigitalSigner : BaseSigner
    {
        public static string Password { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureData">SignatureDataEntity</param>
        /// <param name="password">string</param>
        public DigitalSigner(SignatureDataEntity signatureData, string password)
                : base(signatureData)
        {
            Password = password;
        }

        /// <summary>
        /// Add digital signature options for pdf document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignPdf()
        {
            return SignWord();
        }

        /// <summary>
        /// Add digital signature options for image file
        /// </summary>
        /// <returns>SignOptions</returns>
        /// <throws>Not supported exception</throws>
        public override SignOptions SignImage()
        {
            throw new NotSupportedException("This file type is not supported");
        }

        /// <summary>
        /// Add digital signature options for word document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignWord()
        {
            DigitalSignOptions signOptions = new DigitalSignOptions(SignatureData.SignatureGuid);
            SetOptions(signOptions);
            return signOptions;
        }

        /// <summary>
        /// Add digital signature options for cells document
        /// </summary>
        /// <returns>SignOptions</returns>
        public override SignOptions SignCells()
        {
            return SignWord();
        }

        /// <summary>
        /// Add digital signature options for slides document
        /// </summary>
        /// <returns>SignOptions</returns>
        /// <throws>Not supported exception</throws>
        public override SignOptions SignSlides()
        {
            throw new NotSupportedException("This file type is not supported");
        }

        private static void SetOptions(DigitalSignOptions signOptions)
        {
            if (signOptions is DigitalSignOptions)
            {
                signOptions.Reason = SignatureData.Reason;
                signOptions.Contact = SignatureData.Contact;
                signOptions.Location = SignatureData.Address;
            }
            else
            {
                signOptions.Signature.Comments = SignatureData.SignatureComment;
            }
            if (!String.IsNullOrEmpty(SignatureData.Date))
            {
                signOptions.Signature.SignTime = DateTime.ParseExact(SignatureData.Date, "dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            signOptions.Password = Password;
            signOptions.AllPages = true;
        }
    }
}