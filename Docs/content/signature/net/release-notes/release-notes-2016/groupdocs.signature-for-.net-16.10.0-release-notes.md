---
id: groupdocs-signature-for-net-16-10-0-release-notes
url: signature/net/groupdocs-signature-for-net-16-10-0-release-notes
title: GroupDocs.Signature for .NET 16.10.0 Release Notes
weight: 2
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 16.10.0{{< /alert >}}

## Major Features

There are 32 improvements and fixes in this regular release. The most notable are:

*   Introduced signature area options Text Signature
*   Introduced Font options for Text Signature
*   Introduced Background options for Text Signature
*   Introduced Border setting for Text Signature
*   Introduced Image Alignment for Image Signature
*   Introduced Image signature Margins on Document Page
*   Introduced Save Format options for different Documents types
*   Improved Validation layer  
      
    

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2347 | Implement Visible flag of Pdf Digital Signature | New Feature |
| SIGNATURENET-2314 | Implement Save Format Options for Slides Documents | New Feature |
| SIGNATURENET-2312 | Implement Save Format Options for Cells Documents | New Feature |
| SIGNATURENET-2310 | Implement Save Format Options for Words Documents | New Feature |
| SIGNATURENET-2305 | Implement Save Format Options for PDF Documents | New Feature |
| SIGNATURENET-2222 | Implement Different Words Save Format Options | New Feature |
| SIGNATURENET-2199 | Implement Image Signature Margins for Slides | New Feature |
| SIGNATURENET-2197 | Implement Image Signature Margins for Cells | New Feature |
| SIGNATURENET-2195 | Implement Image Signature Margins for Words | New Feature |
| SIGNATURENET-2193 | Implement Image Signature Margins for PDF | New Feature |
| SIGNATURENET-2181 | Implement Text Signature Color Options for Slides | New Feature |
| SIGNATURENET-2179 | Implement Text Signature Color Options for Words | New Feature |
| SIGNATURENET-2177 | Implement Text Signature Color Options for Cells | New Feature |
| SIGNATURENET-2175 | Implement Text Signature Color Options for PDF | New Feature |
| SIGNATURENET-2162 | Implement Text Signature Font properties for Slides | New Feature |
| SIGNATURENET-2160 | Implement Text Signature Font properties for Cells | New Feature |
| SIGNATURENET-2158 | Implement Text Signature Font properties for Words | New Feature |
| SIGNATURENET-2156 | Implement Text Signature Font properties for PDF | New Feature |
| SIGNATURENET-2119 | Implement text size options in text signature for Slides documents | New Feature |
| SIGNATURENET-2118 | Implement text size options in text signature for Cells documents | New Feature |
| SIGNATURENET-2117 | Implement text size options in text signature for Words documents | New Feature |
| SIGNATURENET-2116 | Implement text size options in text signature for Pdf documents | New Feature |
| SIGNATURENET-2112 | Add ability to specify color options for text signature | New Feature |
| SIGNATURENET-2109 | Add ability to specify options for saving signed Document | New Feature |
| SIGNATURENET-2092 | Implement Image Signature Alignment for Slides | New Feature |
| SIGNATURENET-2091 | Implement Image Signature Alignment for Words | New Feature |
| SIGNATURENET-2090 | Implement Image Signature Alignment for Cells | New Feature |
| SIGNATURENET-2089 | Implement Image Signature Alignment for PDF | New Feature |
| SIGNATURENET-2348 | Adjust Pdf Size options to document points dimension | Bug |
| SIGNATURENET-2280 | When signing a password-protected Words file with a digital signature, an exception is thrown | Bug |
| SIGNATURENET-2274 | When signing a PPTX and a password is set in the options, Aspose.Slides.PptxUnsupportedFormatException is thrown | Bug |
| SIGNATURENET-2067 | Fix Words Provider to locate Image Signature on Page Number from Option | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 16.10.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

#### Updated public classes for Text Signature Options

  
a. Class GroupDocs.Signature.Options.PdfSignTextOptions was extended with Font, ForeColor, BorderColor and BackgroundColor properties.  
b. Class GroupDocs.Signature.Options.WordsSignTextOptions was extended with Font, ForeColor, BorderColor, BackgroundColor, BorderTransparency, BorderWeight and BorderDashStyleBackgroundTransparency properties.  
c. Class GroupDocs.Signature.Options.CellsSignTextOptions was extended with Font, ForeColor, BorderColor, BackgroundColor, BorderTransparency, BorderWeight and BorderDashStyleBackgroundTransparency properties.  
d. Class GroupDocs.Signature.Options.SlidesSignTextOptions was extended with Font, ForeColor, BorderColor, BorderWeight and BackgroundColor properties.  
  

#### Updated public classes for Image Signature Options

  
a. Classes GroupDocs.Signature.Options.PdfSignImageOptions, GroupDocs.Signature.Options.CellsSignImageOptions, GroupDocs.Signature.Options.WordsSignImageOptions, GroupDocs.Signature.Options.SlidesSignImageOptions were extended with VerticalAlignment, HorizontalAlignment and Margin properties.  
  

#### Save signed documents with different file format

When document was signed there is ability to specify different format of output file. Each Document Type (like Pdf, Cells, Words, Slides) has own enumeration of supported output file formats. For Pdf documents there is enumeration PdfSaveFileFormat, for Words documents - WordsSaveFileFormat. Also base class SaveOptions was used for derived classes PdfSaveOptions, WordsSaveOptions, CellsSaveOptions, SlidesSaveOptions.



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
// setup Signature configuration
var signConfig = new SignatureConfig
{
   StoragePath = storagePath,
   OutputPath = outputPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// setup options with text of signature
var signOptions = new CellsSignTextOptions("John Smith");
// specify load options
LoadOptions loadOptions = new LoadOptions();
loadOptions.Password = "1234567890";
// specify save options
CellsSaveOptions saveOptions = new CellsSaveOptions(OutputType.String);
saveOptions.FileFormat = Signature.Domain.CellsSaveFileFormat.ODS;
// sign document
var signedPath = handler.Sign<string>("test.xls", signOptions, loadOptions, saveOptions);
Console.WriteLine("Signed file path is: " + signedPath);

```

#### Setup Font and Text Color options

Signature options for most document types contain Font and ForeColor properties. Here is example for Pdf Document



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
// setup Signature configuration
var signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    OutputPath = outputPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// setup image signature options with relative path - image file stores in config.ImagesPath folder
var signOptions = new PdfSignTextOptions("John Smith");
// setup colors settings
signOptions.BackgroundColor = System.Drawing.Color.Beige;
// setup text color
signOptions.ForeColor = System.Drawing.Color.Red;
// setup Font options
signOptions.Font.Bold = true;
signOptions.Font.Italic = true;
signOptions.Font.Underline = true;
signOptions.Font.FontFamily = "Arial";
signOptions.Font.FontSize = 15;
// sign document
var signedPath = handler.Sign<string>("test.pdf", signOptions, new SaveOptions { OutputType = OutputType.String });
Console.WriteLine("Signed file path is: " + signedPath);

```

#### Setup Background and Border settings

WordsSignTextOptions class contains extended properties to specify Background and Border options for Text Signature appearance.



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
// setup Signature configuration
var signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    OutputPath = outputPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// setup image signature options with relative path - image file stores in config.ImagesPath folder
var signOptions = new WordsSignTextOptions("John Smith");
// setup background settings
signOptions.BackgroundColor = System.Drawing.Color.Beige;
signOptions.BackgroundTransparency = 0.5;
// setup border settings
signOptions.BorderColor = System.Drawing.Color.Black;
signOptions.BorderDashStyle = Signature.Domain.ExtendedDashStyle.DashDot;
signOptions.BorderWeight = 1.2;
signOptions.BorderTransparency = 0.5;
// sign document
var signedPath = handler.Sign<string>("test.docx", signOptions, new SaveOptions { OutputType = OutputType.String });
Console.WriteLine("Signed file path is: " + signedPath);

```

#### Setup Image Signature Rectangle and Margins



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
// setup Signature configuration
var signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    OutputPath = outputPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// setup image signature options with relative path - image file stores in config.ImagesPath folder
var signOptions = new WordsSignTextOptions("John Smith");
// setup Signature area Size
signOptions.Left = 100;
signOptions.Top = 100;
signOptions.Width = 200;
signOptions.Height = 200;
// setup Signature area Margins
signOptions.Margin = new Padding(10);
// specify separate left margin value
signOptions.Margin.Left = 20;
// sign document
var signedPath = handler.Sign<string>("test.docx", signOptions, new SaveOptions { OutputType = OutputType.String });
Console.WriteLine("Signed file path is: " + signedPath);

```

#### Setup Signature area alignment



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
var imagePath = @"c:\Aspose\Test\Images";
// setup Signature configuration
var signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    ImagesPath = imagePath,
    OutputPath = outputPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// setup image signature options
var signOptions = new PdfSignImageOptions("signature.jpg");
// specify horizontal alignment to the right
signOptions.HorizontalAlignment = HorizontalAlignment.Right;
// specify vertical alignment
signOptions.VerticalAlignment = VerticalAlignment.Bottom;
// sign document
var signedPath = handler.Sign<string>("test.pdf", signOptions, new SaveOptions { OutputType = OutputType.String });
Console.WriteLine("Signed file path is: " + signedPath);

```
