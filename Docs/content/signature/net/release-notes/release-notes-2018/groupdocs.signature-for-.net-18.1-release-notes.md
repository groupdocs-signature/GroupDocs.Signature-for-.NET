---
id: groupdocs-signature-for-net-18-1-release-notes
url: signature/net/groupdocs-signature-for-net-18-1-release-notes
title: GroupDocs.Signature for .NET 18.1 Release Notes
weight: 13
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.1{{< /alert >}}

## Major Features

There are more about 14 improvements, new features and fixes in this regular release. Most new features were implemented with Text Signatures additional appearances like shadows. Improvements and bug fixes update functionality with URL provided documents and implementation of additional properties on verification processing. The most notable changes are:

*   Introduced new Signature Appearances Options that allows to add special features
*   Implemented text shadow appearance options for Text Signature for all supported Document types
*   Improved Verification event arguments for start, progress and complete handlers
*   Improved Signature event arguments for start, progress and complete handlers
*   Updated Document Info properties with additional properties
*   Improved Url provided Document Information with correct values
*   Updated Stream result of Sign methods with start position after signing document
*   Fixed output file name for Url provided Document or Stream based Documents
*   Updated signing process when Document provided by URL without specific file name
*   Updated classes, methods and properties with detailed comments
*   Marked few properties as obsolete.

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3251 | Fix error when loading Documents from Google drive | Bug |
| SIGNATURENET-3250 | Fix error when loading Documents from URL without target filename | Bug |
| SIGNATURENET-3277 | Implement ability to set text shadow effect for text as image signature for all documents types | New Feature |
| SIGNATURENET-3274 | Implement ability to set text shadow in text signatures for Cells documents | New Feature |
| SIGNATURENET-3276 | Implement ability to set text shadow in text signatures for Slides documents | New Feature |
| SIGNATURENET-3275 | Implement ability to set text shadow in text signatures for Words documents | New Feature |
| SIGNATURENET-3285 | Improve information of URL provided Document with corrected value | Improvement |
| SIGNATURENET-3286 | Improve result of Signing methods when Document provided by URL | Improvement |
| SIGNATURENET-3281 | Improve Signature on Complete event arguments with additional properties | Improvement |
| SIGNATURENET-3288 | Improve Verification events arguments with additional properties | Improvement |
| SIGNATURENET-3280 | Improve Verification Result with additional properties | Improvement |
| SIGNATURENET-3282 | Output file name has no extension for Stream and Url Document source | Bug |
| SIGNATURENET-3279 | Update result Stream of Sign methods | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.1. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

 Added new namespace **GroupDocs.Signature.Domain.Appearances** that will contain additional appearance options.

1.  New class  **AdditionalOptions** was added to specify base class for additional appearance options. It will be used for additional appearances features for Signature object. We plan to use for Text Shadow features, for gradient backgrounds in future etc.
    
    ```csharp
    /// <summary>
    /// Represents base class for signatures appearance options.
    /// </summary>
    public abstract class AdditionalOptions: ICloneable
    {
        /// <summary>
        /// Gets a copy of this object.
        /// </summary>
        public virtual Object Clone()
        {
            return this.MemberwiseClone();
        }
    }
    ```
    
    Class **SignOptions** was updated with **AdditionalOptions** property
    
    ```csharp
    /// <summary>
    /// Additional signature options.
    /// </summary>
    public List<AdditionalOption> AdditionalOptions { get; private set; }
    ```
    
    New List<**SignatureExtension**\> Extensions was added in  to provide ability for specifying additional appearance options for various types of signatures same special features to extend signature.
    
    ```csharp
    /// <summary>
    /// Signature Extensions
    /// </summary>
    public List<SignatureExtension> Extensions { get; private set; }
    ```
    
2.  Added new class **TextShadow**. It's recommended for using with text as image signature for all supported document types, also with simple text signature and text signature as watermark for Cells (.xslx) and Slides (.pptx). Simple text signature for Words (.docx) is recommended too, but has limited functionality.
    
    **TextShadow**
    
    ```csharp
    /// <summary>
    /// Represents text shadow properties for text signatures.
    /// The result may vary depending on the signature type and document format.
    /// TextShadow is recommended for using with TextAsImage signature for all supported document types,
    /// also with simple TextSignature and TextSignature as watermark for Cells (.xslx) and Slides (.pptx).
    /// Simple TextSignature for Words (.docx) is recommended too, but has limited functionality.
    /// </summary>
    public class TextShadow : SignatureExtension
    {
        /// <summary>
        /// Gets or sets distance from text to shadow.
        /// Default value is 1;
        /// </summary>
        public double Distance { get; set; }
        /// <summary>
        /// Gets or sets angle for placing shadow relative to the text.
        /// Default value is 0;
        /// </summary>
        public double Angle { get; set; }
        /// <summary>
        /// Gets or sets color of the shadow.
        /// Default value is Black;
        /// </summary>
        public Color Color { get; set; }
        /// <summary>
        /// Gets or sets transparency of the shadow.
        /// Default value is 0;
        /// </summary>
        public double Transparency { get; set; }
         
        /// <summary>
        /// Gets or sets blur of the shadow.
        /// Default value is 4;
        /// </summary>
        public double Blur { get; set; }
     
        /// <summary>
        /// Creates TextShadow with default options.
        /// </summary>
        public TextShadow()
        {
            Initialization();
        }
    ```
    
    Here's example of using
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // set up text signature options
    SlidesSignTextOptions signOptions = new SlidesSignTextOptions("John Smith");
    signOptions.Width = 300;
    signOptions.Height = 300;
    signOptions.Font.FontSize = 48;
     
    // set up shadow options for text
    TextShadow shadow = new TextShadow();
    shadow.Color = Color.OrangeRed;
    shadow.Angle = 135;
    shadow.Blur = 5;
    shadow.Distance = 4;
    shadow.Transparency = 0.2;
     
    //add text shadow to additional options
    signOptions.AdditionalOptions.Add(shadow);
     
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "AdditionalOptions_TextShadow" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
3.  Process Events Arguments were extended with additional properties to specify Total Signatures count and current processed Signature quantity. Following example demonstrates using of these properties on Signature method. Same arguments can be used for Verification process. New properties **TotalSignatures** and **ProcessedSignature** were added to **ProcessCompleteEventArgs**, **ProcessProgressEventArgs **and **ProcessStartEventArgs**
    
    TotalSignatures added to provide ability for representation total quantity of processed signatures.
    
    **TotalSignatures**
    
    ```csharp
    /// <summary>
    /// Represents total quantity of signatures to be processed.
    /// </summary>
    public int TotalSignatures { get; set; }
    ```
    
    ProcessedSignatures added to provide ability for representation quantity of processed signatures.
    
    **ProcessedSignatures**
    
    ```csharp
    /// <summary>
    /// Represents quantity of processed signatures.
    /// </summary>
    public int ProcessedSignatures { get; set; }
    ```
    
    ##### Working with Signature process Events
    
    
    
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
    SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Events" };
    handler.SignatureStarted += delegate(object sender, ProcessStartEventArgs args)
    {
        Console.WriteLine("Processing of {0} signatures for {1} started at {2}", args.TotalSignatures, args.Guid, args.Started.ToString("f"));
    };
    handler.SignatureProgress += delegate(object sender, ProcessProgressEventArgs args)
    {
        Console.WriteLine("Singing of {0} progress: {1} %. Processed {2} signatures. Since start process spent {3} mlsec", args.Guid, args.Progress, args.ProcessedSignatures, args.Ticks);
    };
    handler.SignatureCompleted += delegate(object sender, ProcessCompleteEventArgs args)
    {
        Console.WriteLine("Singing of {0} completed at {1}. Processing of {2} signatures took {3} mlsec", args.Guid, args.Completed.ToString("f"), args.TotalSignatures, args.Ticks);
    };
    // sign document
    string signedPath = handler.Sign<string>("pages12Images.pdf", signOptions, saveOptions);
    ```
    
    Methods **GetDocumentDescription** of **SignatureHandler** class was improved when Document provided by URL
    
    ###### Obtaining information about document
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // Document description
    DocumentDescription docInfo = handler.GetDocumentDescription(@"https://www.dropbox.com/s/bzx1xm68zd0c910/PieChart.docx?dl=1");
    Console.WriteLine("Document " + docInfo.Guid + " contains " + docInfo.PageCount + " pages");
    Console.WriteLine("File format is " + docInfo.FileFormat);
    Console.WriteLine("File extension is  " + docInfo.Extension);
    Console.WriteLine("Date created is " + docInfo.DateCreated);
    Console.WriteLine("Date modified is " + docInfo.DateModified);
    Console.WriteLine("Password to open file is " + docInfo.Password);
    Console.WriteLine("File size in bytes is " + docInfo.Size);
    Console.WriteLine("Width of first page is " + docInfo.Pages.FirstOrDefault().Width); 
    ```
    
      
    
4.  New class  **SignatureExtension** was added to specify base class for signature visual and functional extensions.
    
    **SignatureExtension**
    
    ```csharp
    //// <summary>
    /// Represents base class for signatures extensions.
    /// </summary>
    public abstract class SignatureExtension : ICloneable
    {
        /// <summary>
        /// Gets a copy of this object.
        /// </summary>
        public virtual Object Clone()
        {
            return this.MemberwiseClone();
        }
    }
    ```
