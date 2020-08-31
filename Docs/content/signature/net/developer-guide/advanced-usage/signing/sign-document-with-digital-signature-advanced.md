---
id: sign-document-with-digital-signature-advanced
url: signature/net/sign-document-with-digital-signature-advanced
title: Sign document with Digital signature - advanced
weight: 5
description: " This article explains how to sign document with Digital electronic signatures using advanced options with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) class to specify different amount of settings for Digital signature

* digital certificate (file on local disk [CertificateFilePath](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/certificatefilepath) or stream [CertificateStream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/certificatestream)) (required)
* password of digital certificate [Password](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/password) (required)
* digital signature details ([Reason](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/reason), [Contact](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/contact), [Location](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/location))
* signature image as digital signature appearance on document page ([ImageFilePath](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/imagefilepath) or [ImageStream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/imagestream))
* image signature appearance on document page ([Alignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/horizontalalignment), [Margin](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/margin) etc.)

Here are the steps to add Digital signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) object with required certificate and its password.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.  

This example shows how to add Digital signature to document. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // initialize digital option with certificate file path
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // certifiate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Sign",
        Contact = "JohnSmith",
        Location = "Office1",
        // image as digital certificate appearance on document pages
        ImageFilePath = "sample.jpg",
        //
        AllPages = true,
        Width = 80,
        Height = 60,
        VerticalAlignment = VerticalAlignment.Bottom,
        HorizontalAlignment = HorizontalAlignment.Right,
        Margin = new Padding() {  Bottom = 10, Right = 10},
    };
    signature.Sign("signed.pdf", options);
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
