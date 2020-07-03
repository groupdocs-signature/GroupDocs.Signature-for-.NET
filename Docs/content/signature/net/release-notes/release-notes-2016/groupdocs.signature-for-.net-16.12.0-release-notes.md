---
id: groupdocs-signature-for-net-16-12-0-release-notes
url: signature/net/groupdocs-signature-for-net-16-12-0-release-notes
title: GroupDocs.Signature for .NET 16.12.0 Release Notes
weight: 1
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 16.12.0{{< /alert >}}

## Major Features

There are over 20 improvements and fixes in this regular release. The most notable are:

*   Introduced multiple signature for all signature types Text Signature, Image Signature and Digital Signature
*   Introduced text alignment options Text Signature
*   Introduced margins options Text Signature
*   Introduced ability to sign all pages of Pdf document with Digital Signatures
*   Introduced Pdf Digital Signature alignment on pages
*   Introduced Margins for Pdf Digital Signature with Alignment options
*   Improved validation layer  
      
    

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2026 | Add ability to sign files with digital signature by given pattern in folder | New Feature |
| SIGNATURENET-2027 | Add ability to sign files with image signature by given pattern in folder | New Feature |
| SIGNATURENET-2113 | Implement Text Signature alignment for PDF Documents | New Feature |
| SIGNATURENET-2129 | Implement Text Signature alignment for Words Documents | New Feature |
| SIGNATURENET-2131 | Implement Text Signature alignment for Cells Documents | New Feature |
| SIGNATURENET-2133 | Implement Text Signature alignment for Slides Documents | New Feature |
| SIGNATURENET-2307 | Add ability to sign files with text signature by given pattern in folder | New Feature |
| SIGNATURENET-2349 | Implement Digital Signature for all pages for Pdf documents | New Feature |
| SIGNATURENET-2368 | Implement Text Signature Margins for PDF Documents | New Feature |
| SIGNATURENET-2370 | Implement Text Signature Margins for Cells Documents | New Feature |
| SIGNATURENET-2372 | Implement ability to sign Slides Documents with given list of Signature Options | New Feature |
| SIGNATURENET-2372 | Implement Text Signature Margins for Words Documents | New Feature |
| SIGNATURENET-2374 | Implement Text Signature Margins for Slides Documents | New Feature |
| SIGNATURENET-2384 | Implement ability to put Digital Signature on all pages for Pdf Documents | New Feature |
| SIGNATURENET-2385 | Implement Digital Signature Alignment for Pdf Documents | New Feature |
| SIGNATURENET-2392 | Implement ability to sign Pdf Documents with given list of Signature Options | New Feature |
| SIGNATURENET-2397 | Implement ability to sign Cells Documents with given list of Signature Options | New Feature |
| SIGNATURENET-2402 | Implement ability to sign Words Documents with given list of Signature Options | New Feature |
| SIGNATURENET-2377 | Pdf Text Signature - Adjust Signature Area when Width or Height properties are specified | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 16.12.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Updated public classes for Text Signature Options (PdfTextSignatuteOptions, CellsTextSignatuteOptions, WordsTextSignatuteOptions and SlidesTextSignatuteOptions) were extended with VerticalAlignment, HorizontalAlignment and Margins properties
*   Added new class SignatureOptionsCollection to keep collection of Signature Options
*   Updated Pdf Digital Options - class was extended with Horizontal and Vertical Alignment properties
*   Ability to sign document with multiple signature options

**Setup Multiple Signature Options**



```csharp
var storagePath = @"c:\Aspose\Test\Storage";
var outputPath = @"c:\Aspose\Test\Output";
var imagesPath = @"c:\Aspose\Test\Images";
var certificatesPath = @"c:\Aspose\Test\Certificates";
// setup Signature configuration
var signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    OutputPath = outputPath,
    ImagesPath = imagesPath,
    CertificatesPath = certificatesPath
};
// instantiating the conversion handler
var handler = new SignatureHandler(signConfig);
// define Signature Options Collection
var collection = new SignatureOptionsCollection();
// specify text option
var signTextOptions = new PdfSignTextOptions("Mr. John", 100, 100, 100, 100);
// add to collection
collection.Add(signTextOptions);
// specify image options
var signImageOptions = new PdfSignImageOptions("signature.jpg");
signImageOptions.Left = 200;
signImageOptions.Top = 200;
signImageOptions.Width = 100;
signImageOptions.Height = 100;
// add to collection
collection.Add(signImageOptions);
// specify digital options
var signDigitalOptions = new PdfSignDigitalOptions("test.pfx");
signDigitalOptions.Password = "1234567890";
signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom;
signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center;
// add to collection
collection.Add(signDigitalOptions);
// sign document
var signedPath = handler.Sign<string>("test.pdf", collection, new SaveOptions { OutputType = OutputType.String });
Console.WriteLine("Signed file path is: " + signedPath);

```

*   The ability to adjust Text Signature appearance

**Setup Font and Text Color options**



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

**Setup Background and Border settings**



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

*   The ability to adjust Image Signature appearance

**Setup Image Signature Rectangle and Margins**



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

**Setup Signature area alignment**



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
