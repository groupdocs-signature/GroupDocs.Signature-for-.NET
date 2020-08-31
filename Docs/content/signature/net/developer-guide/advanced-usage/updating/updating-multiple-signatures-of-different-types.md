---
id: updating-multiple-signatures-of-different-types
url: signature/net/updating-multiple-signatures-of-different-types
title: Updating multiple signatures of different types
weight: 3
description: " This article explains how to provide advanced options when updating different multiple electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides different classes of signatures to manipulate them by changing its properties over [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class. This method returns [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) object to analyze if signatures were successfully processed.

Please be aware that [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method modifies the same document that was passed to constructor of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class. The [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) contains list of successfully updated signatures and ones that failed. The signature could be failed to update due to several reasons:

* if signature object was initialized with constructor by incorrect signature identifier;
* if signature object was not found;
* there was an error occurred while updating signature in the document;
* the signature type is not supported for modification (Digital, Form Field or Metadata signature).

Here are the steps to update multiple signature in the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter;
* Instantiate one or several Search options with desired properties;
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method and pass created list of Search Options to obtain list of [BaseSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/basesignature);
* Select from list [BaseSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/basesignature) object(s) that should be updated;
* Call [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/) method and pass one or several signatures to it.
* Analyze [UpdateResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/updateresult) result to check whether signatures were updated or not.

## Update multiple signatures of different types in the document

This example shows how to update signature that was found using [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signed.pptx"))
{
    // define few search options
    BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions();
    QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions();
    // add options to list
    List<SearchOptions> listOptions = new List<SearchOptions>();
    listOptions.Add(barcodeOptions);
    listOptions.Add(qrCodeOptions);
    // search for signatures in document
    SearchResult result = signature.Search(listOptions);
    if (result.Signatures.Count > 0)
    {
        Console.WriteLine("\nTrying to update all signatures...");
        // mark all signatures as actual Signatures
        foreach (BaseSignature baseSignature in result.Signatures)
        {
            baseSignature.IsSignature = true;
        }
        // update all found signatures
        UpdateResult updateResult = signature.Update(result.Signatures);
        if (updateResult.Succeeded.Count == result.Signatures.Count)
        {
            Console.WriteLine("\nAll signatures were successfully updated!");
        }
        else
        {
            Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
            Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
        }
        Console.WriteLine("\nList of updated signatures:");
        int number = 1;
        foreach (BaseSignature temp in updateResult.Succeeded)
        {
            Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
        }
    }
    else
    {
        Console.WriteLine("No one signature was found.");
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
