---
id: esign-document-with-text-signature
url: signature/net/esign-document-with-text-signature
title: eSign document with Text signature
weight: 7
description: "This article explains how to sign document with Text signature by GroupDocs.Signature API"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a Text signature?

A **Text** electronic signature is an arbitrary text that is added to a document in a native way dependent on document type. GroupDocs.Signature provides text signature feature and allows to customize wide range of text settings - from font name, size and color to alignment, borders, shadow effects etc. This is how text signature may look like:  

![Text](signature/net/images/esign-document-with-text-signature.png)

## How to eSign document with Text signature

To manipulate with text signatures programmatically [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) class and the whole workflow as easy as follows:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) object according to your requirements and specify Text signature options.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) to it.

This example shows how to add Text signature to document.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set signature position
        Left = 100,
        Top = 100,
        // set signature rectangle
        Width = 100,
        Height = 30,
        // set Text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" }
    };
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