---
id: update-qr-code-signatures-in-document
url: signature/net/update-qr-code-signatures-in-document
title: Update QR-code signatures in document
weight: 3
description: "This article explains how to update QR-code electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature) class to manipulate QR-code signatures location, size, encode type and textual content.
Please be aware that [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method modifies the same document that was passed to constructor of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class.

Here are the steps to update QR-code signature in the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter;
* Instantiate [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) object with desired properties;
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method to obtain list of [QrCodeSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature);
* Select from list [QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature) object(s) that should be updated;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method and pass one or several signatures to it.

This example shows how to update QR-code signature that was found using  [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signed.pdf"))
{
    QrCodeSearchOptions options = new QrCodeSearchOptions();
    // search for QRCode signatures in document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options);
    if (signatures.Count > 0)
    {
        QrCodeSignature qrCodeSignature = signatures[0];
        // change position
        qrCodeSignature.Left = 100;
        qrCodeSignature.Top = 100;
        bool result = signature.Update(qrCodeSignature);
        if (result)
        {
            Console.WriteLine($"Signature with QR-Code '{qrCodeSignature.Text}' was updated in the document.");
        }
        else
        {
            Console.WriteLine($"Signature was not deleted from the document!");
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
