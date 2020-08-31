---
id: update-barcode-signatures-in-document
url: signature/net/update-barcode-signatures-in-document
title: Update Barcode signatures in document
weight: 1
description: "This article explains how to update Barcode electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) class to manipulate barcode signatures location, size and textual content.
Please be aware that [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method modifies the same document that was passed to constructor of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class.

Here are the steps to update Barcode signature in the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter;
* Instantiate [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) object with desired properties;
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method to obtain list of [BarcodeSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature);
* Select from list [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) object(s) that should be updated;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method and pass one or several signatures to it.

This example shows how to update Barcode signature that was found using  [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("sampleSigned.pdf"))
{
    BarcodeSearchOptions options = new BarcodeSearchOptions();
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    if (signatures.Count > 0)
    {
        BarcodeSignature barcodeSignature = signatures[0];
        // change position
        barcodeSignature.Left = 100;
        barcodeSignature.Top = 100;
        bool result = signature.Update(barcodeSignature);
        if (result)
        {
            Console.WriteLine($"Signature with Barcode '{barcodeSignature.Text}' was updated!");
        }
        else
        {
            Console.WriteLine($"Signature was not updated in the document!");
        }
    }
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
