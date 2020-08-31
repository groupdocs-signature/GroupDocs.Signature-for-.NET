---
id: search-for-embedded-and-encrypted-objects-in-metadata-signatures
url: signature/net/search-for-embedded-and-encrypted-objects-in-metadata-signatures
title: Search for embedded and encrypted objects in Metadata signatures
weight: 8
description: " This section explains how to search for embedded electronic signatures into the document metadata with GroupDocs.Signature API. Also this topic shows the way to customize data serialization, encryption and class definition with ability to embed it into the metadata electronic signature."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides additional features when searching for Metadata Signatures ([MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature)) that were previously encrypted or contains custom data objects.

* Ability to search for embedded custom objects into metadata and decrypt them to original source values.
* Ability to search for encrypted text of metadata signature and decrypt it.  

Here are the steps to search and decrypt previously encrypted text of metadata and decrypt custom object from metadata signature with GroupDocs.Signature API:

* Implement if needed custom data serialization class that implement [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface. By default Signature uses embedded json format serialization but allows user to customize it. if object of class was serialized by custom serialization when searching for it, this class should also has same serialization attribute.  
* Implement if needed custom data encryption class that implements[IDataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataencryption) interface. By default Signature has several encryption implementation you can use but allows user to customize it. There's ability to specify inline encryption to use.  
* Instantiate the[MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions) object value.
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass[MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions) to it.
* Process each Metadata signature and set property [DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions/properties/dataencryption) to specify data encryption and call [GetData](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/methods/getdata/_1) method to retrieve object.

## Implementation of custom data serialization

This example shows how to specify custom serialization class. This class should be implemented as Attribute and [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface.

```csharp
/// <summary>
/// Creates class that implements IDataSerializer interface
/// It cam support common serialization like JSon or custom data format
/// </summary>
class CustomSerializationAttribute : Attribute, IDataSerializer
{
    public T Deserialize<T>(string source) where T : class
    {
        DocumentSignatureData result = new DocumentSignatureData();
        byte[] bytes = Encoding.UTF8.GetBytes(source);
        using (MemoryStream stream = new MemoryStream(bytes))
        {
            stream.Seek(0, SeekOrigin.Begin);
            using (BinaryReader reader = new BinaryReader(stream))
            {
                result.ID = reader.ReadString();
                result.Author = reader.ReadString();
                result.Signed = new DateTime( reader.ReadInt64());
                result.DataFactor = reader.ReadDecimal();
            }
        }
        var converter = TypeDescriptor.GetConverter(typeof(T));
        return (T)converter.ConvertFrom(result);
    }
    public string Serialize(object data)
    {
        string result = string.Empty;
        DocumentSignatureData signatureData = data as DocumentSignatureData;
        if (signatureData != null)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                using (BinaryWriter writer = new BinaryWriter(stream))
                {
                    writer.Write(signatureData.ID);
                    writer.Write(signatureData.Author);
                    writer.Write(signatureData.Signed.Ticks);
                    writer.Write(signatureData.DataFactor);
                }
                result = Encoding.UTF8.GetString(stream.ToArray());
            }
        }
        return result;
    }
}
```

## Implementation of custom data encryption

This example shows how to specify custom serialization class. This class could be implemented also as Attribute (optional) to specify as class attribute.

```csharp
// Define class that implements IDataEncryption interface
private class CustomXOREncryptionAttribute : Attribute, IDataEncryption
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
// setup CustomSerialization Attribute to setup customer serialization(see example above)
[CustomSerialization]
// setup CustomXOREncryption Attribute for custom encryption (see example above)
[CustomXOREncryption]
private class DocumentSignatureData
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

## Search for embedded custom objects in metadata signatures

 This example shows how to decrypt previously embedded encrypted custom objects into metadata signature. MetadataSignature contains method [GetData](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/methods/getdata/_1) to retrieve object

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signed.pdf"))
{
    // setup search options
    MetadataSearchOptions searchOptions = new MetadataSearchOptions();

    // search document
    List<MetadataSignature> signatures = signature.Search<MetadataSignature>(searchOptions);
    // output signatures
    foreach (MetadataSignature metadataSignature in signatures)
    {
        if (qrCodeSignature != null)
        {
            DocumentSignatureData docSignature = metadataSignature.GetData<DocumentSignatureData>();
            if (docSignature != null)
            {
                Console.WriteLine("Found DocumentSignature: #{0} by {1} from {2} DataFactor = {3}", docSignature.ID,
                    docSignature.Author, docSignature.Signed, docSignature.DataFactor.ToString("N2"));
            }
        }
    }
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