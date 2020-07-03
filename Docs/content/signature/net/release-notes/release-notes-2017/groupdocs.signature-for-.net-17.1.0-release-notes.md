---
id: groupdocs-signature-for-net-17-1-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-1-0-release-notes
title: GroupDocs.Signature for .NET 17.1.0 Release Notes
weight: 11
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.1.0{{< /alert >}}

## Major Features

There are over 30 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced alternative Text Signature implementation for all supported format Types
*   Introduced Digital Signatures Verification for all supported document formats
*   Introduced Text Signature Verification for Pdf Documents
*   Pdf Text Signature was extended with Text Annotation object and Text as rendered Image on document pages
*   Introduced ability to specify name of output file (relative or absolute)
*   Introduced Image Signature Size Adjustment for Pdf, Slides and Words Documents
*   Introduced opacity of Text Signature for Pdf and Cells Documents
*   Improved Digital Signature Options with ability to pass certificate from Stream object
*   Improved validation layer

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2499 | Implement alternative Text Signature implementation as Annotation for Pdf Documents | New Feature |
| SIGNATURENET-2491 | Implement ability to setup output file name for Save Options | New Feature |
| SIGNATURENET-2486 | Implement Text Signature Verification for Pdf Documents | New Feature |
| SIGNATURENET-2477 | Implement Unique Identifier of Text Signature for Pdf Documents | New Feature |
| SIGNATURENET-2475 | Provide alternative Text Signature implementation as Image for Slides Documents | New Feature |
| SIGNATURENET-2473 | Provide alternative Text Signature implementation as Image for Words Documents | New Feature |
| SIGNATURENET-2471 | Provide alternative Text Signature implementation as Image for Cells Documents | New Feature |
| SIGNATURENET-2469 | Provide alternative Text Signature implementation as Image for Pdf Documents | New Feature |
| SIGNATURENET-2449 | Implement ability to check, load and verify digitally signed Words documents | New Feature |
| SIGNATURENET-2447 | Implement ability to check, load and verify digitally signed Cells documents | New Feature |
| SIGNATURENET-2437 | Implement ability to check, load and verify digitally signed Pdf documents | New Feature |
| SIGNATURENET-2380 | Implement Text Signature Opacity for Cells Documents | New Feature |
| SIGNATURENET-2378 | Implement Text Signature Opacity for Pdf Documents | New Feature |
| SIGNATURENET-2190 | Implement Image Signature Size Adjustments for Slides | New Feature |
| SIGNATURENET-2186 | Implement Image Signature Size Adjustments for Words | New Feature |
| SIGNATURENET-2184 | Implement Image Signature Size Adjustments for PDF | New Feature |
| SIGNATURENET-2517 | Update Digital Verification Options with ability to pass Certificate from Stream | Improvement |
| SIGNATURENET-2516 | Update Digital Signature Options with ability to pass Certificate from Stream | Improvement |
| SIGNATURENET-2505 | Improve logic of Words finding page algorithm | Improvement |
| SIGNATURENET-2504 | Improve logic for cells text and image signature position. | Improvement |
| SIGNATURENET-2466 | Provide alternative Text Signature implementation for Pdf Documents | Improvement |
| SIGNATURENET-2431 | Provide alternative Text and Image Signature implementation for Open Office format files | Improvement |
| SIGNATURENET-2494 | Fix wrong alignment for Words Text Signature | Bug |
| SIGNATURENET-2492 | Fix Border and Transparency appearance of Text Signature for Cells Documents | Bug |
| SIGNATURENET-2464 | Text signature for Words is not visible. | Bug |
| SIGNATURENET-2458 | Intentions for a Pdf document with Text Signature don't work. | Bug |
| SIGNATURENET-2457 | Not able to set PDF/Cells test signature opacity | Bug |
| SIGNATURENET-2454 | Text signature with font and background options looks wrong | Bug |
| SIGNATURENET-2453 | Wrong exception's text for wrong password | Bug |
| SIGNATURENET-2452 | OpenOfice doesn't open .xls with default encryption method. | Bug |
| SIGNATURENET-2441 | Detection of a type of an encrypted cells file starts an inappropriate exception | Bug |
| SIGNATURENET-2322 | When saving signed Words Document to different format - signature disappears | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.1.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Updated public classes for Text Signature Options (PdfTextSignatuteOptions, CellsTextSignatuteOptions, WordsTextSignatuteOptions and SlidesTextSignatuteOptions). Text Signature Options classes were extended with Signature Implementation enumeration types per each Document Types, like PdfTextSignatureImplementation, CellsTextSignatureImplementation, WordsTextSignatureImplementation and SlidesTextSignatureImplementation.

*   Added new class SignatureAppearance that describes extended settings for specific signature implementation. Added derived classes like PdfTextAnnotationAppearance that describes additional appearance options for PdfTextSignatureImplementation.TextAnnotation enumeration type. On this page you can find example
    
    **Sign Pdf document with Text Signature as Image**
    
    
    
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
    // setup image signature options with relative path - image file stores in config.ImagesPath folder
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
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
    //type of implementation
    signOptions.SignatureImplementation = PdfTextSignatureImplementation.Image;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_TextSignatureAsImage" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
    **Sign Pdf document with Text Signature as Annotation**
    
    
    
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
    // setup image signature options with relative path - image file stores in config.ImagesPath folder
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Height = 200;
    signOptions.Width = 200;
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
    //type of implementation
    signOptions.SignatureImplementation = PdfTextSignatureImplementation.Annotation;
    // specify extended appearance options
    PdfTextAnnotationAppearance appearance = new PdfTextAnnotationAppearance();
    appearance.BorderColor = Color.Blue;
    appearance.BorderEffect = PdfTextAnnotationBorderEffect.Cloudy;
    appearance.BorderEffectIntensity = 2;
    appearance.BorderStyle = PdfTextAnnotationBorderStyle.Dashed;
    appearance.HCornerRadius = 10;
    appearance.BorderWidth = 5;
    appearance.Contents = signOptions.Text + " content description";
    appearance.Subject = "Appearance Subject";
    appearance.Title = "MrJohn Signature";
    signOptions.Appearance = appearance;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_TextSignatureAsAnnotation" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
*   Added new classes for verification options: VerifyOptions, VerifyTextOptions, VerifyDigitalOptions, PdfVerifyTextOptions, PdfVerifyDigitalOptions, CellsVerifyDigitalOptions, WordsVerifyDigitalOptions, SlidesVerifyDigitalOptions.
*   Save signed file with different file name
    
    **Output file name can be set in SaveOptions.**
    
    
    
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
    SignOptions signOptions = new CellsSignTextOptions("John Smith");
    // specify load options
    LoadOptions loadOptions = new LoadOptions();
    // specify save options
    CellsSaveOptions saveOptions = new CellsSaveOptions()
        { OutputType = OutputType.String, OutputFileName = "FileWithDifferentFileName" };
    // sign document
    string signedPath = handler.Sign<string>("test.xls", signOptions, loadOptions, saveOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
*   Verification PDF Documents signed with Text Signature
    
    **Text Verification of PDF Document**
    
    
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        OutputPath = outputPath
    };
    String text = "John Smith, esquire";
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup image signature options with relative path - image file stores in config.ImagesPath folder
    PdfSignTextOptions signOptions = new PdfSignTextOptions(text);
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.DocumentPageNumber = 1;
    // sign document
    string signedPath = handler.Sign<string>("test2pages.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_Verification_Text" });
    // setup digital verification options
    PDFVerifyTextOptions verifyOptions = new PDFVerifyTextOptions(text);
    verifyOptions.DocumentPageNumber = 1;
    
    //verify document
    VerificationResult result = handler.Verify(signedPath, verifyOptions);
    Console.WriteLine("Verification result: " + result.IsValid);
    
    ```
    
*   Verification Cells Documents signed with digital certificates
    
    **Digital Verification of Cells Document with .cer certificate container**
    
    
    
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
    // setup digital verification options
    CellsVerifyDigitalOptions verifyOptions = new CellsVerifyDigitalOptions("SherlockHolmes.cer");
    verifyOptions.Comments = "Test1";
    verifyOptions.SignDateTimeFrom = new DateTime(2017, 1, 26, 14, 55, 07);
    verifyOptions.SignDateTimeTo = new DateTime(2017, 1, 26, 14, 55, 09);
    
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.xls", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    
    **Digital Verification of Cells Document with .pfx certificate container**
    
    
    
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
    // setup digital verification options
    CellsVerifyDigitalOptions verifyOptions1 = new CellsVerifyDigitalOptions("DrWatson.pfx");
    //password is needed to open .pfx certificate
    verifyOptions1.Password = "1234567890";
    CellsVerifyDigitalOptions verifyOptions2 = new CellsVerifyDigitalOptions("SherlockHolmes.cer");
    VerifyOptionsCollection verifyOptionsCollection =
        new VerifyOptionsCollection(new List<VerifyOptions>() { verifyOptions1, verifyOptions2 });
    
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.xls", verifyOptionsCollection);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    
*   Verification PDF Documents signed with digital certificates
    
    **Digital Verification of PDF Document with .cer certificate container**
    
    
    
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
    // setup digital verification options
    PDFVerifyDigitalOptions verifyOptions = new PDFVerifyDigitalOptions("DrWatson.cer");
    verifyOptions.Reason = "Test reason";
    verifyOptions.Contact = "Test contact";
    verifyOptions.Location = "Test location";
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.pdf", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    
    **Digital Verification of PDF Document with .pfx certificate container**
    
    
    
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
    // setup digital verification options
    PDFVerifyDigitalOptions verifyOptions1 = new PDFVerifyDigitalOptions("DrWatson.pfx");
    //password is needed to open .pfx certificate
    verifyOptions1.Password = "1234567890";
    PDFVerifyDigitalOptions verifyOptions2 = new PDFVerifyDigitalOptions("SherlockHolmes.cer");
    VerifyOptionsCollection verifyOptionsCollection =
        new VerifyOptionsCollection(new List<VerifyOptions>() { verifyOptions1, verifyOptions2 });
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.pdf", verifyOptionsCollection);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    

*   Verification Words Documents signed with digital certificates
    
    **Digital Verification of Words Document with .cer certificate container**
    
    
    
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
    
    VerifyOptionsCollection verifyOptionsCollection = new VerifyOptionsCollection();
    // setup digital verification options
    WordsVerifyDigitalOptions verifyOptions = new WordsVerifyDigitalOptions("SherlockHolmes.cer");
    verifyOptions.Comments = "Test1";
    verifyOptions.SignDateTimeFrom = new DateTime(2017, 1, 26, 14, 55, 57);
    verifyOptions.SignDateTimeTo = new DateTime(2017, 1, 26, 14, 55, 59);
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.Docx", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    
    **Digital Verification of Words Document with .pfx certificate container**
    
    
    
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
    // setup digital verification options
    WordsVerifyDigitalOptions verifyOptions1 = new WordsVerifyDigitalOptions("DrWatson.pfx");
    //password is needed to open .pfx certificate
    verifyOptions1.Password = "1234567890";
    WordsVerifyDigitalOptions verifyOptions2 = new WordsVerifyDigitalOptions("SherlockHolmes.cer");
    VerifyOptionsCollection verifyOptionsCollection =
        new VerifyOptionsCollection(new List<VerifyOptions>() { verifyOptions1, verifyOptions2 });
    //verify document
    VerificationResult result = handler.Verify("test_digitalsigned.Docx", verifyOptionsCollection);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
