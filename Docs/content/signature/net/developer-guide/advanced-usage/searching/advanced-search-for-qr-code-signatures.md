---
id: advanced-search-for-qr-code-signatures
url: signature/net/advanced-search-for-qr-code-signatures
title: Advanced search for QR-code signatures
weight: 3
description: " This article explains how to provide advanced search for QR-code electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) class to specify different options to search for QR-code signatures.

Here are the steps to search for barcode signatures within the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) object according to your requirements and specify search options
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) to it.

This example shows how to make advanced search for QR-code signature in the document with enabled options of grabbing QR-code image content.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    QrCodeSearchOptions options = new QrCodeSearchOptions()
    {
        // specify special pages to search on
        AllPages = false,
        PageNumber = 1,
        PagesSetup = new PagesSetup() { FirstPage = true, LastPage = true, OddPages = false, EvenPages = false },
        // specify special QRCode type to search
        EncodeType = QrCodeTypes.Aztec,
        // specify text match type
        MatchType = TextMatchType.Contains,
        // specify text pattern to search
        Text = "John",
        // set field for QRCode images returning
        ReturnContent = true,
        // specify type of returned QRCode images
        ReturnContentType = FileType.PNG
    };
    // search for signatures in document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options); //For evaluation version is 0
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (QrCodeSignature qrCodeSignature in signatures)
    {
        Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", qrCodeSignature.PageNumber, qrCodeSignature.EncodeType, qrCodeSignature.Text);
        Console.WriteLine("QRCode signature size {0} and format {1}", qrCodeSignature.Content?.Length, qrCodeSignature.Format);
        Console.WriteLine($"Location at {qrCodeSignature.Left}-{qrCodeSignature.Top}. Size is {qrCodeSignature.Width}x{qrCodeSignature.Height}.");
    }
    //Save QRCode images
    string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SearchForQRCodeAdvanced");
    if (!Directory.Exists(outputPath))
    {
        Directory.CreateDirectory(outputPath);
    }
    int i = 0;
    foreach (QrCodeSignature qrCodeSignature in signatures)
    {
        string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{qrCodeSignature.Format.Extension}");
        using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
        {
            fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
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
