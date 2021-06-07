using Newtonsoft.Json;
using System;

namespace GroupDocs.Signature.WebForms.Products.Signature.Entity.Web
{
    public class DeleteSignatureFileRequest
    {
        [JsonProperty]
        private String guid;
        [JsonProperty]
        private String signatureType;

        public String getGuid()
        {
            return guid;
        }

        public void setGuid(String guid)
        {
            this.guid = guid;
        }

        public String getSignatureType()
        {
            return signatureType;
        }

        public void setSignatureType(String signatureType)
        {
            this.signatureType = signatureType;
        }
    }
}