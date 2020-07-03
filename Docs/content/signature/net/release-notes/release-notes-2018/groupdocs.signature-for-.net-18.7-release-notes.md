---
id: groupdocs-signature-for-net-18-7-release-notes
url: signature/net/groupdocs-signature-for-net-18-7-release-notes
title: GroupDocs.Signature for .NET 18.7 Release Notes
weight: 7
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.7{{< /alert >}}

## Major Features

There are about 13 improvements, new features and fixes in this regular release. Most new features are related to improvements of cells positioning, implementation of different measure types for Cells signature options. Process events arguments were updated to support ability to cancel signature, verification or search workaround. Summary the most notable changes are:

*   Introduced ability to search for Digital signatures of Words Documents with additional criteria
*   Implemented ability to cancel running process for Signature, Verification and Search routines, same as ability to check if process was cancelled
*   Updated positioning of Stamp text
*   Introduced support of all Measure type units for Cells documents, improved Cells document signatures positioning
*   Extended search process for Words Documents with extended properties for Digital Signatures
*   Fixed few issues with QR-Code Signature rendering

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3568 | Implement additional search criteria for Digital Signatures of Words Documents | New Feature |
| SIGNATURENET-3533 | Implement ability for cancellation of Search process | New Feature |
| SIGNATURENET-3530 | Implement ability for cancellation of Verification process | New Feature |
| SIGNATURENET-3527 | Implement ability for cancellation of Signing process | New Feature |
| SIGNATURENET-3526 | Implement text positioning for Stamp Signatures. | New Feature |
| SIGNATURENET-3483 | Implement support of Measure Type Units for Cells positioning | New Feature |
| SIGNATURENET-3463 | Implement additional search criteria for Digital Signatures of Cells Documents | New Feature |
| SIGNATURENET-3570 | Implement support of several Words Digital Search Options | Improvement |
| SIGNATURENET-3566 | Implement support of several Cells Digital Search Options | Improvement |
| SIGNATURENET-3480 | Implement global Exception handler to catch all unhandled exceptions | Improvement |
| SIGNATURENET-3578 | Wrong border appearance for PDF Text as Image signatures | Bug |
| SIGNATURENET-3563 | Fix QR-Code positioning when Signature area is more than generated QR-Code | Bug |
| SIGNATURENET-3562 | Fix freezing of Signature process on Image Documents for QR-Code Signature | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.7. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **Process Events arguments were updated with properties to set and check cancellation of progression.**   
    Public class **ProcessProgressEventArgs** was updated with Boolean property **Cancel** and now supports cancellation of different processes like signing, verification and searching. Public class **ProcessCompleteEventArgs** was updated with read only Boolean property **Canceled** that indicates if process (signing, verification and searching) was canceled.
    
    **ProcessProgressEventArgs proeprties**
    
    ```csharp
    /// <summary>
    /// Gets or sets a value indicating whether the process should be canceled.
    /// </summary>
    public bool Cancel { get; set; }
    ```
    
    The property **Cancel** should be set to true value in corresponding event for singing, verification or searching in case when process requires cancellation.
    
    **ProcessProgressEventArgs proeprties**
    
    ```csharp
    /// <summary>
    /// Represents flag if process was canceled.
    /// </summary>
    public bool Canceled { get; private set; }
    ```
    
    The property **Canceled** will be set to true value in case when user discarded/ canceled process over Progress event with **Cancel **property.
    
    Following example demonstrates using new property to make cancellation of singing process.
    
    
    
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
         // setup signature option
         PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith",10,10,100,100);
         signOptions.SignAllPages = true;
         SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Events" };
         handler.SignatureStarted += delegate (object sender, ProcessStartEventArgs args)
         {
             Console.WriteLine("Processing of {0} signatures for {1} started at {2}", args.TotalSignatures, args.Guid, args.Started.ToString("f"));
         };
         handler.SignatureProgress += delegate (object sender, ProcessProgressEventArgs args)
         {
             Console.WriteLine("Singing of {0} progress: {1} %. Processed {2} signatures.", args.Guid, args.Progress, args.ProcessedSignatures);
             if(args.Progress > 10)
             {
                 args.Cancel = true;
                 Console.WriteLine("Cancellation of process");
             }
         };
         handler.SignatureCompleted += delegate (object sender, ProcessCompleteEventArgs args)
         {
             if (args.Canceled)
             {
                 Console.WriteLine("Singing process was canceled");
             }
             else
             {
                 Console.WriteLine("Singing of {0} completed at {1}. Processing of {2}", args.Guid, args.Completed.ToString("f"), args.TotalSignatures);
             }
         };
         // sign document
         string signedPath = handler.Sign<string>("pages12Images.pdf", signOptions, saveOptions);
    } 
    ```
    
2.  ****Signature Cells Documents Options**** were updated with supporting different measure types.** **  
    
    Public classes **CellsTextSignOptions, CellsImageSignOptions, CellsDigitalSignOptions, BarcodeCodeSignOptions, CellsQRCodeSignOptions** were updated and now **support different Measure Types values to setup position and size of signature area**.
    
    The properties **LocationMeasureType**, **SizeMeasureType** and **MarginMeasureType **allow to adjust measure units with one of predefined enumeration like millimeters, percents or pixels of location, size and margin fields for QR-code signature areas. Percents measure type value assumes calculation signature size and position according to a Cells worksheet filled area. The filled area is determined by a cell which contains data or style and has the biggest row and column numbers.
    
    **Measure Type**
    
    ```csharp
    /// <summary>
    /// Measure type (pixels, percents or millimeters) for Left and Top properties.
    /// If measure type is percents signature location is calculated according to worksheet 
    /// area where cells with data or style are located.
    /// </summary>
    public override MeasureType LocationMeasureType 
     
    /// <summary>
    /// Measure type (pixels, percents or millimeters) for Width and Height properties.
    /// If measure type is percents signature size is calculated according to worksheet 
    /// area where cells with data or style are located.
    /// </summary>
    public override MeasureType SizeMeasureType 
     
    /// <summary>
    /// Measure type (pixels, percents or millimeters) for Margin.
    /// If measure type is percents signature margin is calculated according to worksheet 
    /// area where cells with data or style are located.
    /// </summary>
    public override MeasureType MarginMeasureType 
    ```
    
    Following example demonstrates using **Measure Type** properties to set a QR-code signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    **Measure Type properties to set a QR-code signature position**
    
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
         CellsQRCodeSignOptions signOptions = new CellsQRCodeSignOptions("12345678AbcdefghKLMNOPqrst");
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
     
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_QrCode_Measure_ReleaseExample";
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
    Following example demonstrates using **Measure Type** properties to set a Barcode signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    **Measure Type properties to set a Barcode signature position**
    
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
         CellsBarcodeSignOptions signOptions = new CellsBarcodeSignOptions("1234567");
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
     
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_BarCode_Measure_ReleaseExample";
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
    Following example demonstrates using **Measure Type** properties to set a digital signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    
    
    ```csharp
    public static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             ImagesPath = @"c:\Aspose\Test\Images",
             CertificatesPath = @"c:\Aspose\Test\Certificates",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         CellsSignDigitalOptions signOptions = new CellsSignDigitalOptions("DrWatson.pfx");
         signOptions.ImageGuid = "200.png";
         signOptions.Password = "1234567890";
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_Digital_Measure_ReleaseExample";
     
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
    Following example demonstrates using **Measure Type** properties to set a image signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    
    
    ```csharp
    ublic static void Main()
     {
         // setup Signature configuration
         SignatureConfig signConfig = new SignatureConfig
         {
             StoragePath = @"c:\Aspose\Test\Storage",
             ImagesPath = @"c:\Aspose\Test\Images",
             OutputPath = @"c:\Aspose\Test\Output"
         };
         // instantiating the signature handler
         SignatureHandler handler = new SignatureHandler(signConfig);
         CellsSignImageOptions signOptions = new CellsSignImageOptions("200.png");
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
     
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_Image_Measure_ReleaseExample";
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
    Following example demonstrates using **Measure Type** properties to set a text signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    
    
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
         CellsSignTextOptions signOptions = new CellsSignTextOptions("John Smith");
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
     
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_Text_Measure_ReleaseExample";
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
    Following example demonstrates using **Measure Type** properties to set a stamp signature position in the center by horizontal and in 25% by vertical of worksheet filled area. Height and width are 10% of worksheet filled area.
    
    
    
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
         CellsStampSignOptions signOptions = new CellsStampSignOptions();
         signOptions.Width = 150;
         signOptions.Height = 150;
         signOptions.HorizontalAlignment = HorizontalAlignment.Left;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
         signOptions.BackgroundColor = Color.Blue;
         signOptions.BackgroundColorCropType = StampBackgroundCropType.None;
         signOptions.OuterLines.Add(new StampLine() { Text = "Stamp_Size_Pixels", BackgroundColor = Color.Blue, TextColor = Color.Chartreuse });
     
         // size
         signOptions.SizeMeasureType = MeasureType.Percents;
         signOptions.Width = 10;
         signOptions.Height = 10;
     
         // position
         // alignment
         signOptions.HorizontalAlignment = HorizontalAlignment.Center;
         signOptions.VerticalAlignment = VerticalAlignment.Top;
     
         // margin
         signOptions.MarginMeasureType = MeasureType.Percents;
         signOptions.Margin.Top = 25;
     
         SaveOptions exSaveOptions = new SaveOptions();
         exSaveOptions.OutputType = OutputType.String;
         exSaveOptions.OutputFileName = "Cells_Stamp_Measure_ReleaseExample";
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, exSaveOptions);
    }
    ```
    
3.  **Digital Search Options for Cells and Words Documents were updated with few properties.**
    
    Public class **WordsSearchDigitalOptions** was extended with new properties to specify additional search criteria.
    
    These properties specify Digital Signature comments, date range criteria and some Words Digital Signature fields
    
    **WordsSearchDigitalOptions properties**
    
    ```csharp
    /// <summary>
    /// Comments of Digital Signature to search.
    /// </summary>
    public string Comments { get; set; }
    /// <summary>
    /// Date and time range of Digital Signature to search. Nullable value will be ignored.
    /// </summary>
    public DateTime? SignDateTimeFrom { get; set; }
    /// <summary>
    /// Date and time range of Digital Signature to search. Nullable value will be ignored.
    /// </summary>
    public DateTime? SignDateTimeTo { get; set; }
    /// <summary>
    /// For non empty values specifies distinguished subject name of the certificate to search.
    /// </summary>
    public string SubjectName { get; set; }
    /// <summary>
    /// For non empty values specifies distinguished name of the certificate isuuer to search.
    /// </summary>
    public string IssuerName { get; }
    ```
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    WordsSearchDigitalOptions searchOptions = new WordsSearchDigitalOptions();
    // setup additional search criteria
    searchOptions.Comments = "test comments";
    searchOptions.SignDateTimeFrom = new DateTime(DateTime.Now.Year, 1, 1);
    searchOptions.IssuerName = "John";
    // Search Document for Signatures
    string guid = "test_digitalsigned.docx";
    SearchResult searchResult = handler.Search(guid, searchOptions);
    Console.WriteLine("Source file {0} contains {1} digital signature(s)", guid, searchResult.Signatures.Count);
    foreach (BaseSignature signature in searchResult.Signatures)
    {
        WordsDigitalSignature WordsSign = (signature as WordsDigitalSignature);
        if (WordsSign != null)
        {
            Console.WriteLine("\t >> Digital signature from {0}. Comments: {1}. Valid {2}", WordsSign.SignTime, WordsSign.Comments, WordsSign.IsValid);
        }
    }
    ```    
      
    Public class **CellsSearchDigitalOptions** was extended with new properties to specify additional search criteria.    
    These properties specify Digital Signature comment and date range criteria
    
    **CellsSearchDigitalOptions properties**
    
    ```csharp
    /// <summary>
    /// Comments of Digital Signature to search.
    /// </summary>
    public string Comments { get; set; }
    /// <summary>
    /// Date and time range of Digital Signature to search. Nullable value will be ignored.
    /// </summary>
    public DateTime? SignDateTimeFrom { get; set; }
    /// <summary>
    /// Date and time range of Digital Signature to search. Nullable value will be ignored.
    /// </summary>
    public DateTime? SignDateTimeTo { get; set; }
    ```
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    CellsSearchDigitalOptions searchOptions = new CellsSearchDigitalOptions();
    // setup additional options
    searchOptions.Comments = "test comment";
    searchOptions.SignDateTimeFrom = new DateTime(DateTime.Now.Year, 1, 1);
    // Search Document for Signatures
    string guid = "test_digitalsigned.xls";
    SearchResult searchResult = handler.Search(guid, searchOptions);
    Console.WriteLine("Source file {0} contains {1} digital signature(s)", guid, searchResult.Signatures.Count);
    foreach (BaseSignature signature in searchResult.Signatures)
    {
        CellsDigitalSignature cellsSign = (signature as CellsDigitalSignature);
        if (cellsSign != null)
        {
            Console.WriteLine("\t >> Digital signature from {0}. Comments: {1}. Valid {2}", cellsSign.SignTime, cellsSign.Comments, cellsSign.IsValid);
        }
    }
    ```
    
4.  Public interface **ITextAlignment** was implemented to define signature position by specifying worksheet row or column number.
    
    **ICellsPosition**
    
    ```csharp
    /// <summary>
    /// Interface defines signature position for Cells documents.
    /// </summary>
    public interface ICellsPosition
    {
        /// <summary>
        /// Gets or sets the top row number of signature (min value is 0).
        /// </summary>
        int RowNumber { get ; set; }
        /// <summary>
        /// Gets or sets the left column number of signature (min value is 0).
        /// </summary>
        int ColumnNumber { get; set; }
    }
    ```
    
    Following example demonstrates using interface **ICellsPosition** to set signature position by specifying worksheet row or column number for Cells document.
    
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
         // text position
     
         signOptions.RowNumber = 2;
         signOptions.ColumnNumber = 2;
     
         // text rectangle size
         signOptions.Height = 100;
         signOptions.Width = 100;
     
         // sign document
         string signedPath = handler.Sign<string>("test.xlsx", signOptions, 
             new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_Simple"});
    }
    ```
    
5.  Properties **DocumentPageNumber**, **PagesSetup** and **SearchAllPages** in public class **SearchDigitalOptions** were marked as obsolete because they are not used in digital search workflow.
    
    **SearchDigitalOptions**
    
    ```csharp
    /// <summary>
    /// Gets or sets Document page number for searching.
    /// </summary>
    // This property is obsolete and not supported for digital search.
    public int? DocumentPageNumber 
     
    /// <summary>
    /// Options to specify pages for Signature searching.
    /// </summary>
    // This property is obsolete and not supported for digital search.
    public PagesSetup PagesSetup 
     
    /// <summary>
    /// Flag to search on each Document page.
    /// </summary>
    // This property is obsolete and not supported for digital search.
    public bool SearchAllPages 
    ```
    
6.  Properties **DocumentPageNumber** and **PagesSetup** in public class **VerifyDigitalOptions** were marked as obsolete because they are not used in digital verification workflow.
    
    **VerifyDigitalOptions**
    
    ```csharp
    /// <summary>
    /// Document Page Number to be verified.
    /// </summary>
    //This property is obsolete and not supported for digital verification.
    public int? DocumentPageNumber
     
    /// <summary>
    /// Page Options to specify pages to be verified.
    /// </summary>
    //This property is obsolete and not supported for digital verification.
    public PagesSetup PagesSetup
    ```
