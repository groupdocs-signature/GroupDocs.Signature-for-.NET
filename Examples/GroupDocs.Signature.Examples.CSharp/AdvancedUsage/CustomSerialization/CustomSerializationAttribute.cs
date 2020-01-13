using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using Newtonsoft.Json;
    using GroupDocs.Signature.Domain.Extensions;
    

    public class CustomSerializationAttribute : Attribute, IDataSerializer
    {
        public T Deserialize<T>(string source) where T : class
        {
            return JsonConvert.DeserializeObject<T>(source);
        }

        public string Serialize(object data)
        {
            var serializerSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };
            return JsonConvert.SerializeObject(data, serializerSettings);
        }
    }
}
