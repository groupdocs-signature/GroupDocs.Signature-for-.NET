---
id: esign-document-with-barcode-signature
url: signature/net/esign-document-with-barcode-signature
title: eSign document with Barcode signature
weight: 1
description: "This article explains how to add Barcode signature on document page with various options like barcode type, barcode text, positioning, alignment and other visual settings with GroupDocs.Signature"
keywords: barcode, barcode signature, GroupDocs.Signature barcode, GroupDocs.Signature barcode signature
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a Barcode?

A **barcode** or **bar code** is a way of presenting data in a visual, machine-readable form. Generally speaking, barcode is an image of rectangular form that consists of parallel black lines and white spaces of different widths.  
Barcodes are used in various areas where quick identification is necessary - as part of the purchase process in retail stores, in warehouses to track inventory, and on invoices to assist in accounting, among many other uses.

![Barcode](signature/net/images/esign-document-with-barcode-signature.gif)

Barcodes allow to store product related data like manufacturing and expiry dates, manufacturer name, country of the origin and product price. There are plenty of barcode types nowadays because different companies use different amount of number and bar combinations in their barcodes dependent on their needs. From document signature perspective Barcode may contain different characters (letters, digits or symbols) and have a various length and its size depending on the type and settings to keep signature information, title, subject or short encrypted data.  

## How to eSign document with Barcode signature

[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) supports wide range or Barcode types that can be used to create electronic signature within the documents. Please refer to [BarcodeTypes](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodetypes/fields/index) description to get the full list of supported barcodes.  
To specify different options for Barcode signature GroupDocs.Signature for .NET provides [BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions) class. The main fields are:

* [EncodeType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/encodetype) - specifies Barcode type (AustralianPost, Codabar, EAN13, OPC, etc.);
* [Text](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/text) - specifies Barcode text.
Here are the steps to eSign document with Barcode signature using GroupDocs.Signature for .NET API:
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions) object according to your requirements and specify Barcode type by setting [EncodeType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/encodetype) from predefined supported types. Set [Text](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/text) property value.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions) to it.

This example shows how to sign PDF document with Barcode signature.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    BarcodeSignOptions options = new BarcodeSignOptions("JohnSmith")
    {
        // setup Barcode encoding type
        EncodeType = BarcodeTypes.Code128,
        // set signature position
        Left = 100,
        Top = 100
    };
    signature.Sign("SampleSigned.pdf", options);
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
