---
id: locating-signature-with-different-alignments
url: signature/net/locating-signature-with-different-alignments
title: Locating signature with different alignments
weight: 2
description: " This article explains how to use different alignment values to locate signature on document page with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides ability to align signature on page with horizontal and vertical alignment settings. Signature options that implement interface [IAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/ialignment) contain following properties:

* [HorizontalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/horizontalalignment) - property of enumeration type [HorizontalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/horizontalalignment) to specify horizontal alignment of signature. Values are [None, Left, Center, Right](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/horizontalalignment)
* [VerticalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/verticalalignment) - property of enumeration type [VerticalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/verticalalignment)to specify vertical alignment of signature. Values are [None, Top, Center, Bottom](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/verticalalignment)
* [Margin](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/margin)\- property of class [Padding](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/padding) to specify offset for signature alignment. Fields of class are [Left, Top, Right, Bottom](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/padding) to specify offset in measure units from alignment area.
* [MarginMeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/marginmeasuretype) - property of enumeration type [MeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype) with values ([Pixels, Millimeters, Percents](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/measuretype)). See more details in this example [Locating signature on page with different measure units]({{< ref "signature/net/developer-guide/advanced-usage/signing/locating-signature-on-document-page/locating-signature-on-page-with-different-measure-units.md" >}})

Here are the steps to align signature on page with GroupDocs.Signature:

* Create a new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Instantiate signature options ([ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions) for example) with all required properties.
* Set  [HorizontalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/horizontalalignment) with one of enumeration value to align signature along page width
* Set  [VerticalAlignment](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/verticalalignment) with one of enumeration value to align signature along page height
* Set  [Margin](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/margin) property with required offsetfrom page border
* Set  [MarginMeasureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/marginmeasuretype) property with non default value if there is need to specify offset from page border in another measure units like millimeters and page percents (from 100% width and 100% height)
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass the instance of signature options ([ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions) for example) to it.

This example shows how to locate signature with different alignments.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // define qr-code size
    int qrWidth = 100;
    int qrHeight = 100;
    // define list of options
    List<SignOptions> listOptions = new List<SignOptions>();
    // walk through all alignment values to locate signature at all page alignment areas
    foreach (HorizontalAlignment horizontalAlignment in Enum.GetValues(typeof(HorizontalAlignment)))
    {
        foreach (VerticalAlignment verticalAlignment in Enum.GetValues(typeof(VerticalAlignment)))
        {
            if (verticalAlignment != VerticalAlignment.None && horizontalAlignment != HorizontalAlignment.None)
            {
                listOptions.Add(
                    new QrCodeSignOptions("Left-Top")
                    {
                    // set signature rectangle
                    Width = qrWidth,
                        Height = qrHeight,
                    // set signature alignment
                    HorizontalAlignment = horizontalAlignment,
                        VerticalAlignment = verticalAlignment,
                        Margin = new Padding(5),
                    });
            }
        }
    }
    // sign document to file
    signature.Sign("signed.pdf", listOptions);
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
