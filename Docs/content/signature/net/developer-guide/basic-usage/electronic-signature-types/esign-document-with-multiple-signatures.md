---
id: esign-document-with-multiple-signatures
url: signature/net/esign-document-with-multiple-signatures
title: eSign document with multiple signatures
weight: 9
description: "This article explains how to sign document with multiple signatures of various type by GroupDocs.Signature API"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) allows to sign document with several signatures simultaneously and even apply signatures of different types to the same document.
Doing this is as simple as:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Instantiate required all required sign options objects dependent on signature type:
* [BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions) - for Barcode signatures;
* [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) - for Digital signatures;
* [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions) - for Form-field signatures;
* [ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions) - for Image signatures;
* [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) - for Metadata signatures;
* [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) - for QR-code signatures
* [StampSIgnOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/stampsignoptions) - for Stamp signatures;
* [TextSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions) - for Text signatures.
* Fill collection with sign options from previous step.  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass collection of sign options to it.

This code snippet below demonstrates how to eSign PDF document with multiple signatures at the same time.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // define several signature options of different types and settings
    TextSignOptions textOptions = new TextSignOptions("This is test message")
    {
        VerticalAlignment = VerticalAlignment.Top,
        HorizontalAlignment = HorizontalAlignment.Left
    };

    BarcodeSignOptions barcodeOptions = new BarcodeSignOptions("123456")
    {
        EncodeType = BarcodeTypes.Code128,
        Left = 100,
        Top = 100
    };
    QrCodeSignOptions qrcodeOptions = new QrCodeSignOptions("JohnSmith")
    {
        EncodeType = QrCodeTypes.QR,
        Left = 100,
        Top = 200
    };
    DigitalSignOptions digitalOptions = new DigitalSignOptions("certificate.pfx")
    {
        ImageFilePath = Constants.ImageHandwrite,
        VerticalAlignment = VerticalAlignment.Center,
        HorizontalAlignment = HorizontalAlignment.Center,
        Password = "1234567890"
    };
    // define list of signature options
    List<SignOptions> listOptions = new List<SignOptions>();
    listOptions.Add(textOptions);
    listOptions.Add(barcodeOptions);
    listOptions.Add(qrcodeOptions);
    listOptions.Add(digitalOptions);

    // sign document to file
    signature.Sign("signed.pdf", listOptions);
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