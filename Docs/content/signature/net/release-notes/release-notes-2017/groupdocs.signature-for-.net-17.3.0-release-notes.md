---
id: groupdocs-signature-for-net-17-3-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-3-0-release-notes
title: GroupDocs.Signature for .NET 17.3.0 Release Notes
weight: 9
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.3.0{{< /alert >}}

## Major Features

There are about 20 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced Image Appearance of Digital Signature for Words and Cells Documents
*   Involved Text Signature Verification for Words, Cells and Slides Documents
*   Improved alternative Pdf Text Sticker default appearance
*   Implemented Image Signature Opacity for Words document
*   Involved Image Opacity feature for Digital Signature for Pdf Documents
*   Introduced ability to setup specified (like First, Last, Odd, Even) or arbitrary pages of Document for all Signature Types for all supported Document Types
*   Introduced ability to verify specified (like First, Last, Odd, Even) or arbitrary pages of Document of supported Signature Verification types
*   Improved properties of Image Signature - added ability to specify source of Image from guid or stream
*   Improved validation layer
*   Improved working with Digital Certificates through properties of Digital Signature Options

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2706 | Improve Digital Certificate Helper class to release disposable objects | Improvement |
| SIGNATURENET-2705 | Pdf internal resources do not work properly after using Text Sticker default appearance object | Bug |
| SIGNATURENET-2702 | Implement Text Signature Verification for Slides Documents | New Feature |
| SIGNATURENET-2700 | Implement Text Signature Verification for Word Documents | New Feature |
| SIGNATURENET-2691 | Implement Image appearance of Digital Signatures for Cells Documents | New Feature |
| SIGNATURENET-2688 | Implement Image appearance of Digital Signatures for Words Documents | New Feature |
| SIGNATURENET-2670 | Implement Image Signature Opacity for Words Documents | New Feature |
| SIGNATURENET-2665 | Implement Digital Signature Opacity for PDF Documents | New Feature |
| SIGNATURENET-2662 | Implement ability to put Text Signature on user specified Document Pages (first, last, even, odd and arbitrary pages list) for Cells Documents | New Feature |
| SIGNATURENET-2659 | Implement ability to put Digital Signature on user specified Document Pages (first, last, even, odd and arbitrary pages list) for Pdf Documents | New Feature |
| SIGNATURENET-2656 | Implement ability to put Image Signature on user specified Document Pages (first, last, even, odd and arbitrary pages list) for Pdf Documents | New Feature |
| SIGNATURENET-2650 | Implement ability to put Text Signature on user specified Document Pages (first, last, even, odd and arbitrary pages list) for Pdf Documents | New Feature |
| SIGNATURENET-2629 | Implement Image Signature Opacity for Slides Documents | New Feature |
| SIGNATURENET-2626 | Implement Image Signature Opacity for Cells Documents | New Feature |
| SIGNATURENET-2624 | Implement Image Signature Opacity for PDF Documents | New Feature |
| SIGNATURENET-2488 | Implement Text Signature Verification for Cells Documents | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.3.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new public class PagesSetup to specify arbitrary pages of Document for processing signature or verification. This class allows to specify First, Last, Odd, Even pages or arbitrary pages added to List of Page numbers.
    
    Here is an example of using this feature
    
    **Sign arbitrary pages of document**
    
    
    
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
    // setup options of signature
    PdfSignImageOptions signOptions = new PdfSignImageOptions("signature.jpg");
    // setup image size
    signOptions.Width = 100;
    signOptions.Height = 100;
    // setup pages to sign
    signOptions.PagesSetup.FirstPage = true;
    signOptions.PagesSetup.EvenPages = true;
    signOptions.PagesSetup.PageNumbers.Add(7);
    signOptions.PagesSetup.PageNumbers.Add(9);
    signOptions.PagesSetup.LastPage = true;
    // specify load options
    LoadOptions loadOptions = new LoadOptions();
    // specify save options
    CellsSaveOptions saveOptions = new CellsSaveOptions() { OutputType = OutputType.String, 
        OutputFileName = "ArbitraryPagesOfDocument" };
    // sign document
    string signedPath = handler.Sign<string>("pages15.pdf", signOptions, loadOptions, saveOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    

*   Added new Text Signature Verification classes for Cells Documents CellsVerifyTextOptions, Words Documents WordsVerifyTextOptions, Slides Documents SlidesVerifyTextOptions. These classes allow user to pass verification options object for required Document Type to find Text Signature with given Text.
    
    **Verification of Cells Document signed with Text Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output",
        CertificatesPath = @"c:\Aspose\Test\Certificates"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup digital verification options
    CellsVerifyTextOptions verifyOptions = new CellsVerifyTextOptions("John Smith");
    verifyOptions.PagesSetup.LastPage = true;
    //verify document
    VerificationResult result = handler.Verify("test_textsigned.xls", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    
    ```
    
    **Verification of Words Document signed with Text Signature**
    
    
    
    ```csharp
    // setup Signature configuration 
    SignatureConfig signConfig = new SignatureConfig
    {
     StoragePath = @"c:\Aspose\Test\Storage",
     ImagesPath = @"c:\Aspose\Test\Images",
     OutputPath = @"c:\Aspose\Test\Output",
     CertificatesPath = @"c:\Aspose\Test\Certificates"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup digital verification options
    WordsVerifyTextOptions verifyOptions = new WordsVerifyTextOptions("John Smith");
    verifyOptions.PagesSetup.FirstPage = true;
    //verify document
    VerificationResult result = handler.Verify("test_textsigned.docx", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    ```
    
    **Verification of Slides Document signed with Text Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        ImagesPath = @"c:\Aspose\Test\Images",
        OutputPath = @"c:\Aspose\Test\Output",
        CertificatesPath = @"c:\Aspose\Test\Certificates"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup digital verification options
    SlidesVerifyTextOptions verifyOptions = new SlidesVerifyTextOptions("John Smith");
    verifyOptions.PagesSetup.FirstPage = true;
    //verify document
    VerificationResult result = handler.Verify("test_textsigned.Pps", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    ```
    
*   Extended CellsSignDigitalOptions class with ability to specify Signature Image appearance on Document, added overloaded constructors to specify Certificate source over guid or stream.
    
    **Digital Signing of Cells Document**
    
    
    
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
    // setup digital signature options
    // FileStream blocks opened file while it is not disposed so, before 
    // using .pfx file for another purposes FileStream should be disposed
    Stream certificateStream = new FileStream(@"c:\Aspose\Test\Certificates\SherlockHolmes.pfx",
        FileMode.Open);
    // setup digital signature options with image appearance
    CellsSignDigitalOptions signOptions = new CellsSignDigitalOptions(certificateStream, "signature.jpg");
    signOptions.Signature.Comments = "Test comment";
    signOptions.Signature.SignTime = new DateTime(2017, 1, 25, 10, 41, 54);
    signOptions.Password = "1234567890";
    // setup opacity and rotation
    signOptions.Opacity = 0.48;
    signOptions.RotationAngle = 45;
    //put image signature only on the last page
    signOptions.PagesSetup.LastPage = true;
    // sign document
    string signedPath = handler.Sign<string>("test.xls", signOptions,
        new SaveOptions { 
            OutputType = OutputType.String,
            OutputFileName = "SignedForVerification"
        });
    //File stream must be disposed after signing
    certificateStream.Dispose();
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
*   Added Opacity property for Image Signature for all supported types
    
    **Set Opacity to Image Signature appearance for Words Documents**
    
    
    
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
    WordsSignImageOptions signOptions = new WordsSignImageOptions("signature.jpg");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Width = 200;
    signOptions.Height = 200;
    // setup rotation
    signOptions.RotationAngle = 48;
    // setup opacity
    signOptions.Opacity = 0.28;
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Image_Rotation_Opacity" });
    Console.WriteLine("Signed file path is: " + signedPath);
    
    ```
    
*   SignImageOptions class was updated with new properties ImageGuid and ImageStream to replace old properties ImageFileName.  
    ImageFileName property of SignImageOptions is marked as Obsolete  
    Method SetImage also marked as Obsolete due to similar functionality of ImageGuid property
    
*   SignDigitalOptions class was extended with new properties CertificateGuid and CertificateStream.  
    Added few overloaded constructors with combination of source for digital certificate and image appearance
*   Updated XML comments of public API methods and classes with more detailed information
