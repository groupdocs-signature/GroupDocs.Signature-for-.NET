---
id: save-signed-presentation-with-different-output-file-type
url: signature/net/save-signed-presentation-with-different-output-file-type
title: Save signed Presentation with different output file type
weight: 3
description: "This article explains how to save signed Presentation documents with various file formats by GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports saving of Presentation signed documents with different formats. Each of document type has list of compatible saving type. These values are listed in enum [PresentationSaveFileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationsavefileformat).

Here are the steps to save signed Presentation document to different output type with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)  class and pass source document path or stream as a constructor parameter.
* Instantiate required signature options.
* Instantiate the [PresentationSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/presentationsaveoptions) object according to your requirements and specify [FileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/presentationsaveoptions/properties/fileformat) as one of predefined values from [PresentationSaveFileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationsavefileformat).  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signatureoptions and [PresentationSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/presentationsaveoptions) [](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/presentationsaveoptions) object to it.

Following example demonstrates how to save signed Presentation document with different output type

```csharp
using (Signature signature = new Signature("sample.ppsx"))
{
    // create QRCode option with predefined QRCode text
    QRCodeSignOptions signOptions = new QRCodeSignOptions("JohnSmith")
    {
        // setup QRCode encoding type
        EncodeType = QRCodeTypes.QR,
        // set signature position
        Left = 100,
        Top = 100
    };
    PresentationSaveOptions saveOptions = new PresentationSaveOptions()
    {
        FileFormat = PresentationSaveFileFormat.Tiff,
        OverwriteExistingFiles = true
    };
    // sign document to file
    signature.Sign("SignedPPsx", signOptions, saveOptions);
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
