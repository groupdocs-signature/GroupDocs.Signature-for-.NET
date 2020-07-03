---
id: groupdocs-signature-for-net-17-6-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-6-0-release-notes
title: GroupDocs.Signature for .NET 17.6.0 Release Notes
weight: 6
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.6.0{{< /alert >}}

## Major Features

There are more than 20 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced new Barcode Signature type for all supported Document formats. This version contains implementation of following encoding Barcode types EAN8, EAN13, EAN14, UPCA, UPCE, ITF14, Code39 Standard, Code39 Extended, Code 128.
*   Implemented all existing standard properties support for Barcode Signature like Alignment, Fonts, positioning, border options etc
*   Introduced Barcode verification features for all supported Document formats. Trial version supports only Code39 verification feature. Barcode verification supports only implemented types from Barcode signature. More encode types and verification decode types will be provided in next releases.
*   Introduced new QRCode Signature type for all supported Document formats. This version contains implementation of most used QRCode types like QR, Aztec, Data Matrix
*   Implemented all existing standard properties support for QRCode Signature like Alignment, Fonts, positioning, border options etc.
*   Introduced QRCode verification features for all supported Document formats. Trial version supports only standard QR verification feature.
*   Improved validation messages with detailed information
*   Updated Watermark implementations features and object positioning
*   Optimized Signature processing for Cells Documents

## Full List of Issues Covering all Changes in this Release
| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2906 | Implement QRCode Signature Verification for Words Documents | New Feature |
| SIGNATURENET-2905 | Implement QRCode Signature Verification for Cells Documents | New Feature |
| SIGNATURENET-2904 | Implement QRCode Signature Verification for Pdf Documents | New Feature |
| SIGNATURENET-2903 | Implement QRCode Signature Verification for Slides Documents | New Feature |
| SIGNATURENET-2896 | Implement Barcode Signature Verification for Words Documents | New Feature |
| SIGNATURENET-2893 | Implement Barcode Signature Verification for Slides Documents | New Feature |
| SIGNATURENET-2890 | Implement Barcode Signature Verification for Cells Documents | New Feature |
| SIGNATURENET-2887 | Implement Barcode Signature Verification for Pdf Documents | New Feature |
| SIGNATURENET-2872 | Implement QR-code Signature features for Slides Documents | New Feature |
| SIGNATURENET-2869 | Implement QR-code Signature features for Words Documents | New Feature |
| SIGNATURENET-2866 | Implement QR-code Signature features for Cells Documents | New Feature |
| SIGNATURENET-2863 | Implement QR-code Signature features for PDF Documents | New Feature |
| SIGNATURENET-2857 | Implement Barcode Signature features for Slides Documents | New Feature |
| SIGNATURENET-2854 | Implement Barcode Signature features for Words Documents | New Feature |
| SIGNATURENET-2851 | Implement Barcode Signature features for Cells Documents | New Feature |
| SIGNATURENET-2848 | Implement Barcode Signature features for PDF Documents | New Feature |
| SIGNATURENET-2267 | Digital Signature for Open Document support | New Feature |
| SIGNATURENET-2879 | Improve validation messages with detailed information | Improvement |
| SIGNATURENET-2826 | Implement positioning subsystem for watermarks signatures | Improvement |
| SIGNATURENET-2539 | Error occurred when passing Digital PFX Certificate file rendered by DSA Algorithm | Bug |


## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.6.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new classes that describe Barcode types. Class **BarcodeType** contains description of Barcode encoding type, name and index in list of supported types. Newly added static class **BarcodeTypes**  contains static objects of each supported Barcode type, same as list of all registered types in **AllTypes** array property.
    
    Here is an example of using this feature:
    
    **Setup Pdf Signature Text Options**
    
    
    
    ```csharp
    // setup text signature options
    var signOptions = new PdfBarcodeSignOptions();
    // barcode type
    signOptions.EncodeType = BarcodeTypes.EAN14;
    // signature text
    signOptions.Text = "12345678901234";
    // text position
    signOptions.HorizontalAlignment = HorizontalAlignment.Right;
    signOptions.VerticalAlignment = VerticalAlignment.Bottom;
    ```
    

*   Base class **BarcodeSignOptions** was added. This class inherits from SignTextOptions and implements all inherited properties and interfaces like Alignment, Opacity, etc. For each supported Document Type appropriate Signature Options were added **CellsBarcodeSignOptions**, **PdfBarcodeSignOptions**, **SlidesBarcodeSignOptions** and **WordsBarcodeSignOptions**. See examples of using new Signature type per each Document Format on these links
    
    **Signing Cells document with Barcode Signature**
    
    
    
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
    // setup options with text of signature
    CellsBarcodeSignOptions signOptions = new CellsBarcodeSignOptions("12345678");
    // barcode type
    signOptions.EncodeType = BarcodeTypes.Code39Standard; 
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.xls", signOptions, 
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_BarCode"});
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing PDF document with Barcode Signature**
    
    
    
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
    // setup options with text of signature
    PdfBarcodeSignOptions signOptions = new PdfBarcodeSignOptions("12345678");
    // barcode type
    signOptions.EncodeType = BarcodeTypes.Code39Standard;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_BarCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Slides document with Barcode Signature**
    
    
    
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
    // setup options with text of signature
    SlidesBarcodeSignOptions signOptions = new SlidesBarcodeSignOptions("12345678");
    // barcode type
    signOptions.EncodeType = BarcodeTypes.Code39Extended;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Documents_BarCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing Words document with Barcode Signature**
    
    
    
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
    // setup options with text of signature
    WordsBarcodeSignOptions signOptions = new WordsBarcodeSignOptions("12345678");
    // barcode type
    signOptions.EncodeType = BarcodeTypes.Code39Extended;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Documents_BarCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
*   Added new classes that describe QR-code types. Class **QRCodeType** contains description of QR-code encoding type, name and index in list of supported types. Newly added static class **QRCodeTypes**  contains static objects of each supported QRCode type, same as list of all registered types in **AllTypes** array property.  
    Barcode Signature options are listed in classes **PdfQRCodeodeSignOptions**, **Cells**QRC**odeSignOptions**, **Words******QRC**odeSignOptions** and **Slides******QRC**odeSignOptions** for corresponding document type  
    The following examples shows the usage of this feature:
    
    **Adding QR-code to Documents**
    
    
    
    ```csharp
    // setup text signature options
    var signOptions = new PdfQRCodeSignOptions();
    //QR-code type
    signOptions.EncodeType = QRCodeTypes.QR;
    // signature text
    signOptions.Text = "12345678901234";
    // text position
    signOptions.HorizontalAlignment = HorizontalAlignment.Right;
    signOptions.VerticalAlignment = VerticalAlignment.Bottom;
    ```
    
*   Base class **QRCodeSignOptions** was added. This class inherits from SignTextOptions and implements all inherited properties and interfaces like Alignment, Opacity, etc. For each supported Document Type appropriate Signature Options were added **CellsQRCodeSignOptions**, **PdfQRCodeSignOptions**, **SlidesQRCodeSignOptions** and **WordsQRCodeSignOptions**. See examples of using new Signature type per each Document Format on these links
    
    **Signing Cells document with QR-code Signature**
    
    
    
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
    // setup options with text of signature
    CellsQRCodeSignOptions signOptions = new CellsQRCodeSignOptions("12345678");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.Aztec;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.xls", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_QRCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **Signing PDF document with QR-code Signature**
    
    
    
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
    // setup options with text of signature
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions("12345678");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.Aztec;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_QRCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    
    ```
    
    **Signing Slides document with QR-code Signature**
    
    
    
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
    // setup options with text of signature
    SlidesQRCodeSignOptions signOptions = new SlidesQRCodeSignOptions("12345678");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.Aztec;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Documents_QRCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    
    ```
    
    **Signing Words document with QR-code Signature**
    
    
    
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
    // setup options with text of signature
    WordsQRCodeSignOptions signOptions = new WordsQRCodeSignOptions("12345678");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.Aztec;
    // if you need to sign all sheets set it to true
    signOptions.SignAllPages = true;
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Documents_QRCode" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
*   For verification purposes of newly added Signature types new classes were added. Base class **VerifyBarcodeOptions**. This class inherits from **VerifyTextOptions** and implements all inherited properties like Text, VerifyPages, PagesSetup etc.
    
    **Verification of  Barcode Signature**
    
    
    
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
    PDFVerifyBarcodeOptions verifyOptions = new PDFVerifyBarcodeOptions();
    // verify only page with specified number
    verifyOptions.DocumentPageNumber = 1;
    // verify all pages of a document if true
    verifyOptions.VerifyAllPages = true;
    // barcode type
    verifyOptions.EncodeType = BarcodeTypes.Code39Standard;
    //If verify option Text is set, it will be searched in Title, Subject and Contents
    verifyOptions.Text = "12345678";
    //verify document
    VerificationResult result = handler.Verify("SignedBarCode.pdf", verifyOptions);
     
    Console.WriteLine("Verification result is: " + result.IsValid);
    
    ```
