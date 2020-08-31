---
id: sign-document-with-extensions
url: signature/net/sign-document-with-extensions
title: Sign document with extensions
weight: 7
description: "This article shows how to create electronic signatures with additional visual extensions"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides with [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) property Extensions that expects list of different extensions classes. At this moment here are few of them

* [SpreadsheetPosition](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/spreadsheetposition) that allows to specify for Spreadsheet documents signature position as Row and Column numbers
* [TextShadow](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/textshadow) alternative extension for Text signature property

Here are the steps to add extensions to signature into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) object with all required additional options.
* Create instance of required Extension and call [SignOptions.Extensions.Add](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/extensions) method with passed object
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) to it.

## Sign document with Text signature

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
    TextShadow shadow = new TextShadow();
    shadow.Color = Color.OrangeRed;
    shadow.Angle = 135;
    shadow.Blur = 5;
    shadow.Distance = 4;
    shadow.Transparency = 0.2;
    //add text shadow to signature extensions
    options.Extensions.Add(shadow);

    // specify Spreadsheet position over extension
     options.Extensions.Add(new SpreadsheetPosition(10, 10));
    // sign document to file
    signature.Sign("signed.pdf", options);
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
