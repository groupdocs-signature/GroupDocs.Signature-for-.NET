---
id: implement-custom-serialization-with-metadata-signatures
url: signature/net/implement-custom-serialization-with-metadata-signatures
title: Implement custom serialization with Metadata signatures
weight: 2
description: "This article explains how to implement custom serialization for Metadata electronic signatures."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides ability to embed into Metadata signature custom objects. This feature is implemented over object serialization to string and further encryption. By default library uses json format serialization and symmetric encryption but allows to provide custom serialization and encryption. Customization of serialization requires implementation of interface [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) with two methods to serialize and de-serialize data.

Here are the steps to embed custom object into Metadata signature with GroupDocs.Signature:

* Implement if needed custom data serialization class that implement [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface. By default GroupDocs.Signature uses embedded json format serialization but allows user to customize it.
* Implement if needed custom data encryption class that implements [IDataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataencryption) interface. By default GroupDocs.Signature has several encryption implementation you can use but allows user to customize it.
* define class with properties and specify class attributes (like custom serialization attribute, or custom encryption attribute), specify attributes for properties like [FormatAttribute](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/formatattribute) to specify serialization name and display format, same as [SkipSerializationAttribute](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/skipserializationattribute) attribute to mark property of class as not serialize
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter
* Create one or several objects of [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) object with [MetadataSignature.Value](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/properties/value) as object instance. Setup [MetadataSignature.DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/properties/dataencryption) property or use same for [MetadataSignOptions.DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions/properties/dataencryption) if all signatures should be encrypted.
* Instantiate the [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) object according to your requirements, add all metadata signatures to its collection and setup if needed [DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/properties/dataencryption) property,
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

 This example shows how to specify custom serialization class. This class should be implemented as Attribute and [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface.

```csharp
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
```

## Implementation of custom data encryption

This example shows how to specify custom serialization class. This class could be implemented also as Attribute (optional) to specify as class attribute.

```csharp
// Define class that implements IDataEncryption interface
private class CustomXOREncryption : IDataEncryption
{
    /// <summary>
    /// Gets or sets non empty key for encryption (at least one character)
    /// </summary>
    public int Key { get; set; }
    /// <summary>
    /// Encode method to encrypt string.
    /// </summary>
    /// <param name="source">Source string to encode.</param>
    /// <returns>Returns enccrypted string</returns>
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
```

## Definition of class

This example shows how to define custom class with serialization and encryption properties and setup Format attributes for properties.

```csharp
// define class with custom serialization attribute
[CustomSerialization]
public class DocumentSignatureData
{
    [Format("SignID")]
    public string ID { get; set; }
    [Format("SAuth")]
    public string Author { get; set; }
    [Format("SDate", "yyyy-MM-dd")]
    public DateTime Signed { get; set; }
    [Format("SDFact", "N2")]
    public decimal DataFactor { get; set; }
    [SkipSerialization]
    public string Comments { get; set; }
}
```

## Implementation of embedding custom object into Metadata signature

This example shows how to embed custom object into Metadata signature.

```csharp
 using (Signature signature = new Signature("sample.docx"))
 {
     // create data encryption
     IDataEncryption encryption = new CustomXOREncryption();
     // setup options with text of signature
     MetadataSignOptions options = new MetadataSignOptions()
     {
         // set encryption for all metadata signatures for this options
         // if you need separate encryption use own MetadataSignature.DataEncryption property
         DataEncryption = encryption
     };
     // create custom object
     DocumentSignatureData documentSignatureData = new DocumentSignatureData()
     {
         ID = Guid.NewGuid().ToString(),
         Author = Environment.UserName,
         Signed = DateTime.Now,
         DataFactor = 11.22M
     };
     // setup signature metadata
     WordProcessingMetadataSignature mdSignature = new WordProcessingMetadataSignature("Signature", documentSignatureData);
     // setup signature metadata
     WordProcessingMetadataSignature mdAuthor = new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes");
     // setup data of document id
     WordProcessingMetadataSignature mdDocId = new WordProcessingMetadataSignature("DocumentId", Guid.NewGuid().ToString());
     // add signatures to options
     options.Signatures.Add(mdSignature);
     options.Signatures.Add(mdAuthor);
     options.Signatures.Add(mdDocId);
     // sign document to file
     signature.Sign("MetadataCustomSerializationObject.docx", options);
 }
```

## More resources

### GitHub Examples

You may easily run the code above and see the feature in action in our GitHub examples:

* [GroupDocs.Signature for .NET examples, plugins, and showcase](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET)
* [GroupDocs.Signature for Java examples, plugins, and showcase](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java)
* [Document Signature for .NET MVC UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC)
* [Document Signature for .NET App WebForms UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms)
* [Document Signature for Java App Dropwizard UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Dropwizard)
* [Document Signature for Java Spring UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Spring)

### Free Online App

Along with full-featured .NET library we provide simple, but powerful free Apps.

You are welcome to eSign PDF, Word, Excel, PowerPoint documents with free to use online **[GroupDocs Signature App](https://products.groupdocs.app/signature)**.
