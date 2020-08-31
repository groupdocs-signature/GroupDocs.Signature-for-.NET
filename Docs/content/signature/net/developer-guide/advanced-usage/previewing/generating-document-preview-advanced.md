---
id: generating-document-preview-advanced
url: signature/net/generating-document-preview-advanced
title: Generating document preview - advanced
weight: 1
description: "This article shows how to generate document pages with advanced options."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [PreviewOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions) class to specify different options to manage document pages preview generation process. Since 19.12 version there's ability to hide signatures from documents. Using property [HideSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions/properties/hidesignatures) of [PreviewOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions) will allow to hide signatures from document preview.  
  
Here are the steps to generate document preview with GroupDocs.Signature with hidden signatures:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [PreviewOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions) object with:
* delegate for each page stream creation (see event handler [CreatePageStream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/createpagestream));  
* property [HideSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions/properties/hidesignatures) set to true;
* image preview format - PNG / JPG / BMP;
* page numbers to process;
* custom size of preview images (if needed).  
{{< alert style="info" >}}
Stream that were created by [CreatePageStream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/createpagestream) delegate will be disposed automatically once after generation of preview image. If you need to implement custom image preview stream disposing you have to pass additional argument [ReleasePageStream](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/releasepagestream) to clean up resources.  
{{< /alert >}}  
* Call [GeneratePreview](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/generatepreview) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [PreviewOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/previewoptions) to it.

## Generate document preview without signatures on it

```csharp
public static void GetPreview()
{
    // The path to the documents directory.
    string filePath = Constants.SAMPLE_WORD_SIGNED;
    using (Signature signature = new Signature(filePath))
    {
        // create preview options object
        PreviewOptions previewOption = new PreviewOptions(CreatePageStream, ReleasePageStream)
        {
            PreviewFormat = PreviewOptions.PreviewFormats.JPEG,
            // set property to hide all known signatures
            HideSignatures = true
        };
        // generate preview
        signature.GeneratePreview(previewOption);
    }
}

private static Stream CreatePageStream(int pageNumber)
{
    string imageFilePath = Path.Combine("GeneratePreviewFolder", "image-" + pageNumber.ToString() + ".jpg");
    var folder = Path.GetDirectoryName(imageFilePath);
    if(!Directory.Exists(folder))
    {
        Directory.CreateDirectory(folder);
    }
    return new System.IO.FileStream(imageFilePath, FileMode.Create);
}

private static void ReleasePageStream(int pageNumber, Stream pageStream)
{
     pageStream.Dispose();
     string imageFilePath = Path.Combine("GeneratePreviewFolder", "image-" + pageNumber.ToString() + ".jpg");
     Console.WriteLine("Image file {0} is ready for preview", imageFilePath);
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