---
id: sign-document-with-different-text-signature-implementation
url: signature/net/sign-document-with-different-text-signature-implementation
title: Sign document with different Text signature implementation
weight: 4
description: " This article explains how to sign document with Text electronic signatures using extended options with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [TextSignOptions](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions) class with property [SignatureImplementation](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) of enumeration type [TextSignatureImplementation](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) to specify various implementations of Text Signatures with following values and its meaning

* [TextSignatureImplementation.Stamp](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) - text stamp component (label) on the document page.
* [TextSignatureImplementation.Annotation](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) - text annotation with different appearances settings. This implementation depends of document type.
* [TextSignatureImplementation.Image](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) - text will be transformed to image and put to document page. This implementation makes sense when there's a need to adjust extended appearances effects that is possible with image adjustment only (like opacity, free rotation, fading, shadows etc).
* [TextSignatureImplementation.Sticker](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) - text sticker icon with different appearances settings. This implementation depends of document type.
* [TextSignatureImplementation.FormField](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation)  - this type is used to update existing Form Fields in the document. For this purpose please user property [FormTextFieldTitle](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions/properties/formtextfieldtitle) to setup Form Field name and property [FormTextFieldType](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions/properties/formtextfieldtype) to specify type of Form Field.
* [TextSignatureImplementation.Watermark](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation) - text watermark along the document page under all document components. This implementation depends of document type.

Here are the steps to add Text signature into document with various text signature implementation types with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) object with all required additional options.
* set property [SignatureImplementation](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) of [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) object with required value from enumeration type [TextSignatureImplementation](https://apireference-qa.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation).
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass initialized [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) instance to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

## Sign document with Text signature and Stamp implementation type

This example shows how to add Text signature with Stamp signature implementation to document.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Stamp,
        // set alignment
        VerticalAlignment = VerticalAlignment.Top,
        HorizontalAlignment = HorizontalAlignment.Right,
        // set margin with 20 pixels for all sides
        Margin = new Padding(20)
    };
    // sign document to file
    SignResult signResult = signature.Sign("signed.pdf", options);
    // analyzing result
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId},
            Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

## Sign document with Text signature and Annotation implementation type

This example shows how to add Text signature with Annotation signature implementation to document.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Annotation,
        // for Pdf document type ther's ability to setup exteneded appearences
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
        // set alignment
        VerticalAlignment = VerticalAlignment.Top,
        HorizontalAlignment = HorizontalAlignment.Right,
        // set margin with 20 pixels for all sides
        Margin = new Padding(20)
    };
    // sign document to file
    SignResult signResult = signature.Sign("signed.pdf", options);
    // analyzing result
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId},
            Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

## Sign document with Text signature and Image implementation type

This example shows how to add Text signature with Image signature implementation to document.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Image,
        // set alignment
        VerticalAlignment = VerticalAlignment.Top,
        HorizontalAlignment = HorizontalAlignment.Right,
        // set margin with 20 pixels for all sides
        Margin = new Padding(20)
    };
    // sign document to file
    SignResult signResult = signature.Sign("signed.pdf", options);
    // analyzing result
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId},
            Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

## Sign document with Text signature and Sticker implementation type

This example shows how to add Text signature with Sticker signature implementation to document.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.Sticker,

        // set alignment
        VerticalAlignment = VerticalAlignment.Top,
        HorizontalAlignment = HorizontalAlignment.Right,
        // set margin with 20 pixels for all sides
        Margin = new Padding(20)
    };
    // sign document to file
    SignResult signResult = signature.Sign("signed.pdf", options);
    // analyzing result
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId},
            Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

## Sign document with Text signature and Form Field implementation type

This example shows how to add Text signature with FormField signature implementation to document.

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    TextSignOptions ffOptions1 = new TextSignOptions("John Smith")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.FormField,
        FormTextFieldType = FormTextFieldType.PlainText,
        FormTextFieldTitle = "UserSignatureFullName"
    };
    TextSignOptions ffOptions2 = new TextSignOptions("Document is approved")
    {
        // set alternative signature implementation on document page
        SignatureImplementation = TextSignatureImplementation.FormField,
        FormTextFieldType = FormTextFieldType.RichText,
        FormTextFieldTitle = "UserSignatureComment"
    };
    List<SignOptions> listOptions = new List<SignOptions>();
    listOptions.Add(ffOptions1);
    listOptions.Add(ffOptions2);
    // sign document to file
    SignResult signResult = signature.Sign("signed.docx", listOptions);
    // analyzing result
    Console.WriteLine("List of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId},
            Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
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
