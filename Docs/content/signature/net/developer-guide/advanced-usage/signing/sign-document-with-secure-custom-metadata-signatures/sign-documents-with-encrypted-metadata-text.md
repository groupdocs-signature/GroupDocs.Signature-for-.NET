---
id: sign-documents-with-encrypted-metadata-text
url: signature/net/sign-documents-with-encrypted-metadata-text
title: Sign documents with encrypted metadata text
weight: 3
description: "This article explains how to create encrypted Metadata electronic signature with GroupDocs.Signature API"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides ability to secure Metadata signatures with standard or custom encryption. Standard encryption is implemented over class [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption) class. Creation of this object expects 3 arguments like encryption algorithm enumeration [SymmetricAlgorithmType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricalgorithmtype) with one of following values ([DES, TripleDES, RC2, Rijndael](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricalgorithmtype)), string value key and string value salt.

Here are the steps to secure Metadata string values with standard encryption with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Compose object of [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption) class with required algorithm and secure pair key/salt
* Create objects of [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) class and setup property [MetadataSignOptions.DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions/properties/dataencryption) with object of [SymmetricEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/symmetricencryption). In this case all added Metadata signatures to options collection will be encrypted.
* Alternative way to encrypt only selected Metadata signatures is to setup property [MetadataSignature.DataEncryption](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature/properties/dataencryption) to each signature that requires to be secured.
* Create required collection of [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature) object with proper class for document type (like [PdfMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfmetadatasignature), [ImageMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagemetadatasignature),  [PresentationMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationmetadatasignature), [SpreadsheetMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetmetadatasignature), [WordProcessingMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/wordprocessingmetadatasignature))
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)  class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

## Implementation of encrypted Metadata signature

This example shows how to sign document with encrypted Metadata signatures over .

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup options with text of signature
    MetadataSignOptions options = new MetadataSignOptions()
    {

    };

    // setup signature metadata - this text will not be encrypted
    WordProcessingMetadataSignature mdAuthor = new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes");

    // setup data of document id
    WordProcessingMetadataSignature mdDocId = new WordProcessingMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    // set encryption for separate metadata signatures for this options
    mdDocId.DataEncryption = encryption

    // add signatures to options
    options.Signatures.Add(mdAuthor);
    options.Signatures.Add(mdDocId);
    // sign document to file
    signature.Sign("MetadataEncryptedText.docx", options);

}
```

## Implementation of encrypted Metadata signature over MetadataSignOptions encryption

This example shows how to sign document with encrypted Metadata signatures over .

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup options with text of signature
    MetadataSignOptions options = new MetadataSignOptions()
    {
        // set encryption for all metadata signatures for this options
        // if you need separate encryption use own MetadataSignature.DataEncryption property
        DataEncryption = encryption
    };

    // setup signature metadata
    WordProcessingMetadataSignature mdAuthor = new WordProcessingMetadataSignature("Author", "Mr.Scherlock Holmes");
    // setup data of document id
    WordProcessingMetadataSignature mdDocId = new WordProcessingMetadataSignature("DocumentId", Guid.NewGuid().ToString());

    // add signatures to options
    options.Signatures.Add(mdAuthor);
    options.Signatures.Add(mdDocId);
    // sign document to file
    signature.Sign("MetadataEncryptedText.docx", options);

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
