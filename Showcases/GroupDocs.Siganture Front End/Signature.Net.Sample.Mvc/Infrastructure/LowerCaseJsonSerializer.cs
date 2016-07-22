using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Signature.Net.Sample.Mvc.Infrastructure
{
    public class LowerCaseJsonSerializer
    {
        private static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            ContractResolver = new LowerCaseContractResolver()
        };

        public static string SerializeObject(object o)
        {
            return JsonConvert.SerializeObject(o, Formatting.Indented, Settings);
        }

        public class LowerCaseContractResolver : DefaultContractResolver
        {
            protected override string ResolvePropertyName(string propertyName)
            {
                return propertyName.Substring(0, 1).ToLower() + propertyName.Substring(1, propertyName.Length - 1);
            }
        }
    }
}