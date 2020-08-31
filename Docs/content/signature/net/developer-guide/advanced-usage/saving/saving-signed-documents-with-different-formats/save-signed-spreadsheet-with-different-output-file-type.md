---
id: save-signed-spreadsheet-with-different-output-file-type
url: signature/net/save-signed-spreadsheet-with-different-output-file-type
title: Save signed Spreadsheet with different output file type
weight: 4
description: "This article explains how to save signed Spreadsheet document with various file formats by GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports saving of Spreadsheet signed documents with different output file types. Each document type has list of compatible saving type. These values are listed in enum [SpreadsheetSaveFileFormat.](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetsavefileformat)

Here are the steps to save signed Spreadsheet document to different output type with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Instantiate required signature options.
* Instantiate the [SpreadsheetSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/spreadsheetsaveoptions) object according to your requirements and specify [FileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/spreadsheetsaveoptions/properties/fileformat) as one of predefined values from [SpreadsheetSaveFileFormat](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetsavefileformat).  

* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signatureoptions and [SpreadsheetSaveOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/spreadsheetsaveoptions) object to it.

Following example demonstrates how to save signed Spreadsheet document with different output type

```csharp
using (Signature signature = new Signature("sample.xlsx"))
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
    SpreadsheetSaveOptions saveOptions = new SpreadsheetSaveOptions()
    {
        FileFormat = SpreadsheetSaveFileFormat.Pdf,
        OverwriteExistingFiles = true
    };
    // sign document to file
    signature.Sign("SignedXlsx.pdf", signOptions, saveOptions);
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
