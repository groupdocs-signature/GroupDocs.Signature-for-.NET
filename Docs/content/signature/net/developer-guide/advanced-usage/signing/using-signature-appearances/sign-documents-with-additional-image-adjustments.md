---
id: sign-documents-with-additional-image-adjustments
url: signature/net/sign-documents-with-additional-image-adjustments
title: Sign documents with additional image adjustments
weight: 1
description: " This article explains how to use different image adjustment with electronic signatures on document page."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) contains [ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance) class that implements extra image adjustment setting like

* gray-scale ([Grayscale](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/grayscale))
* brightness ([Brightness](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/brightness))
* contrast ([Contrast](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/contrast))
* gamma correction ([GammaCorrection](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/gammacorrection))
* border ([Border](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/border))

Base signature class [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) property [Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) should be set with instance of [ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance) class to provide additional image adjustment

Here are the steps to setup extra image appearance with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Compose object of[ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance) object with all required additional options.
* Set [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) property with [ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance)  object.  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

## Sign document with image appearance

This example shows how to specify extra image appearances. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    ImageSignOptions options = new ImageSignOptions("sample.jpg")
    {
        // set signature position
        Left = 100,
        Top = 100,
        // set signature rectangle
        Width = 100,
        Height = 30,
        // set signature alignment
        VerticalAlignment = Domain.VerticalAlignment.Bottom,
        HorizontalAlignment = Domain.HorizontalAlignment.Right,
        Margin = new Padding() { Bottom = 20, Right = 20 },
        // setup image additional appearance as Brightness and Border
        Appearance = new ImageAppearance()
        {
            Grayscale = true,
            Contrast = 0.2f,
            GammaCorrection = 0.3f,
            Brightness = 0.9f,
            Border = new Border()
            {
                Color = Color.DarkGreen,
                DashStyle = DashStyle.DashLongDashDot,
                Transparency = 0.5,
                Visible = true,
                Weight = 2
            }
        }
    };
    // sign document to file
    signature.Sign("signed.pdf", options);
}
```

## Sign PDF document with Text signature Sticker appearance

This example shows how to add Text signature to Pdf document with sticker look. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set signature position
        Left = 100,
        Top = 100,
        // set signature rectangle
        Width = 100,
        Height = 30,
        // setup proper signature implementation
        SignatureImplementation = TextSignatureImplementation.Sticker,
        Appearance = new PdfTextStickerAppearance()
        {
            // select sticker icon
            Icon = PdfTextStickerIcon.Star,
            // setup if popup annotation will be opened by default
            Opened = false,
            // text content of an annotation
            Contents = "Sample",
            Subject = "Sample subject",
            Title = "Sample Title"
        },
        // set signature alignment
        VerticalAlignment = Domain.VerticalAlignment.Bottom,
        HorizontalAlignment = Domain.HorizontalAlignment.Right,
        Margin = new Padding() { Bottom = 20, Right = 20 },
        // set text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
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
