---
id: groupdocs-signature-for-net-17-7-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-7-0-release-notes
title: GroupDocs.Signature for .NET 17.7.0 Release Notes
weight: 5
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.7.0{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced new Stamp Signature type for all supported Document formats. This version contains implementation of dynamic Stamp Signature generation based on passed lists of Outer and Inner Stamp lines.
*   Implemented all existing standard properties support for Stamp Signature like Alignment, Fonts, positioning, border options etc
*   Introduced new Barcode encode types support - this version contains most used Barcode types - Code 11, Code 128, Code 16K/32, Databar codes, GS1 Codeblock, ISBN, ISMN, ISSN, ITF16, Pdf147 and much more.
*   Introduced new QRCode encode types like Aztec, DataMatrix, GS1 DataMatrix, GS1 QR.
*   Implemented all existing standard properties support for new QRCode Signature like Alignment, Fonts, positioning, border options etc.
*   Introduced verification support of new Barcode and QR-Code types
*   Improved verification process, update messages with detailed information
*   Optimized Barcode and QR-Code Signature verification validation

## Full List of Issues Covering all Changes in this Release
| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2937 | Implement Stamp Signature features for Slides Documents | New Feature |
| SIGNATURENET-2934 | Implement Stamp Signature features for Words Documents | New Feature |
| SIGNATURENET-2931 | Implement Stamp Signature features for Cells Documents | New Feature |
| SIGNATURENET-2928 | Implement Stamp Signature features for PDF Documents | New Feature |
| SIGNATURENET-2924 | Implement Verification of new Barcode encode types | New Feature |
| SIGNATURENET-2923 | Implement Verification of new QR-Code encode types | New Feature |
| SIGNATURENET-2921 | Implement new QR-Code encode types | New Feature |
| SIGNATURENET-2920 | Implement new Barcode encode types | New Feature |
| SIGNATURENET-2946 | Improve Barcode Verification options | Improvement |
| SIGNATURENET-2945 | Update Document Information method with extended guid properties | Improvement |
| SIGNATURENET-2922 | Improve QR-Code options validation | Improvement |
| SIGNATURENET-2901 | Improve Barcode options validation | Improvement |


## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.7.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new static variables to BarcodeTypes static class that describe new Barcode types.
    
*   Added new class **BorderLine** to describe Border of line - the color, dash style, color, etc.
    
*   **DocumentDescription** class has new properties - FileFormat - string based file format, Extension, Date created and modified.
    
*   Added new enumeration type TextMatchType - to distinct different search mechanism for Barcode and QR-Code verification and recognition.
    
*   Classes VerifyBarcodeOptions and VerifyQRcodeOptions have new property of Match Type (see above) - **MatchType** to distinct how verify recognize text from Barcode or QR Code.
    
*   mplemented new class **StampLine** that describe Stamp Ring or Stamp Horizontal Line with text.
    
*   Added new options **StampSignOptions** to describe Stamp Signature object, class derives from SignImageOptions with ability to specify Background Image. Here's example to add Stamp SIganturen
    
    ### Adding Stamp Signature to Documents
    
    Stamp Signature options are listed in classes **PdfStampSignOptions**, **CellsStampSignOptions**, **Words****StampSignOptions** and **Slides****StampSignOptions** for corresponding document type
    
    **Setup Pdf Signature Text Options**
    
    
    
    ```csharp
    // setup text signature options
    var signOptions = new PdfStampSignOptions();
     
    // OuterLines property contains list of StampLine object that describe Ring with Height, colored, borders
    // setup first external line of Stamp
    var line0 = new StampLine();
    line0.Text = " * European Union * European Union  * European Union  * European Union  * European Union  * ";
    line0.Font.FontSize = 12;
    line0.Height = 22;
    line0.TextBottomIntent = 6;
    line0.TextColor = Color.WhiteSmoke;
    line0.BackgroundColor = Color.DarkSlateBlue;
    signOptions.OuterLines.Add(line0);
    // draw another stamp ring - specify only thin 2 pixels White part
    var line1 = new StampLine();
    line1.Height = 2;
    line1.BackgroundColor = Color.White;
    signOptions.OuterLines.Add(line1);
     
    // add another Stamp ring
    var line2 = new StampLine();
    line2.Text = "* Entrepreneur * Entrepreneur ** Entrepreneur * Entrepreneur *";
    line2.TextColor = Color.DarkSlateBlue;
    line2.Font.FontSize = 15;
    line2.Height = 30;
    line2.TextBottomIntent = 8;
    line2.InnerBorder.Color = Color.DarkSlateBlue;
    line2.OuterBorder.Color = Color.DarkSlateBlue;
    line2.InnerBorder.Style = ExtendedDashStyle.Dot;
    signOptions.OuterLines.Add(line2);
     
    //Inner square lines - horizontal lines inside the rings
    var line3 = new StampLine();
    line3.Text = "John";
    line3.TextColor = Color.MediumVioletRed;
    line3.Font.FontSize = 20;
    line3.Font.Bold = true;
    line3.Height = 40;
    signOptions.InnerLines.Add(line3);
     
    var line4 = new StampLine();
    line4.Text = "Smith";
    line4.TextColor = Color.MediumVioletRed;
    line4.Font.FontSize = 20;
    line4.Font.Bold = true;
    line4.Height = 40;
    signOptions.InnerLines.Add(line4);
     
    var line5 = new StampLine();
    line5.Text = "SSN 1230242424";
    line5.TextColor = Color.MediumVioletRed;
    line5.Font.FontSize = 12;
    line5.Font.Bold = true;
    line5.Height = 40;
    signOptions.InnerLines.Add(line5);
     
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    

*   Added new classes **PdfStampSignOptions**, **CellsStampSignOptions**, **Words****StampSignOptions** and **Slides****StampSignOptions** for corresponding document type. Examples demonstrate how to use them with different options properties
    
    **Signing Cells document with Stamp Signature  
    **
    
    
    
    ```csharp
    //All examples for Cells, PDF, Slides and Words Stamp Signatures are different
    //You can find another examples in help topics for other document types
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
    // setup options with text of signature
    CellsStampSignOptions signOptions = new CellsStampSignOptions();
    signOptions.Height = 120;
    signOptions.Width = 300;
    //Inner square lines
    StampLine line0 = new StampLine();
    line0.Text = "John";
    line0.TextBottomIntent = 0;
    line0.TextColor = Color.MediumVioletRed;
    line0.OuterBorder.Color = Color.DarkSlateBlue;
    line0.InnerBorder.Color = Color.DarkSlateBlue;
    line0.InnerBorder.Style = ExtendedDashStyle.Dash;
    line0.Font.FontSize = 20;
    line0.Font.Bold = true;
    line0.Height = 40;
    signOptions.InnerLines.Add(line0);
    StampLine line1 = new StampLine();
    line1.Text = "Smith";
    line1.TextBottomIntent = 0;
    line1.TextColor = Color.MediumVioletRed;
    line1.InnerBorder.Color = Color.DarkSlateBlue;
    line1.Font.FontSize = 20;
    line1.Font.Bold = true;
    line1.Height = 40;
    signOptions.InnerLines.Add(line1);
     
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.xlsx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing PDF document with Stamp Signature**
    
    
    
    ```csharp
    //All examples for Cells, PDF, Slides and Words Stamp Signatures are different
    //You can find another examples in help topics for other document types
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
    // setup options with text of signature
    PdfStampSignOptions signOptions = new PdfStampSignOptions();
    signOptions.Height = 300;
    signOptions.Width = 300;
    //Outer round lines
    StampLine line0 = new StampLine();
    line0.Text = " * European Union * European Union  * European Union  * European Union  * European Union  * ";
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
    line2.Text = "* Entrepreneur * Entrepreneur ** Entrepreneur * Entrepreneur *";
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
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Slides document with Stamp Signature**
    
    
    
    ```csharp
    //All examples for Cells, PDF, Slides and Words Stamp Signatures are different
    //You can find another examples in help topics for other document types
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
    // setup options with text of signature
    SlidesStampSignOptions signOptions = new SlidesStampSignOptions();
    signOptions.Height = 200;
    signOptions.Width = 400;
    //Outer round lines
    StampLine line0 = new StampLine();
    line0.Text = " * John * Smith  * John * Smith  * John * Smith  * John * Smith  * John * Smith * John * Smith *  John * Smith * ";
    line0.Font.FontSize = 12;
    line0.Height = 22;
    line0.TextBottomIntent = 6;
    line0.TextColor = Color.WhiteSmoke;
    line0.BackgroundColor = Color.DarkSlateBlue;
    signOptions.OuterLines.Add(line0);
    //Inner square lines
    StampLine line1 = new StampLine();
    line1.Text = "John Smith";
    line1.TextColor = Color.MediumVioletRed;
    line1.Font.FontSize = 24;
    line1.Font.Bold = true;
    line1.Height = 100;
    signOptions.InnerLines.Add(line1);
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    signOptions.Opacity = 0.8;
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Documents_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Words document with Stamp Signature**
    
    
    
    ```csharp
    //All examples for Cells, PDF, Slides and Words Stamp Signatures are different
    //You can find another examples in help topics for other document types
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
    // setup options with text of signature
    WordsStampSignOptions signOptions = new WordsStampSignOptions();
    signOptions.Height = 300;
    signOptions.Width = 300;
    signOptions.ImageGuid = @"C:\Aspose\Test\Images\200.png";
    signOptions.BackgroundColor = Color.Aqua;
     
    //Inner square lines
    StampLine line0 = new StampLine();
    line0.Text = "John";
    line0.TextColor = Color.MediumVioletRed;
    line0.Font.FontSize = 20;
    line0.Font.Bold = true;
    line0.Height = 40;
    signOptions.InnerLines.Add(line0);
    StampLine line1 = new StampLine();
    line1.Text = "Smith";
    line1.TextColor = Color.MediumVioletRed;
    line1.Font.FontSize = 20;
    line1.Font.Bold = true;
    line1.Height = 40;
    signOptions.InnerLines.Add(line1);
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
     
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Documents_Stamp" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
