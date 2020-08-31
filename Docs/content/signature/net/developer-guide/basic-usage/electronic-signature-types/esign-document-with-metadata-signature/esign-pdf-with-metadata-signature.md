---
id: esign-pdf-with-metadata-signature
url: signature/net/esign-pdf-with-metadata-signature
title: eSign PDF with Metadata signature
weight: 2
description: "This article explains how to add metadata signatures to PDF document meta info layer with GroupDocs.Signature"
keywords: Pdf metadata, Pdf metadata signatures
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [PdfMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfmetadatasignature) class to specify different Metadata signature objects for [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) instance.
PDF document metadata is hidden attributes, some of them are visible only over viewing standard document properties like Author, Creation Date, Producer, Entry, Keywords etc.  
PDF document metadata contains 3 fields: Name, Value and TagPrefix, combination of Name and Tag prefix should be unique.

PDF document metadata could keep big amount of data that provides ability to keep serialized custom objects with additional encryption in there. See [Advanced examples how to embed secure data]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-secure-custom-metadata-signatures/_index.md" >}}).

Here are the steps to add metadata signatures into PDF document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) object according to your requirements.
* Instantiate one or several[PdfMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfmetadatasignature) objects and add them into [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to metadata signatures collection ([Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions/properties/signatures)) via [Add](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignaturecollection/methods/add) or [AddRange](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignaturecollection/methods/addrange) method.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

## How to eSign PDF with Metadata signature

This example shows how to sign PDF document with several e-signatures as metadata.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    MetadataSignOptions options = new MetadataSignOptions();

    // Create few Pdf Metadata signatures with different data types
    PdfMetadataSignature[] signatures = new PdfMetadataSignature[]
    {
        new PdfMetadataSignature("Author", "Mr.Scherlock Holmes"),
        new PdfMetadataSignature("DateCreated", DateTime.Now),
        new PdfMetadataSignature("DocumentId", 123456),
        new PdfMetadataSignature("SignatureId", 123.456M)
    };
    // add these signatures to options
    options.Signatures.AddRange(signatures);
    signature.Sign("SampleSigned.pdf", options);
}
```

## How to eSign PDF with standard metadata signatures

This example shows how to sign PDF document with standard standard embedded PDF document metadata signatures. If PDF metadata signature already exists with same name its value will be overwritten.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    MetadataSignOptions options = new MetadataSignOptions();
    // Using standard Pdf Metadata Signatures with new values
    MetadataSignature[] signatures = new MetadataSignature[]
    {
        PdfMetadataSignatures.Author.Clone("Mr.Scherlock Holmes"),
        PdfMetadataSignatures.CreateDate.Clone(DateTime.Now.AddDays(-1)),
        PdfMetadataSignatures.MetadataDate.Clone(DateTime.Now.AddDays(-2)),
        PdfMetadataSignatures.CreatorTool.Clone("GD.Signature-Test"),
        PdfMetadataSignatures.ModifyDate.Clone(DateTime.Now.AddDays(-13)),
        PdfMetadataSignatures.Producer.Clone("GroupDocs-Producer"),
        PdfMetadataSignatures.Entry.Clone("Signature"),
        PdfMetadataSignatures.Keywords.Clone("GroupDocs, Signature, Metadata, Creation Tool"),
        PdfMetadataSignatures.Title.Clone("Metadata Example"),
        PdfMetadataSignatures.Subject.Clone("Metadata Test Example"),
        PdfMetadataSignatures.Description.Clone("Metadata Test example description"),
        PdfMetadataSignatures.Creator.Clone("GroupDocs.Signature"),
    };
    options.Signatures.AddRange(signatures);
    // sign document to file
    signature.Sign("sample_signed.pdf", options);
}
```

### Advanced Usage Topics

To learn more about document eSign features, please refer to the [advanced usage section]({{< ref "signature/net/developer-guide/advanced-usage/_index.md" >}}).

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
