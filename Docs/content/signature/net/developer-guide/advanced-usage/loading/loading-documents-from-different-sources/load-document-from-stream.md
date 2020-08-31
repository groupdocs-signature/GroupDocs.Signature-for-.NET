---
id: load-document-from-stream
url: signature/net/load-document-from-stream
title: Load document from Stream
weight: 5
description: "This section explains how to load document from stream with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
There might be the case when your document is not physically located on the disk. Instead, you have the document in the form of a stream. In this case, to avoid the overhead of saving stream as a file on disk, [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) enables you to work with document from streams directly. Please be aware that [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object does not dispose passed stream.

The following are the steps to be followed:

* Obtain document stream;
* Pass opened stream to [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class constructor.

Following code snippet serves this purpose.

```csharp
using (Stream stream = File.OpenRead("sample.pdf"))
{
    using (Signature signature = new Signature(stream))
    {
        QRCodeSignOptions options = new QRCodeSignOptions("JohnSmith")
        {
            EncodeType = QRCodeTypes.QR,
            Left = 100,
            Top = 100
        };
        // sign document to file
        signature.Sign("SampleSigned", options);
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