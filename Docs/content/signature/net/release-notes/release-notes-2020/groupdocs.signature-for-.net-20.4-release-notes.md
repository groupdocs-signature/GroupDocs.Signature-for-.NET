---
id: groupdocs-signature-for-net-20-4-release-notes
url: signature/net/groupdocs-signature-for-net-20-4-release-notes
title: GroupDocs.Signature for .NET 20.4 Release Notes
weight: 20
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.4{{< /alert >}}

## Major Features

This release contains implemented features on ability to obtain Barcode and QR-code signatures image content when creating electronic signatures or searching for them, new enhancements on storing and retrieving signature metadata information,  important bug fixes with digital signatures processing, and another significant fixes and improvements. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.4:

*   Full featured JSON serialization and de-serialization support was implemented. This feature allows to serialize into QR-code and metadata signatures any level of complexity classes with sub classes properties etc.
*   QR-code electronic signature was extended with image data content.
*   Barcode electronic signature was extended with image data content.
*   Signature information was updated with creation and modification dates of signature.
*   Fixed issues with creating digital signatures on password protected PDF documents
*   Digital signatures are not valid for password protected PDF documents
*   Fixed few bugs with creating and searching QR-code electronic signatures  
      
    

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2788 | Involve full featured JSON serialization and de-serialization support | Feature |
| SIGNATURENET-2611 | Extend QR-code Signature with image data content | Feature |
| SIGNATURENET-2610 | Extend Barcode Signature with image data content | Feature |
| SIGNATURENET-2438 | Implement ability to store creation and update date for signatures | Feature |
| SIGNATURENET-2794 | Digital signatures are not valid for password protected PDF documents | Bug |
| SIGNATURENET-2793 | Incorrect Text signature appearance with right allignment for PDF documents | Bug |
| /SIGNATURENET-2790 | QR-Code signatures without left and top margins on image are not recognized | Bug |
| SIGNATURENET-2787 | Exception occurs when creating QRCode signature with non latin char-set characters | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were updated:

*   [Advanced search for Barcode signatures]({{< ref "signature/net/developer-guide/advanced-usage/searching/advanced-search-for-barcode-signatures.md" >}})
*   [Advanced search for QR-code signatures]({{< ref "signature/net/developer-guide/advanced-usage/searching/advanced-search-for-qr-code-signatures.md" >}})
*   [Search for Image e-signatures]({{< ref "signature/net/developer-guide/basic-usage/search-for-electronic-signatures-in-document/search-for-image-e-signatures.md" >}})

## Public API and Backward Incompatible Changes

#### Public class [BarcodeSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/barcodesignature) was updated with new properties and ability to contain Barcode image content.

Public class **[BarcodeSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/barcodesignature)** was updated with new properties.

*   new property **[Format](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/barcodesignature/properties/format)** of type **[FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype)** was added to specify the original image data format;
*   new property **byte\[\]** **[Content](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/barcodesignature/properties/content)** was added to keep original Barcode image raw data content

Since 20.4 version there's ability to grab content of Barcode signatures. To enable this feature the property **[ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontent)** of **[BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions)** must be set to true. Also there is ability to specify output image content format type over property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontenttype)**.

**New properties of BarcodeSignature**

```csharp
    /// <summary>
    /// Contains Barcode Signature properties.
    /// </summary>
    public class BarcodeSignature
    {
        /// <summary>
        /// Specifies the format of Barcode signature image.
        /// </summary>
        public FileType Format { get; private set; }

        /// <summary>
        /// Specifies Barcode binary data image content of type <see cref="Format"/>.
        /// By default this property will not be set.
        /// Use property <see cref="BarcodeSearchOptions.ReturnContent"/> to enable this feature.
        /// </summary>
        public byte[] Content { get; private set; }
   }
```

Following example demonstrates how to specify Barcode Search with various options to grab Barcode image content

**Search document for Barcode signature content**

```csharp
// initialize Signature instance
using (Signature signature = new Signature(filePath))
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
        ReturnContent = true
    };
    // search for signatures in document
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (var barcodeSignature in signatures)
    {
        Console.WriteLine("Barcode signature found at page {0} with type {1} and text {2}", barcodeSignature.PageNumber, barcodeSignature.EncodeType, barcodeSignature.Text);
        Console.WriteLine("Barcode signature size {0} and format {1}", barcodeSignature.Content.Length, barcodeSignature.Format);
    }
}
```

#### Public class [BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature) was updated with new properties to keep creation and modification dates.

Public class **[BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature)** was updated with new properties.

*   new property **CreatedOn** of type **DateTime** was added to specify the date when signature was created;
*   new property **ModifiedOn** of type **DateTime** was added to specify the date when signature was updated

Since 20.4 version there's ability to grab content of Barcode signatures. To enable this feature the property **[ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontent)** of **[BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions)** must be set to true. Also there is ability to specify output image content format type over property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontenttype)**.

**New properties of BaseSignature**

```csharp
    /// <summary>
    /// Contains Barcode Signature properties.
    /// </summary>
    public abstract class BaseSignature
    {
        /// <summary>
        /// Get or set the signature creation date.
        /// </summary>
        public DateTime CreatedOn { get; set; }
        /// <summary>
        /// Get or set the signature modification date.
        /// </summary>
        public DateTime ModifiedOn { get; set; }
   }
```

Following example demonstrates how to check signature dates of creation and modification

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // search document
    List<ImageSignature> signatures = signature.Search<ImageSignature>(SignatureType.Image);
    Console.WriteLine($"\nSource document ['{fileName}'] contains following image signature(s).");
    // output signatures
    foreach (ImageSignature imageSignature in signatures)
    {
        Console.WriteLine($"Image signature found at page {imageSignature.PageNumber} with size {imageSignature.Size}. Created {imageSignature.CreatedOn}, modified {imageSignature.ModifiedOn}");
    }
}
```

#### Public class [QrCodeSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/qrcodesignature) was updated with new properties and ability to contain QrCode image content.

Public class **[QrCodeSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/qrcodesignature)** was updated with new properties.

*   new property **[Format](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/qrcodesignature/properties/format)** of type **[FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype)** was added to specify the original image data format;
*   new property **byte\[\] [Content](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/qrcodesignature/properties/content)** was added to keep original QRCode image raw data content

Since 20.4 version there's ability to grab content of QRCode signatures. To enable this feature the property **[ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/returncontent)** of **[QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions)** must be set to true. Also there is ability to specify output image content format type over property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/returncontenttype)**.

**New properties of QrCodeSignature**

```csharp
    /// <summary>
    /// Contains QR-code signature properties.
    /// </summary>
    public class QrCodeSignature
    {
        /// <summary>
        /// Specifies the format of QR-code signature image.
        /// </summary>
        public FileType Format { get; private set; }

        /// <summary>
        /// Specifies QR-code binary data image content of type <see cref="Format"/>.
        /// By default this property will not be set.
        /// Use property <see cref="QrCodeSearchOptions.ReturnContent"/> to enable this feature.
        /// </summary>
        public byte[] Content { get; private set; }
    }
```

 Following example demonstrates how to specify QRCode Search with various options to grab QRCode image content

**Search document for QrCode signature content**

```csharp
// initialize Signature instance
using (Signature signature = new Signature(filePath))
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
        ReturnContent = true
    };
    // search for signatures in document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options); //For evaluation version is 0
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (var QrCodeSignature in signatures)
    {
        Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", 
                QrCodeSignature.PageNumber, QrCodeSignature.EncodeType, QrCodeSignature.Text);
        Console.WriteLine("Barcode signature size {0} and format {1}", QrCodeSignature.Content.Length, QrCodeSignature.Format);
    }
}
```

#### Public class [BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions) was updated with new properties for getting Barcode image content.

Public class **[BarcodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions)** was updated with new properties.

*   New property **bool [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontent)** was added to specify if returned Barcode signatures objects should keep original or converted (if property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontenttype)** was specified) Barcode image raw data. By default this value is set to false.
*   New property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesearchoptions/properties/returncontenttype)** of **[FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype)** type was added to specify non default returned Barcode image content type. By default this value is set to null that means original Barcode image format will be returned.

**New properties of BarcodeSearchOptions**

```csharp
    /// <summary>
    /// Represents search options for Barcode signatures.
    /// </summary>
    public class BarcodeSearchOptions 
    {
        /// <summary>
        /// Gets or sets flag to grab Barcode image content of signature on document page.
        /// If this flag is set true, Barcode signature image content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; } = false;

        /// <summary>
        /// Specifies file type of returned image content of the Barcode signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return Barcode image content in original format. 
        /// This image format is specified at <see cref="BarcodeSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than Barcode image content in .png format will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; }
    }
```

  

Following example demonstrates how to specify Barcode Search with various options to grab Barcode image content

**Search document for Barcode signature content**

```csharp
using (Signature signature = new Signature(filePath))
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
        ReturnContent = true
    };
    // search for signatures in document
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (var barcodeSignature in signatures)
    {
        Console.WriteLine("Barcode signature found at page {0} with type {1} and text {2}", barcodeSignature.PageNumber, barcodeSignature.EncodeType, barcodeSignature.Text);
        Console.WriteLine("Barcode signature size {0} and format {1}", barcodeSignature.Content.Length, barcodeSignature.Format);
    }
}
```

#### Public class [BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions) was updated with new properties for getting Barcode image content.

Public class **[BarcodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions)** was updated with new properties.

*   New property **bool [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/returncontent)** was added to specify if returned Barcode signatures objects in **[SignResult](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/signresult)** should keep original or converted (if property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/returncontenttype)** was specified) Barcode image raw data. By default this value is set to false.
*   New property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/returncontenttype)** of **[FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype)** type was added to specify non default returned Barcode image content type. By default this value is set to null that means original Barcode image format will be returned.

**New properties of BarcodeSignOptions**

```csharp
    /// <summary>
    /// Represents the Barcode signature options.
    /// </summary>
    public class BarcodeSignOptions
    {
        /// Gets or sets flag to get Barcode image content of a signature which was put on document page.
        /// If this flag is set true, Barcode signature image content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; } = false;

        /// <summary>
        /// Specifies file type of returned image content of the Barcode signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return Barcode image content in original format. 
        /// This image format is specified at <see cref="BarcodeSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than Barcode image content in .png format will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; }
    }
```

  

 Following example demonstrates how to specify Barcode Sign with various options to get Barcode image content in SignResult

**Sign document and get Barcode signature content**

```csharp
using (Signature signature = new Signature(filePath))
{
    // create barcode option with predefined barcode text
    BarcodeSignOptions options = new BarcodeSignOptions("12345678")
    {
        // setup Barcode encoding type
        EncodeType = BarcodeTypes.Code128,
        // set signature position
        Left = 100,
        Top = 100,
        // set signature alignment
        // when VerticalAlignment is set the Top coordinate will be ignored. 
        // Use Margin properties Top, Bottom to provide vertical offset
        VerticalAlignment = Domain.VerticalAlignment.Top,
        // when HorizontalAlignment is set the Left coordinate will be ignored. 
        // Use Margin properties Left, Right to provide horizontal offset
        HorizontalAlignment = Domain.HorizontalAlignment.Right,
        Margin = new Padding() { Top = 20, Right = 20 },
        // adjust signature appearance
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.DarkGreen,
            DashStyle = DashStyle.DashLongDashDot,
            Weight = 2
        },
        // set text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
        // specify position of text with barcode line
        CodeTextAlignment = CodeTextAlignment.Above,
        // setup background
        Background = new Background()
        {
            Color = Color.LimeGreen,
            Transparency = 0.5,
            Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
        },
        // set field for barcode images returning
        ReturnContent = true,
        // specify type of returned barcode images
        ReturnContentType = FileType.PNG
    };
    // sign document to file
    SignResult signResult = signature.Sign(outputFilePath, options);
    Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
    Console.WriteLine("\nList of newly created signatures:");
    int number = 1;
    foreach (BarcodeSignature barcodeSignature in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {barcodeSignature.SignatureType} Id:{barcodeSignature.SignatureId}, 
        Location: {barcodeSignature.Left}x{barcodeSignature.Top}. Size: {barcodeSignature.Width}x{barcodeSignature.Height}");
        Console.WriteLine($"Location at {barcodeSignature.Left}-{barcodeSignature.Top}. Size is {barcodeSignature.Width}x{barcodeSignature.Height}.");
        string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{barcodeSignature.Format.Extension}");
        using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
        {
            fs.Write(barcodeSignature.Content, 0, barcodeSignature.Content.Length);
        }
        number++;
    }
}
```

#### Public class [QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions) was updated with new properties for getting Barcode image content.

Public class **[QrCodeSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions)** was updated with new properties.

*   New property **bool** [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/returncontent) was added to specify if returned QrCode signatures objects should keep original or converted (if property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/returncontenttype) was specified)  QrCode image raw data. By default this value is set to false.
*   New property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesearchoptions/properties/returncontenttype) of [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) type was added to specify non default returned QrCode image content type. By default this value is set to null that means original QrCode image format will be returned.

**New properties of QrCodeSearchOptions**

```csharp
    /// <summary>
    /// Represents search options for QR-Code signatures.
    /// </summary>
    public class QrCodeSearchOptions : SearchOptions
    {
        /// <summary>
        /// Gets or sets flag to grab QR-Code image content of signature on document page.
        /// If this flag is set true, QR-Code signature image content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; } = false;

        /// <summary>
        /// Specifies file type of returned image content of the QR-Code signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return QR-Code image content in original format. 
        /// This image format is specified at <see cref="QrCodeSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than QR-Code image content in original .png will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; }
    }
```
  

Following example demonstrates how to specify QrCode Search with various options to grab QrCode image content

**Search document for QrCode signature content**

```csharp
using (Signature signature = new Signature(filePath))
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
        ReturnContent = true
    };
    // search for signatures in document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(options); //For evaluation version is 0
    Console.WriteLine("\nSource document contains following signatures.");
    foreach (var QrCodeSignature in signatures)
    {
        Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", 
            QrCodeSignature.PageNumber, QrCodeSignature.EncodeType, QrCodeSignature.Text);
        Console.WriteLine("Barcode signature size {0} and format {1}", QrCodeSignature.Content.Length, QrCodeSignature.Format);
    }
}
```

#### Public class [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) was updated with new properties for getting Barcode image content.

Public class [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) was updated with new properties.

*   New property bool [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/returncontent) was added to specify if returned QrCode signatures objects in [SignResult](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/signresult) should keep original or converted (if property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/returncontenttype) was specified) QrCode image raw data. By default this value is set to false.
*   New property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/returncontenttype) of [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) type was added to specify non default returned QrCode image content type. By default this value is set to null that means original QrCode image format will be returned.

**New properties of QrCodeSignOptions**

```csharp
    /// <summary>
    /// Represents the QR-Code signature options.
    /// </summary>
    public class QrCodeSignOptions
    {
        /// <summary>
        /// Gets or sets flag to get QR-Code image content of a signature which was put on document page.
        /// If this flag is set true, QR-Code signature image content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; }

        /// <summary>
        /// Specifies file type of returned image content of the QR-Code signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return QR-Code image content in original format. 
        /// This image format is specified at <see cref="QrCodeSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than QR-Code image content in .png format will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; } 
    }
```

  

 Following example demonstrates how to specify QrCode Sign with various options to get QrCode image content in SignResult

**Sign document and get QrCode signature content**

```csharp
using (Signature signature = new Signature("filePath"))
{
    // create QRCode option with predefined QRCode text
    QrCodeSignOptions options = new QrCodeSignOptions("12345678")
    {
        // setup QRCode encoding type
        EncodeType = QrCodeTypes.QR,
        // set signature position
        Left = 100,
        Top = 100,
        // set signature alignment
        // when VerticalAlignment is set the Top coordinate will be ignored. 
        // Use Margin properties Top, Bottom to provide vertical offset
        VerticalAlignment = VerticalAlignment.Top,
        // when HorizontalAlignment is set the Left coordinate will be ignored. 
        // Use Margin properties Left, Right to provide horizontal offset
        HorizontalAlignment = HorizontalAlignment.Right,
        Margin = new Padding() { Top = 20, Right = 20 },
        // adjust signature appearance
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.OrangeRed,
            DashStyle = DashStyle.DashLongDashDot,
            Weight = 2
        },
        // set text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
        // setup background
        Background = new Background()
        {
            Color = Color.LimeGreen,
            Transparency = 0.5,
            Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
        },
        // set field for QRCode images returning
        ReturnContent = true,
        // specify type of returned QRCode images
        ReturnContentType = FileType.PNG
    };
    // sign document to file
    SignResult signResult = signature.Sign(outputFilePath, options);
    Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
    Console.WriteLine("\nList of newly created signatures:");
    int number = 1;
    foreach (QrCodeSignature qrCodeSignature in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {qrCodeSignature.SignatureType} Id:{qrCodeSignature.SignatureId}, 
        Location: {qrCodeSignature.Left}x{qrCodeSignature.Top}. Size: {qrCodeSignature.Width}x{qrCodeSignature.Height}");
        Console.WriteLine($"Location at {qrCodeSignature.Left}-{qrCodeSignature.Top}. Size is {qrCodeSignature.Width}x{qrCodeSignature.Height}.");
        string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{qrCodeSignature.Format.Extension}");
        using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
        {
            fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
        }
        number++;
    }
}
```


Public class [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) was updated with changes as follow

*   New property **bool [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/barcodesignoptions/properties/returncontent)** was added to specify if returned QrCode signatures objects in **[SignResult](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/signresult)** should keep original or converted (if property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/returncontenttype) was specified) QrCode image raw data. By default this value is set to false.
*   New property **[ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/returncontenttype)** of [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) type was added to specify non default returned QrCode image content type. By default this value is set to null that means original QrCode image format will be returned.

```csharp
    /// <summary>
    /// Represents the QR-Code signature options.
    /// </summary>
    public class QrCodeSignOptions
    {
        /// <summary>
        /// Gets or sets flag to get QR-Code image content of a signature which was put on document page.
        /// If this flag is set true, QR-Code signature image content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; }

        /// <summary>
        /// Specifies file type of returned image content of the QR-Code signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return QR-Code image content in original format. 
        /// This image format is specified at <see cref="QrCodeSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than QR-Code image content in .png format will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; } 
    }
```

**Example**

 Following example demonstrates how to specify QrCode Sign with various options to get QrCode image content in SignResult

```csharp
            using (Signature signature = new Signature("sample.pdf"))
           {
                // create QRCode option with predefined QRCode text
                QrCodeSignOptions options = new QrCodeSignOptions("12345678")
                {
                    // setup QRCode encoding type
                    EncodeType = QrCodeTypes.QR,
                    // set signature position
                    Left = 100,
                    Top = 100,
                    // set signature alignment
                    // when VerticalAlignment is set the Top coordinate will be ignored. 
                    // Use Margin properties Top, Bottom to provide vertical offset
                    VerticalAlignment = VerticalAlignment.Top,
                    // when HorizontalAlignment is set the Left coordinate will be ignored. 
                    // Use Margin properties Left, Right to provide horizontal offset
                    HorizontalAlignment = HorizontalAlignment.Right,
                    Margin = new Padding() { Top = 20, Right = 20 },
                    // adjust signature appearance
                    // setup signature border
                    Border = new Border()
                    {
                        Visible = true,
                        Color = Color.OrangeRed,
                        DashStyle = DashStyle.DashLongDashDot,
                        Weight = 2
                    },
                    // set text color and Font
                    ForeColor = Color.Red,
                    Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
                    // setup background
                    Background = new Background()
                    {
                        Color = Color.LimeGreen,
                        Transparency = 0.5,
                        Brush = new LinearGradientBrush(Color.LimeGreen, Color.DarkGreen)
                    },
                    // set field for QRCode images returning
                    ReturnContent = true,
                    // specify type of returned QRCode images
                    ReturnContentType = FileType.PNG
                };
                // sign document to file
                SignResult signResult = signature.Sign(outputFilePath, options);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (QrCodeSignature qrCodeSignature in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {qrCodeSignature.SignatureType} Id:{qrCodeSignature.SignatureId}, 
                            Location: {qrCodeSignature.Left}x{qrCodeSignature.Top}. Size: {qrCodeSignature.Width}x{qrCodeSignature.Height}");
                    Console.WriteLine($"Location at {qrCodeSignature.Left}-{qrCodeSignature.Top}. Size is {qrCodeSignature.Width}x{qrCodeSignature.Height}.");
                    string outputImagePath = System.IO.Path.Combine(outputPath, $"image{number}{qrCodeSignature.Format.Extension}");
                    using (FileStream fs = new FileStream(outputImagePath, FileMode.Create))
                    {
                        fs.Write(qrCodeSignature.Content, 0, qrCodeSignature.Content.Length);
                    }
                    number++;
                }
            }
```
