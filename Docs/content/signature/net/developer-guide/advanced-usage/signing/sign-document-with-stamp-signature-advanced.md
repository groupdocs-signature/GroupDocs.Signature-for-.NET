---
id: sign-document-with-stamp-signature-advanced
url: signature/net/sign-document-with-stamp-signature-advanced
title: Sign document with Stamp signature - advanced
weight: 13
description: " This article explains how to sign document with generated Stamp electronic signatures using advanced options with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [StampSIgnOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) class with additional properties to specify different options for Stamp Signature. This signature type implements stamps with different implementation, forms, lines etc. Each Stamp option contains inner and outer lines. Inner lines represent vertical lines inside the stamp, when outer lines represent circles (or rectangles based on stamp type) around stamp with own text, border settings, background etc

Here are the steps to add Stamp signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [StampSIgnOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) object according to your requirements and specify Text Signature options.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [StampSIgnOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

This example shows how to add Stamp signature to document. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature(filePath))
{
    // setup options with text of signature
    StampSignOptions signOptions = new StampSignOptions()
    {
        Height = 300,
        Width = 300,
        VerticalAlignment = VerticalAlignment.Bottom,
        HorizontalAlignment = HorizontalAlignment.Right,
        Margin = new Padding() { Right = 10, Bottom = 10 },
        Background = new Background() { Color = Color.DarkOrange },
        BackgroundColorCropType = StampBackgroundCropType.OuterArea,
        ImageFilePath = @"center.jpg",
        BackgroundImageCropType = StampBackgroundCropType.InnerArea,
        AllPages = true
    };
    //add few outer round lines
    signOptions.OuterLines.Add(
        new StampLine()
        {
            Text = "* European Union *",
            TextRepeatType = StampTextRepeatType.FullTextRepeat,
            Font = new SignatureFont() { Size = 12 },
            Height = 22,
            TextBottomIntent = 6,
            TextColor = Color.WhiteSmoke,
            BackgroundColor = Color.DarkSlateBlue
        }
    );
    signOptions.OuterLines.Add(
        new StampLine()
        {
            Height = 2,
            BackgroundColor = Color.White
        }
    );
    signOptions.OuterLines.Add(
        new StampLine()
        {
            Text = "* Entrepreneur *",
            TextRepeatType = StampTextRepeatType.FullTextRepeat,
            TextColor = Color.DarkSlateBlue,
            Font = new SignatureFont() { Size = 15 },
            Height = 30,
            TextBottomIntent = 8,
            InnerBorder = new BorderLine() { Color = Color.DarkSlateBlue, DashStyle = DashStyle.Dot },
            OuterBorder = new BorderLine() { Color = Color.DarkSlateBlue },
        }
    );
    //Inner square lines
    signOptions.InnerLines.Add(
        new StampLine()
        {
            Text = "John",
            TextColor = Color.MediumVioletRed,
            Font = new SignatureFont() { Size = 20, Bold = true },
            Height = 40,
        }
    );
    signOptions.InnerLines.Add(
        new StampLine()
        {
            Text = "Smith",
            TextColor = Color.MediumVioletRed,
            Font = new SignatureFont() { Size = 20, Bold = true },
            Height = 40
        }
    );
    signOptions.InnerLines.Add(
        new StampLine()
        {
            Text = "SSN 1230242424",
            TextColor = Color.MediumVioletRed,
            Font = new SignatureFont() { Size = 12, Bold = true },
            Height = 40,
        }
    );
    // sign document
    string signedPath = @"C:\GroupDocs\Output\Pdf_Documents_Stamp.pdf";
    signature.Sign(signedPath, signOptions);
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
