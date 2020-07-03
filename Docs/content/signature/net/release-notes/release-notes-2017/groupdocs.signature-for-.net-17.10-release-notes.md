---
id: groupdocs-signature-for-net-17-10-release-notes
url: signature/net/groupdocs-signature-for-net-17-10-release-notes
title: GroupDocs.Signature for .NET 17.10 Release Notes
weight: 3
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.10{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. The most notable are:

*   Implemented support of Tiff multi frames image format for Signature processing with ability to specify pages to sign
*   Added new alignment option to stretch Signature area along page width or height
*   Introduced ability to export signed documents to image formats with advanced options for output image file generation
*   Implemented support of multi frames image documents verification
*   Updated Save Options with properties to export documents to multi frames images formats
*   Extended Digital Words Signature appearance to support alternative Signature Lines area on document page
*   Extended Digital Cells Signature appearance to support alternative Signature Lines area on document page
*   Fixed saving issues with Digital Signature processing for PDF Documents
*   Updated signature process with corrected error messages, comments of classes and members

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3078 | Implement ability to verify separate pages of multi-page tiff images | New Feature |
| SIGNATURENET-3073 | Implement ability to process separate pages for multi-page tiff images | New Feature |
| SIGNATURENET-3070 | Add ability to export signed Document to multi pages Tiff format | New Feature |
| SIGNATURENET-3063 | Implement ability to use Signature Line for digital signature in Cells Documents | New Feature |
| SIGNATURENET-3060 | Implement ability to use Signature Line for digital signature in Words Documents | New Feature |
| SIGNATURENET-3052 | Implement ability to stretch Signature Area along Document Width or Height | New Feature |
| SIGNATURENET-3050 | Implement ability to save signed Words document to image format | New Feature |
| SIGNATURENET-3049 | Implement ability to save signed Slides presentation to image format | New Feature |
| SIGNATURENET-3048 | Implement ability to save signed PDF document to image format | New Feature |
| SIGNATURENET-3047 | Implement ability to save signed Cells Workbook to image format | New Feature |
| SIGNATURENET-3025 | Update Digital Signature implementation for Words Documents | Improvement |
| SIGNATURENET-3023 | Pdf Documents - error on Digital Signing when output Save format is not Pdf | Bug |
| SIGNATURENET-3022 | Destination document is empty when Digital Certificate Holder is not loaded | Bug |
| SIGNATURENET-2961 | Incorrect digital signing with doc and docx save options | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.10. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  Added new enumeration type **StretchMode** with values that specify different options to stretch Signature Area across page width, height or both.

**StretchMode enumeration**

```csharp
public enum StretchMode
    {
        /// <summary>Default value. No stretch mode will be applied.</summary>
        None = 0,
        /// <summary>Stratch Signature area along page Width. Margin property will be used to apply required offfset values</summary>
        PageWidth = 1,
        /// <summary>Stratch Signature area along page Height. Margin property will be used to apply required offfset values.</summary>
        PageHeight = 2,
        /// <summary>Represents a dash-dot-dot line. Margin property will be used to apply required offfset values.</summary>
        PageArea = 3,
    }
```

Interface IRectangle was updated with property** StretchMode Stretch { get; set; }**

All Signature classes that implement IRectangle interface were updated with this property supporting.  
See example   
05\. How to align Signature on Page

**Specify different Stretch mode to locate Signature Area along page width or height**

```csharp
string storagePath = @"c:\Aspose\Test\Storage";
string outputPath = @"c:\Aspose\Test\Output";
string imagePath = @"c:\Aspose\Test\Images";
string certificatesPath = @"c:\Aspose\Test\Certificates";
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = storagePath,
    ImagesPath = imagePath,
    OutputPath = outputPath,
    CertificatesPath = certificatesPath
};
// instantiating the conversion handler
SignatureHandler handler = new SignatureHandler(signConfig);
// Specify Signature Options collection
SignatureOptionsCollection collection = new SignatureOptionsCollection();
 
// setup first text signature options
PdfSignTextOptions signTextOptions = new PdfSignTextOptions("Mr.John Smith", 0, 0, 50, 50);
// locate options at top of page along all page width with some margins
signTextOptions.Stretch = StretchMode.PageWidth;
signTextOptions.VerticalAlignment = VerticalAlignment.Top;
signTextOptions.Margin = new Padding(50);
signTextOptions.SignAllPages = true;
// add Options to collection
collection.Add(signTextOptions);
// setup second barcode signature options
PdfBarcodeSignOptions signBrcdOptions = new PdfBarcodeSignOptions("12345678",0,0,100,40);
signBrcdOptions.EncodeType = BarcodeTypes.Code39Standard;
// locate options at bottom of page along all width with some margins
signBrcdOptions.Stretch = StretchMode.PageWidth;
signBrcdOptions.VerticalAlignment = VerticalAlignment.Bottom;
signBrcdOptions.SignAllPages = true;
// add Options to collection
collection.Add(signBrcdOptions);
// setup third image signature options
var signImageOptions = new PdfSignImageOptions("300.png");
// locate options at right side of page along all height with some margins
signImageOptions.Stretch = StretchMode.PageHeight;
signImageOptions.HorizontalAlignment = HorizontalAlignment.Right;
signImageOptions.Margin = new Padding(5);
signImageOptions.SignAllPages = true;
// add Options to collection
collection.Add(signImageOptions);
// sign document
string signedPath = handler.Sign<string>("test.pdf", collection,
    new SaveOptions
    {
        OutputType = OutputType.String,
        OutputFileName = "OtherOperations_StretchingOnDocumentPage"
    });
Console.WriteLine("Signed file path is: " + signedPath);
```

2\. Introduced new Signature appearance class **DigitalSignatureAppearance**. This class describes alternative Digital Signature appearance on Office documents (Words and Cells) as rectangle area with background images and horizontal lines with few additional messages

**DigitalSignatureAppearance class**

```csharp
namespace GroupDocs.Signature.Options
{
    public sealed class DigitalSignatureAppearance : SignatureAppearance
    {
        /// <summary>
        /// Gets or sets signer name for signature line.
        /// </summary>
        public string Signer { get; set; }
        /// <summary>
        /// Gets or sets a title for signature line.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Gets or sets a email that will be displayed in signature line.
        /// </summary>
        public string Email { get; set; }
    }
}
```

See examples   
Signing Words Documents with digital certificates  
Signing Cells Documents with digital certificates

3\. Added new Save Options class **ExportImageSaveOptions **for ability to save signed Documents to image formats. All Document Types support ability to save document as image. Save Options were extended with properties DocumentPageNumber, PagesSetup and SignAllPages to specify Pages for multi frames image formats like Tiff  
See example  
Export documents as image

## Specify different Stretch mode to locate Signature Area along page width or height

{{< alert style="info" >}}New Stretch property is supported starting from version 17.10{{< /alert >}}{{< alert style="info" >}}When appearance of Signature should be located along page width or height you can use Stretch property of any Signature options type.Enumeration has following valuesPageWdith - the width of Signature will be defined from Page width and specified Margin.Left and Margin.Right values.PageHeight - the height of Signature will be defined from Page height and specified Margin.Top and Margin.Bottom values.PageArea - the width and height of Signature will be defined from Page width and height and specified Margin values.{{< /alert >}}



```csharp
string storagePath = @"c:\Aspose\Test\Storage";
string outputPath = @"c:\Aspose\Test\Output";
string imagePath = @"c:\Aspose\Test\Images";
string certificatesPath = @"c:\Aspose\Test\Certificates";
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
	StoragePath = storagePath,
	ImagesPath = imagePath,
	OutputPath = outputPath,
	CertificatesPath = certificatesPath
};
// instantiating the conversion handler
SignatureHandler handler = new SignatureHandler(signConfig);
// Specify Signature Options collection
SignatureOptionsCollection collection = new SignatureOptionsCollection();
// setup first text signature options
PdfSignTextOptions signTextOptions = new PdfSignTextOptions("Mr.John Smith", 0, 0, 50, 50);
// locate options at top of page along all page width with some margins
signTextOptions.Stretch = StretchMode.PageWidth;
signTextOptions.VerticalAlignment = VerticalAlignment.Top;
signTextOptions.Margin = new Padding(50);
signTextOptions.SignAllPages = true;
// add Options to collection
collection.Add(signTextOptions);
// setup second barcode signature options
PdfBarcodeSignOptions signBrcdOptions = new PdfBarcodeSignOptions("12345678",0,0,100,40);
signBrcdOptions.EncodeType = BarcodeTypes.Code39Standard;
// locate options at bottom of page along all width with some margins
signBrcdOptions.Stretch = StretchMode.PageWidth;
signBrcdOptions.VerticalAlignment = VerticalAlignment.Bottom;
signBrcdOptions.SignAllPages = true;
// add Options to collection
collection.Add(signBrcdOptions);
// setup third image signature options
var signImageOptions = new PdfSignImageOptions("300.png");
// locate options at right side of page along all height with some margins
signImageOptions.Stretch = StretchMode.PageHeight;
signImageOptions.HorizontalAlignment = HorizontalAlignment.Right;
signImageOptions.Margin = new Padding(5);
signImageOptions.SignAllPages = true;
// add Options to collection
collection.Add(signImageOptions);
// sign document
string signedPath = handler.Sign<string>("test.pdf", collection,
	new SaveOptions
	{
		OutputType = OutputType.String,
		OutputFileName = "OtherOperations_StretchingOnDocumentPage"
	});
Console.WriteLine("Signed file path is: " + signedPath);
```

## Digital signing Words Documents with Signature Line

{{< alert style="info" >}}This feature is supported starting from version 17.10{{< /alert >}}



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
	StoragePath = @"c:\Aspose\Test\Storage",
	OutputPath = @"c:\Aspose\Test\Output",
	ImagesPath = @"c:\Aspose\Test\Images",
	CertificatesPath = @"c:\Aspose\Test\Certificates"
};
// instantiating the conversion handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup digital signature options with image appearance
WordsSignDigitalOptions signOptions =
	new WordsSignDigitalOptions(@"c:\Aspose\Test\Certificates\SherlockHolmes.pfx", "signature.jpg");
signOptions.Signature.Comments = "Test comment";
signOptions.Signature.SignTime = DateTime.Now;
signOptions.Password = "1234567890";
// Setup signature line appearance.
// This appearance will add Signature Line on the first page.
// Could be useful for .docx, .doc and .odt files.
signOptions.Appearance = new DigitalSignatureAppearance("John Smith", "Title", "jonny@test.com");
// sign document
string signedPath = handler.Sign<string>("test.docx", signOptions,
	new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignatureLineWords" });
Console.WriteLine("Signed file path is: " + signedPath);
```

{{< alert style="info" >}}This feature is supported starting from version 17.10{{< /alert >}}

## Export Cells document as image



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
	StoragePath = @"c:\Aspose\Test\Storage",
	OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the conversion handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
CellsSignTextOptions signOptions = new CellsSignTextOptions("John Smith");
// text position
signOptions.RowNumber = 2;
signOptions.ColumnNumber = 2;
signOptions.SignAllPages = true;
			 //Export to image options
ExportImageSaveOptions exSaveOptions = new ExportImageSaveOptions(ImagesSaveFileFormat.Png);
exSaveOptions.OutputType = OutputType.String;
exSaveOptions.OutputFileName = "CellsExportAsImage";
//set pages border style
exSaveOptions.BorderColor = Color.Brown;
exSaveOptions.BorderWeight = 5;
exSaveOptions.BorderDashStyle = ExtendedDashStyle.ShortDash;
//export only odd pages
exSaveOptions.PagesSetup.OddPages = true;
//set number of columns in result image
exSaveOptions.PageColumns = 3;
// sign document
string signedPath = handler.Sign<string>("pages15.xlsx", signOptions, exSaveOptions);
Console.WriteLine("Signed file path is: " + signedPath);
```

{{< alert style="info" >}}This feature is supported starting from version 17.10{{< /alert >}}

## Export Cells Document as multi-page Tiff image



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
	StoragePath = @"c:\Aspose\Test\Storage",
	OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the conversion handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
CellsSignTextOptions signOptions = new CellsSignTextOptions("John Smith");
// text position
signOptions.RowNumber = 2;
signOptions.ColumnNumber = 2;
signOptions.SignAllPages = true;
//Export to image options
ExportImageSaveOptions exSaveOptions = new ExportImageSaveOptions(ImagesSaveFileFormat.Tiff);
exSaveOptions.OutputType = OutputType.String;
exSaveOptions.OutputFileName = "CellsExportAsMultipageImage";
//export all pages
exSaveOptions.ExportAllPages = true;
//Create multi-page tiff image
exSaveOptions.TiffMultipage = true;
// sign document
string signedPath = handler.Sign<string>("pages15.xlsx", signOptions, exSaveOptions);
Console.WriteLine("Signed file path is: " + signedPath);
```
