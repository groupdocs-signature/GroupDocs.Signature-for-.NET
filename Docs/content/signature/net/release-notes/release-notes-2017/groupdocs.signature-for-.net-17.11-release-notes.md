---
id: groupdocs-signature-for-net-17-11-release-notes
url: signature/net/groupdocs-signature-for-net-17-11-release-notes
title: GroupDocs.Signature for .NET 17.11 Release Notes
weight: 2
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.11{{< /alert >}}

## Major Features

There are about 20 improvements, new features and fixes in this regular release. The most notable are:

*   Implemented support of Image file formats for methods returning document and pages information
*   Introduced Signature Handler events to retrieve information on Signing progress
*   Updated Stamp signature with ability to setup Brush property
*   Updated Text Signature to setup background with Brush property
*   Introduced additional Signature appearance for Office format Documents - Cells, Words and Slides
*   Added Signature Handler events to retrieve information on Verification progress
*   Involved ability to retrieve Digital signatures from Pdf Documents
*   Introduced ability to retrieve Digital signatures from Office file format Documents Cells and Words
*   Updated Barcode and QR-Code Signature Options to specify Brush property
*   Improved Verification processing of all Documents to process without required Page settings
*   Fixed bug with Cells Text Stamp rendering

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3154 | Implement support of Image File formats in Document and Pages Information method | New Feature |
| SIGNATURENET-3142 | Implement ability to obtain Verification Progress | New Feature |
| SIGNATURENET-3127 | Implement ability to set Brush style for Stamp signatures background | New Feature |
| SIGNATURENET-3126 | Implement ability to set Brush style for Text signatures background | New Feature |
| SIGNATURENET-3121 | Implement various text shape types for Words | New Feature |
| SIGNATURENET-3118 | Implement various text shape types for Slides | New Feature |
| SIGNATURENET-3115 | Implement various text shape types for Cells | New Feature |
| SIGNATURENET-3110 | Implement ability to obtain Digital Signatures from Cells Documents | New Feature |
| SIGNATURENET-3107 | Implement ability to obtain Digital Signatures from Words Documents | New Feature |
| SIGNATURENET-3104 | Implement ability to obtain Digital Signatures from Pdf Documents | New Feature |
| SIGNATURENET-2479 | Implement ability to obtain Signing progress | New Feature |
| SIGNATURENET-3168 | Improve Cells Documents Verification when Page is not specified | Improvement |
| SIGNATURENET-3167 | Improve Image Documents Verification when Page is not specified | Improvement |
| SIGNATURENET-3166 | Improve Slides Documents Verification when Page is not specified | Improvement |
| SIGNATURENET-3165 | Improve Words Documents Verification when Page is not specified | Improvement |
| SIGNATURENET-3164 | Improve Pdf Documents Verification when Page is not specified | Improvement |
| SIGNATURENET-3134 | Implement ability to set background color for QRcode signatures | Improvement |
| SIGNATURENET-3133 | Implement ability to set background color for Barcode signatures | Improvement |
| SIGNATURENET-3153 | Method for Document Description and Pages raise Exception | Bug |
| SIGNATURENET-3145 | Signature .NET 17.11 Incorrect Cells TextStamp rendering | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.11. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.   Added new enumeration type **ProcessStatus** with values that specify Signature or Verification process status. 
    
    **ProcessStatus enumeration**
    
    ```csharp
    public enum ProcessStatus
    {
        /// <summary>
        /// Process is not started
        /// </summary>
        None = 0,
     
        /// <summary>
        /// Process was started.
        /// </summary>
        Started = 0,
     
        /// <summary>
        /// Process is in progress.
        /// </summary>
        InProgress = 1,
     
        /// <summary>
        /// Process is completed.
        /// </summary>
        Completed = 2
    }
    ```
    
2.  Added new event argument types to describe process events. Base class **ProcessEventArgs**  
    
    **class ProcessEventArgs**
    
    ```csharp
    public class ProcessEventArgs : EventArgs
    {
        /// <summary>
        /// Represents unique identifier of a conversion.
        /// </summary>
        public string Guid { get; set; }
     
        /// <summary>
        /// Indicates current process state.
        /// </summary>
        public ProcessStatus Status { get; set; }
    }
    ```
    
    Class **ProcessStartEventArgs** that describes start of Signing or Verification process that is derived from base **ProcessEventArgs** and contains additional date time property Started -date/time mark of process start.
    
    Class **ProcessProgressEventArgs **describes progress event. Property **Progress **\- keeps percentage of progress in 0-100 value range, **Ticks - **time in milliseconds spent from start of process
    
    ```csharp
    public class ProcessProgressEventArgs : ProcessEventArgs
    {
        /// <summary>
        /// Represents progress in percents. Value range is from 0 to 100.
        /// </summary>
        public int Progress { get; set; }
     
        /// <summary>
        /// Represents time spent in milliseconds since process Start event
        /// </summary>
        public long Ticks { get; set; }
    }
    ```
    
    Class **ProcessCompleteEventArgs** with properties DateTime **Completed**  - date/time of completed event and long **Ticks **time in milliseconds spent from start of process
    
    Added new delegates **ProcessStartEventHandler**, **ProcessProgressEventHandler** and **ProcessCompleteEventHandler** to use in corresponding events
    
    ```csharp
    public delegate void ProcessStartEventHandler(object sender, ProcessStartEventArgs args);
    public delegate void ProcessProgressEventHandler(object sender, ProcessProgressEventArgs args);
    public delegate void ProcessCompleteEventHandler(object sender, ProcessCompleteEventArgs args);
    ```
    
3.  Class **SignatureHandler** was extended with following events  
      
    
     public event ProcessStartEventHandler** SignatureStarted** - event occurs on start of signing process
    
     public event ProcessProgressEventHandler **SignatureProgress**; - event occurs each time on progressing signature process
    
     public event ProcessCompleteEventHandler **SignatureCompleted** - event occurs when singing process completes
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup signature option
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    // text rectangle size
    signOptions.Height = 100;
    signOptions.Width = 100;
    signOptions.SignAllPages = true;
    //
    SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Events" };
    //
    handler.SignatureStarted += delegate(object sender, ProcessStartEventArgs args)
    {
    Console.WriteLine("Signature process of {0} started at {1}", args.Guid, args.Started.ToString("f"));
    };
    handler.SignatureProgress += delegate(object sender, ProcessProgressEventArgs args)
    {
    Console.WriteLine("Singing of {0} progress: {1} %. Since start process spent {2} mlsec", args.Guid, args.Progress, args.Ticks);
    };
    handler.SignatureCompleted += delegate(object sender, ProcessCompleteEventArgs args)
    {
    Console.WriteLine("Singing of {0} completed at {1}. Process took {2} mlsec", args.Guid, args.Completed.ToString("f"), args.Ticks);
    };
    // sign document
    string signedPath = handler.Sign<string>("pages12Images.pdf", signOptions, saveOptions);
    ```
    
4.  Class SignatureHandler was extended with following events  
      
    
     public event ProcessStartEventHandler VerificationStarted- event occurs on start of verification process
    
     public event ProcessProgressEventHandler VerificationProgress; - event occurs each time on progressing verification process
    
     public event ProcessCompleteEventHandler VerificationCompleted - event occurs when verification process completes
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup signature option
    PDFVerifyTextOptions verifyOptions = new PDFVerifyTextOptions("John Smith");
    // text rectangle size
    verifyOptions.VerifyAllPages = true;
    //
    handler.VerificationStarted += delegate(object sender, ProcessStartEventArgs args)
    {
        Console.WriteLine("Verification process of {0} started at {1}", args.Guid, args.Started.ToString("f"));
    };
    handler.VerificationProgress += delegate(object sender, ProcessProgressEventArgs args)
    {
        Console.WriteLine("Verification of {0} progress: {1} %. Since start process spent {2} mlsec", args.Guid, args.Progress, args.Ticks);
    };
    handler.VerificationCompleted += delegate(object sender, ProcessCompleteEventArgs args)
    {
        Console.WriteLine("Verification of {0} completed at {1}. Process took {2} mlsec", args.Guid, args.Completed.ToString("f"), args.Ticks);
    };
    // sign document
    VerificationResult result = handler.Verify("pages12Images.pdf", verifyOptions);
    Console.WriteLine("Verification result: " + result.IsValid);
    ```
    
5.  New ability to search signature in Documents was provided with following new options classes
    
    Base abstract class **SearchOptions** specifies base properties of search signatures options. Derived classe **SearchDigitalOptions** specifies properties for base options to search Digital Signatures and derived classes **CellsSearchDigitalOptions**, **PdfSearchDigitalOptions** and **WordsSearchDigitalOption** for corresponding documents. Added new class **SearchOptionsCollection **to specify amount of options to search.
    
    New classes that specify Signature object in appropriate documents - are  **CellsDigitalSiganture**, **PdfDigitalSiganture** and **WordsDigitalSiganture. **These classes are derived from base **DigitalSiganture**. Base class for all Signature object is **BaseSignature** class.
    
    New class **SearchResult** keeps list of Signatures. Instance of **SearchResult** is returned from new SIgantureHandler methods to search for Signatures
    
    **Overload Search Siganture methods**
    
    ```csharp
    public SearchResult Search(string guid, SearchOptions searchOptions)
    public SearchResult Search(string guid, SearchOptions searchOptions, LoadOptions loadOptions)
    public SearchResult Search(string guid, SearchOptionsCollection collection, LoadOptions loadOptions)
    public SearchResult Search(Stream stream, SearchOptions searchOptions)
    public SearchResult Search(Stream stream, SearchOptions searchOptions, LoadOptions loadOptions)
    public SearchResult Search(Stream stream, SearchOptionsCollection collection, LoadOptions loadOptions)
    ```
    
    **C# Searching Digital Signatures in Pdf Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    PdfSearchDigitalOptions searchOptions = new PdfSearchDigitalOptions();
    // Search Document for Signatures
    string guid = "signed.pdf";
    SearchResult searchResult = handler.Search(guid, searchOptions);
    Console.WriteLine("Source file {0} contains {1} digital signature(s)", guid, searchResult.Signatures.Count);
    foreach (BaseSignature signature in searchResult.Signatures)
    {
        PDFDigitalSignature pdfSign = (signature as PDFDigitalSignature);
        if (pdfSign != null)
        {
            Console.WriteLine("\t >> Digital signature from {0}. Contact: {1}. Valid {2}", pdfSign.SignTime, pdfSign.ContactInfo, pdfSign.IsValid);
        }
    }
    ```
    
    Following example demonstrates how to get digital certificates from system
    
    **C# Searching Digital Signatures in system**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // load Digital Signature registered in system
    List<DigitalSignature> signatures = DigitalSignature.LoadDigitalSignatures();
    foreach(DigitalSignature signature in signatures)
    {
        if (signature.Certificate != null)
        {
            var certificate = signature.Certificate;
            Console.WriteLine("\nCertificate: {0}, {1}, {2}", certificate.Subject, certificate.SerialNumber, certificate.Version);
        }
    }
    ```
    
6.  Introduced new enumeration types for Office Document Text Signature appearances. New types are **CellsTextShapeType**, **SlidesTextShapeType** and **WordsTextShapeType**.
    
    
    
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
    CellsSignTextOptions signOptions = new CellsSignTextOptions("John Smith");
    signOptions.VerticalAlignment = VerticalAlignment.None;
    signOptions.HorizontalAlignment = HorizontalAlignment.None;
    signOptions.ColumnNumber = 2;
    signOptions.RowNumber = 3;
    signOptions.Width = 300;
    signOptions.Height = 100;
     
    // setup background settings
    signOptions.BackgroundColor = System.Drawing.Color.Yellow;
    signOptions.BackgroundTransparency = 0.5;
     
    //setup border settings
    signOptions.BorderColor = System.Drawing.Color.DarkOrange;
    signOptions.BorderWeight = 1.2;
    signOptions.BorderTransparency = 0.5;
    signOptions.BorderDashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDashDot;
    signOptions.BorderVisiblity = true;
    signOptions.BorderWeight = 2;
     
    // setup text color
    signOptions.ForeColor = System.Drawing.Color.Blue;
    // setup Font options
    signOptions.Font.Bold = true;
    signOptions.Font.Italic = true;
    signOptions.Font.Underline = true;
    signOptions.Font.Strikeout = true;
    signOptions.Font.FontFamily = "Arial";
    signOptions.Font.FontSize = 25;
     
    //setup type of signature shape (could appears differently for various document types)
    //This feature is supported starting from version 17.11
    signOptions.ShapeType = CellsTextShapeType.UpRibbon;
     
    // sign document
    string signedPath = handler.Sign<string>("test.xls", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_TextSignatureFontBackgroundAndColorOptions" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
