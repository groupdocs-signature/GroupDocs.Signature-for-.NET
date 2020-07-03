---
id: groupdocs-signature-for-net-17-12-release-notes
url: signature/net/groupdocs-signature-for-net-17-12-release-notes
title: GroupDocs.Signature for .NET 17.12 Release Notes
weight: 1
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.12{{< /alert >}}

## Major Features

There are more than 10 improvements, new features and fixes in this regular release. Most improvements and new features were implemented with QR-Codes, Barcode and Digital signature types. The most notable are:

*   Improved Document type detection algorithm to increase signature performance
*   Implemented additional appearance features for QR-Code - ability to specify color of QR-Code bars
*   Added Barcode text alignment type property that allows to hide or locate text around signature area
*   Implemented additional appearance features for Barcode - ability to specify color of Barcode bars
*   Provided Text alignment property for QR-Code Signature that allows to hide or locate text around signature area
*   Introduced ability to setup inner logo image for QR-Codes
*   Implemented new property for Barcode - Inner margins to specify margins between Barcode area and border
*   Added Inner margins property for QR-Code to setup margins between QR-Code area and border
*   Introduced ability to load registered digital certificates installed on system
*   Improved all options collections classes (SignatureOptionsCollection, VerifyOptionsCollection and SearchOptionsCollection) with implementation of IEnumerable<T> interface
*   Updated public classes properties and additional clarification comments
*   Removed old obsolete properties

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3231 | Implement ability to set color of QR-Code bars | New Feature |
| SIGNATURENET-3229 | Implement ability to set color of Barcode bars | New Feature |
| SIGNATURENET-3228 | Implement ability to set code text alignment for QR-codes | New Feature |
| SIGNATURENET-3225 | Implement ability to set code text alignment for Bar-codes | New Feature |
| SIGNATURENET-3217 | Implement ability to use inner image logo for QR-Codes | New Feature |
| SIGNATURENET-3208 | Provide ability to set inner margins for QRcodes. | New Feature |
| SIGNATURENET-3207 | Provide ability to set inner margins for Barcodes. | New Feature |
| SIGNATURENET-3178 | Implement ability to load Digital Signatures from local system | New Feature |
| SIGNATURENET-3223 | Update SearchOptionsCollection class to make it IEnumerable | Improvement |
| SIGNATURENET-3222 | Update VerifyOptionsCollection class to make it IEnumerable | Improvement |
| SIGNATURENET-3221 | Update SignatureOptionsCollection class to make it IEnumerable | Improvement |
| SIGNATURENET-3211 | Improve Document detection based on passed Option type | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.12. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

### New enumeration type CodeTextAlignment was added to specify Text alignment of Barcodes and QRCodes text appearance

```csharp
/// <summary>
///  Alignment of code text for Bar-codes and QR-codes.
/// </summary>
public enum CodeTextAlignment
{
    /// <summary>Text is not visible.</summary>
    None = 0,
    /// <summary>Text is above the code.</summary>
    Above = 1,
    /// <summary>Text is below the code.</summary>
    Below = 2,
    /// <summary>Text is on the right of the code.</summary>
    Right = 3,
}
```

### Public static method DocumentDescription GetPageDescriptions(string guid) was removed

This static is no longer available and was removed in the version 17.12, please use non static method of SignatureHandler class instead

**public DocumentDescription GetDocumentDescription(string guid, string password = "")**

as shown in examples below.

Using non static method allows to use custom implementation of InputDataHandler interface to access documents data any where based on provided string guid document identifier.

**Show hidden sheets for Excel files in image representation**

**Since v17.12 C#**

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// Document description
DocumentDescription docInfo = handler.GetDocumentDescription(@"c:\Aspose\Test\Storage\test.pdf");
Console.WriteLine("Document " + docInfo.Guid + " contains " + docInfo.PageCount + " pages");
Console.WriteLine("Width of first page is " + docInfo.Pages.FirstOrDefault().Width); 
```

**Before v17.12 C#**

```csharp
// Get Document description using removed static method
DocumentDescription docInfo = SignatureHandler.GetDocumentDescription(@"c:\Aspose\Test\Storage\test.pdf");
Console.WriteLine("Document " + docInfo.Guid + " contains " + docInfo.PageCount + " pages");
Console.WriteLine("Width of first page is " + docInfo.Pages.FirstOrDefault().Width);
```

### Public static method byte\[\] GetDocumentPageImage(string guid, int? width, int? quality, int pageIndex) was removed

This static method is no longer available and was removed in the version 17.12, please use non static method of SignatureHandler class instead

**public byte\[\] GetPageImage(string guid, int pageNumber, string password = "", int? width = null, int? quality = null)**

as shown in examples below.

Using non static method allows to use custom implementation of InputDataHandler interface to access documents data any where based on provided string guid document identifier.

**Show hidden sheets for Excel files in image representation**

**Since v17.12 C#**

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// Image from specified page
byte[] bytesImage = handler.GetPageImage(@"c:\Aspose\Test\Storage\test.pdf", 1);
using (MemoryStream memoryStream = new MemoryStream(bytesImage))
{
    using (Image image = Image.FromStream(memoryStream))
    {
        // Make something with image
        Console.WriteLine("Height of image is " + image.Height);
        image.Save(@"c:\Aspose\Test\Output\ImageFromPage.png", ImageFormat.Png);
    }
}
```

**Before v17.12 C#**

```csharp
// Image from specified page
byte[] bytesImage = SignatureHandler.GetPageImage(@"c:\Aspose\Test\Storage\test.pdf", 1);
using (MemoryStream memoryStream = new MemoryStream(bytesImage))
{
    using (Image image = Image.FromStream(memoryStream))
    {
        // Make something with image
        Console.WriteLine("Height of image is " + image.Height);
        image.Save(@"c:\Aspose\Test\Output\ImageFromPage.png", ImageFormat.Png);
    }
}
```

### Public static method System.Drawing.Size GetPageSize(string guid, int signaturePageNumber, double signatureLocationX, double signatureLocationY, PositionInCellsDocument positionInCellsDocument) was removed

This static method is no longer available and was removed in the version 17.12, please use non static method of SignatureHandler class instead

**public System.Drawing.Size GetDocumentPageSize(string guid, int pageNumber, string password = "", double signatureLocationXforCells = 0d, double signatureLocationYforCells = 0d, PositionInCellsDocument positionInCellsDocument = null)**

as shown in examples below.

Using non static method allows to use custom implementation of InputDataHandler interface to access documents data any where based on provided string guid document identifier.

**Show hidden sheets for Excel files in image representation**

**Since v17.12 C#**

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// Page size
Size pageSize = handler.GetDocumentPageSize(@"c:\Aspose\Test\Storage\test.pdf", 1);
Console.WriteLine("Page size is " + pageSize.Height + " x " + pageSize.Width);
```

**Before v17.12 C#**

```csharp
// Page size
Size pageSize = SignatureHandler.GetPageSize(@"c:\Aspose\Test\Storage\test.pdf", 1);
Console.WriteLine("Page size is " + pageSize.Height + " x " + pageSize.Width);
```

### Public class BarcodeSignOptions was extended with following properties

```csharp
/// <summary>
/// Gets or sets the space between Barcode elements and result image borders.
/// </summary>
public Padding InnerMargins { get; set; }
 
/// <summary>
/// Gets or sets the alignment of text in the result Bar-code image.
/// Default value is None.
/// </summary>
public CodeTextAlignment CodeTextAlignment { get; set; }
```

See examples below how to use them

#### Set various colors for Barcode signatures



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
PdfBarcodeSignOptions signOptions = new PdfBarcodeSignOptions("12345678");
// barcode type
signOptions.EncodeType = BarcodeTypes.Code39Standard;
// set background color (optionally)
//This feature is supported starting from version 17.11
signOptions.BackgroundColor = Color.OrangeRed; 
// set fore color (optionally)
//This feature is supported starting from version 17.12
signOptions.ForeColor = Color.Green; 
// sign document
string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "BarCode_Colors" });
Console.WriteLine("Signed file path is: " + signedPath);
```

#### Set inner margins and text alignments for Barcode signatures



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
PdfBarcodeSignOptions signOptions = new PdfBarcodeSignOptions("12345678");
// barcode type
signOptions.EncodeType = BarcodeTypes.Code39Standard;
// set intents from edges (optionally)
signOptions.InnerMargins = new Padding(5, 25, 20, 10); //This feature is supported starting from version 17.12
// set code text alignment (optionally)
signOptions.CodeTextAlignment = CodeTextAlignment.Right; //This feature is supported starting from version 17.12
// sign document
string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "BarCode_Margins_Alignments" });
Console.WriteLine("Signed file path is: " + signedPath);
```

### Public class GroupDocs.Signature.Options.CellsQRCodeSignOptions was updated - obsolete properties and methods were removed

```csharp
/// <summary>
/// Left intent columns (works if horizontal alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete. Use ColumnNumber instead.", false)]
public new int Left { get; set; }
 
/// <summary>
/// Top intent rows (works if vertical alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete. Use RowNumber instead.", false)]
public new int Top { get; set; }
```

### Following properties were removed in class CellsSignDigitalOptions

```csharp
/// <summary>
/// Left intent columns (works if horizontal alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete and will be removed in 17.12 version. Use ColumnNumber instead.", false)]
public new int Left { get; set; }
 
/// <summary>
/// Top intent rows (works if vertical alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete and will be removed in 17.12 version. Use RowNumber instead.", false)]
public new int Top { get; set; }
```

### Following constructors were removed

```csharp
/// <summary>
        /// Initializes a new instance of the CellsSignDigitalOptions class with certificate file and image file.
        /// </summary>
        /// <param name="pfxFileName">File Description of Digital Certificate</param>
        /// <param name="appearenceImageGuid">Signature Appearance image file GUID</param>
        [Obsolete("This constructor is obsolete and will be removed in 17.12 version. Use CellsSignDigitalOptions(string certificateGuid, string appearenceImageGuid)", false)]
        public CellsSignDigitalOptions(FileDescription pfxFileName, string appearenceImageGuid)
 
        /// <summary>
        /// Initializes a new instance of the CellsSignDigitalOptions class with certificate file and image stream.
        /// </summary>
        /// <param name="pfxFileName">File Description of Digital Certificate</param>
        /// <param name="appearenceImageStream">Signature Appearance image stream</param>
        [Obsolete("This constructor is obsolete and will be removed in 17.12 version. Use CellsSignDigitalOptions(string certificateGuid, Stream appearenceImageStream)", false)]
        public CellsSignDigitalOptions(FileDescription pfxFileName, Stream appearenceImageStream)
```

### Public class GroupDocs.Signature.Options.CellsSignImageOptions was updated - obsolete members and properties were removed

```csharp
/// <summary>
/// Left intent columns (works if horizontal alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete. Use ColumnNumber instead.", false)]
public new int Left { get; set; }
 
/// <summary>
/// Top intent rows (works if vertical alignment is not specified).
/// </summary>
[Obsolete("This property is obsolete. Use RowNumber instead.", false)]
public new int Top { get; set; }
```

### Following properties and methods of class PdfSignDigitalOptions were removed

```csharp
/// <summary>
/// Rotation angle of signature on document page (clockwise).  
/// </summary>      
[Obsolete("This property is obsolete and will be removed in 17.12 version. PDF digital signature does not support rotation", false)]
public new int RotationAngle { get; set; }
        
/// <summary>
/// Initializes a new instance of the PdfSignDigitalOptions class with certificate file.
/// </summary>
/// <param name="certificateFileDescription">Digital certificate File Description</param>     
[Obsolete("This constructor is obsolete. Use PdfSignDigitalOptions(string certificateGuid)", false)]
public PdfSignDigitalOptions(FileDescription certificateFileDescription)
        
/// <summary>
/// Initializes a new instance of the PdfSignDigitalOptions class with certificate file and image file.
/// </summary>
/// <param name="certificateFileName">Digital certificate file description</param>
/// <param name="appearenceImageGuid">Signature Appearance image file GUID</param>
[Obsolete("This constructor is obsolete. Use PdfSignDigitalOptions(string certificateGuid, string appearenceImageGuid)", false)]
public PdfSignDigitalOptions(FileDescription certificateFileName, string appearenceImageGuid)
      
/// <summary>
/// Indicates if Signature is Certificate or Approval.
/// </summary>
[Obsolete("This property is obsolete and will be removed in 17.12 version.", false)]
public bool IsCertificate { get; set; }
```

### Public class QRCodeSignOptions was extended with following properties

```csharp
/// <summary>
/// Gets or sets the space between Barcode elements and result image borders.
/// </summary>
public Padding InnerMargins { get; set; }
 
/// <summary>
/// Gets or sets the alignment of text in the result Bar-code image.
/// Default value is None.
/// </summary>
public CodeTextAlignment CodeTextAlignment { get; set; }
```

See examples below how to use them

#### **Set various colors and logo for QRcode signatures**

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions("12345678");
// QRcode type
signOptions.EncodeType = QRCodeTypes.QR;
// set background color (optionally)
signOptions.BackgroundColor = Color.OrangeRed; //This feature is supported starting from version 17.11
// set fore color (optionally)
signOptions.ForeColor = Color.Green; //This feature is supported starting from version 17.12
//set logo image (optionally)
signOptions.LogoGuid = @"C:\Aspose\Test\Images\Twitter_logo.png"; //This feature is supported starting from version 17.12
// sign document
string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "QRCode_Colors" });
Console.WriteLine("Signed file path is: " + signedPath);
```

#### Set inner margins and text alignments for QRcode signatures

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup options with text of signature
PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions("12345678");
// QRcode type
signOptions.EncodeType = QRCodeTypes.Aztec;
// set intents from edges (optionally)
signOptions.InnerMargins = new Padding(5, 25, 20, 10); //This feature is supported starting from version 17.12
// set code text alignment (optionally)
signOptions.CodeTextAlignment = CodeTextAlignment.Right; //This feature is supported starting from version 17.12
// sign document
string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "QRCode_Margins_Alignments" });
Console.WriteLine("Signed file path is: " + signedPath);
```

### Public class** GroupDocs.Signature.Options.SearchOptionsCollection** was updated and now implements interface **IEnumerable<SearchOptions>**

Definition

```csharp
public class SearchOptionsCollection : ICloneable, IEnumerable<SearchOptions>
```

See examples below how to use them

#### Enumerate all Options inside collection



```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output",
    ImagesPath = @"c:\Aspose\Test\Images",
    CertificatesPath = @"c:\Aspose\Test\Certificates"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// define Signature Options Collection
SignatureOptionsCollection collection = new SignatureOptionsCollection();
// specify text option
PdfSignTextOptions signTextOptionsFirst = new PdfSignTextOptions("Mr. John First");
signTextOptionsFirst.Left = 0;
// add to collection
collection.Add(signTextOptionsFirst);
// specify digital options
PdfSignDigitalOptions signDigitalOptions = new PdfSignDigitalOptions("test.pfx");
signDigitalOptions.Password = "1234567890";
// add to collection
collection.Add(signDigitalOptions);
// specify text option
PdfSignTextOptions signTextOptionsSecond = new PdfSignTextOptions("Mr. John Second");
signTextOptionsSecond.Left = 0;
signTextOptionsSecond.Top = 100;
// add to collection
collection.Add(signTextOptionsSecond);
//  walk through all items in collection
foreach (SignOptions signOptions in collection)
{ 
    // do special code here to change signOptions
} 
```

### Public class GroupDocs.Signature.Options.SignImageOptions was updated  - obsolete properties were removed

```csharp
/// <summary>
/// Set signature image with image file.
/// </summary>
/// <param name="imageFileGuid">Image file GUID</param>
[Obsolete("This property is obsolete and will be removed in 17.12 version. Use property ImageFileName.", false)]
public void SetImage(string imageFileGuid)
 
/// <summary>
/// Set signature image with image stream.
/// </summary>
/// <param name="imageStream">Image stream</param>
[Obsolete("This property is obsolete. Use property ImageStream.", false)]
public void SetImage(System.IO.Stream imageStream)
 
/// <summary>
/// Gets or sets the signature image file name.
/// This property is used only if ImageStream is not specified.
/// </summary>
[Obsolete("This property is obsolete. Use property ImageGuid.", false)]
public string ImageFileName { get { return ImageHelper.Guid; } set { ImageHelper.Guid = value; } }
```

### Public class GroupDocs.Signature.Options.SlidesSignDigitalOptions was updated with removed following properties and methods

```csharp
/// <summary>
/// Gets or sets the sign image file name.
/// </summary>
[Obsolete("This property is obsolete. Use method SetImage(string guid)", false)]
public FileDescription SignatureImageFile { get; set; }
 
/// <summary>
/// Initializes a new instance of the SlidesSignDigitalOptions class with certificate file.
/// </summary>
/// <param name="certificateFileDescription">File Description of Digital Certificate</param>
[Obsolete("This constructor is obsolete. Use SlidesSignDigitalOptions(string certificateGuid)", false)]
public SlidesSignDigitalOptions(FileDescription certificateFileDescription)
 
/// <summary>
/// Initializes a new instance of the SlidesSignDigitalOptions class with certificate file and image file.
/// </summary>
/// <param name="certificateFileDescription">File Description of Digital Certificate</param>
/// <param name="appearenceFileDescription">File Description of Signature Appearance</param>
[Obsolete("This constructor is obsolete. Use SlidesSignDigitalOptions(string certificateGuid, string appearenceImageGuid)", false)]
public SlidesSignDigitalOptions(FileDescription certificateFileDescription, FileDescription appearenceFileDescription)
```

### Public class GroupDocs.Signature.Options.VerifyOptionsCollection was updated to implement

```csharp
public class VerifyOptionsCollection : ICloneable, IEnumerable<VerifyOptions>
```

#### Enumerate all Options inside collection

```csharp
// define Signature Options Collection
VerifyOptionsCollection collection = new VerifyOptionsCollection ();
// adding some VerifyOptions to collection
//  walk through all items in collection
foreach (VerifyOptions verifyOptions in collection)
{ 
    // do special code here to change verifyOptions 
} 
```

### Public class was updated with removed obsolete constructors

```csharp
/// <summary>
/// Initializes a new instance of the WordsSignDigitalOptions class with certificate file.
/// </summary>
/// <param name="certificateFileDescription">File description of digital certificate</param>
[Obsolete("This constructor is obsolete. Use WordsSignDigitalOptions(string certificateGuid)", false)]
public WordsSignDigitalOptions(FileDescription certificateFileDescription)
```

### Public class GroupDocs.Signature.Options.WordsSignImageOptions was updated  - removed obsolete property DocumentPart DocumentPart

```csharp
/// <summary>
/// Gets or sets the part of document to put sign.
/// </summary>
[Obsolete("This property is no more supported for Words image signature. Use alignment properties instead.", false)]
public DocumentPart DocumentPart { get; set; }
```

### Public class GroupDocs.Signature.Options.WordsSignTextOptions was updated- obsolete property was removed

```csharp
/// <summary>
/// Gets or sets the part of document to put sign.
/// </summary>
[Obsolete("This property is no more supported for Words image signature and will be removed in 17.12 version. Use alignment properties instead.", false)]
public DocumentPart DocumentPart { get; set; }
```
