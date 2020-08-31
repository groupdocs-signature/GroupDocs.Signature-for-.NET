---
id: updating-barcode-signatures-with-advanced-options
url: signature/net/updating-barcode-signatures-with-advanced-options
title: Updating Barcode signatures with advanced options
weight: 1
description: " This article explains how to provide advanced options when updating Barcode electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) class to manipulate barcode signatures location, size, textual content and encode type over [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class. This method returns [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) object to analyze if signatures were successfully processed.

Please be aware that [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method modifies the same document that was passed to constructor of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class. The [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) contains list of successfully updated signatures and ones that failed. The Barcode signature could be failed to update due to several reasons:

* if signature object was initialized with constructor by incorrect signature identifier;
* if signature object was not found;
* there was an error occurred while updating signature in the document.

Here are the steps to update Barcode signature in the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter;
* Instantiate [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) object with desired properties;
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method to obtain list of [BarcodeSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature);
* Select from list [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) object(s) that should be updated;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method and pass one or several signatures to it.
* Analyze [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) result to check whether signatures were updated or not.

Here are the alternative steps to update Barcode signature in the document with GroupDocs.Signature. This approach is based on saved signatures Id after [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) or [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) methods.

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter;
* Instantiate one or several [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) objects with signature Id(s) passed to constructor;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class object [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method and pass one or several signatures to it;
* Analyze [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) result to check whether signatures were updated or not.

The following table describes changeable properties for Barcode signatures dependent on document type.

| Document Type / Signature Property | Left | Top | Width | Height | EncodeType | Text | IsSignature |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Image | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) |
| Spreadsheet | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(tick)](signature/net/images/check.png) |
| Pdf | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(tick)](signature/net/images/check.png) |
| Presentation | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(tick)](signature/net/images/check.png) |
| Word Processing | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(tick)](signature/net/images/check.png) | ![(error)](signature/net/images/error.png) | ![(error)](signature/net/images/error.png) | ![(tick)](signature/net/images/check.png) |

## Update Barcode signature in the document after Search

This example shows how to update Barcode signature that was found using [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signed.pdf"))
{
    BarcodeSearchOptions options = new BarcodeSearchOptions();
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    // adjust signature properties
    foreach (BarcodeSignature temp in signatures)
    {
        // apply some condition to adjust signature properties
        if (temp.Text == "Test1")
        {
            temp.Left = temp.Left + 10;
            temp.Top = temp.Top + 10;
        }
        temp.IsSignature = true;
    }
    // update all found signatures
    UpdateResult updateResult = signature.Update(signatures.ConvertAll(p => (BaseSignature)p));
    if (updateResult.Succeeded.Count == signatures.Count)
    {
        Console.WriteLine("\nAll signatures were successfully updated!");
    }
    else
    {
        Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
        Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
    }
    Console.WriteLine("List of updated signatures:");
    foreach (BaseSignature temp in updateResult.Succeeded)
    {
        Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

## Update Barcode signature in document by known signature Identifier  

This example shows how to update Barcode signature in the document by known signature Id (that was obtained by [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) or [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method previously).

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signed.xlsx"))
{
    // read from some data source signature Id value
    string[] signatureIdList = new string[]
    {
        "1dd21cf3-b904-4da9-9413-1ff1dab51974",
        "9e386726-a773-4971-b2fc-eaadfce65ffd"
    };
    // create list of Barcode Signature by known SignatureId
    List<BaseSignature> signatures = new List<BaseSignature>();
    signatureIdList.ToList().ForEach(p => signatures.Add(new BarcodeSignature(p)));
    // update all found signatures
    UpdateResult updateResult = signature.Update(signatures);
    if (updateResult.Succeeded.Count == signatures.Count)
    {
        Console.WriteLine("All signatures were successfully updated!");
    }
    else
    {
        Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
        Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
    }
    Console.WriteLine("List of updated signatures:");
    foreach (BaseSignature temp in updateResult.Succeeded)
    {
        Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
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
