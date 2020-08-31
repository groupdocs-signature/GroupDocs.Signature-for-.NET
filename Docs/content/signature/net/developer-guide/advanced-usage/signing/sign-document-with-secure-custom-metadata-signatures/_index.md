---
id: sign-document-with-secure-custom-metadata-signatures
url: signature/net/sign-document-with-secure-custom-metadata-signatures
title: Sign document with secure custom Metadata signatures
weight: 12
description: "This section contains articles with explanation how to create Metadata electronic signatures and embed into metadata custom object with its serialization and encryption. The examples show how to customize object serialization and encryption."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides additional features with [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) class like following

* ability to embedded custom objects into metadata
* ability to specify custom objects encryption and serialization
* ability to collect and populate standard document signatures  

Here are the steps to embed custom object into Metadata signature with GroupDocs.Signature:

* Implement if needed custom data serialization class that implement [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer)  interface. By default GroupDocs.Signature uses embedded json format serialization but allows user to customize it.
* Implement if needed custom data encryption class that implements [IDataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataencryption) interface. By default GroupDocs.Signature has several encryption implementation you can use but allows user to customize it.
* Implement class with properties and specify if needed class attributes (like custom serialization attribute, custom encryption attribute), specify attributes for properties like [FormatAttribute](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/formatattribute)  to specify serialization name and display format, same as [SkipSerializationAttribute](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/skipserializationattribute) to mark property of class as not serialize  
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Create one or several objects of proper [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) object for document (like [PdfMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfmetadatasignature), [ImageMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagemetadatasignature),  [PresentationMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationmetadatasignature), [SpreadsheetMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetmetadatasignature), [WordProcessingMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/wordprocessingmetadatasignature)) and setup
* Instantiate the [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) object according to your requirements and pass all metadata signatures to it.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

Following topics show more details of these features

## Implementation of custom data serialization

 This example shows how to specify custom serialization class. This class should be implemented as Attribute and [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface.

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

## Sign Images with custom encrypted objects and values into Metadata signature

This example shows how to add custom object into metadata signature to Image document.

```csharp
using (Signature signature = new Signature("sample.jpg"))
{
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup options with text of signature
    MetadataSignOptions options = new MetadataSignOptions();
    // create custom object
    DocumentSignatureData documentSignature = new DocumentSignatureData()
    {
        ID = Guid.NewGuid().ToString(),
        Author = Environment.UserName,
        Signed = DateTime.Now,
        DataFactor = 11.22M
    };
    // Specify different Metadata Signatures and add them to options signature collection
    ushort imgsMetadataId = 41996;
    // Specify different Metadata Signatures and add them to options signature collection
    // setup Author property
    ImageMetadataSignature mdDocument = new ImageMetadataSignature(imgsMetadataId++, documentSignature);
    // set encryption
    mdDocument.DataEncryption = encryption;
    // setup Author property
    ImageMetadataSignature mdAuthor = new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes");
    // set encryption
    mdAuthor.DataEncryption = encryption;
    // setup data of document id
    ImageMetadataSignature mdDocId = new ImageMetadataSignature(imgsMetadataId++, Guid.NewGuid().ToString());
    // set encryption
    mdDocId.DataEncryption = encryption;
    // add signatures to options
    options.Signatures.Add(mdDocument);
    options.Signatures.Add(mdAuthor);
    options.Signatures.Add(mdDocId);
    // sign document to file
    signature.Sign("signed.jpg", options);
}
```

## Sign PDF with embedded object and encrypted data in Metadata signatures

This example shows how to add or update standard embedded PDF document metadata signatures.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // setup options with text of signature
    MetadataSignOptions options = new MetadataSignOptions();
    // create custom object
    DocumentSignatureData documentSignature = new DocumentSignatureData()
    {
        ID = Guid.NewGuid().ToString(),
        Author = Environment.UserName,
        Signed = DateTime.Now,
        DataFactor = 11.22M
    };
    IDataEncryption encryption = new CustomXOREncryptionAttribute();

    // Specify different Metadata Signatures and add them to options signature collection
    // for this metadata encryption will be used from class attribute
    PdfMetadataSignature mdDocument = new PdfMetadataSignature("DocumentSignature", documentSignature);

    // setup Author property
    PdfMetadataSignature mdAuthor = new PdfMetadataSignature("Author", "Mr.Scherlock Holmes");
    // set encryption
    mdAuthor.DataEncryption = encryption;

    // setup data of document id
    PdfMetadataSignature mdDocId = new PdfMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    // set encryption
    mdDocId.DataEncryption = encryption;

    // add signatures to options
    options.Signatures.Add(mdDocument);
    options.Signatures.Add(mdAuthor);
    options.Signatures.Add(mdDocId);

    // sign document to file
    signature.Sign("sample_signed.pdf", options);
}
```

{{< alert style="info" >}}
Examples above also work for different document types. For Presentations documents only objects of [PresentationMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationmetadatasignature) should be used with same properties and behavior, for Spreadsheet documents only objects of [SpreadsheetMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetmetadatasignature) should be used with same properties and behavior, with WordProcessing documents the class [WordProcessingMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/wordprocessingmetadatasignature) should be used
{{< /alert >}}

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
