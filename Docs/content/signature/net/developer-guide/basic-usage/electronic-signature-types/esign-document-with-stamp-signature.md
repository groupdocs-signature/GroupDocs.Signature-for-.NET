---
id: esign-document-with-stamp-signature
url: signature/net/esign-document-with-stamp-signature
title: eSign document with Stamp signature
weight: 8
description: "This article explains how to sign document electronically with generated Stamp signatures by GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a Stamp signature?

A **stamp** signature is a special type of electronic signature that have visual appearance of round seal and its visual parameters can be set programmatically.
Every stamp signature can have multiple "stamp lines" with custom text and different line thickness, color, font weight and size. Here is an example of how stamp signature created with [**GroupDocs.Siganture**](https://products.groupdocs.com/signature/net) may look like:

![Stamp](signature/net/images/esign-document-with-stamp-signature.png)

GroupDocs.Signature provides [StampSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) class to specify different options for Stamp signature:

* Stamp type - Round or Square;
* Height and width in pixels;
* Alignment and position within the document page;
* and many more.

Each Stamp option contains inner and outer lines. Inner lines represent vertical lines inside the stamp, when outer lines represent circles (or rectangles based on stamp type) around stamp with own text, border settings, background etc.

Here are the steps to add Stamp signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [StampSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) object according to your requirements and specify appropriate options.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [StampSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) to it.

## How to eSign document with Stamp signature

This example shows how to add Stamp signature to document.

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    StampSignOptions options = new StampSignOptions()
    {
        // set stamp signature position
        Left = 100,
        Top = 100,
    };
    // setup first external line of Stamp
    StampLine outerLine = new StampLine();
    outerLine.Text = " * European Union * European Union  * European Union  *";
    outerLine.Font.FontSize = 12;
    outerLine.Height = 22;
    outerLine.TextBottomIntent = 6;
    outerLine.TextColor = Color.WhiteSmoke;
    outerLine.BackgroundColor = Color.DarkSlateBlue;
    options.OuterLines.Add(outerLine);
    //Inner square lines - horizontal lines inside the rings
    StampLine innerLine = new StampLine();
    innerLine.Text = "John";
    innerLine.TextColor = Color.MediumVioletRed;
    innerLine.Font.FontSize = 20;
    innerLine.Font.Bold = true;
    innerLine.Height = 40;
    options.InnerLines.Add(innerLine);

    signature.Sign("SampleSigned.docx", options);
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