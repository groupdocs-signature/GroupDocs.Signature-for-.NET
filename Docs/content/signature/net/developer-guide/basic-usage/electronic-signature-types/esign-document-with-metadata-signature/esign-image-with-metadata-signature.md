---
id: esign-image-with-metadata-signature
url: signature/net/esign-image-with-metadata-signature
title: eSign Image with Metadata signature
weight: 1
description: "This article shows how to add metadata signatures to the image exif metadata layer with various data types"
keywords: image exif, image metadata, image meta exif, image exif signature
productName: GroupDocs.Signature for .NET
hideChildren: False
---
Metadata signature for Image document is an electronic signature based on image metadata standard. Most image formats support metadata specification or [EXIF](https://en.wikipedia.org/wiki/Exif). Image metadata is dictionary map with unique whole short identifier in range 0-65535, Some identifiers are reserved by [EXIF specification.](https://www.exiv2.org/tags.html) From signature perspective image metadata may content any hidden value of standard (int,char, string) or custom type (user defined class), be encrypted and decrypted back by known key over Search method.

[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [ImageMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagemetadatasignature) class to specify Metadata e-signature for image documents. Image document metadata contains pair with unique identifier Id and its Value.  
Image document metadata could keep big amount of data that provides ability to keep serialized custom objects with additional encryption in there. See more examples [here]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-secure-custom-metadata-signatures/_index.md" >}}).

Here are the steps to add metadata signatures into Image with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) object according to your requirements.
* Instantiate one or several [ImageMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagemetadatasignature) objects and add them into [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to metadata signatures collection ([Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions/properties/signatures)) via [Add](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignaturecollection/methods/add) or [AddRange](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignaturecollection/methods/addrange) method.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

## How to eSign Image with Metadata signature

This example shows how to sign png image with metadata e-signatures

```csharp
using (Signature signature = new Signature("sample.png"))
{
    // create Metadata option with predefined Metadata text
    MetadataSignOptions options = new MetadataSignOptions();
    // Specify different Metadata Signatures and add them to options signature collection
    ushort imgsMetadataId = 41996;
    // Create several Image Metadata signatures with different types
    ImageMetadataSignature[] signatures = new ImageMetadataSignature[]
    {
        new ImageMetadataSignature(imgsMetadataId++, 123456), // int
        new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes"), // string
        new ImageMetadataSignature(imgsMetadataId++, DateTime.Now), // date time
        new ImageMetadataSignature(imgsMetadataId++, 123.456M), //decimal value
    };

    // add these signatures to options
    options.Signatures.AddRange(signatures);
    signature.Sign("SampleSigned.png", options);
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
