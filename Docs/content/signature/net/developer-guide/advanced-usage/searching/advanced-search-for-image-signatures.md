---
id: advanced-search-for-image-signatures
url: signature/net/advanced-search-for-image-signatures
title: Advanced search for Image signatures
weight: 5
description: " This article explains how to make advanced search for Image electronic signatures with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [ImageSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions) class to specify different options to search for Image Signatures

* bool ReturnContent property allows to return in the image signature its content;
* long MinContentSize property with non zero value limits the minimum size of image to return;
* long MaxContentSize property with non zero value limits the maximum size of image to return;
* [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) ReturnContentType property allows to specify exact image content type

Here are the steps to search for image signatures within the document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [ImageSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions)  object according to your requirements and specify search options
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [ImageSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions) to it.
* Analyze if needed list of returned list of [ImageSignatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagesignature)

This example shows how to make advanced search for Image signature in the document and further image signatures analyzes with saving image content

```csharp
using (Signature signature = new Signature("sampleSignaed.docx"))
{
    // setup search options
    ImageSearchOptions searchOptions = new ImageSearchOptions()
    {
        // enable grabbing image content feature
        ReturnContent = true,
        // set minimum size if needed
        MinContentSize = 0,
        // set maximum size if needed
        MaxContentSize = 0,
        // specify exact image type to be returned
        ReturnContentType = FileType.JPEG,
    };
    // search document
    List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
    Console.WriteLine($"\nSource document ['{fileName}'] contains following image signature(s).");
    // output signatures
    foreach (ImageSignature imageSignature in signatures)
    {
        Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
        Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
    }
    //Save signature images
    string outputPath = System.IO.Path.Combine(Constants.OutputPath, "SearchForImageAdvanced");
    if (!Directory.Exists(outputPath))
    {
        Directory.CreateDirectory(outputPath);
    }
    int i = 0;
    foreach (ImageSignature imageSignature in signatures)
    {
        Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
        Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
        string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{imageSignature.Format.Extension}");
        using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
        {
            fs.Write(imageSignature.Content, 0, imageSignature.Content.Length);
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
