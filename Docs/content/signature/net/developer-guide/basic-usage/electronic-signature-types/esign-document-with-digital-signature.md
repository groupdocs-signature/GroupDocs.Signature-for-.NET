---
id: esign-document-with-digital-signature
url: signature/net/esign-document-with-digital-signature
title: eSign document with Digital signature
weight: 2
description: "This article explains how digitally esign documents with certificates using GroupDocs.Signature API"
keywords: digital signature, certificate, digitally esign, esign with certificate, pfx, pfx certifiate
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a Digital Signature?

A digital electronic signature is a scheme for verifying the document's authenticity. A valid digital signature gives a recipient very strong reason to believe that the document was created or updated by a known sender and that the document was not altered by unknown source. For documents, the digital signature is represented by certificate with private (to sign) and public (to verify) keys. Most often certificates of various public key cryptography standards are used for this purpose, for example PFX format (see specification [here](https://en.wikipedia.org/wiki/PKCS_12)). These digital signature certificates could be obtained from the operation system or generated manually with proper tools or trusted sources.

Digital signature as certificate file of PFX format allows to sign document after each creation or change with certificate and specify several optional parameters like subject, title, reason, contact etc. Most document viewers or editors support digital signatures verification that allows users to ensure document is from trusted source. Office documents format such as Word processing documents (DOC, DOCX, ODT, OTT), Spreadsheet files (XLSX, XLS, ODS, OTS) support digital signature without any visual appearance on document pages. PDF document format supports digital signature with alternative visual appearance on specific document page with custom image and labels. Picture below shows how digital signature looks by default on PDF document page..

![Digital](signature/net/images/esign-document-with-digital-signature.png)

## How to eSign document with Digital signature

**[GroupDocs.Signature](https://products.groupdocs.com/signature/net)** supports creation of digital signature based on existing PFX certificate. To specify different settings library provides [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) class that allows to adjust digital signature properties in the document:

* Certificate source from [FilePath](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/certificatefilepath) or [Stream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/certificatestream);
* Certificate [password](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/password);
* [Contact](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/contact), [Reason](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/reason) and [Location](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/location) properties to set additional description;
* [Visible](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/visible) property to specify whether signature should be visible on document page or not;
* [XAdES type](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions/properties/xadestype) to specify whether e-signature should be of Xml Advanced Electronic Signature type.

Here are the steps to add Digital signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) object with required certificate and its password.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) to it.

This example shows how to sign PDF document with digital e-signature.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // initialize digital option with certificate file path
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // optional: setup image file path
        ImageFilePath = "sample.jpg",

        // set signature position
        Left = 100,
        Top = 100,

        // set
        Password = "1234567890"
    };
    signature.Sign("sampleSigned.pdf", options);
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
