---
id: load-document-from-local-disk
url: signature/net/load-document-from-local-disk
title: Load document from local disk
weight: 4
description: "This section explains how to load document from local disk with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
When document is located on the local disk [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) enables you to work with document over the file [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class constructor. [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) instance will open file for reading only when any method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) will be called.

Following code snippet shows how to load document from local disk.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
    };
    // sign document to file
    signature.Sign("sampleSigned", options);
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