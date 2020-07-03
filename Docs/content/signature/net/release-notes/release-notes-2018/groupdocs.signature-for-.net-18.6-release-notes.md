---
id: groupdocs-signature-for-net-18-6-release-notes
url: signature/net/groupdocs-signature-for-net-18-6-release-notes
title: GroupDocs.Signature for .NET 18.6 Release Notes
weight: 8
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.6{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. Most new features are related to cells positioning that was improved to support pixels locations. Text Signature options were updated with ability to align text inside signature area. Verification process of QR-Code Signatures was adjusted to support encrypted text and optional encode types. Summary the most notable changes are:

*   Introduced ability to align Text for all supported Document file formats
*   Implemented ability to verify encrypted QR-Code Signatures for all file types
*   Verification process was improved to use Barcode and QR-Code type as optional not required value
*   Added ability to specify Barcode and QR-Code fore color
*   Fixed QR-Code rendering with various options values
*   Optimized verification processing for QR-Code Signatures

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3516 | Implement ability to set text alignment inside shapes for Words documents | New Feature |
| SIGNATURENET-3514 | Implement ability to set text alignment inside shapes for Slides documents | New Feature |
| SIGNATURENET-3512 | Implement ability to set text alignment inside shapes for PDF documents | New Feature |
| SIGNATURENET-3510 | Implement ability to set text alignment inside shapes for Images documents | New Feature |
| SIGNATURENET-3507 | Implement ability to verify encrypted Text of QR-Code Signatures | New Feature |
| SIGNATURENET-3486 | Implement ability to set text alignment inside shapes for Cells documents | New Feature |
| SIGNATURENET-3481 | Implement ability to set signature position in Cells with pixels | New Feature |
| SIGNATURENET-3524 | Implement ability to verify QR-Code Signatures without required QR-Code Encode type | Improvement |
| SIGNATURENET-3522 | Implement ability to verify Barcode Signatures without required Barcode Encode type | Improvement |
| SIGNATURENET-3480 | Implement global Exception handler to catch all unhandled exceptions | Improvement |
| SIGNATURENET-3468 | Implement setting color of QR-code code text with fore color value | Improvement |
| SIGNATURENET-3467 | Implement setting color of Bar-code code text with fore color value | Improvement |
| SIGNATURENET-3523 | Fix exception on QR-Code Signature Verification when options has no Encode Type specified | Bug |
| SIGNATURENET-3520 | Wrong text alignment in Text Signature shape for Words | Bug |
| SIGNATURENET-3466 | Wrong QRCode rendering for various settings | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.6. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  Introduced ability to locate Signatures for Cells documents with pixel coordinates for all signature types. Cells signature options for all types support both properties to specify horizontal coordinate **ColumnNumber** and **Left**. These properties are mutually exclusive. This means when **ColumnNumber** is set to value the **Left** property will be reset to 0. When **Left** property is set the **ColumnNumber** property will be reset to zero value. Same behavior implemented for **RowNumber** and **Top** properties.
    
    Following example demonstrates using **Top**  and **Left**  properties to set a Barcode signature position in pixels on a Cells worksheet.
    
    **Setting top and left of Cells Text signature**
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // Specify Signature Options 
         CellsBarcodeSignOptions options = new CellsBarcodeSignOptions("1234567");
         options.Width = 300;
         options.Height = 100;
         options.Top = 15;
         options.Left = 22;
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **Top**  and **Left**  properties to set a QR-code signature position in pixels on a Cells worksheet.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // Specify Signature Options 
         CellsQRCodeSignOptions options = new CellsQRCodeSignOptions("012345678");
         options.Width = 100;
         options.Height = 100;
         options.Top = 15;
         options.Left = 22;
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **Top**  and **Left**  properties to set a Digital signature position in pixels on a Cells worksheet.
    
    
    
    ```csharp
    public static void Main()
     {
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
         // Specify Signature Options 
         CellsSignDigitalOptions options = new CellsSignDigitalOptions("SherlockHolmes.pfx", "200.png");
         options.Password = "1234567890";
         options.Width = 200;
         options.Height = 200;
         options.Top = 15;
         options.Left = 22;
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **Top**  and **Left**  properties to set an Image signature position in pixels on a Cells worksheet.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             ImagesPath = @"c:\Aspose\Test\Images",
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // Specify Signature Options 
         CellsSignImageOptions options = new CellsSignImageOptions("200.png");
         options.Width = 200;
         options.Height = 200;
         options.Top = 15;
         options.Left = 22;
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **Top**  and **Left**  properties to set a Text signature position in pixels on a Cells worksheet.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // Specify Signature Options 
         CellsSignTextOptions options = new CellsSignTextOptions("John Smith");
         options.Width = 100;
         options.Height = 100;
         options.Top = 15;
         options.Left = 22;
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions{OutputType = OutputType.String,OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **Top**  and **Left**  properties to set a Stamp signature position in pixels on a Cells worksheet.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // setup options with text of signature
         CellsStampSignOptions options = new CellsStampSignOptions();
         options.Height = 120;
         options.Width = 300;
         options.Top = 15;
         options.Left = 22;
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
         options.InnerLines.Add(line0);
         StampLine line1 = new StampLine();
         line1.Text = "Smith";
         line1.TextBottomIntent = 0;
         line1.TextColor = Color.MediumVioletRed;
         line1.InnerBorder.Color = Color.DarkSlateBlue;
         line1.Font.FontSize = 20;
         line1.Font.Bold = true;
         line1.Height = 40;
         options.InnerLines.Add(line1);
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", options,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "OtherOperations_CellsTopLeftPixels" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
2.  Implemented ability to align Text inside Text Signature area for all supported Document types.  
    New enumeration types **TextHorizontalAlignment** and **TextVerticalAlignment** were added to provide ability to specify Text alignment.
    
    **Text Horizontal Alignment enumeration**
    
    ```csharp
    /// <summary>
    /// Specifies text horizontal alignment inside a Signature.
    /// </summary>
    public enum TextHorizontalAlignment
    {
        /// <summary>
        /// Specifies that the text is left aligned to the horizontal alignment base.
        /// </summary>
        Left = 1,
        /// <summary>
        /// Specifies that the text is centered to the horizontal alignment base.
        /// </summary>
        Center = 2,
        /// <summary>
        /// Specifies that the text is right aligned to the horizontal alignment base.
        /// </summary>
        Right = 3
    }
    ```
    
    **Text Vertical Alignment enumeration**
    
    ```csharp
    /// <summary>
    /// Specifies text vertical alignment inside a Signature.
    /// </summary>
    public enum TextVerticalAlignment
    {
        /// <summary>
        /// Specifies that the text is top aligned to the vertical alignment base.
        /// </summary>
        Top = 1,
        /// <summary>
        /// Specifies that the text is centered to the vertical alignment base.
        /// </summary>
        Center = 2,
        /// <summary>
        /// Specifies that the text is bottom aligned to the vertical alignment base.
        /// </summary>
        Bottom = 3
    }
    ```
    
    New public interface **ITextAlignment **defines alignment of Text inside Signature area.
    
    **ITextAlignment**
    
    ```csharp
    /// <summary>
    /// Interface defines Alignment properties for text on Text Signatures.
    /// </summary>
    public interface ITextAlignment
    {
        /// <summary>
        /// Horizontal alignment of text inside a signature.
        /// </summary>
        TextHorizontalAlignment TextHorizontalAlignment
     
        /// <summary>
        /// Vertical alignment of text inside a signature.
        /// </summary>
        TextVerticalAlignment TextVerticalAlignment
    }
    ```
    
    Document Text Signature Options (**PdfTextSignOptions**, **CellsSignTextOptions**, **SlidesSignTextOptions**, **WordsSignTextOptions**) implement this interface with these properties **TextHorizontalAlignment** and **TextVerticalAlignment**
    
    Following example demonstrates using interface **ITextAlignment** to set text alignment in text signature for Cells document.
    
    **Setting text alignment in text signature**
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
     
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
     
         // setup options with text of signature
         CellsSignTextOptions signOptions = new CellsSignTextOptions("John Smith");
     
         // text rectangle size
         signOptions.Height = 100;
         signOptions.Width = 100;
     
         // set text alignment inside signature (This feature is supported starting from version 18.06)
         signOptions.TextHorizontalAlignment = TextHorizontalAlignment.Center;
         signOptions.TextVerticalAlignment = TextVerticalAlignment.Center;
     
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, 
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_Simple"});
    }
    ```
    
    Following example demonstrates using **TextHorizontalAlignment**  and **TextVerticalAlignment**  to set text alignment in text signature for Pdf document.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // setup text signature options
         PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
         // text rectangle size
         signOptions.Height = 100;
         signOptions.Width = 100;
         //type of implementation
         signOptions.SignatureImplementation = PdfTextSignatureImplementation.Image;
         // set text alignment inside signature (This feature is supported starting from version 18.06)
         signOptions.TextHorizontalAlignment = TextHorizontalAlignment.Center;
         signOptions.TextVerticalAlignment = TextVerticalAlignment.Center;
         // sign document
         string signedPath = handler.Sign<string>("test.pdf", signOptions,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_TextSignatureAsImage" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **TextHorizontalAlignment**  and **TextVerticalAlignment**  to set text alignment in text signature for Slides document.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // setup text signature options
         SlidesSignTextOptions signOptions = new SlidesSignTextOptions("John Smith");
         signOptions.Width = 100;
         signOptions.Height = 100;
         // set text alignment inside signature (This feature is supported starting from version 18.06)
         signOptions.TextHorizontalAlignment = TextHorizontalAlignment.Center;
         signOptions.TextVerticalAlignment = TextVerticalAlignment.Center;
         // sign document
         string signedPath = handler.Sign<string>("test.pptx", signOptions,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Documents_Simple" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
    Following example demonstrates using **TextHorizontalAlignment**  and **TextVerticalAlignment**  to set text alignment in text signature for Words document.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         // setup text signature options
         WordsSignTextOptions signOptions = new WordsSignTextOptions("John Smith");
         signOptions.Width = 100;
         signOptions.Height = 100;
         // type of implementation
         signOptions.SignatureImplementation = WordsTextSignatureImplementation.TextAsImage;
         // set text alignment inside signature (This feature is supported starting from version 18.06)
         signOptions.TextHorizontalAlignment = TextHorizontalAlignment.Center;
         signOptions.TextVerticalAlignment = TextVerticalAlignment.Center;
         // sign document
         string signedPath = handler.Sign<string>("test.docx", signOptions,
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_TextSignatureAsImage" });
         Console.WriteLine("Signed file path is: " + signedPath);
    }
    ```
    
3.  QR-Code Verification process was improved to use QR-Code encode type as optional not required property. Setting up **QRCodeVerifyOptions** will no longer require **EncodeType** property to be setup.
    
    **VerifyQRCodeOptions EncodeType**
    
    ```csharp
    /// <summary>
    /// Get or set QR-code Type verification. This property is optional.
    /// </summary>
    public QRCodeType EncodeType { get; set; }
    ```
    
    Following example demonstrates using of verification options without **EncodeType** property was set.
    
    **Verification of PDF Document without EncodeType**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup verification options
    PDFVerifyQRCodeOptions verifyOptions = new PDFVerifyQRCodeOptions("12345678");
    // verify all pages of a document if true
    verifyOptions.VerifyAllPages = true;            
    //verify document
    VerificationResult result = handler.Verify("SignedQRCode.pdf", verifyOptions);
    Console.WriteLine("Verification result is: " + result.IsValid);
    ```
    
4.  Public class **VerifyQRCodeOptions **was extended with new property **public IDataEncryption DataEncryption { get; set; }**. This property allows users to specify custom or standard encryption algorithm for QR-Code Signatures to verify encrypted QR-Code Text.  
    Following example demonstrates verification of previously signed document with encrypted QR-Code Signature.
    
    **Verification encrypted QR-Code Signature**
    
    ```csharp
    // setup key and pasphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encrypter = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup verification options
    PDFVerifyQRCodeOptions verifyOptions = new PDFVerifyQRCodeOptions(@"This is private text to be secured.");
    // specify as true to verify all pages of a document
    verifyOptions.VerifyAllPages = true;
    // setup encrypter to retrieve original text
    verifyOptions.DataEncryption = encrypter;
    // verify document
    VerificationResult result = handler.Verify("SignedQRCodeTextEncrypted.pdf", verifyOptions);
    Console.WriteLine("Verification result: " + result.IsValid);
    ```
    
5.  Signature library was updated to generate **GroupDocsSignatureException**. This solution allows to catch selected exceptions from library. Following example demonstrates this.
    
    **Using GroupDocs Signature Exception**
    
    ```csharp
    try
    {
        // setup Signature configuration
        SignatureConfig signConfig = new SignatureConfig
        {
            StoragePath = @"c:\Aspose\Test\Storage",
            OutputPath = @"c:\Aspose\Test\Output"
        };
        // instantiating the signature handler
        SignatureHandler handler = new SignatureHandler(signConfig);
        // setup verification options
        PDFVerifyQRCodeOptions verifyOptions = new PDFVerifyQRCodeOptions();
        // verify all pages of a document if true
        verifyOptions.VerifyAllPages = true;
        //If verify option Text is set, it will be searched in Title, Subject and Contents
        verifyOptions.Text = "12345678";
        //verify document
        VerificationResult result = handler.Verify("SignedQRCode.pdf", verifyOptions);
        Console.WriteLine("Verification result is: " + result.IsValid);
    }
    catch(GroupDocs.Signature.Exception.GroupDocsSignatureException ex)
    {
        Console.WriteLine("GroupDocs Signature Exception: " + ex.Message);
    }
    catch(System.Exception ex)
    {
        Console.WriteLine("System Exception: " + ex.Message);
    }
    ```
