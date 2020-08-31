---
id: locating-signature-on-page-with-different-measure-units
url: signature/net/locating-signature-on-page-with-different-measure-units
title: Locating signature on page with different measure units
weight: 1
description: " This article explains using measure units to locate signature and its size on document page with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) supports locating signature on document page with different measure units. Enumeration [MeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype) handles following types

* [MeasureType.Pixels](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype) allows to locate signature position and size with pixels (default value)
* [MeasureType.Millimeters](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype) allows to locate signature on page and setup size by setting millimeters
* [MeasureType.Percents](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype) allows to locate signature position, size with percentage of page size  
  
Here are the steps to locate and size signature area with different measure unit types:

* Set property [LocationMeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/locationmeasuretype) with of one values above to specify how to implement values in properties [Left](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/left), [Top](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/top)
* Set property [SizeMeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/sizemeasuretype) with of one values above to specify how to implement size of signature values in properties [Width](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/width), [Height](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/height)
* Set property [MarginMeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/marginmeasuretype) with of one values above to specify how to implement values in property [Margin](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/margin)

## Set signature positioning in millimeters

This example shows how to specify positioning in millimeters.

```csharp
 using (Signature signature = new Signature("sample.docx"))
 {
     // create barcode option with predefined barcode text
     BarcodeSignOptions options = new BarcodeSignOptions("12345678")
     {
         // setup Barcode encoding type
         EncodeType = BarcodeTypes.Code128,
         // set signature position in absolute position
         LocationMeasureType = MeasureType.Millimeters,
         Left = 40,
         Top = 50,
         // set signature area in millimeters
         SizeMeasureType = MeasureType.Millimeters,
         Width = 20,
         Height = 10,
         // set margin in millimeters
         MarginMeasureType = MeasureType.Millimeters,
         Margin = new Padding() { Left =5, Top = 5, Right = 5 },
     };
     // sign document to file
     signature.Sign("signedSample.docx", options);
 }
```

## Set signature positioning in percents

This example shows how to set different positioning properties in percentage.

```csharp
 using (Signature signature = new Signature("sample.pdf"))
 {
     // create barcode option with predefined barcode text
     BarcodeSignOptions options = new BarcodeSignOptions("12345678")
     {
         // setup Barcode encoding type
         EncodeType = BarcodeTypes.Code128,
         // set signature position in absolute position
         LocationMeasureType = MeasureType.Percents,
         Left = 5,
         Top = 5,
         // set signature area in millimeters
         SizeMeasureType = MeasureType.Percents,
         Width = 10,
         Height = 5,
         // set margin in millimeters
         MarginMeasureType = MeasureType.Percents,
         Margin = new Padding() { Left = 1, Top = 1, Right = 1 },
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
