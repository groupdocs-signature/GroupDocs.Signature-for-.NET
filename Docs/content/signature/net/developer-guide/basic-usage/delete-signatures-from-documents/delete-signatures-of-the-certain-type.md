---
id: delete-signatures-of-the-certain-type
url: signature/net/delete-signatures-of-the-certain-type
title: Delete Signatures of the certain type
weight: 6
description: "This article explains how to delete electronic signatures of the certain type with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides overloaded [Delete](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/delete) method that accepts one [SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype) or list of them.
Please be aware that this method modifies the same document that was passed to constructor of the [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class.

Here are the steps to delete signature by specific type from the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or its stream as a constructor parameter;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object [Delete](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/delete) method and pass certain [SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype) enumeration to it.

This example shows how to delete QR-Code signatures from the document.

```csharp
using (Signature signature = new Signature("signed.pdf"))
{
    // deleting QR-Code signatures from the document
    DeleteResult result = signature.Delete(SignatureType.QrCode);
    if (result.Succeeded.Count > 0)
    {
        Console.WriteLine("Following QR-Code signatures were deleted:");                    
        int number = 1;
        foreach (QrCodeSignature temp in result.Succeeded)
        {
            Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Text: {temp.Text}");
        }
    }
    else
    {
        Helper.WriteError("No one QR-Code signature was deleted.");
    }
}
```

### Advanced Usage Topics

To learn more about document eSign features, please refer to the [Advanced usage section]({{< ref "signature/net/developer-guide/advanced-usage/_index.md" >}}).

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
