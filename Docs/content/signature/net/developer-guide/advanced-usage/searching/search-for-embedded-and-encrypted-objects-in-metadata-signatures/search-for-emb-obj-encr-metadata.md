---
id: search-for-embedded-object-with-custom-encryption-of-metadata-signatures
url: signature/net/search-for-embedded-object-with-custom-encryption-of-metadata-signatures
title: Search for embedded object with custom encryption of Metadata signatures
weight: 1
description: " This article explains how to search for embedded electronic signatures with custom encryption in document metadata. This topic contains example of custom encryption, class definition and search for encrypted objects in the document metadata with GroupDocs.Signature."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides additional features when searching for Metadata Signature that were previously encrypted and have embedded data objects.

* ability to search for embedded custom objects into metadata and decrypt them to original source values
* ability to search for encrypted text of metadata signature and decrypt it  
  
Here are the steps to search and decrypt previously encrypted text of metadata and decrypt custom object from metadata signature ([MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature)) with GroupDocs.Signature API:

* Implement custom data encryption class that implements [IDataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataencryption) interface. By default Signature has several encryption implementation you can use but allows user to customize it. There's ability to specify inline encryption to use
* Define class with proper DataSerialization attribute  
* Instantiate the [MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions) object value
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions) to it.
* Process each Metadata signature ([MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature)) and set property [DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions/properties/dataencryption) to specify data encryption and call [GetData](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/methods/getdata/_1) method to retrieve object

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
// setup CustomSerialization Attribute to setup customer serialization(see example above)
[CustomSerialization]
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

 This example shows how to decrypt previously embedded encrypted custom objects into metadata signature. [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) contains method [GetData](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/methods/getdata/_1) to retrieve object

```csharp
using (Signature signature = new Signature("MetadataCustomEncryptionObject.docx"))
{
    // create data encryption
    IDataEncryption encryption = new CustomXOREncryption();
    MetadataSearchOptions options = new MetadataSearchOptions()
    {
        DataEncryption = encryption
    };
    // search for signatures in document
    List<WordProcessingMetadataSignature> signatures = signature.Search<WordProcessingMetadataSignature>(options);
    Console.WriteLine("\nSource document contains following signatures.");
    // get required metadata signatures
    WordProcessingMetadataSignature mdSignature = signatures.FirstOrDefault(p => p.Name == "Signature");
    if (mdSignature != null)
    {
        DocumentSignatureData documentSignatureData = mdSignature.GetData<DocumentSignatureData>();
        if (documentSignatureData != null)
        {
            Console.WriteLine("Signature has DocumentSignatureData object:\n ID = {0}, Author = {1}, Signed = {2}, DataFactor {3}",
                documentSignatureData.ID, documentSignatureData.Author, documentSignatureData.Signed.ToShortDateString(), documentSignatureData.DataFactor);
        }
    }
    // get required metadata signatures
    WordProcessingMetadataSignature mdAuthor = signatures.FirstOrDefault(p => p.Name == "Author");
    if (mdAuthor != null)
    {
        Console.WriteLine("Metadata signature found. Name : {0}. Value: {1}", mdAuthor.Name, mdAuthor.GetData<string>());
    }
    // get required metadata signatures
    WordProcessingMetadataSignature mdDocId = signatures.FirstOrDefault(p => p.Name == "DocumentId");
    if (mdDocId != null)
    {
        Console.WriteLine("Metadata signature found. Name : {0}. Value: {1}", mdDocId.Name, mdDocId.GetData<string>());
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
