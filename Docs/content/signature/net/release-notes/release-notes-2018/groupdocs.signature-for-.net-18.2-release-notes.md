---
id: groupdocs-signature-for-net-18-2-release-notes
url: signature/net/groupdocs-signature-for-net-18-2-release-notes
title: GroupDocs.Signature for .NET 18.2 Release Notes
weight: 11
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.2{{< /alert >}}

## Major Features

There are about 20 improvements, new features and fixes in this regular release. Most new features are related to Barcode/QR-Code Signatures searching and Brush extensions to support different brush styles. The most notable changes are:

*   Introduced Barcode Signatures search for all supported Document types including Images
*   Implemented events for Search process to notify about start, progress and complete events
*   Updated Dynamic Metered library with latest changes and fixes
*   Introduced QR-Code Signatures search for all supported Document types including Images
*   Implemented new Brush extension for Signature appearance
*   Introduced Solid Brush style, Gradient Brush style, Radial Gradient Brush style
*   Fixed Pages Setup calculations for single page Documents
*   Updated classes, methods and properties with detailed comments
*   Marked few properties as obsolete and removed old obsolete classes and properties

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3357 | Implement ability to obtain Search Progress | New Feature |
| SIGNATURENET-3356 | Implement rectangle property to set borders of ellipse for BrushRadialGradient | New Feature |
| SIGNATURENET-3352 | Implement ability to obtain QR-Code Signatures from Image Documents | New Feature |
| SIGNATURENET-3349 | Implement ability to obtain QR-Code Signatures from Words Documents | New Feature |
| SIGNATURENET-3346 | Implement ability to obtain QR-Code Signatures from Slides Documents | New Feature |
| SIGNATURENET-3343 | Implement ability to obtain QR-Code Signatures from Cells Documents | New Feature |
| SIGNATURENET-3340 | Implement ability to obtain QR-Code Signatures from Pdf Documents | New Feature |
| SIGNATURENET-3336 | Implement ability to obtain Barcode Signatures from Image Documents | New Feature |
| SIGNATURENET-3333 | Implement ability to obtain Barcode Signatures from Slides Documents | New Feature |
| SIGNATURENET-3330 | Implement ability to obtain Barcode Signatures from Words Documents | New Feature |
| SIGNATURENET-3320 | Implement ability to obtain Barcode Signatures from Cells Documents | New Feature |
| SIGNATURENET-3247 | Implement ability to obtain Barcode Signatures from Pdf Documents | New Feature |
| SIGNATURENET-3361 | Update Dynamic Metered library with latest changes | Improvement |
| SIGNATURENET-3355 | Implement Radial Gradient Brush class as Separate class (alternative of Drawing.Brush) | Improvement |
| SIGNATURENET-3329 | Implement Solid Brush class as Separate class (alternative of Drawing.Brush) | Improvement |
| SIGNATURENET-3328 | Implement Linear Gradient Brush class as Separate class (alternative of Drawing.Brush) | Improvement |
| SIGNATURENET-3327 | Implement Texture Brush class as Separate class (alternative of Drawing.Brush) | Improvement |
| SIGNATURENET-3278 | Mark Brush property as Obsolete | Improvement |
| SIGNATURENET-3367 | Multiple options on Pages Setup give duplicate page numbers | Bug |
| SIGNATURENET-3286 | Improve result of Signing methods when Document provided by URL | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.2. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **Introduced Search of Barcode Signatures** in supported Document types. Added scope of classes to specify search barcode options. Base abstract class **SearchBarcodeOptions** derives base **SearchOptions** and describes properties to specify criteria for Barcode search like encode type, text and text match type. For each Document type few inherited classes were added like **PdfSearchBarcodeOptions**, **CellsSearchBarcodeOptions**, **ImagesSearchBarcodeOptions**, **SlidesSearchBarcodeOptions** and **WordsSearchBarcodeOptions**
    
    New abstract class **SearchBarcodeOptions** was added to provide base properties for Barcode search support from Documents. Class contains optional different search criteria like Barcode encode type, encoded text and different options for text matching.
    
    **SearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents abstract search Options for Bar-code Signatures.
    /// </summary>
    public abstract class SearchBarcodeOptions : SearchOptions
    {
        /// <summary>
        /// Specifies Encode Type property to search Bar-codes.
        /// If this value is not set, search is processed for all supported Bar-code Types
        /// </summary>
        public BarcodeType EncodeType
     
        /// <summary>
        /// Specifies Bar-code Signature text if it should be searched and matched.
        /// </summary>
        public string Text
     
        /// <summary>
        /// Get or set Bar-code text Match Type search. It is used only when Text property is set.
        /// </summary>
        public TextMatchType MatchType
     
        /// <summary>
        /// Initializes a new instance of the SearchBarcodeOptions class with default values.
        /// </summary>
        public SearchBarcodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the SearchBarcodeOptions class with encode type value.
        /// </summary>
        /// <param name="encodeType">Specifies Barcode encode type.</param>
        public SearchBarcodeOptions(BarcodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the SearchBarcodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies Barcode encode type.</param>
        /// <param name="text">Set Text of Barcode signature.</param>
        public SearchBarcodeOptions(BarcodeType encodeType, string text)
     
    }
    ```
    
    1\. Property **EncodeType** is optional, if this field is set Search method of Signature Handler will collect only Barcodes with specified Encode type inside the Document.
    
    2\. Property **Text** is optional, if this field is set Search method of Signature Handler will collect only Barcodes with specified encoded text that matches provided. The match type is specified by **MatchType**  property.
    
    3\. Property **MatchType** is optional, this enumeration provides the way to match Barcode text and specified text.
    
    **MatchType**
    
    ```csharp
    /// <summary>
    /// Specifies Text Match type in string - Exact, StartsWith, EndsWith, Contains
    /// </summary>
    [Obfuscation(Feature = "internalization", Exclude = true, ApplyToMembers = true)]
    public enum TextMatchType
    {
        /// <summary>
        /// Text is fully match.
        /// </summary>
        Exact = 0,
        /// <summary>
        /// Text starts with value.
        /// </summary>
        StartsWith = 1,
        /// <summary>
        /// Text ends with value.
        /// </summary>
        EndsWith = 2,
        /// <summary>
        /// Text contains the value.
        /// </summary>
        Contains = 3
    }
    ```
    
    New class **PdfSearchBarcodeOptions** was added to provide Search Barcode properties for Pdf Documents. Class derives base SearchBarcodeOptions and contains different constructors.
    
    **PdfSearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Pdf Documents.
    /// </summary>
    public class PdfSearchBarcodeOptions : SearchBarcodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the PdfSearchBarcodeOptions class with default values.
        /// </summary>
        public PdfSearchBarcodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the PdfSearchBarcodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        public PdfSearchBarcodeOptions(BarcodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the PdfSearchBarcodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        /// <param name="text">Set Text of Bar-code signature to search for.</param>
        public PdfSearchBarcodeOptions(BarcodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search Barcode Signatures in Pdf Documents
    
    **Search Barcode Signatures in Pdf Documents**
    
    ```csharp
     // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    PdfSearchBarcodeOptions searchOptions = new PdfSearchBarcodeOptions();
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
    // specify barcode type to search only special encode type
    searchOptions.EncodeType = BarcodeTypes.Code39Standard;
    // specify barcode text to search
    searchOptions.Text = "12345678";
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
    // search document
    SearchResult result = handler.Search("SignedBarCode.pdf", searchOptions);
    // output signatures
    foreach(BaseSignature signature in result.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if(bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **CellsSearchBarcodeOptions** was added to provide Search Barcode properties for Cells Documents. Class derives base SearchBarcodeOptions and contains different constructors.
    
    **CellsSearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Cells Documents.
    /// </summary>
    public class CellsSearchBarcodeOptions : SearchBarcodeOptions
    {
    	/// <summary>
    	/// Initializes a new instance of the CellsSearchBarcodeOptions class with default values.
    	/// </summary>
    	public CellsSearchBarcodeOptions()
    	/// <summary>
    	/// Initializes a new instance of the CellsSearchBarcodeOptions class with encode type.
    	/// </summary>
    	/// <param name="encodeType">Specifies Bar-code encode type.</param>
    	public CellsSearchBarcodeOptions(BarcodeType encodeType)
    	/// <summary>
    	/// Initializes a new instance of the CellsSearchBarcodeOptions class with encode type and text values.
    	/// </summary>
    	/// <param name="encodeType">Specifies Bar-code encode type.</param>
    	/// <param name="text">Set Text of Barcode signature to search for.</param>
    	public CellsSearchBarcodeOptions(BarcodeType encodeType, string text)
    }
    ```
    
    Following example demonstrates how to search Barcode Signatures in Cells Documents
    
    **Search Barcode Signatures in Cells Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    CellsSearchBarcodeOptions searchOptions = new CellsSearchBarcodeOptions();
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
    // specify barcode type to search only special encode type
    searchOptions.EncodeType = BarcodeTypes.Code39Standard;
    // specify barcode text to search
    searchOptions.Text = "12345678";
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
    // search document
    SearchResult result = handler.Search("SignedBarCode.xls", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **ImagesSearchBarcodeOptions **was added to provide Search Barcode properties for Images. Class derives base SearchBarcodeOptions and contains different constructors.
    
    **ImagesSearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Images Documents.
    /// </summary>
    public class ImagesSearchBarcodeOptions : SearchBarcodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the ImagesSearchBarcodeOptions class with default values.
        /// </summary>
        public ImagesSearchBarcodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the ImagesSearchBarcodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        public ImagesSearchBarcodeOptions(BarcodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the ImagesSearchBarcodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies Barcode encode type.</param>
        /// <param name="text">Set Text of Barcode signature to search for.</param>
        public ImagesSearchBarcodeOptions(BarcodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search Barcode Signatures in Images
    
    **Search Barcode Signatures in Images Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    ImagesSearchBarcodeOptions searchOptions = new ImagesSearchBarcodeOptions();
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
    // specify barcode type to search only special encode type
    searchOptions.EncodeType = BarcodeTypes.Code39Standard;
    // specify barcode text to search
    searchOptions.Text = "12345678";
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
    // search document
    SearchResult result = handler.Search("SignedBarCode.png", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **SlidesSearchBarcodeOptions **was added to provide Search Barcode properties for Slides Documents. Class derives base SearchBarcodeOptions and contains different constructors.
    
    **SlidesSearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Slides Documents.
    /// </summary>
    public class SlidesSearchBarcodeOptions : SearchBarcodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the SlidesSearchBarcodeOptions class with default values.
        /// </summary>
        public SlidesSearchBarcodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the SlidesSearchBarcodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        public SlidesSearchBarcodeOptions(BarcodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the SlidesSearchBarcodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        /// <param name="text">Set Text of Bar-code signature to search for.</param>
        public SlidesSearchBarcodeOptions(BarcodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search Barcode Signatures in Slides Documents
    
    **Search Barcode Signatures in Slides Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    SlidesSearchBarcodeOptions searchOptions = new SlidesSearchBarcodeOptions();
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
    // specify barcode type to search only special encode type
    searchOptions.EncodeType = BarcodeTypes.Code39Standard;
    // specify barcode text to search
    searchOptions.Text = "12345678";
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
    // search document
    SearchResult result = handler.Search("SignedBarCode.Pptx", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **WordsSearchBarcodeOptions **was added to provide Search Barcode properties for Words Documents. Class derives base SearchBarcodeOptions and contains different constructors.
    
    **WordsSearchBarcodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Words Documents.
    /// </summary>
    public class WordsSearchBarcodeOptions : SearchBarcodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the WordsSignTextOptions class with default values.
        /// </summary>
        public WordsSearchBarcodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchBarcodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        public WordsSearchBarcodeOptions(BarcodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchBarcodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies Bar-code encode type.</param>
        /// <param name="text">Set Text of Bar-code signature to search for.</param>
        public WordsSearchBarcodeOptions(BarcodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search Barcode Signatures in Words Documents
    
    **Search Barcode Signatures in Words Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    WordsSearchBarcodeOptions searchOptions = new WordsSearchBarcodeOptions();
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
    // specify barcode type to search only special encode type
    searchOptions.EncodeType = BarcodeTypes.Code39Standard;
    // specify barcode text to search
    searchOptions.Text = "12345678";
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
    // search document
    SearchResult result = handler.Search("SignedBarCode.docx", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
2.  New classes to keep Barcode Signatures were added. Base class **BarcodeSignature** that keeps properties of Barcode Signature like Barcode encode type, coded text. Added derived classes **PdfBarcodeSignature**, **ImagesBarcodeSignature**, **CellsBarcodeSignature**, **SlidesBarcodeSignature** and **WordsBarcodeSignature**
    
    New abstract class **BarcodeSignature** was added to specify base properties of Barcode Signature like Barcode encode type, coded text.
    
    **BarcodeSignature**
    
    ```csharp
    /// <summary>
    /// Contains Barcode Signature properties.
    /// </summary>
    public abstract class BarcodeSignature : BaseSignature
    {
    	/// <summary>
    	/// Specifies the Barcode Encode Type.
    	/// </summary>
    	public BarcodeType EncodeType { get; set; }
    	/// <summary>
    	/// Specifies text of Barcode.
    	/// </summary>
    	public string Text { get; set; }
    	/// <summary>
    	/// Initialize BarcodeSignature with default parameters.
    	/// </summary>
    	public BarcodeSignature()
    	/// <summary>
    	/// Initialize Barcode Signature with specified Encode Type.
    	/// </summary>
    	/// <param name="encodeType">Encode type of Barcode.</param>
    	/// <param name="text">Barcode text property.</param>
    	public BarcodeSignature(BarcodeType encodeType, string text)
    }
    ```
    
    New class **PdfBarcodeSignature **was added to specify properties of Barcode Signature from Pdf Documents. Class inherits base BarcodeSignature properties and contains few constructors.
    
    **PdfBarcodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes Barcode Signature of Pdf Documents.
    /// </summary>
    public class PdfBarcodeSignature : BarcodeSignature
    {
        /// <summary>
        /// Initialize PDF Barcode Signature with default values.
        /// </summary>
        public PdfBarcodeSignature()
     
        /// <summary>
        /// Initialize PDF Barcode Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of Barcode.</param>
        /// <param name="text">Barcode text property.</param>
        public PdfBarcodeSignature(BarcodeType encodeType, string text)
    }
    ```
    
    New class **ImagesBarcodeSignature **was added to specify properties of Barcode Signature from Images. Class inherits base BarcodeSignature properties and contains few constructors.
    
    **ImagesBarcodeSignature**
    
    ```csharp
    // <summary>
    /// Describes Barcode Signature of Images Documents.
    /// </summary>
    public class ImagesBarcodeSignature : BarcodeSignature
    {
        /// <summary>
        /// Initialize Images Barcode Signature.
        /// </summary>
        public ImagesBarcodeSignature()
         
        /// <summary>
        /// Initialize Images Barcode Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of Barcode.</param>
        /// <param name="text">Barcode text property.</param>
        public ImagesBarcodeSignature(BarcodeType encodeType, string text)
    }
    ```
    
    New class **CellsBarcodeSignature **was added to specify properties of Barcode Signature from Cells Documents. Class inherits base BarcodeSignature properties and contains few constructors.
    
    **CellsBarcodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes Barcode Signature of Cells Documents.
    /// </summary>
    public class CellsBarcodeSignature : BarcodeSignature
    {
        /// <summary>
        /// Initialize Cells Barcode Signature.
        /// </summary>
        public CellsBarcodeSignature()
     
        /// <summary>
        /// Initialize Cells Barcode Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of Barcode.</param>
        /// <param name="text">Barcode text property.</param>
        public CellsBarcodeSignature(BarcodeType encodeType, string text)
    }
    ```
    
    New class **SlidesBarcodeSignature **was added to specify properties of Barcode Signature from Slides Documents. Class inherits base BarcodeSignature properties and contains few constructors.
    
    **SlidesBarcodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes Barcode Signature of Slides Documents.
    /// </summary>
    public class SlidesBarcodeSignature : BarcodeSignature
    {
        /// <summary>
        /// Initialize Slides Barcode Signature with default values.
        /// </summary>
        public SlidesBarcodeSignature()
     
        /// <summary>
        /// Initialize Slides Barcode Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of Barcode.</param>
        /// <param name="text">Barcode text property.</param>
        public SlidesBarcodeSignature(BarcodeType encodeType, string text)
     
    }
    ```
    
    New class **WordsBarcodeSignature **was added to specify properties of Barcode Signature from Words Documents. Class inherits base BarcodeSignature properties and contains few constructors.
    
    **WordsBarcodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes Barcode Signature of Words Documents.
    /// </summary>
    public class WordsBarcodeSignature : BarcodeSignature
    {
        /// <summary>
        /// Initialize Words Barcode Signature with default values.
        /// </summary>
        public WordsBarcodeSignature()
         
        /// <summary>
        /// Initialize Words Barcode Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of Barcode.</param> 
        /// <param name="text">Barcode Text property</param> 
        public WordsBarcodeSignature(BarcodeType encodeType, string text)
    }
    ```
    
3.  **Introduced Search of QR-Code Signatures** in supported Document types. Added scope of classes to specify search QR-Code options. Base abstract class **SearchQRCodeOptions** derives base **SearchOptions** and describes properties to specify criteria for QR-Code search like encode type, text and text match type. For each Document type few inherited classes were added like **PdfSearchQRCodeOptions**, **CellsSearchQRCodeOptions**, **ImagesQRCodeSignature**, **SlidesSearchQRCodeOptions** and **WordsSearchQRCodeOptions**
    
    New abstract class **SearchQRCodeOptions** was added to provide base properties for QR-Code search support from Documents. Class contains optional different search criteria like QR-Code encode type, encoded text and different options for text matching.
    
    **SearchQRCodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents abstract search Options for QR-Code Signatures.
    /// </summary>
    public abstract class SearchQRCodeOptions : SearchOptions
    {
        /// <summary>
        /// Specifies Encode Type property to search QR-Codes.
        /// If this value is not set, search is processed for all supported QR-Code Types.
        /// </summary>
        public QRCodeType EncodeType
     
        /// <summary>
        /// Specifies QR-Code Signature Text if it should be searched and matched.
        /// </summary>
        public string Text
     
        /// <summary>
        /// Get or set QR-Code Text Match Type search. It is used only when Text property is set.
        /// </summary>
        public TextMatchType MatchType
     
        /// <summary>
        /// Initializes a new instance of the SearchQRCodeOptions class with default values.
        /// </summary>
        public SearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the SearchQRCodeOptions class with encode type value.
        /// </summary>
        /// <param name="encodeType">Specifies QR-Code encode type.</param>
        public SearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the SearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-Code encode type.</param>
        /// <param name="text">Set Text of QR-Code signature.</param>
        public SearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    1\. Property **EncodeType** is optional, if this field is set Search method of Signature Handler will collect only QR-Codes with specified Encode type inside the Document
    
    2\. Property **Text** is optional, if this field is set Search method of Signature Handler will collect only QR-Codes with specified encoded text that matches provided. The match type is specified by **MatchType**  property.
    
    3\. Property **MatchType** is optional, this enumeration provides the way to match QR-Code text and specified text.
    
    New class **PdfSearchQRCodeOptions** was added to provide Search QR-Code properties for Pdf Documents. Class derives base SearchQRCodeOptions and contains different constructors.
    
    **PdfSearchQRCodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the QR-code Signature Search Options for Pdf Documents.
    /// </summary>
    public class PdfSearchQRCodeOptions : SearchQRCodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the PdfSearchQRCodeOptions class with default values.
        /// </summary>
        public PdfSearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the PdfSearchQRCodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        public PdfSearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the PdfSearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        /// <param name="text">Set Text of QR-code signature to search for.</param>
        public PdfSearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search QR-Code Signatures in Pdf Documents
    
    **Search QR-Code Signatures in Pdf Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup search options
    PdfSearchQRCodeOptions searchOptions = new PdfSearchQRCodeOptions();
     
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
     
    // specify QRCode type to search only special encode type
    searchOptions.EncodeType = QRCodeTypes.QR;
     
    // specify QRCode text to search
    searchOptions.Text = "12345678";
     
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
     
    // search document
    SearchResult result = handler.Search("SignedQRCode.pdf", searchOptions);
    // output signatures
     
    foreach (BaseSignature signature in result.Signatures)
    {
        QRCodeSignature bcSignature = signature as QRCodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **CellsSearchQRCodeOptions** was added to provide Search QR-Code properties for Cells Documents. Class derives base SearchQRCodeOptions and contains different constructors.
    
    **CellsSearchQRCodeOptions**
    
    ```csharp
     /// <summary>
    /// Represents the QR-code Signature Search Options for Cells Documents.
    /// </summary>
    public class CellsSearchQRCodeOptions : SearchQRCodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the CellsSearchQRCodeOptions class with default values.
        /// </summary>
        public CellsSearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the CellsSearchQRCodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        public CellsSearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the CellsSearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        /// <param name="text">Set Text of QR-code signature to search for.</param>
        public CellsSearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search QR-Code Signatures in Cells Documents
    
    **Search QR-Code Signatures in Cells Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup search options
    CellsSearchQRCodeOptions searchOptions = new CellsSearchQRCodeOptions();
     
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
     
    // specify QRCode type to search only special encode type
    searchOptions.EncodeType = QRCodeTypes.QR;
     
    // specify QRCode text to search
    searchOptions.Text = "12345678";
     
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
     
    // search document
    SearchResult result = handler.Search("SignedQRCode.xls", searchOptions);
     
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        QRCodeSignature bcSignature = signature as QRCodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **ImagesSearchQRCodeOptions** was added to provide Search QR-Code properties for Images Documents. Class derives base SearchQRCodeOptions and contains different constructors.
    
    **ImagesSearchQRCodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the QR-code Signature Search Options for Images Documents.
    /// </summary>
    public class ImagesSearchQRCodeOptions : SearchQRCodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the ImagesSearchQRCodeOptions class with default values.
        /// </summary>
        public ImagesSearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the ImagesSearchQRCodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        public ImagesSearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the ImagesSearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        /// <param name="text">Set Text of QR-code signature to search for.</param>
        public ImagesSearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search QR-Code Signatures in Images Documents
    
    **Search QR-Code Signatures in Images Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup search options
    ImagesSearchQRCodeOptions searchOptions = new ImagesSearchQRCodeOptions();
     
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
     
    // specify QRCode type to search only special encode type
    searchOptions.EncodeType = QRCodeTypes.QR;
     
    // specify QRCode text to search
    searchOptions.Text = "12345678";
     
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
     
    // search document
    SearchResult result = handler.Search("SignedQRCode.png", searchOptions);
     
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        QRCodeSignature bcSignature = signature as QRCodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **SlidesSearchQRCodeOptions** was added to provide Search QR-Code properties for Slides Documents. Class derives base SearchQRCodeOptions and contains different constructors.
    
    **SlidesSearchQRCodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the QR-code Signature Search Options for Slides Documents.
    /// </summary>
    public class SlidesSearchQRCodeOptions : SearchQRCodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the SlidesSearchQRCodeOptions class with default values.
        /// </summary>
        public SlidesSearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the SlidesSearchQRCodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        public SlidesSearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the SlidesSearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        /// <param name="text">Set Text of QR-code signature to search for.</param>
        public SlidesSearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search QR-Code Signatures in Slides Documents
    
    **Search QR-Code Signatures in Slides Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup search options
    SlidesSearchQRCodeOptions searchOptions = new SlidesSearchQRCodeOptions();
     
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
     
    // specify QRCode type to search only special encode type
    searchOptions.EncodeType = QRCodeTypes.QR;
     
    // specify QRCode text to search
    searchOptions.Text = "12345678";
     
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
     
    // search document
    SearchResult result = handler.Search("SignedQRCode.pptx", searchOptions);
     
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        QRCodeSignature bcSignature = signature as QRCodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
    New class **WordsSearchQRCodeOptions ** was added to provide Search QR-Code properties for Words Documents. Class derives base SearchQRCodeOptions and contains different constructors.
    
    **WordsSearchQRCodeOptions**
    
    ```csharp
    /// <summary>
    /// Represents the QR-code Signature Search Options for Words Documents.
    /// </summary>
    public class WordsSearchQRCodeOptions : SearchQRCodeOptions
    {
        /// <summary>
        /// Initializes a new instance of the WordsSearchQRCodeOptions class with default values.
        /// </summary>
        public WordsSearchQRCodeOptions()
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchQRCodeOptions class with encode type.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        public WordsSearchQRCodeOptions(QRCodeType encodeType)
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchQRCodeOptions class with encode type and text values.
        /// </summary>
        /// <param name="encodeType">Specifies QR-code encode type.</param>
        /// <param name="text">Set Text of QR-code signature to search for.</param>
        public WordsSearchQRCodeOptions(QRCodeType encodeType, string text)
     
    }
    ```
    
    Following example demonstrates how to search QR-Code Signatures in Words Documents
    
    **Search QR-Code Signatures in Words Documents**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup search options
    WordsSearchQRCodeOptions searchOptions = new WordsSearchQRCodeOptions();
     
    // search only page with specified number
    searchOptions.DocumentPageNumber = 1;
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // specify different pages to search
    searchOptions.PagesSetup.FirstPage = true;
    searchOptions.PagesSetup.LastPage = true;
    searchOptions.PagesSetup.OddPages = true;
    searchOptions.PagesSetup.EvenPages = true;
     
    // specify QRCode type to search only special encode type
    searchOptions.EncodeType = QRCodeTypes.QR;
     
    // specify QRCode text to search
    searchOptions.Text = "12345678";
     
    // specify text math type
    searchOptions.MatchType = TextMatchType.Contains;
     
    // search document
    SearchResult result = handler.Search("SignedQRCode.docx", searchOptions);
     
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        QRCodeSignature bcSignature = signature as QRCodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
4.  New classes to keep QR-Code Signatures were added. Base class **QRCodeSignature** that keeps properties of QR-Code Signature like QR-Code encode type, coded text. Added derived classes **PdfQRCodeSignature**, **ImagesQRCodeSignature**, **CellsQRCodeSignature**, **SlidesQRCodeSignature** and **WordsQRCodeSignature**  
    New abstract class **QRCodeSignature **was added to specify base properties of QR-code Signature like QR-code encode type, coded text.
    
    **QRCodeSignature**
    
    ```csharp
    /// <summary>
    /// Contains QR-Code Signature properties.
    /// </summary>
    public abstract class QRCodeSignature : BaseSignature
    {
        /// <summary>
        /// Specifies the QR-Code Encode Type.
        /// </summary>
        public QRCodeType EncodeType
     
        /// <summary>
        /// Specifies text of QR-Code.
        /// </summary>
        public string Text
     
        /// <summary>
        /// Initialize QRCodeSignature with default parameters.
        /// </summary>
        public QRCodeSignature()
     
        /// <summary>
        /// Initialize QR-Code Signature with specified Encode Type.
        /// </summary>
        /// <param name="encodeType">Encode type of QR-Code.</param>
        /// <param name="text">QRCode text property.</param>
        public QRCodeSignature(QRCodeType encodeType, string text)
     
    }
    ```
    
    New class **PdfQRCodeSignature **was added to specify properties of QR-Code Signature from Pdf Documents. Class inherits base QRCodeSignature properties and contains few constructors.
    
    **PdfQRCodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes QR-Code Signature of Pdf Documents.
    /// </summary>
    public class PdfQRCodeSignature : QRCodeSignature
    {
        /// <summary>
        /// Initialize PDF QR-Code Signature with default values.
        /// </summary>
        public PdfQRCodeSignature()
     
        /// <summary>
        /// Initialize PDF QR-Code Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of QR-Code.</param>
        /// <param name="text">QR-Code text property.</param>
        public PdfQRCodeSignature(QRCodeType encodeType, string text)
     
    }
    ```
    
    New class **ImagesQRCodeSignature **was added to specify properties of QR-Code Signature from Images Documents. Class inherits base QRCodeSignature properties and contains few constructors.
    
    **ImagesQRCodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes QR-Code Signature of Images Documents.
    /// </summary>
    public class ImagesQRCodeSignature : QRCodeSignature
    {
        /// <summary>
        /// Initialize Images QR-Code Signature with default values.
        /// </summary>
        public ImagesQRCodeSignature()
     
        /// <summary>
        /// Initialize Images QR-Code Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of QR-Code.</param>
        /// <param name="text">QR-Code text property.</param>
        public ImagesQRCodeSignature(QRCodeType encodeType, string text)
     
    }
    ```
    
    New class **CellsQRCodeSignature **was added to specify properties of QR-Code Signature from Cells Documents. Class inherits base QRCodeSignature properties and contains few constructors.
    
    **CellsQRCodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes QR-Code Signature of Cells Documents.
    /// </summary>
    public class CellsQRCodeSignature : QRCodeSignature
    {
       /// <summary>
       /// Initialize Cells QR-Code Signature with default values.
       /// </summary>
       public CellsQRCodeSignature()
       /// <summary>
       /// Initialize Cells QR-Code Signature with specified Encode Type and text.
       /// </summary>
       /// <param name="encodeType">Encode type of QR-Code.</param>
       /// <param name="text">QR-Code text property.</param>
       public CellsQRCodeSignature(QRCodeType encodeType, string text)
    }
    ```
    
    New class **WordsQRCodeSignature **was added to specify properties of QR-code Signature from Words Documents. Class inherits base QRCodeSignature properties and contains few constructors.
    
    **WordsQRCodeSignature**
    
    ```csharp
    /// <summary>
    /// Describes QR-Code Signature of Words Documents.
    /// </summary>
    public class WordsQRCodeSignature : QRCodeSignature
    {
        /// <summary>
        /// Initialize Words QR-Code Signature with default values.
        /// </summary>
        public WordsQRCodeSignature()
     
        /// <summary>
        /// Initialize Words QR-Code Signature with specified Encode Type and text.
        /// </summary>
        /// <param name="encodeType">Encode type of QR-Code.</param> 
        /// <param name="text">QR-Code Text property</param> 
        public WordsQRCodeSignature(QRCodeType encodeType, string text)
     
    }
    ```
    
5.  Class **SignatureHandler** was extended with following events
    
    public event ProcessStartEventHandler** SearchStarted** - event occurs on start of search process
    
    public event ProcessProgressEventHandler **SearchProgress**; - event occurs each time on progressing search process
    
    public event ProcessCompleteEventHandler **SearchCompleted** - event occurs when search process completes
    
    **Working with Search process Events**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search option
    PdfSearchBarcodeOptions signOptions = new PdfSearchBarcodeOptions();
    // setup search for all pages
    signOptions.SearchAllPages = true;
    // setup Barcode encode type if required
    signOptions.EncodeType = BarcodeTypes.Code128;
    // setup Barcode Text if required
    signOptions.Text = "123";
    // setup Text Match type if required
    signOptions.MatchType = TextMatchType.StartsWith;
    //
    handler.SearchStarted += delegate(object sender, ProcessStartEventArgs args)
    {
        Console.WriteLine("Search started for {0}-page(s) in Document {1} started at {2}", 
                 args.TotalSignatures, args.Guid, args.Started.ToString("f"));
    };
    handler.SearchProgress += delegate(object sender, ProcessProgressEventArgs args)
    {
        Console.WriteLine("Search {0} progress: {1} %. Processed {2} pages. Since start process spent {3} mlsec", 
                args.Guid, args.Progress, args.ProcessedSignatures, args.Ticks);
    };
    handler.SearchCompleted += delegate(object sender, ProcessCompleteEventArgs args)
    {
        Console.WriteLine("Search {0} completed at {1}. Processing of {2} pages took {3} mlsec", 
                args.Guid, args.Completed.ToString("f"), args.TotalSignatures, args.Ticks);
    };
    // sign document
    SearchResult searchResult = handler.Search("pages12Images.pdf", signOptions);
    // output signatures
    foreach (BaseSignature signature in searchResult.Signatures)
    {
        BarcodeSignature bcSignature = signature as BarcodeSignature;
        if (bcSignature != null)
        {
            Console.WriteLine("Found Barcode signature: {0} with text {1}", 
                bcSignature.EncodeType.TypeName, bcSignature.Text);
        }
    }
    ```
    
6.  New set of classes in Extensions namespace was added to support different Brush styles. Base class **Brush.** Derived classes **SolidBrush**, **LinearGradientBrush**, **RadialGradientBrush** and **TextureBrush**. These Brush styles could be applied for Text Signature with Text as Image implementation, for Stamp signature to specify different background for Stamp line.  
    **Brush**, a base class for setting background options.
    
    **Brush**
    
    ```csharp
    /// Represents base class for various brushes.
    public abstract class Brush
    {
    }
    ```
    
    **SolidBrush** class for setting solid brush as signature background.
    
    **SolidBrush**
    
    ```csharp
    /// Represents solid brush.
    /// It could be used instead background color property.
     
    public class SolidBrush
    {
     
    /// Gets or sets color of solid brush.
    public System.Drawing.Color Color { get; set; }
     
     
    /// Initializes a new instance of the SolidBrush class with default values.
    public SolidBrush()
    {
    }
     
    /// Initializes a new instance of the SolidBrush class.
    /// <param name="color">Color of solid brush.</param>
    public SolidBrush(System.Drawing.Color color)
    {
    }
     
    }
    ```
    
    Working with **SolidBrush**:
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // set up options with text of signature
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.Width = 100;
    signOptions.Height = 100;
     
    // set up brush for signature background
    Rectangle rectBrush = new Rectangle(0, 0, signOptions.Width, signOptions.Height);
    GroupDocs.Signature.Domain.Extensions.Brush userBrushStyle = new SolidBrush(Color.OrangeRed);
     
    signOptions.BackgroundBrushStyle = userBrushStyle;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "Solid_Brush" });
    ```
    
    **LinearGrdiantBrush** class for setting linear gradient brush as signature background.
    
    **LinearGradientBrush**
    
    ```csharp
    /// <summary>
    /// Represents linear gradient brush.
    /// </summary>
    public class LinearGradientBrush : Brush
    {
    	/// <summary>
    	/// Gets or sets start gradient color.
    	/// </summary>
    	public Color StartColor { get; set; }
    	 
    	/// <summary>
    	/// Gets or sets finish gradient color.
    	/// </summary>
    	public Color EndColor { get; set; }
    
    	/// <summary>
    	/// Gets or sets gradient angle.
    	/// </summary>
    	public float Angle { get; set; }
    	
    	/// <summary>
    	/// Initializes a new instance of the LinearGradientBrush class with default values.
    	/// </summary>
    	public LinearGradientBrush()
    
    	/// <summary>
    	/// Initializes a new instance of the LinearGradientBrush class.
    	/// </summary>
    	/// <param name="startColor">Start color.</param>
    	/// <param name="endColor">End color.</param>
    	/// <param name="angle">Angle. Default value is 0.</param>
    	public LinearGradientBrush(Color startColor, Color endColor, float angle = 0)
    }
    ```
    
    Working with **LinearGradientBrush**:
    
    
    
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
    // text rectangle size
    signOptions.Height = 100;
    signOptions.Width = 100;
    //brush for signature background
    Rectangle rectBrush = new Rectangle(0, 0, signOptions.Width, signOptions.Height);
     
    //Actual property is BackgroundBrushStyle.
    //This feature is available from version 18.02.
    Brush userBrushStyle =
        new LinearGradientBrush() { StartColor = Color.Yellow, EndColor = Color.OrangeRed, Angle = 75 };
    signOptions.BackgroundBrushStyle = userBrushStyle;
    // sign document
    string signedPath = handler.Sign<string>("test.xlsx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Gradient_Brash" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    **RadialGradientBrush** class for setting radial gradient brush as signature background.  
    
    **RadialGradientBrush**
    
    ```csharp
     /// <summary>
    /// Represents radial gradient brush.
    /// </summary>
    public class RadialGradientBrush : Brush
    {
        /// <summary>
        /// Gets or sets inner gradient color.
        /// </summary>
        public Color InnerColor { get; set; }
     
        /// <summary>
        /// Gets or sets outer gradient color.
        /// </summary>
        public Color OuterColor { get; set; }
     
        /// <summary>
        /// Initializes a new instance of the RadialGradientBrush class with default values.
        /// </summary>
        public RadialGradientBrush()
     
        /// <summary>
        /// Initializes a new instance of the RadialGradientBrush class.
        /// </summary>
        /// <param name="innerColor">Inner color.</param>
        /// <param name="outerColor">Outer color.</param>
        public RadialGradientBrush(Color innerColor, Color outerColor)
    }
    ```
    
    Working with **RadialGradientBrush**:
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // set up options with text of signature
    PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith");
    signOptions.Width = 100;
    signOptions.Height = 100;
    signOptions.SignatureImplementation = PdfTextSignatureImplementation.Image;
                 
    // set up brush for signature background
    var userBrushStyle = new RadialGradientBrush(Color.OrangeRed, Color.Yellow);
     
    signOptions.BackgroundBrushStyle = userBrushStyle;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "RadialGradient_Brush" }); 
    ```
    
    **TextureBrush** class for setting image texture brush as signature background.  
    
    **TextureBrush**
    
    ```csharp
    /// <summary>
    /// Represents texture brush.
    /// </summary>
    public class TextureBrush : Brush
    {
        /// <summary>
        /// Gets or sets the texture image file Guid.
        /// This property is used only if ImageStream is not specified.
        /// </summary>
        public string ImageGuid { get;set; }
     
        /// <summary>
        /// Gets or sets the texture image stream.
        /// If this property is specified it is always used instead ImageGuid.
        /// </summary>
        public Stream ImageStream { get;set; }
     
        /// <summary>
        /// Initializes a new instance of the TextureBrush class with default values.
        /// </summary>
        public TextureBrush()
        {
        }
        /// <summary>
        /// Initializes a new instance of the TextureBrush class with image guid option.
        /// </summary>
        /// <param name="imageGuid">Image file Guid.</param>
        public TextureBrush(string imageGuid)
     
        /// <summary>
        /// Initializes a new instance of the TextureBrush class with image stream option.
        /// </summary>
        /// <param name="imageStream">Image stream.</param>
        public TextureBrush(Stream imageStream)
         
    } 
    ```
    
    Working with **TextureBrush**:
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // set up options with text of signature
    SlidesSignTextOptions signOptions = new SlidesSignTextOptions("John Smith");
    signOptions.Width = 100;
    signOptions.Height = 100;
     
     
    var userBrushStyle = new TextureBrush(@"C:\Aspose\Test\Images\200.png");
     
    signOptions.BackgroundBrushStyle = userBrushStyle;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
    new SaveOptions { OutputType = OutputType.String, OutputFileName = "Texture_Brush" }); 
    ```
