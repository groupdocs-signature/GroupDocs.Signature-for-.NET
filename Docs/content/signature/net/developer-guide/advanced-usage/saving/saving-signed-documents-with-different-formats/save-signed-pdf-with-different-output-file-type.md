---
id: save-signed-pdf-with-different-output-file-type
url: signature/net/save-signed-pdf-with-different-output-file-type
title: Save signed Pdf with different output file type
weight: 2
description: "This article explains how to save signed PDF document with various file formats by GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports saving of Pdf signed documents to different formats. Each of document type has list of compatible saving type. These values are listed in enum [PdfSaveFileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfsavefileformat).

Here are the steps to save signed Pdf document to different output type with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)  class and pass source document path or stream as a constructor parameter.
* Instantiate required signature options.
* Instantiate the [PdfSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/pdfsaveoptions) object according to your requirements and specify [FileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/pdfsaveoptions/properties/fileformat) as one of predefined values from [PdfSaveFileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfsavefileformat).  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signatureoptions and [PdfSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/pdfsaveoptions) object to it.

Following example demonstrates how to save signed PDF document with different output type

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create QRCode option with predefined QRCode text
    QRCodeSignOptions signOptions = new QRCodeSignOptions("JohnSmith")
    {
        EncodeType = QRCodeTypes.QR,
        Left = 100,
        Top = 100
    };
    PdfSaveOptions pdfSaveOptions = new PdfSaveOptions()
    {
        FileFormat = PdfSaveFileFormat.DocX,
        OverwriteExistingFiles = true
    };
    // sign document to file
    signature.Sign("SignedPdf.docx", signOptions, pdfSaveOptions);
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
