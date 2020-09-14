---
id: search-for-embedded-object-with-custom-encryption-of-qr-code-signatures
url: signature/net/search-for-embedded-object-with-custom-encryption-of-qr-code-signatures
title: Search for embedded object with custom encryption of QR-Code signatures
weight: 1
description: " This article explains how to search for embedded electronic signatures with custom encryption in QR-code electronic signatures. This topic contains example of custom encryption, class definition and search for encrypted objects in the QR-codes with GroupDocs.Signature."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides following abilities to search for embedded data objects in QR-code signatures ([QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature)) that were encrypted with custom encryption.  

* ability to search for embedded custom objects into metadata and decrypt them to original source values
* ability to search for custom encrypted QR-code signature and decrypt it  

Here are the steps to search and decrypt previously encrypted text of QR-Code and decrypt custom object from QR-Code signature with GroupDocs.Signature API:

* Implement (use) custom data encryption class that implements [IDataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataencryption) interface.
* Create instance of custom encryption object
* Instantiate the [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) object and setup [DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/dataencryption) value with custom encryption object implementation
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) to it.

## Implementation of custom data encryption

This example shows how to specify custom serialization class. This class could be implemented also as Attribute (optional) to specify as class attribute.

```csharp
// Define class that implements IDataEncryption interface
// Class could inherits Attribute to use it with class definition

public class CustomXOREncryption : IDataEncryption
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

This example shows how to define custom class for serialization.

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

## Search for embedded custom objects in QR-code signatures

This example shows how to decrypt previously embedded encrypted custom objects into [QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature) contains method [GetData](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature/methods/getdata/_1) to retrieve object

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signed.pdf"))
{
    // setup search options
    QrCodeSearchOptions searchOptions = new QrCodeSearchOptions();
    // specify as true to search all pages of a document
    searchOptions.AllPages = true;
    searchOptions.DataEncryption = new CustomXOREncryptionAttribute();
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(searchOptions);
    // output signatures
    foreach (QrCodeSignature qrCodeSignature in signatures)
    {
        if (qrCodeSignature != null)
        {
            DocumentSignatureData docSignature = qrCodeSignature.GetData<DocumentSignatureData>();
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
