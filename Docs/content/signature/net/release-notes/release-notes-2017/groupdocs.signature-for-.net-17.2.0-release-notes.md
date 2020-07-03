---
id: groupdocs-signature-for-net-17-2-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-2-0-release-notes
title: GroupDocs.Signature for .NET 17.2.0 Release Notes
weight: 10
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.2.0{{< /alert >}}

## Major Features

There are about 30 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced alternative Text Signature Sticker implementation for Pdf Document
*   Introduced Text Signature Adjustments for all supported document formats
*   Introduced Rotation options for Text Signature for all supported Document types
*   Improved Alignment algorithms for Text and Image Signature formats
*   Introduced Rotation options for Image Signature for all supported Document types
*   Improved Image Signature Size Adjustment for all Document Types
*   Improved Opacity Implementation for Text Signature for Pdf Documents
*   Involved Dynabic Metered features
*   Improved validation layer

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2605 | Implement Text Signature Size Adjustments for Slides | New Feature |
| SIGNATURENET-2603 | Implement Text Signature Size Adjustments for Words | New Feature |
| SIGNATURENET-2601 | Implement Text Signature Size Adjustments for Cells | New Feature |
| SIGNATURENET-2598 | Implement Text Signature Size Adjustments for PDF | New Feature |
| SIGNATURENET-2593 | Implement extended properties for Text Stamp Implementation signature of Pdf Documents | New Feature |
| SIGNATURENET-2581 | Implement Text Signature Opacity for Words Documents | New Feature |
| SIGNATURENET-2579 | Implement Text Signature Opacity for Slides Documents | New Feature |
| SIGNATURENET-2569 | Implement verification for Pdf Text Sticker Annotation Signature | New Feature |
| SIGNATURENET-2564 | Implement alternative Text Signature implementation as Sticker (TextAnnotation) for Pdf Documents | New Feature |
| SIGNATURENET-2217 | Implement Image Signature free angle rotation for Slides | New Feature |
| SIGNATURENET-2215 | Implement Image Signature free angle rotation for Words | New Feature |
| SIGNATURENET-2213 | Implement Image Signature free angle rotation for Cells | New Feature |
| SIGNATURENET-2211 | Implement Image Signature free angle rotation for PDF | New Feature |
| SIGNATURENET-2188 | Implement Image Signature Size Adjustments for Cells | New Feature |
| SIGNATURENET-2142 | Implement Image Signature rotation for Slides | New Feature |
| SIGNATURENET-2140 | Implement Image Signature rotation for Cells | New Feature |
| SIGNATURENET-2138 | Implement Image Signature rotation for Words | New Feature |
| SIGNATURENET-2136 | Implement Image Signature rotation for PDF | New Feature |
| SIGNATURENET-2126 | Implement Text Signature rotation for Slides | New Feature |
| SIGNATURENET-2124 | Implement Text Signature rotation for Cells | New Feature |
| SIGNATURENET-2122 | Implement Text Signature rotation for Words | New Feature |
| SIGNATURENET-2120 | Implement Text Signature rotation for Pdf | New Feature |
| SIGNATURENET-2607 | Multiple signature options for Words Documents are intersecting in same Word Node | Bug |
| SIGNATURENET-2589 | When processing Pdf document with Digital Signature in iterative mode document saved incorrectly | Bug |
| SIGNATURENET-2571 | Apply lower case for output file extension | Bug |
| SIGNATURENET-2556 | Fix background appearance of Text Annotation of Pdf Documents Pages | Bug |
| SIGNATURENET-2547 | Pdf Text Verification doesn't get list of Annotations from Pdf Document | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.2.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new public interfaces. IRectangle interface describes Signature Area with Left, Top, Width and Height. IAlignment interface describes Alignment and Margins of Signature Area. IRotation interface describes Rotation property of Signature Area. IOpacity interface describes opacity value for Signature appearance Existing Signature Options like SignTextOptions, SignImageOptions and SignDigitalOptions implement these interfaces.

*   Added new enumeration type for Pdf Signature Implementation - Sticker. For Pdf Sticker Implementation new class PdfTextStickerAppearance was added to describe additional properties of Sticker area appearance on page. Added new enumeration types PdfTextStickerIcon to describes available values for Pdf Text Sticker Icon Appearance and PdfTextStickerState to describe initial state of Sticker on page.

*   Updated public classes for Pdf Text Signature Verifications to verify Stamp, Sticker and TextAnnotation implementation separately.
    
    **Verification of PDF Document signed with Text Signature Sticker**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup verification options
    PDFVerifyTextOptions verifyOptions = new PDFVerifyTextOptions();
    // specify verification type
    verifyOptions.SignatureImplementation = PdfTextSignatureImplementation.Sticker;
    // verify only page with specified number
    verifyOptions.DocumentPageNumber = 1;
    // verify all pages of a document if true
    verifyOptions.VerifyAllPages = true;
    //If verify option Text is set, it will be searched in Title, Subject and Contents
    verifyOptions.Text = "Contents";
    // create Verify Extensions
    PdfTextStickerVerifyExtensions extensions = new PdfTextStickerVerifyExtensions();
    //If verify option is set, then appropriate property of Sticker must be equals
    extensions.Contents = "Contents";
    extensions.Subject = "Subject";
    extensions.Title = "Title";
    extensions.Icon = PdfTextStickerIcon.Cross;
    // set extensions to verification options
    verifyOptions.Extensions = extensions;
    //verify document
    VerificationResult result = handler.Verify("test_text_sticker.pdf", verifyOptions);
    Assert.IsTrue(result.IsValid, "Verification fails");
    Console.WriteLine("Verification result is: " + result.IsValid);
    
    ```
    
*   **Verification of PDF Document signed with Text Signature Annotation**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup verification options
    PDFVerifyTextOptions verifyOptions = new PDFVerifyTextOptions();
    // specify verification type
    verifyOptions.SignatureImplementation = PdfTextSignatureImplementation.Annotation;
    // verify only page with specified number
    verifyOptions.DocumentPageNumber = 1;
    // verify all pages of a document if true
    verifyOptions.VerifyAllPages = true;
    //If verify option Text is set, it will be searched in Title, Subject and Contents
    verifyOptions.Text = "John Smith_1";
    // create Verify Extensions
    PdfTextAnnotationVerifyExtensions extensions = new PdfTextAnnotationVerifyExtensions();
    //If verify option is set, then appropriate property of Annotation must be equals
    extensions.Contents = "John Smith_1";
    extensions.Subject = "John Smith_2";
    extensions.Title = "John Smith_3";
    // set extensions to verification options
    verifyOptions.Extensions = extensions;
    //verify document
    VerificationResult result = handler.Verify("test_text_annotation.pdf", verifyOptions);
    Assert.IsTrue(result.IsValid, "Verification fails");
    Console.WriteLine("Verification result is: " + result.IsValid);
    
    ```
    

*   Base class for Text Signature SignTextOptions was extended with Location and Size Adjustment features. New properties LocationMeasureType and SizeMeasureType describe ability to specify position of signature area in pixel or in percents per page size.

*   Sign Pdf Documents with Text Signature As Sticker
    
    **Sign Pdf Documents with Text Signature As Sticker**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup signature options
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.Left = 10;
    signOptions.Top = 10;
    signOptions.HorizontalAlignment = HorizontalAlignment.Right;
    signOptions.VerticalAlignment = VerticalAlignment.Bottom;
    signOptions.Margin = new Padding(10);
    signOptions.BackgroundColor = Color.Red;
    signOptions.Opacity = 0.5;
    //type of implementation
    signOptions.SignatureImplementation = PdfTextSignatureImplementation.Sticker;
    // an appearance customizes more specific options
    PdfTextStickerAppearance appearance = new PdfTextStickerAppearance();
    signOptions.Appearance = appearance;
    // text content of an sticker
    appearance.Title = "Title";
    appearance.Subject = "Subject";
    appearance.Contents = "Contents";
    // is sticker opened by default
    appearance.Opened = false;
    // an icon of a sticker on a page
    appearance.Icon = PdfTextStickerIcon.Star;
    //If custom appearance is not set there will be used DefaultAppearance
    //User can change any parameter of DefaultAppearance
    //PdfTextStickerAppearance.DefaultAppearance.Title = "Title";
    //PdfTextStickerAppearance.DefaultAppearance.Subject = "Subject";
    //PdfTextStickerAppearance.DefaultAppearance.Contents = "Contents";
    //PdfTextStickerAppearance.DefaultAppearance.Opened = false;
    //PdfTextStickerAppearance.DefaultAppearance.State = PdfTextStickerState.Completed;
    //PdfTextStickerAppearance.DefaultAppearance.Icon = PdfTextStickerIcon.Note;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_TextSignatureAsSticker" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
*   Add Rotation to Text Signature appearance
    
    **Add Rotation to Text Signature appearance**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup appearance options
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.Font.FontSize = 32;
    signOptions.BackgroundColor = Color.BlueViolet;
    signOptions.ForeColor = Color.Orange;
    signOptions.Left = 200;
    signOptions.Top = 200;
    // setup rotation
    signOptions.RotationAngle = 48;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Text_Rotation" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    

*   Add Transparency and Rotation to Text Signature appearance
    
    **Add Transparency and Rotation to Text Signature appearance for Slides**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup appearance options
    SlidesSignTextOptions signOptions = new SlidesSignTextOptions("John Smith");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Width = 200;
    signOptions.Height = 200;
    signOptions.ForeColor = Color.Orange;
    signOptions.BackgroundColor = Color.BlueViolet;
    signOptions.BorderColor = Color.Orange;
    signOptions.BorderWeight = 5;
    // setup rotation
    signOptions.RotationAngle = 48;
    // setup transparency
    signOptions.BackgroundTransparency = 0.4;
    signOptions.BorderTransparency = 0.8;
    // sign document
    string signedPath = handler.Sign<string>("test.ppt", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Text_Transparency_Rotation" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    

*   Add Rotation to Image Signature appearance
    
    **Add Rotation to Image Signature appearance**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    string imagePath = @"c:\Aspose\Test\Images";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        ImagesPath = imagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    //setup size and position
    PdfSignImageOptions signOptions = new PdfSignImageOptions("signature.jpg");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Width = 200;
    signOptions.Height = 200;
    // setup rotation
    signOptions.RotationAngle = 48;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Image_Rotation" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
