---
id: sign-pdf-documents-with-special-appearance
url: signature/net/sign-pdf-documents-with-special-appearance
title: Sign Pdf documents with special appearance
weight: 3
description: " This article explains how to use PDF digital electronic signature features on document page."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) contains classes that implements for Pdf document special signature appearances.

Base signature options [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) contains property [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) that expects instance of the following classes

* [PdfTextAnnotationAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdftextannotationappearance) class implements for Pdf documents signature as annotation area. Note that [TextSignOptions.SignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) property must be set to [TextSignatureImplementation.Annotation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation)
* [PdfTextStickerAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdftextstickerappearance) class implements for Pdf documents signature as small sticker. Note that [TextSignOptions.SignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) property must be set to [TextSignatureImplementation.Sticker](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation)

Here are the steps to setup special Pdf  document Text signature appearance with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Compose object of [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) object with all required additional options.
* Set  [TextSignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) property with [PdfTextAnnotationAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdftextannotationappearance) object and set its properties
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

## Sign Pdf document with Text signature Annotation appearance

This example shows how to add Text signature to Pdf document with annotation look. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

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
        // setup proper signature implementation
        SignatureImplementation = TextSignatureImplementation.Annotation,
        Appearance = new PdfTextAnnotationAppearance()
        {
            Border = new Border()
            {
                Color = Color.Blue,
                DashStyle = DashStyle.Dash,
                Weight = 2,
            },
            BorderEffect = PdfTextAnnotationBorderEffect.Cloudy,
            BorderEffectIntensity = 2,
            HCornerRadius = 10,
            // text content of an annotation
            Contents = "Sample",
            Subject = "Sample subject",
            Title = "Sample Title",
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
    signature.Sign("signedAnnotation.pdf", options);
}
```

## Sign Pdf document with Text signature Sticker appearance

This example shows how to add Text signature to Pdf document with sticker look. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature(filePath))
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
    signature.Sign(outputFilePath, options);
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
