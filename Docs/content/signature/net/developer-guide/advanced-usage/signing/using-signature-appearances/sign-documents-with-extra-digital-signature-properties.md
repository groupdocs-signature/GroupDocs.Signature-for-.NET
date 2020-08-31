---
id: sign-documents-with-extra-digital-signature-properties
url: signature/net/sign-documents-with-extra-digital-signature-properties
title: Sign documents with extra Digital Signature properties
weight: 2
description: " This article explains how to use extended Digital electronic signatures options and adjustment on document page."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) contains [DigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/digitalsignatureappearance) class that implements extra settings for digital signature of Word Processing and Spreadsheets documents

Base signature options [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) property [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) should be set with instance of [DigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/digitalsignatureappearance) class to provide additional digital signature look

Here are the steps to setup extra image appearance with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Compose object of[DigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/digitalsignatureappearance) object with all required additional options.
* Set  [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) property with [DigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/digitalsignatureappearance) object and set its properties
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.  

This example shows how to setup extra digital signature look. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.docs"))
{
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // certifiate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Sign",
        Contact = "JohnSmith",
        Location = "Office1",

        // image as digital certificate appearance on document pages
        ImageFilePath = imagePath,
        //
        AllPages = true,
        Width = 80,
        Height = 60,
        VerticalAlignment = VerticalAlignment.Bottom,
        HorizontalAlignment = HorizontalAlignment.Right,
        Margin = new Padding() { Bottom = 10, Right = 10 },
        // Setup signature line appearance.
        // This appearance will add Signature Line on the first page.
        // Could be useful for .xlsx files.
        Appearance = new DigitalSignatureAppearance("John Smith", "Title", "jonny@test.com")

    };
    signature.Sign("signed.docx", options);
}


```

## Sign Pdf document with Text signature Sticker appearance

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
