---
id: groupdocs-signature-for-net-17-8-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-8-0-release-notes
title: GroupDocs.Signature for .NET 17.8.0 Release Notes
weight: 4
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.8.0{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced Image file formats support for all existing Signature types. Since this version SignatureHandler class supports images as source documents for Signature or Verification features.
*   Implemented all existing standard properties support for Image Documents like positioning, alignment, applying Fonts, opacity, border options etc
*   Improved Stamp Signature with few additional abilities to specify different background options and setup color or image for these purposes.
*   Introduced Image Save Options with ability to convert output image document to most used image file formats like jpg, png, gif, tiff, svg etc.
*   Implemented verification of all existing Signature types (except Digital) for Image documents.
*   Improved signature process, update exception messages with localized strings
*   Optimized Input Data Handler usage for certificate and image resources
*   Improved Digital Signature for Open Office Words format files like odt or ott types

## Full List of Issues Covering all Changes in this Release
| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3013 | Add ability to crop background color by inner line for Stamp Signatures. | Improvement |
| SIGNATURENET-2959 | Add ability to crop background image by inner line for Stamp Signatures. | Improvement |
| SIGNATURENET-2267 | Digital Signature for Open Document files format support | New Feature |
| SIGNATURENET-2954 | Implement ability to repeat text for Stamp Signatures | New Feature |
| SIGNATURENET-2993 | Implement ability to save Image Documents in different formats | New Feature |
| SIGNATURENET-3021 | Implement ability to use Custom InputDataHandler for Certificates and Images resources | Improvement |
| SIGNATURENET-2984 | Implement BarCode Signature features for Image Documents | New Feature |
| SIGNATURENET-2997 | Implement Barcode Signature Verification for Image Documents | New Feature |
| SIGNATURENET-2981 | Implement Image Signature features for Image Documents | New Feature |
| SIGNATURENET-2987 | Implement QR-Code Signature features for Image Documents | New Feature |
| SIGNATURENET-3000 | Implement QR-Code Signature Verification for Image Documents | New Feature |
| SIGNATURENET-2990 | Implement Stamp Signature features for Image Documents | New Feature |
| SIGNATURENET-2978 | Implement Text Signature features for Image Documents | New Feature |
| SIGNATURENET-2943 | Implement Verification of Digital Signature Type for Pdf Documents | Improvement |


## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.8.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added scope of Options classes to support Image documents signature processing. New classes describes target properties for different Signature type of Image files - **ImagesSignTextOptions** - Text Signature properties, **ImagesSignImageOptions** - Image Signature, **ImagesBarcodeSignOptions** - keeps Barcode Options for Image files, **ImagesQRCodeSignOptions** \- QR-Code Signature options, **ImagesStampSignOptions** - Stamp Signature Options for Image files. See public API examples to work with Image files.
    
    **Sign Images document with Text Signature as image**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup text signature options
    ImagesSignTextOptions signOptions = new ImagesSignTextOptions("John Smith");
    signOptions.Left = 10;
    signOptions.Top = 10;
    signOptions.Width = 100;
    signOptions.Height = 100;
    signOptions.DocumentPageNumber = 1;
    // setup background settings
    signOptions.BackgroundColor = System.Drawing.Color.Beige;
    signOptions.BackgroundTransparency = 0.5;
     
    // setup border settings
    signOptions.BorderColor = System.Drawing.Color.Black;
    signOptions.BorderDashStyle = GroupDocs.Signature.Domain.ExtendedDashStyle.LongDash;
    signOptions.BorderWeight = 1.2;
    signOptions.BorderTransparency = 0.5;
     
    // setup text color
    signOptions.ForeColor = System.Drawing.Color.Red;
    // setup Font options
    signOptions.Font.Bold = true;
    signOptions.Font.Italic = true;
    signOptions.Font.Underline = true;
    signOptions.Font.FontFamily = "Arial";
    signOptions.Font.FontSize = 15;
     
    // type of implementation
    signOptions.SignatureImplementation = ImagesTextSignatureImplementation.TextAsImage;
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", signOptions, 
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Images_Text_AsImage"});
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Images document with Barcode Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    SignatureOptionsCollection collection = new SignatureOptionsCollection();
     
    // barcode type Code39Standard
    ImagesBarcodeSignOptions signOptions = new ImagesBarcodeSignOptions("12345678");
    signOptions.EncodeType = BarcodeTypes.Code39Standard;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    collection.Add(signOptions);
     
    // barcode type DutchKIX
    signOptions = new ImagesBarcodeSignOptions("12345678");
    signOptions.EncodeType = BarcodeTypes.DutchKIX;
    signOptions.Top = 300;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    collection.Add(signOptions);
     
    // barcode type DatabarLimited
    signOptions = new ImagesBarcodeSignOptions("12345678");
    signOptions.EncodeType = BarcodeTypes.DatabarLimited;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    signOptions.Top = 600;
    collection.Add(signOptions);
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", collection,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_BarCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Images document with QR-code Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    SignatureOptionsCollection collection = new SignatureOptionsCollection();
     
    // QRCode type Aztec
    ImagesQRCodeSignOptions signOptions = new ImagesQRCodeSignOptions("12345678");
    signOptions.EncodeType = QRCodeTypes.Aztec;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    collection.Add(signOptions);
     
    // QRCode type DataMatrix
    signOptions = new ImagesQRCodeSignOptions("12345678");
    signOptions.EncodeType = QRCodeTypes.DataMatrix;
    signOptions.Top = 300;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    collection.Add(signOptions);
     
    // QRCode type QR
    signOptions = new ImagesQRCodeSignOptions("12345678");
    signOptions.EncodeType = QRCodeTypes.QR;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.VerticalAlignment = VerticalAlignment.None;
    signOptions.Top = 600;
    collection.Add(signOptions);
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", collection,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_QRCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Images document with Stamp Signature**
    
    
    
    ```csharp
    //All examples for Cells, PDF, Slides, Words and Images Stamp Signatures are different
    //You can find another examples in help topics for other document types
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options
    ImagesStampSignOptions signOptions = new ImagesStampSignOptions();
    signOptions.Height = 300;
    signOptions.Width = 300;
    signOptions.BackgroundColor = Color.DarkOrange;
    signOptions.BackgroundColorCropType = StampBackgroundCropType.OuterArea; //This feature is supported starting from version 17.08
    signOptions.ImageGuid = @"C:\Aspose\Test\Images\300.png";
    signOptions.BackgroundImageCropType = StampBackgroundCropType.InnerArea; //This feature is supported starting from version 17.08
     
    //Outer round lines
    StampLine line0 = new StampLine();
    line0.Text = "* European Union *";
    line0.TextRepeatType = StampTextRepeatType.FullTextRepeat; //This feature is supported starting from version 17.08
    line0.Font.FontSize = 12;
    line0.Height = 22;
    line0.TextBottomIntent = 6;
    line0.TextColor = Color.WhiteSmoke;
    line0.BackgroundColor = Color.DarkSlateBlue;
    signOptions.OuterLines.Add(line0);
     
    StampLine line1 = new StampLine();
    line1.Height = 2;
    line1.BackgroundColor = Color.White;
    signOptions.OuterLines.Add(line1);
     
    StampLine line2 = new StampLine();
    line2.Text = "* Entrepreneur *";
    line2.TextRepeatType = StampTextRepeatType.FullTextRepeat; //This feature is supported starting from version 17.08
    line2.TextColor = Color.DarkSlateBlue;
    line2.Font.FontSize = 15;
    line2.Height = 30;
    line2.TextBottomIntent = 8;
    line2.InnerBorder.Color = Color.DarkSlateBlue;
    line2.OuterBorder.Color = Color.DarkSlateBlue;
    line2.InnerBorder.Style = ExtendedDashStyle.Dot;
    signOptions.OuterLines.Add(line2);
     
    //Inner square lines
    StampLine line3 = new StampLine();
    line3.Text = "John";
    line3.TextColor = Color.MediumVioletRed;
    line3.Font.FontSize = 20;
    line3.Font.Bold = true;
    line3.Height = 40;
    signOptions.InnerLines.Add(line3);
     
    StampLine line4 = new StampLine();
    line4.Text = "Smith";
    line4.TextColor = Color.MediumVioletRed;
    line4.Font.FontSize = 20;
    line4.Font.Bold = true;
    line4.Height = 40;
    signOptions.InnerLines.Add(line4);
     
    StampLine line5 = new StampLine();
    line5.Text = "SSN 1230242424";
    line5.TextColor = Color.MediumVioletRed;
    line5.Font.FontSize = 12;
    line5.Font.Bold = true;
    line5.Height = 40;
    signOptions.InnerLines.Add(line5);
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
*   For Verification purposes following Options classes were added to support verification of Image Files. **ImagesVerifyBarcodeOptions** - keeps options to verify Barcode Signature on Image files, **ImagesVerifyQRCodeOptions** - keeps options to verify QRcode Signature, Following examples demonstrates how to use Verification Options for Image Documents.
    
    **Verification Images Documents signed with Barcode Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    VerifyOptionsCollection collection = new VerifyOptionsCollection();
     
    // setup verification options Code39Standard
    ImagesVerifyBarcodeOptions verifyOptions = new ImagesVerifyBarcodeOptions();
    verifyOptions.EncodeType = BarcodeTypes.Code39Standard;
    verifyOptions.MatchType = TextMatchType.Exact;
    verifyOptions.Text = "12345678";
    collection.Add(verifyOptions);
     
    // setup verification options DutchKIX
    verifyOptions = new ImagesVerifyBarcodeOptions();
    verifyOptions.EncodeType = BarcodeTypes.DutchKIX;
    verifyOptions.MatchType = TextMatchType.StartsWith;
    verifyOptions.Text = "1234";
    collection.Add(verifyOptions);
     
    // setup verification options DatabarLimited
    verifyOptions = new ImagesVerifyBarcodeOptions();
    verifyOptions.EncodeType = BarcodeTypes.DatabarLimited;
    verifyOptions.MatchType = TextMatchType.Contains;
    verifyOptions.Text = "5678";
    collection.Add(verifyOptions);
     
    //verify document
    VerificationResult result = handler.Verify("SignedBarCode.png", collection);
    Console.WriteLine("Verification result is: " + result.IsValid);
    ```
    
    **Verification Images Documents signed with QR-code Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the  handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    VerifyOptionsCollection collection = new VerifyOptionsCollection();
     
    // setup verification options Aztec
    ImagesVerifyQRCodeOptions verifyOptions = new ImagesVerifyQRCodeOptions();
    verifyOptions.EncodeType = QRCodeTypes.Aztec;
    verifyOptions.MatchType = TextMatchType.Exact;
    verifyOptions.Text = "12345678";
    collection.Add(verifyOptions);
     
    // setup verification options DataMatrix
    verifyOptions = new ImagesVerifyQRCodeOptions();
    verifyOptions.EncodeType = QRCodeTypes.DataMatrix;
    verifyOptions.MatchType = TextMatchType.StartsWith;
    verifyOptions.Text = "1234";
    collection.Add(verifyOptions);
     
    // setup verification options QR
    verifyOptions = new ImagesVerifyQRCodeOptions();
    verifyOptions.EncodeType = QRCodeTypes.QR;
    verifyOptions.MatchType = TextMatchType.Contains;
    verifyOptions.Text = "5678";
    collection.Add(verifyOptions);
     
    //verify document
    VerificationResult result = handler.Verify("SignedQRCode.png", collection);
    Console.WriteLine("Verification result is: " + result.IsValid);
    ```
    
*   Added new enumeration type **StampBackgroundCropType** that specifies crop type of background layer on Stamp elements. **StampSignOptions** class was updated with two properties of this enumeration type **BackgroundColorCropType** to specify background color cropping on Stamp elements and **BackgroundImageCropType** to specify background image intersection with another elements.
*   Added new enumeration type **StampTextRepeatType** to specify text repeating along Stamp line length.  **StampLine** class was updated with **StampTextRepeatType **property to setup Text repeat type.
*   Implemented list of Save Image format types in enumeration **ImagesSaveFileFormat**, same as new Save Options classes were added to support different output image format types. Base class **ImagesSaveOptions** that contains save file format, following classes derive base ImagesSaveOptions class and keep properties for exact Image file format. **PngSaveOptions** - to save output image document in Png format, **JpegSaveOptions** - to save output in jpeg image format, **BmpSaveOptions** - supports bmp output file, **GifSaveOptions** keeps options for gif format, **TiffSaveOptions** keeps Tiff file format settings.
*   Public classes TrialException, LicenseException and FileNotSupportedException were marked as Obsolete and will be removed in 4 releases. All Exceptions raised from library will have GroupDocsSigantureException type.
    
    #### Saving signed Images Documents with different output file type
    
    When saving signed Images document there is ability to specify **ImagesSaveOptions** class variable with required output format using **ImagesSaveFileFormat **enum.
    
    There also **JpegSaveOptions,**   **BmpSaveOptions**  and  **TiffSaveOptions**  to set up more precision setting for these types of images.
    
    **Saving signed Images Documents with different output file type**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup text signature options
    SignOptions signOptions = new ImagesSignTextOptions("John Smith");
     
    //Webp
    ImagesSaveOptions optionsWebp = new ImagesSaveOptions();
    optionsWebp.OutputType = OutputType.String;
    optionsWebp.FileFormat = ImagesSaveFileFormat.Webp;
    optionsWebp.OutputFileName = "Images_WithDifferentOutputFileType_Webp";
    string signedPath = handler.Sign<string>("test.png", signOptions, optionsWebp);
     
    // save to Jpeg format with specific options
    JpegSaveOptions saveOptionsJpeg = new JpegSaveOptions();
    saveOptionsJpeg.OutputType = OutputType.String;
    saveOptionsJpeg.ColorType = JpegCompressionColorMode.Cmyk;
    saveOptionsJpeg.CompressionType = JpegCompressionMode.Progressive;
    saveOptionsJpeg.OutputFileName = "Images_WithDifferentOutputFileType_Jpeg";
    signedPath = handler.Sign<string>("test.png", signOptions, saveOptionsJpeg);
     
    // save to Bmp format with specific options
    BmpSaveOptions saveOptionsBmp = new BmpSaveOptions();
    saveOptionsBmp.OutputType = OutputType.String;
    saveOptionsBmp.Compression = BitmapCompression.Rgb;
    saveOptionsBmp.HorizontalResolution = 120;
    saveOptionsBmp.VerticalResolution = 120;
    saveOptionsBmp.OutputFileName = "Images_WithDifferentOutputFileType_Bmp";
    signedPath = handler.Sign<string>("test.png", signOptions, saveOptionsBmp);
     
    // save to Tiff format with specific options
    TiffSaveOptions saveOptionsTiff = new TiffSaveOptions();
    saveOptionsTiff.OutputType = OutputType.String;
    saveOptionsTiff.ExpectedTiffFormat = TiffFormat.TiffCcitRle;
    saveOptionsTiff.OutputFileName = "Images_WithDifferentOutputFileType_Tiff";
    signedPath = handler.Sign<string>("test.png", signOptions, saveOptionsTiff);
    ```
    

*   #### Add Transparency and Rotation to Text Signature appearance
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup appearance options
    ImagesSignTextOptions signOptions = new ImagesSignTextOptions("John Smith");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Width = 200;
    signOptions.Height = 200;
    signOptions.ForeColor = Color.Orange;
    signOptions.BackgroundColor = Color.BlueViolet;
     
    // setup rotation
    signOptions.RotationAngle = 90;
     
    // setup transparency
    signOptions.BackgroundTransparency = 0.4;
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Images_Text_Transparency_Rotation" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Images Documents with Text Signature As Watermark**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    
    // setup text signature options
    ImagesSignTextOptions signOptions = new ImagesSignTextOptions("John Smith");
    signOptions.Font.FontSize = 64;signOptions.Font.Bold = true;
    signOptions.Font.Italic = true;
    signOptions.Font.Underline = true;
    signOptions.Opacity = 0.7;
    signOptions.ForeColor = Color.BlueViolet;
    // type of implementation
    signOptions.SignatureImplementation = ImagesTextSignatureImplementation.Watermark; 
    // sign document
    string signedPath = handler.Sign<string>("test.png", signOptions,    new SaveOptions { OutputType = OutputType.String, OutputFileName = "Images_TextSignatureWatermark"});Console.WriteLine("Signed file path is: " + signedPath);
    ```
