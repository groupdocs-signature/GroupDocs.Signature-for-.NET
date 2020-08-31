---
id: sign-document-with-text-signature-advanced
url: signature/net/sign-document-with-text-signature-advanced
title: Sign document with Text signature - advanced
weight: 14
description: " This article explains how to sign document with Text electronic signatures using advanced options with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) class to specify additional options for text signature to specify following signature appearance

* signature alignment ([HorizontalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/horizontalalignment), [VerticalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/verticalalignment))
* margins ([Margin](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/margin))
* border and background settings ([Border,](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/border) [Background](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/background))
* font and colors ([Font](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/font), [Forecolor](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/forecolor))
* text signature implementation ([stamp, text as image, watermark, annotation, shaped](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) etc)

Here are the steps to add Text signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) object with all required additional options .
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.  

This example shows how to add Text signature to document with advanced setup and analyzing result of method. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

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
        // set signature alignment
        // when VerticalAlignment is set the Top coordinate will be ignored.
        // Use Margin properties Top, Bottom to provide vertical offset
        VerticalAlignment = Domain.VerticalAlignment.Top,
        // when HorizontalAlignment is set the Left coordinate will be ignored.
        // Use Margin properties Left, Right to provide horizontal offset
        HorizontalAlignment = Domain.HorizontalAlignment.Right,
        Margin = new Padding() { Top = 20, Right = 20 },
        // adjust signature appearance
        // setup signature border
        Border = new Border()
        {
            Color = Color.DarkGreen,
            DashStyle = DashStyle.DashLongDashDot,
            Transparency = 0.5,
            Visible = true,
            Weight = 2
        },
        // set text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
        // setup background
        Background = new Background()
        {
            Color = Color.LimeGreen,
            Transparency = 0.5,
            Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
        },
        // set rotation
        RotationAngle = 45,
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Image

    };
    // set up shadow options for text
    TextShadow shadow = new TextShadow()
    {
        Color = Color.OrangeRed,
        Angle = 135,
        Blur = 5,
        Distance = 4,
        Transparency = 0.2
    };
    //add text shadow to signature extensions
    options.Extensions.Add(shadow);
    // sign document to file
    SignResult signResult = signature.Sign("signedSample.pdf", options);
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
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
