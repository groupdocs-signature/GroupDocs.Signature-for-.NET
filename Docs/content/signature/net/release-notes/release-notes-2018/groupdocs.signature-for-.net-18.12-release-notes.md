---
id: groupdocs-signature-for-net-18-12-release-notes
url: signature/net/groupdocs-signature-for-net-18-12-release-notes
title: GroupDocs.Signature for .NET 18.12 Release Notes
weight: 1
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.12{{< /alert >}}

## Major Features

There are few new features, improvements and bug fixes in this regular release. Most features are related to introduced Image Metadata support, improvement on Form-Field Signature implementation for signing and searching, same as some bug fixes.  Summary the most notable changes are:

*   Introduced Metadata Signature Search features for Image Documents
*   Improved Form-field Signature naming for multi page Documents
*   Fixed Form-fields search bug for empty named controls for Pdf Documents
*   Improved Output file setup, fixed issue for absolute output file path
*   Improve error handling with extended messages

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-1797 | Skip Output folder when SaveOptions.OutputFileName is set as absolute path | Bug |
| SIGNATURENET-1782 | Exception is fired when searching in PDF documents for Form-fields that were setup without name | Bug |
| SIGNATURENET-1785 | Implement standard Image Metadata Signatures | New Feature |
| SIGNATURENET-1723 | Implement Metadata Signatures Search for Image Documents | New Feature |
| SIGNATURENET-1756 | Extend FormField signature name automatically with number prefix for multiple-pages options | Improvement |
| SIGNATURENET-1581 | Improve handling exceptions with proper details and exception type | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.12. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1. New public class  **ImageMetadataSignature** was added to support Metadata signatures for Image Documents. Image Metadata signatures are based on Exchangeable image file format (Exif) specification. The Exif data references are specified standard and custom image properties of various type of data.
    
    **ImageMetadataSignature**
    
    ```csharp
    /// <summary>
    /// Contains Image Metadata Signature properties.
    /// </summary>
    public sealed class ImageMetadataSignature : MetadataSignature
    {
    	/// <summary>
    	/// The identifier of Image Metadata Signature.
    	/// See <see cref="ImageMetadataSignatures"/> class that contains standard Signature with predefined Id value.
    	/// </summary>
    	public ushort Id { get; set; }
    	/// <summary>
    	/// Read only value to get size of Metadata value
    	/// </summary>
    	public int Size { get; private set; }
    	/// <summary>
    	/// Read only value to get description for standard Image Metadata signature
    	/// </summary>
    	public string Description { get; private set; }
    }
    ```
    
    **FormField Signature properties:**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Id | ushort | Specifies unique exif tag identifier. See documentation of TIFF Tag Reference |
    | Size | int | Specifies size of Metadata value. Property is read only and set automatically once value will be changed |
    | Description | string | Specifies description of Metadata signature when standard identifier metadata signature is being used |
    
    Class specifies unique identifier Id to follow Exif specification, Name property contains Id in hex format, read-only property Description contains extended description for standard image exif data, read-only property Size keeps the size of metadata signatures.
    
2.  New class **ImagesSearchMetadataOptions** represents options for search for Image metadata signatures.
    
    **ImagesSearchMetadataOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Search Options for Images Documents.
    /// </summary>
    public class ImagesSearchMetadataOptions : SearchMetadataOptions
    {
        /// <summary>
        /// If property is set the option will search for Image Metadata with Id more or equals this Min Id value.
        /// </summary>
        public ushort? MinId { get; set; } = null;
        /// <summary>
        /// If property is set the option will search for Image Metadata with Id less than or equals this Max value.
        /// </summary>
        public ushort? MaxId { get; set; } = null;
        /// <summary>
        /// Initializes a new instance of the ImagesSearchMetadataOptions class with default values.
        /// </summary>
        public ImagesSearchMetadataOptions()
    }
    ```
    
    Following example demonstrates how to search for Image Metadata Signatures:
    
    **Search for Image Metadata Signatures**
    
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
    ImagesSearchMetadataOptions searchOptions = new ImagesSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMetadata.jpg", searchOptions);
    // output signatures
    List<ImageMetadataSignature> signatures = result.ToList<ImageMetadataSignature>();
    foreach (ImageMetadataSignature signature in signatures)
    {
        Console.WriteLine("Image Metadata. #{0}. {1}. Value = {2}", signature.Name, signature.Description, signature.ToString());
    }
    ```
    
3.  Existing base class **MetadataSignature** was updated with virtual methods for conversion.  
    Following public methods were marked as virtual:
    
    **MetadataSignature virtual methods**
    
    ```csharp
    public virtual bool ToBoolean()
    public virtual int ToInteger()
    public virtual double ToDouble()
    public virtual double ToDouble(IFormatProvider provider)
    public virtual DateTime ToDateTime()
    public virtual DateTime ToDateTime(IFormatProvider provider)
    public virtual string ToString(string format) 
    public virtual string ToString(string format, IFormatProvider provider)
    ```
