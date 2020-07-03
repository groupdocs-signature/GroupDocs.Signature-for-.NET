---
id: groupdocs-signature-for-net-17-5-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-5-0-release-notes
title: GroupDocs.Signature for .NET 17.5.0 Release Notes
weight: 7
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.5.0{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. The most notable are:

*   Implemented non-static methods to obtain Document information like getting count of document pages, size of each page and obtain document page image. Non-static methods allow to use custom input data handler to obtain document stream based passed guid identifier.
*   Introduced alternative Text Signature implementation as Watermark for all Document Types.
*   Introduced ability to specify measure units of Signature in millimeters for all Signature Types and Document Types.
*   Improved Signature Area positioning by ability to specify different measure units for location, size and margins properties
*   Optimized Signature processing for Words Documents
*   Introduced ability to put Text Signature into Form Fields of Words Documents
*   Introduced ability to put Text Signature into predefined fields for PDF Documents
*   Implemented verification of Text Signature for Form Fields of Words Documents
*   Implemented verification for Form Fields of Pdf Documents with Text Signature

## Full List of Issues Covering all Changes in this Release
| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2785 | Implement ability to put Text Signature into Form Fields of Words Documents | New Feature |
| SIGNATURENET-2788 | Implement ability to put Text Signature into Template/Form Fields of Pdf Documents | New Feature |
| SIGNATURENET-2798 | Implement ability to specify new Measure Units Millimeters for Pdf Signatures | New Feature |
| SIGNATURENET-2804 | Implement ability to specify new Measure Units Millimeters for Slides Signatures | New Feature |
| SIGNATURENET-2801 | Implement ability to specify new Measure Units Millimeters for Words Signatures | New Feature |
| SIGNATURENET-2768 | Implement Document information features into non static method of Signature Handler | Improvement |
| SIGNATURENET-2810 | Implement Watermark feature for Text Signature of Cells Documents | New Feature |
| SIGNATURENET-2819 | Implement Watermark feature for Text Signature of PDF Documents | New Feature |
| SIGNATURENET-2816 | Implement Watermark feature for Text Signature of Slides Documents | New Feature |
| SIGNATURENET-2813 | Implement Watermark feature for Text Signature of Words Documents | New Feature |
| SIGNATURENET-2610 | Optimize Words Signature Implementation for Text and Image types | Improvement |
| SIGNATURENET-2822 | Implement ability to obtain Document Information over Signature Handler | New Feature |
| SIGNATURENET-2825 | Implement ability to verify Text Signature located into Form Fields of PDF Documents | New Feature |
| SIGNATURENET-2824 | Implement ability to verify Text Signature located into Form Fields of Words Documents | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.5.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new enumeration value **Millimeters** for enumeration **MeasureType** to specify measure units in millimeters for location, size of margins.
    
    Here is an example of using this feature:
    
    **Specify different Measure Unit Types for PDF Text Signature**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup text signature options and try locate signature at top right corner
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.ForeColor = Color.Red;
    //setup text position on a page in 5 centimeters from top 
    signOptions.LocationMeasureType = MeasureType.Millimeters;
    signOptions.Top = 50;
    //setup signature area size in pixels
    signOptions.SizeMeasureType = MeasureType.Pixels;
    signOptions.Width = 200;
    signOptions.Height = 100;
    //setup signature margins and horizontal alignment
    signOptions.HorizontalAlignment = HorizontalAlignment.Right;
    signOptions.MarginMeasureType = MeasureType.Percents;
    signOptions.Margin.Right = 10;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DifferentMeasureUnitTypes" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    

*   Following static method of SignatureHandler are marked as Obsolete attribute and will be deprecated after next 3 Releases
    
    **Obsolete static methods of SignatureHandler**
    
    
    
    ```csharp
    public static DocumentDescription GetPageDescriptions(string guid);
    public static byte[] GetDocumentPageImage(string guid, int? width, int? quality, int pageIndex);
    public static System.Drawing.Size GetPageSize(string guid, int signaturePageNumber, double signatureLocationX,
                double signatureLocationY, PositionInCellsDocument positionInCellsDocument);
    
    ```
    
*   Introduced non static methods to obtain Document information to SignatureHandler class. More examples are located here
    
    **Obtaining information about document**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {    
        StoragePath = @"c:\Aspose\Test\Storage",    
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // Document description
    DocumentDescription docInfo = handler.GetDocumentDescription(@"c:\Aspose\Test\Storage\test.pdf");
    Console.WriteLine("Document " + docInfo.Guid + " contains " + docInfo.PageCount + " pages");
    Console.WriteLine("Width of first page is " + docInfo.Pages.FirstOrDefault().Width);
    // Image from specified page
    byte[] bytesImage = handler.GetPageImage(@"c:\Aspose\Test\Storage\test.pdf", 1);
    MemoryStream memoryStream = new MemoryStream(bytesImage);
    using (Image image = Image.FromStream(memoryStream))
    {    
        // Make something with image   
        Console.WriteLine("Height of image is " + image.Height);    
        image.Save(@"c:\Aspose\Test\Output\ImageFromPage.png", ImageFormat.Png);
    }
    memoryStream.Dispose();
    // Page size
    Size pageSize = handler.GetDocumentPageSize(@"c:\Aspose\Test\Storage\test.pdf", 1);
    Console.WriteLine("Page size is " + pageSize.Height + " x " + pageSize.Width); 
    ```
    
*   Added new enumeration for Text Signature Implementation for each enumeration type like CellsTextSignatureImplementation, PdfTextSignatureImplementation, WordsTextSignatureImplementation and SlidesTextSignatureImplementation - **Watermark**.
    
    **Signing PDF Documents with Text Signature As Watermark**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup text signature options
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    //type of implementation
    signOptions.SignatureImplementation = PdfTextSignatureImplementation.Watermark;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_TextSignatureWatermark" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
*   Added new enumeration for Text Signature Implementation for Words Documents WordsTextSignatureImplementation **TextToFormField.  
    **
    
    **Signing Words Documents with Text Signature to form text field**
    
    
    
    ```csharp
     // setup Signature configuration
                SignatureConfig signConfig = new SignatureConfig
                {
                    StoragePath = @"c:\Aspose\Test\Storage",
                    OutputPath = @"c:\Aspose\Test\Output"
                };
                // instantiating the conversion handler
                SignatureHandler handler = new SignatureHandler(signConfig);
                // setup text signature options
                WordsSignTextOptions signOptions = new WordsSignTextOptions("John Smith");
                signOptions.SignatureImplementation = WordsTextSignatureImplementation.TextToFormField;
                signOptions.FormTextFieldType = WordsFormTextFieldType.RichText;
                signOptions.FormTextFieldTitle = "RT";
                // sign document
                string signedPath = handler.Sign<string>("Forms.docx", signOptions,
                    new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_FormFields" });
    
    ```
    
    **Verification of Words Document signed with Text Signature to form text field**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup digital verification options
    WordsVerifyTextOptions verifyOptions = new WordsVerifyTextOptions();
    // specify other options
    // text
    verifyOptions.Text = "John Smith";
    // type of text field
    verifyOptions.FormTextFieldType = WordsFormTextFieldType.AllTextTypes;
    // title of text field
    verifyOptions.FormTextFieldTitle = "RT";
    //verify document
    VerificationResult result = handler.Verify("Forms_signed.docx", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    ```
