---
id: composing-signature-with-linear-gradient-brush-background
url: signature/net/composing-signature-with-linear-gradient-brush-background
title: Composing signature with linear gradient brush background
weight: 1
description: " This article explains how to fill signature background with linear gradient brush"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---  
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [LInearGradientBrush](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/lineargradientbrush) class to specify filling signature background with linear gradients

Here are the steps to use Linear gradient brush with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Instantiate the [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) object with all required additional options and setup [Background.Brush](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/background/properties/brush) property with instance of  [LInearGradientBrush](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/lineargradientbrush)
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) to it.  
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

This example shows how to use Texture brush for signature background. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // adjust signature appearance brush
        // setup background
        Background = new Background()
        {
            Color = Color.LimeGreen,
            Transparency = 0.5,
            Brush = new LinearGradientBrush(Color.LimeGreen, Color.White, 45)
        },
        // locate signature
        Width = 100,
        Height = 80,
        VerticalAlignment = Domain.VerticalAlignment.Center,
        HorizontalAlignment = Domain.HorizontalAlignment.Center,
        Margin = new Padding() { Top = 20, Right = 20 },
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Image
    };
    // sign document to file
    signature.Sign("signed.docx", options);
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
