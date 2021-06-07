using GroupDocs.Signature.Options;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using System;
using System.Drawing;
using System.Text.RegularExpressions;

namespace GroupDocs.Signature.WebForms.Products.Signature.Signer
{
    /// <summary>
    /// BaseSigner
    /// </summary>
    public abstract class BaseSigner
    {
        protected static SignatureDataEntity SignatureData { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="signatureData">SignatureDataEntity</param>
        protected BaseSigner(SignatureDataEntity signatureData)
        {
            SignatureData = signatureData;
        }

        /// <summary>
        /// Convert rgb string to Color
        /// </summary>
        /// <param name="rgbColor">string</param>
        /// <returns></returns>
        protected static Color getColor(string rgbColor)
        {
            // get colors info from string
            string[] colors = rgbColor.Split(',');
            int redColor = Convert.ToInt32(Regex.Match(colors[0], @"\d+").Value);
            int greenColor = Convert.ToInt32(Regex.Match(colors[1], @"\d+").Value);
            int blueColor = Convert.ToInt32(Regex.Match(colors[2], @"\d+").Value);
            return Color.FromArgb(redColor, greenColor, blueColor);
        }

        /// <summary>
        /// Add pdf signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public abstract SignOptions SignPdf();

        /// <summary>
        /// Add image signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        /// <throws>Not supported exception</throws>
        public abstract SignOptions SignImage();

        /// <summary>
        /// Add word signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public abstract SignOptions SignWord();

        /// <summary>
        /// Add cells signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        public abstract SignOptions SignCells();

        /// <summary>
        /// Add slides signature options
        /// </summary>
        /// <returns>SignOptions</returns>
        /// <throws>Not supported exception</throws>
        public abstract SignOptions SignSlides();
    }
}