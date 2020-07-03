---
id: groupdocs-signature-for-net-19-1-release-notes
url: signature/net/groupdocs-signature-for-net-19-1-release-notes
title: GroupDocs.Signature for .NET 19.1 Release Notes
weight: 10
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.1{{< /alert >}}

## Major Features

There are few new features, improvements and bug fixes in this regular release. Most features are related to introduced Image Metadata signatures support, improvement on Image Metadata Signature data type conversion, same as some bug fixes. Summary the most notable changes are:

*   Introduced Metadata Signature Singing features for Image Documents
*   Added support of rounded corners for Stamp inner lines
*   Fixed Barcode and QR-code singing with wide borders for better recognition
*   Improved signatures options detection

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-1856 | Fix Stamp generation processing for wide areas | Bug |
| SIGNATURENET-1851 |  QR/Bar code with wide border cannot be read | Bug |
| SIGNATURENET-1786 | Implement Rounded corners for Rectangle Stamp Signature Types | New Feature |
| SIGNATURENET-1719 | Implement Metadata Signature features for Image Documents | New Feature |
| SIGNATURENET-1871 |  Improve Image Metadata type conversion | Improvement |
| SIGNATURENET-1858 |  Optimize Document options type detection for handler processes (Sign/Verify/Search) | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.1. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  New public class **ImageMetadataSignatureOptions** was added to support Metadata signatures for Image Documents. **Image Metadata** signatures are based on Exchangeable image file format (Exif) specification. The Exif data references are specified standard and custom image properties of various type of data. Current version starts to support adding exit metadata signatures. Please read Exif tags specifications carefully to ensure when using different metadata identifiers that could be reserved for standard Exif tag properties.
    
    **ImagesMetadataSignOptions class properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Options for Image Documents.
    /// </summary>
    public class ImagesMetadataSignOptions : MetadataSignOptions
    {
        /// <summary>
        /// Initializes a new instance of the ImagesSignMetadataOptions class with default values.
        /// </summary>
        public ImagesMetadataSignOptions();
     
        /// <summary>
        /// Initializes a new instance of the ImagesSignMetadataOptions class with Metadata.
        /// </summary>
        /// <param name="collection">Signature Metadata</param>
        public ImagesMetadataSignOptions(IEnumerable<MetadataSignature> collection);
     
    }
    ```
    
2.  Class **ImagesMetadataSignature** was updated with constructor and conversion methods.  
    Public sealed class **ImageMetadataSignature** was updated with constructor that expects identifier and value. Class supports any standard data types, same as methods to convert. Please carefully read Exif tags specifications to clarify what Id values are acceptable for your scenarios of using Image Metadata signature.
    
    **Image Metadata Signature class properties**
    
    ```csharp
    /// <summary>
    /// Creates Image Metadata Signature with Id and value
    /// </summary>
    /// <param name="id">Unique identifier Image Metadata Signature name. See references for Exif tags specifications for possible id values</param>
    /// <param name="value">Metadata value</param>
    public ImageMetadataSignature(ushort id, object value);
    ```
    
    Several methods were added for Metadata value conversion to any supported standard type.
    
    **Image Metadata methods**
    
    ```csharp
    /// <summary>
    /// Converts to long.
    /// </summary>
    /// <returns>Returns the Metadata Signature value as long.</returns>
    /// <remarks>Throws an exception if the Metadata value could not be converted.</remarks>
    public long ToLong();
     
    /// <summary>
    /// Converts to Double.
    /// </summary>
    /// <returns>Returns the Image Metadata Signature value as Double.</returns>
    /// <remarks>Throws an exception if the Metadata value could not be converted. 
    /// If original value is string based the default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
    /// </remarks>
    public override double ToDouble();
     
    /// <summary>
    /// Converts to Double.
    /// </summary>
    /// <returns>Returns the Metadata Signature value as Double.</returns>
    /// <param name="provider">Format data provider to use with data conversion operations.</param>
    /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
    public override double ToDouble(IFormatProvider provider);
     
    /// <summary>
    /// Converts to Decimal.
    /// </summary>
    /// <returns>Returns the Image Metadata Signature value as Decimal.</returns>
    /// <remarks>Throws an exception if the Metadata value could not be converted. 
    /// If original value is string based the default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
    /// </remarks>
    public decimal ToDecimal();
     
    /// <summary>
    /// Converts to Decimal.
    /// </summary>
    /// <returns>Returns the Metadata Signature value as Decimal.</returns>
    /// <param name="provider">Format data provider to use with data conversion operations.</param>
    /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
    public decimal ToDecimal(IFormatProvider provider);
     
    /// <summary>
    /// Converts to DateTime.
    /// </summary>
    /// <returns>Returns the Metadata Signature value as DateTime.</returns>
    /// <remarks>Throws an exception if the Metadata value could not be converted. 
    /// If original value is string based the default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
    /// </remarks>
    public override DateTime ToDateTime();
     
    /// <summary>
    /// Converts to DateTime.
    /// </summary>
    /// <returns>Returns the Metadata Signature value as DateTime.</returns>
    /// <param name="provider">Format data provider to use with data conversion operations.</param>
    /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
    public override DateTime ToDateTime(IFormatProvider provider);
     
    /// <summary>
    /// Converts to String with override ToString() method
    /// </summary>
    /// <returns>Returns the Metadata Signature value as String.</returns>
    public override string ToString();
     
    /// <summary>
    /// Converts to String with specified format
    /// </summary>
    /// <returns>Returns the Metadata Signature value as String.</returns>
    /// <param name="format">Data format string.</param>
    /// <remarks>Converts a boolean property into "True" or "False".
    /// Default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
    /// </remarks>
    public override string ToString(string format);
     
    /// <summary>
    /// Converts to String with specified format
    /// </summary>
    /// <returns>Returns the Metadata Signature value as String.</returns>
    /// <param name="format">Data format string.</param>
    /// <param name="provider">Format data provider to use with data conversion operations.</param>
    /// <remarks>Converts a boolean property into "True" or "False".</remarks>
    public override string ToString(string format, IFormatProvider provider);
    ```
    
    Following example demonstrates using different Image Metadata signatures to be posted on Image Document.
    
    **Sing Image document with Metadata Signatures**
    
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
    ImagesMetadataSignOptions signOptions = new ImagesMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    ushort imgsMetadataId = 41996;
    // setup int value
    ImageMetadataSignature mdSign_DocId = new ImageMetadataSignature(imgsMetadataId++, 123456); // int
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup Author property
    ImageMetadataSignature mdSign_Author = new ImageMetadataSignature(imgsMetadataId++, "Mr.Scherlock Holmes"); // string
    signOptions.MetadataSignatures.Add(mdSign_Author);                        
    // setup data of sign date
    ImageMetadataSignature mdSign_Date = new ImageMetadataSignature(imgsMetadataId++, DateTime.Now); // DateTime
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // setup double
    ImageMetadataSignature mdSign_Amnt = new ImageMetadataSignature(imgsMetadataId++, 123.456M); //decimal value
    signOptions.MetadataSignatures.Add(mdSign_Amnt);
     
    // sign document
    string signedPath = handler.Sign<string>(@"SignedMetadata.jpg", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMetadata2.jpg" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
3.  New public class **SquareBorderLine** inherits **BorderLine** and was added to implement square signature with rounded corners.
    
    This class is able to contain data about radius of square signature corners.
    
    **SquareBorderLine class properties**
    
    ```csharp
    /// <summary>
    /// Instance to keep Border line properties for square stamp line.
    /// </summary>
    public class SquareBorderLine: BorderLine
    {
       /// <summary>
       /// Gets or sets the radius of square corners.
       /// </summary>
       public Corners Radius {get;set;}
    	
       /// <summary>
       /// Create SquareBorderLine with rounded corner radius.
       /// </summary>
       /// <param name="radius">Radius of square corners.</param>
       public SquareBorderLine(double radius);
       /// <summary>
       /// Create SquareBorderLine with corner radius values.
       /// </summary>
       /// <param name="corners">Radius of square corners.</param>
       public SquareBorderLine(Corners corners);
     
    }
    ```
    
    **SquareBorderLine Example**
    
    ```csharp
    //All examples for Cells, PDF, Slides, Words and Images Stamp Signatures are different
    //You can find another examples in help topics for other document types
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup options
    ImagesStampSignOptions signOptions = new ImagesStampSignOptions();
    signOptions.Height = 100;
    signOptions.Width = 300;
    signOptions.BackgroundColorCropType = StampBackgroundCropType.OuterArea; 
     
    //Inner square lines
    StampLine line0 = new StampLine();
    line0.Text = "PAID";
    line0.TextColor = Color.White;
    line0.Font.FontSize = 32;
    line0.Font.Bold = true;
    line0.Height = 100;
    //Set radius of square corner
    line0.OuterBorder = new SquareBorderLine(new Corners(25)); //This type is supported starting from version 19.01
    line0.OuterBorder.Color = Color.Gray;
    line0.OuterBorder.Weight = 2;
    line0.BackgroundColor = Color.ForestGreen;
    signOptions.InnerLines.Add(line0);
     
    // sign document
    string signedPath = handler.Sign<string>("test.png", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_Stamp_RoundedCorners" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
4.  New public class **Corners** was added to implement storage for square corners radius values. Zero value means no rounded corner.
    
    This class is able to contain data about four corners of square object.
    
    **Corners class properties**
    
    ```csharp
    /// <summary>
    /// Represents corners of a square graphical object.
    /// </summary>
    public class Corners
    {
        /// <summary>
        /// Gets or sets the value for all corners.
        /// Changing of any partial corner like top right makes this property equal 0;
        /// </summary>
        public double All
     
        /// <summary>
        /// Gets or sets top left corner value.
        /// </summary>
        public double TopLeft
     
        /// <summary>
        /// Gets or sets top right corner value.
        /// </summary>
        public double TopRight 
     
        /// <summary>
        /// Gets or sets bottom left corner value.
        /// </summary>       
        public double BottomLeft
     
        /// <summary>
        /// Gets or sets bottom right corner value.
        /// </summary>
        public double BottomRight 
     
        /// <summary>
        /// Initializes a new instance of Corners class using zero values.
        /// </summary>
        public Corners();
     
        /// <summary>
        /// Initializes a new instance of the Corners class using the supplied value for all corners.
        /// </summary>
        /// <param name="all">The value to be used for all corners.</param>
        public Corners(double all);
     
        /// <summary>
        /// Initializes a new instance of the Corners class using the supplied values.
        /// </summary>
        /// <param name="topLeft">Top left corner value.</param>
        /// <param name="topRight">Top right corner value.</param>
        /// <param name="bottomLeft">Bottom left corner value.</param>
        /// <param name="bottomRight">Bottom right corner value.</param>
        public Corners(double topLeft, double topRight, double bottomLeft, double bottomRight)
    }
    ```
