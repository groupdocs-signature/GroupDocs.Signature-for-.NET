---
id: search-for-encrypted-objects-metadata-signatures
url: signature/net/search-for-encrypted-objects-metadata-signatures
title: Search for encrypted objects Metadata signatures
weight: 3
description: " This article explains how to search for encrypted electronic signatures in the document metadata. This topic contains example of using standard encryption, serialization, class definition and search for embedded objects in the document metadata with GroupDocs.Signature."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides ability to search for embedded objects in Metadata signatures with standard or custom encryption. Standard encryption is implemented over class [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption) class. Creation of this object expects 3 arguments like encryption algorithm enumeration [SymmetricAlgorithmType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricalgorithmtype) with one of following values (DES, TripleDES, RC2, Rijndael), string value key and string value salt.

Here are the steps to search for embedded Metadata signature with standard encryption with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Compose object of [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption) class with same parameters as secured QR-code was signed with.  
* Create objects of [MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions) class and setup property  [DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions/properties/dataencryption) with object of [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption)  
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasearchoptions)  to it.
* Call method [GetData<Type>()](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/methods/getdata/_1) of encrypted [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) object to retrieve object of type Type.

## Definition of class

This example shows how to define custom class with serialization and encryption properties and setup Format attributes for properties.

```csharp
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

## Search for embedded object in Metadata signatures

This example shows how to search for embedded objects in Metadata signatures.

```csharp
using (Signature signature = new Signature("MetadataEncryptedObject.docx"))
{
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
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
