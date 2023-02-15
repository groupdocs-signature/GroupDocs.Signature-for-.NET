using System.Text;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{    
    using GroupDocs.Signature.Domain.Extensions;

    public class CustomXOREncryption : IDataEncryption
    {
        /// <summary>
        /// Gets or sets non empty key for encryption (at least one character)
        /// </summary>
        public int Key { get; set; }

        public CustomXOREncryption(int key = 0)
        {
            this.Key = key;
        }
        /// <summary>
        /// Encode method to encrypt string.
        /// </summary>
        /// <param name="source">Source string to encode.</param>
        /// <returns>Returns encrypted string</returns>
        public string Encode(string source)
        {
            return Process(source);
        }

        /// <summary>
        /// Decode method to obtain decrypted string.
        /// </summary>
        /// <param name="source">Source string to decode.</param>
        /// <returns>Returns decrypted string</returns>
        public string Decode(string source)
        {
            return Process(source);
        }

        /// <summary>
        /// Using XOR operation get encoded / decoded string
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        private string Process(string source)
        {
            StringBuilder src = new StringBuilder(source);
            StringBuilder dst = new StringBuilder(src.Length);
            char chTmp;
            for (int index = 0; index < src.Length; ++index)
            {
                chTmp = src[index];
                chTmp = (char)(chTmp ^ this.Key);
                dst.Append(chTmp);
            }
            return dst.ToString();
        }
    }
}
