---
id: advanced-search-for-barcode-signatures
url: signature/net/advanced-search-for-barcode-signatures
title: Advanced search for Barcode signatures
weight: 1
description: " This article explains how to make advanced search for Barcode electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) class to specify different options to search for Barcode Signatures.

Here are the steps to search for barcode signatures within the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) object according to your requirements and specify search options
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) to it.

This example shows how to make advanced search for Barcode signature in the document with enabled options to grab barcode electronic signature context.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    BarcodeSearchOptions options = new BarcodeSearchOptions()
    {
        // specify special pages to search on
        AllPages = false,
        // single page number
        PageNumber = 1,
        // setup extended search in pages setup
        PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },
        // specify special barcode type to search
        EncodeType = BarcodeTypes.Code39Standard,
        // specify text match type
        MatchType = TextMatchType.Contains,
        // specify text pattern to search
        Text = "12345678",
        // set field for barcode images returning
        ReturnContent = true,
        // specify type of returned barcode images
        ReturnContentType = FileType.PNG
    };
    // search for signatures in document
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (var barcodeSignature in signatures)
    {
        Console.WriteLine("Barcode signature found at page {0} with type {1} and text {2}", barcodeSignature.PageNumber, barcodeSignature.EncodeType, barcodeSignature.Text);
        Console.WriteLine("Barcode signature size {0} and format {1}", barcodeSignature.Content?.Length, barcodeSignature.Format);
        Console.WriteLine($"Location at {barcodeSignature.Left}-{barcodeSignature.Top}. Size is {barcodeSignature.Width}x{barcodeSignature.Height}.");
    }
    //Save Barcode images
    string outputPath = Path.Combine(Constants.OutputPath, "SearchForBarcodeAdvanced");
    if (!Directory.Exists(outputPath))
    {
        Directory.CreateDirectory(outputPath);
    }
    int i = 0;
    foreach (BarcodeSignature barcodeSignature in signatures)
    {
        if (barcodeSignature.Content != null)
        {
            string outputFilePath = Path.Combine(outputPath, $"image{i}{barcodeSignature.Format?.Extension}");
            using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
            {
                fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
            }
        }
        i++;
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
