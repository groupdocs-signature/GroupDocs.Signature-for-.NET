---
id: save-signed-document-with-password
url: signature/net/save-signed-document-with-password
title: Save signed document with password
weight: 1
description: "This article explains how to save document with password protection."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports saving signed document with password protection. This ability is supported over [Password](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/saveoptions/properties/password) property of [SaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/saveoptions) class that should be passed to [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method.

Here are the steps to protect signed document with password with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Instantiate required signature options.
* Instantiate the [SaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/saveoptions) object and specify [Password](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/saveoptions/properties/password) property with required password string.  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signatureoptions and [SaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/saveoptions) object to it.

Following example demonstrates how to save signed document with password.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create QRCode option with predefined QRCode text
    QrCodeSignOptions signOptions = new QrCodeSignOptions("JohnSmith")
    {
        // setup QRCode encoding type
        EncodeType = QrCodeTypes.QR,
        // set signature position
        Left = 100,
        Top = 100
    };
    SaveOptions saveOptions = new SaveOptions()
    {
        Password = "1234567890",
        UseOriginalPassword = false
    };
    // sign document to file
    signature.Sign("SignedProtected.pdf", signOptions, saveOptions);
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
