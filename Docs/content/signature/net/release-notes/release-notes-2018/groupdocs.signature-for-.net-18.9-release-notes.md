---
id: groupdocs-signature-for-net-18-9-release-notes
url: signature/net/groupdocs-signature-for-net-18-9-release-notes
title: GroupDocs.Signature for .NET 18.9 Release Notes
weight: 5
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.9{{< /alert >}}

## Major Features

There are more than 10 improvements, new features and fixes in this regular release. Most features are related to introduced Metadata Signature type implementation for signing and searching for Pdf Documents. There are few improvements, bug fixes with searching and verification of Digital Signatures. Summary the most notable changes are:

*   Introduced Metadata Signature singing features for Pdf Documents
*   Implemented Search for Metadata Signatures in Pdf Documents
*   Added standard Pdf Metadata Signatures that describe main document properties
*   Implemented Pdf save document format for Images
*   Introduced Match Type feature for Text Verification
*   Fixed few bugs with Pdf Digital signatures
*   Fixed few issues with QR-Code Signature rendering

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3652 | Implement standard Pdf Metadata Signatures | New Feature |
| SIGNATURENET-3650 | Add PDF save format for image documents | New Feature |
| SIGNATURENET-3647 | Implement Searching for Metadata Signature in PDF Documents | New Feature |
| SIGNATURENET-3643 | Implement Metadata Signature features for PDF Documents | New Feature |
| SIGNATURENET-3637 | Implement Metadata Signature entity and collection | New Feature |
| SIGNATURENET-3635 | Implement MatchType for text verification options | New Feature |
| SIGNATURENET-3632 | Incorrect signing image documents with .psd format | Bug |
| SIGNATURENET-3628 | The output PDF is incorrectly signed with Digital Certificates | Bug |
| SIGNATURENET-3626 | Incorrect signing image documents with .wmf format | Bug |
| SIGNATURENET-3624 | Incorrect signing image documents with .svg format | Bug |
| SIGNATURENET-3622 | Unable to search Digital signature in Cells with extended options using latest release | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.9. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **New Metadata type of Signature is the abstract class MetadataSignature**  
    
    New public abstract class **MetadataSignature** was added to implement Metadata signature features for Documents. The metadata signature is the additional document property that contains special attributes/tags to keep non visual information inside the Document. Most Documents support standard information metadata tags same as user defined custom metadata properties.
    
    This type of Signature allows users to keep inside the Document unlimited scope of hidden metadata information that related with document. It could be Document properties, statistic, author properties, document relation properties etc.
    
    **Metadata Signature class properties**
    
    ```csharp
    /// <summary>
    /// Contains Metadata Signature properties.
    /// </summary>
    public abstract class MetadataSignature : BaseSignature, ICloneable
    {
        /// <summary>
        /// Specifies unique metadata name.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Specifies metadata object.
        /// </summary>
        public object Value { get; set; }
        /// <summary>
        /// Converts to boolean.
        /// </summary>
        /// <returns>Returns the Metadata signature value as boolean.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public bool ToBoolean();
        /// <summary>
        /// Converts to integer.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as integer.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public int ToInteger();
        /// <summary>
        /// Converts to Double.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as Double.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted. 
        /// If original value is string based the default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
        /// </remarks>
        public double ToDouble();
        /// <summary>
        /// Converts to Double.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as Double.</returns>
        /// <param name="provider">Format data provider to use with data convertion operations.</param>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public double ToDouble(IFormatProvider provider);
        /// <summary>
        /// Converts to DateTime.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as DateTime.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted. 
        /// If original value is string based the default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
        /// </remarks>
        public DateTime ToDateTime();
        /// <summary>
        /// Converts to DateTime.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as DateTime.</returns>
        /// <param name="provider">Format data provider to use with data convertion operations.</param>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public DateTime ToDateTime(IFormatProvider provider);
        /// <summary>
        /// Converts to String with override ToString() method
        /// </summary>
        /// <returns>Returns the Metadata Signature value as String.</returns>
        /// <remarks>Converts a boolean property into "True" or "False". For another data type the default data format provider will be used.</remarks>
        public override string ToString();
        /// <summary>
        /// Converts to String with specified format
        /// </summary>
        /// <returns>Returns the Metadata Signature value as String.</returns>
        /// <param name="format">Data format string.</param>
        /// <remarks>Converts a boolean property into "True" or "False".
        /// Default culture property info will be used from static SignatureConfig <see cref="SignatureConfig.DefaultCulture"/>
        /// </remarks>
        public string ToString(string format);
        /// <summary>
        /// Converts to String with specified format
        /// </summary>
        /// <returns>Returns the Metadata Signature value as String.</returns>
        /// <param name="format">Data format string.</param>
        /// <param name="provider">Format data provider to use with data convertion operations.</param>
        /// <remarks>Converts a boolean property into "True" or "False".</remarks>
        public string ToString(string format, IFormatProvider provider);
        /// <summary>
        /// Creates Metadata Signature with predefined name and empty value
        /// </summary>
        /// <param name="name">Metadata name</param>
        public MetadataSignature(string name);
        /// <summary>
        /// Creates Metadata Signature with predefined values
        /// </summary>
        /// <param name="name">Name of Metadata signature object</param>
        /// <param name="value">Value of Metadata signature</param>
        public MetadataSignature(string name, object value);
    }
    ```
    
    **Metadata Signature properties**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Value | object | Specifies value of Metadata Signature. This property could be different type. At this moment Boolean, Integer, Double, DateTime and Strings types are supported. |
    | Name | string | Specifies name of Metadata Signature. This name should be unique within Document metadata collection scope. |
    
    **Metadata Signature methods**
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | ToBoolean() | boolean | Returns the Metadata signature value as Boolean. Throws an exception if the Metadata value could not be converted. If value is integer type all non zero values will be interpreted as True.  |
    | ToInteger() | integer | Returns the Metadata Signature value as integer. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. Double value will be truncated. String value will be tries to parse into integer. |
    | ToDouble() | double | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as double. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. String value will be tries to parse into double based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToDateTime() | DateTime | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as DateTime. Throws an exception if the Metadata value could not be converted. String value will be tries to parse into Datetime based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToString() | string | Overload method with ability to specify IDataFormatProvider to data type convertions. Returns the Metadata Signature value as string representation based on passed format and IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    
2.  **New class Metadata Signature Collection**  
    New public class **MetadataSignatureCollection** was added to implement collection of Metadata signatures for Documents. This class implements IEnumarable generic class of MetadataSignature object collection, implements most Dictionary methods and provides collection of Metadata Signature manipulations with unique name validation.
    
    **Metadata Signature Collection properties**
    
    ```csharp
    public class MetadataSignatureCollection : IEnumerable<MetadataSignature>, IEnumerable, ICloneable
    {
        /// <summary>
        /// Creates Collection of Metadata Signatures.
        /// </summary>
        public MetadataSignatureCollection();
        /// <summary>
        /// Returns a MetadataSignature object by the name of the property.
        /// </summary>
        /// <param name="name">The case-insensitive name of the property to retrieve.</param>
        /// <returns>Returns a MetadataSignature <see cref="MetadataSignature"/> object by the name of the property.</returns>
        /// <remarks>Returns null if a property with the specified name is not found.</remarks>
        public MetadataSignature this[string name] { get; }
        /// <summary>
        /// Returns a MetadataSignature object by index.
        /// </summary>
        /// <param name="index">Zero-based index of the MetadataSignature to retrieve.</param>
        /// <returns>Returns a MetadataSignature <see cref="MetadataSignature"/> object by the index of collection.</returns>
        /// <remarks>Returns null if a property with the specified index does not exist.</remarks>
        public MetadataSignature this[int index] { get; }
        /// <summary>
        /// Gets number of items in the collection.
        /// </summary>
        public int Count { get; }
        /// <summary>
        /// Removes all items from the collection.
        /// </summary>
        public void Clear();
        /// <summary>
        /// Returns true if a Metadata with the specified name exists in the collection.
        /// </summary>
        /// <param name="name">The case-insensitive name of the property.</param>
        /// <returns>True if the Metadata exists in the collection; false otherwise.</returns>
        public bool Contains(string name);
        /// <summary>
        /// Gets the index of a property by name.
        /// </summary>
        /// <param name="name">The case-insensitive name of the MetadataSignature.</param>
        /// <returns>The zero based index. Negative value if not found.</returns>
        public int IndexOf(string name);
        /// <summary>
        /// Removes a Metadata Signature with the specified name from the collection.
        /// </summary>
        /// <param name="name">The case-insensitive name of the Metadata Signature.</param>
        /// <returns></returns>
        public bool Remove(string name);
        /// <summary>
        /// Removes a Metadata Signature at the specified index.
        /// </summary>
        /// <param name="index">The zero based index.</param>
        public bool RemoveAt(int index);
        /// <summary>
        /// Add Metadata Signature object to collection.
        /// </summary>
        /// <param name="signature">Metadata signature to be added to collection.</param>
        /// <remarks>Throws an exception if name value is not unique entire existing collection</remarks>
        public void Add(MetadataSignature signature);
        /// <summary>
        /// Clone Metadata Signature Collection class with Metadata Signature Items.
        /// </summary>
        /// <returns>Returns copied instance with cloned Signature Items</returns>
        public Object Clone();
    }
    ```
    
    **Metadata Signature Collection properties**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | this\[string name\] | MetadataSignature | Returns Metadata Signature object from collection based on unique name. |
    | this\[int index\] | MetadataSignature | Returns Metadata Signature object from collection based on index of object in collection. |
    | Count | integer | Returns count of Signatures in Collection |
    
    **Metadata Signature Collection methods**
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | Clear() | void | Clear all Signatures from Collection. |
    | Contains(string name) | Boolean | Returns true if collection contains Metadata Signature with given name. |
    | IndexOf(string name) | integer | Returns zero based index of Metadata Signature with given name in collection. If signature with this name if not found methods returns -1. |
    | Remove(string name) | Boolean | Removes Signature with given name from collection and returns true. Otherwise if signature was not found returns false. |
    | RemoveAt(int index) | Boolean | Removes Signature with given index from collection and returns true. Otherwise if signature was not found returns false. |
    | Add(MetadataSignature signature) | void | Adds signature to collection. |
    
3.  ****New class PdfMetadataSignature **derives abstract**MetadataSignature****  
    New public class **PdfMetadataSignature** was added to implement Metadata signature features for Pdf Documents. This class derives base **MetadataSignature ,** overloads virtual methods (IClonable implementation).
    
    **PdfMetadataSignature**
    
    ```csharp
    /// <summary>
    /// Contains Pdf Document Metadata Signature properties.
    /// </summary>
    public sealed class PdfMetadataSignature : MetadataSignature
    {
        /// <summary>
        /// The prefix tag of Pdf Metadata Signature name. By default this property is set to "xmp".
        /// Possible values are 
        /// </summary>
        public string TagPrefix { get; set; }
        /// <summary>
        /// Creates Pdf Metadata Signature with predefined name and empty value
        /// </summary>
        /// <param name="name">Pdf Metadata Signature name</param>
        public PdfMetadataSignature(string name);
        /// <summary>
        /// Creates Pdf Metadata Signature with predefined values
        /// </summary>
        /// <param name="name">Name of Metadata signature object</param>
        /// <param name="value">Value of Metadata signature</param>
        public PdfMetadataSignature(string name, object value);
    }
    ```
    
    **Pdf Metadata Signature properties**
    
    Pdf metadata Signature derives all base class properties and contains TagPrefix string property to extend metadata name. Pdf document contains metadata properties with unique name in format "TagPrefix:Name".
    
    | Name | Type | Description |
    | --- | --- | --- |
    | TagPrefix | string | Specifies prefix of Pdf metadata signature unique name. By default this prefix is set to "xmp" value. User can specify any prefix. Standard prefixes that are supported by Pdf documentations are "pdf", "xmpMM", "dc". |
    
    **Pdf Metadata Signature methods**
    
    Pdf metadata Signature derives all base class methods
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | ToBoolean() | boolean | Returns the Metadata signature value as Boolean. Throws an exception if the Metadata value could not be converted. If value is integer type all non zero values will be interpreted as True.  |
    | ToInteger() | integer | Returns the Metadata Signature value as integer. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. Double value will be truncated. String value will be tries to parse into integer. |
    | ToDouble() | double | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as double. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. String value will be tries to parse into double based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToDateTime() | DateTime | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as DateTime. Throws an exception if the Metadata value could not be converted. String value will be tries to parse into Datetime based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToString() | string | Overload method with ability to specify IDataFormatProvider to data type convertions. Returns the Metadata Signature value as string representation based on passed format and IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    
    Following example demonstrates using **PdfMetadataSignature** to compose Metadata Signature options for Pdf Document - PdfMetadataSignOptions.
    
    **Compose Pdf Metadata Signature Options**
    
    ```csharp
    PdfMetadataSignOptions result = new PdfMetadataSignOptions();
    result.MetadataSignatures.Add(new PdfMetadataSignature("Author", "Mr.Sherlock Holmes"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("CreationDate", DateTime.Now));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Creator", "Dr.Whatson"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("ModDate", DateTime.Now));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Producer", "BakerStreet.Inc"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Subject", "Baskervalley"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Title", "OfficeDocument"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Trapped", "Information"));
    result.MetadataSignatures.Add(new PdfMetadataSignature("IsSigned", true));
    result.MetadataSignatures.Add(new PdfMetadataSignature("SignatureId", 112233));
    result.MetadataSignatures.Add(new PdfMetadataSignature("Amount", 123.456));
    return result;
    ```
    
4.  New static class **PdfMetadataSignatures** contains static Pdf Metadata instances with predefined standard metadata names and prefix  
    New public static class **PdfMetadataSignatures** was added to provide list of Pdf Metadata Signatures that support standard Pdf format specifications.
    
    **PdfMetadataSignatures**
    
    ```csharp
    /// <summary>
    /// Contains standard Metadata Signatures to be used for Pdf Document Metadata Signature Options.
    /// </summary>
    public static class PdfMetadataSignatures
    {
        /// <summary>
        /// Pdf Document Author metadata.
        /// </summary>
        public static PdfMetadataSignature Author { get; private set; } = new PdfMetadataSignature("Author", string.Empty, "xmp");
         
        /// <summary>
        /// Pdf Document creation date metadata signature.
        /// </summary>
        public static PdfMetadataSignature CreateDate { get; private set; } = new PdfMetadataSignature("CreateDate", string.Empty, "xmp");
        /// <summary>
        /// Pdf Document metadata date information.
        /// </summary>
        public static PdfMetadataSignature MetadataDate { get; private set; } = new PdfMetadataSignature("MetadataDate", string.Empty, "xmp");
        /// <summary>
        /// Pdf Document creation tool metadata signature.
        /// </summary>
        public static PdfMetadataSignature CreatorTool { get; private set; } = new PdfMetadataSignature("CreatorTool", string.Empty, "xmp");
        /// <summary>
        /// Pdf Document modified date metadata property.
        /// </summary>
        public static PdfMetadataSignature ModifyDate { get; private set; } = new PdfMetadataSignature("ModifyDate", string.Empty, "xmp");
        /// <summary>
        /// Pdf Document Producer metadata property.
        /// </summary>
        public static PdfMetadataSignature Producer { get; private set; } = new PdfMetadataSignature("Producer", string.Empty, "pdf");
        /// <summary>
        /// Pdf Document Entry metadata property.
        /// </summary>
        public static PdfMetadataSignature Entry { get; private set; } = new PdfMetadataSignature("Entry", string.Empty, "xmp");
         
        /// <summary>
        /// Pdf Document creator metadata property
        /// </summary>
        public static PdfMetadataSignature Keywords { get; private set; } = new PdfMetadataSignature("Keywords", string.Empty, "pdf");
        /// <summary>
        /// Pdf Document Title metadata property
        /// </summary>
        public static PdfMetadataSignature Title { get; private set; } = new PdfMetadataSignature("title", string.Empty, "dc");
        /// <summary>
        /// Pdf Document Subject metadata property.
        /// </summary>
        public static PdfMetadataSignature Subject { get; private set; } = new PdfMetadataSignature("subject", string.Empty, "dc");
        /// <summary>
        /// Pdf Document Description metadata property.
        /// </summary>
        public static PdfMetadataSignature Description { get; private set; } = new PdfMetadataSignature("description", string.Empty, "dc");
        /// <summary>
        /// Pdf Document creator metadata property.
        /// </summary>
        public static PdfMetadataSignature Creator { get; private set; } = new PdfMetadataSignature("creator", string.Empty, "dc");
    }
    ```
    
    Following example demonstrate using static Metadata Signatures to compose collection of signatures based method Clone(value) with given value of Signature to make clone of original instance.
    
    **Sign Pdf Document with Standard Metadata Signatures**
    
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
    PdfMetadataSignOptions signOptions = new PdfMetadataSignOptions();
    // Using standard Pdf Metadata Signatures with new values
    MetadataSignature[] signatures = new MetadataSignature[]
    {
        PdfMetadataSignatures.Author.Clone("Mr.Scherlock Holmes"),
        PdfMetadataSignatures.CreateDate.Clone(DateTime.Now.AddDays(-1)),
        PdfMetadataSignatures.MetadataDate.Clone(DateTime.Now.AddDays(-2)),
        PdfMetadataSignatures.CreatorTool.Clone("GD.Signature-Test"),
        PdfMetadataSignatures.ModifyDate.Clone(DateTime.Now.AddDays(-13)),
        PdfMetadataSignatures.Producer.Clone("GroupDocs-Producer"),
        PdfMetadataSignatures.Entry.Clone("Signature"),
        PdfMetadataSignatures.Keywords.Clone("GroupDocs, Signature, Metadata, Creation Tool"),
        PdfMetadataSignatures.Title.Clone("Metadata Example"),
        PdfMetadataSignatures.Subject.Clone("Metadata Test Example"),
        PdfMetadataSignatures.Description.Clone("Metadata Test example description"),
        PdfMetadataSignatures.Creator.Clone("GroupDocs.Signature"),
    };
    signOptions.MetadataSignatures.AddRange(signatures);
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_StdMetadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
5.  New class **MetadataSignOptions** derives base SignOptions class and implement base properties and methods to specify Metadata Signature Options. It keeps collection of signatures and methods to manipulate signatures.
    
    **Metadata Sign Options properties**
    
    ```csharp
    /// <summary>
    /// Represents abstract class of the Metadata Signature Options.
    /// </summary>
    public abstract class MetadataSignOptions : SignOptions
    {
        /// <summary>
        /// Gets or sets the Metadata of signature.
        /// </summary>
        public MetadataSignatureCollection MetadataSignatures { get; set; }
         
        /// <summary>
        /// Initializes a new instance of the SignMetadataOptions class with default values.
        /// </summary>
        protected MetadataSignOptions();
         
        /// <summary>
        /// Initializes a new instance of the SignMetadataOptions class with Metadata.
        /// </summary>
        /// <param name="signatures">Collection of Metadata Signatures <see cref="MetadataSignature"/>.</param>
        protected MetadataSignOptions(IEnumerable<MetadataSignature> signatures);
    ```
    
    Following example demonstrates using this options for Pdf Documents
    
    **Sign Pdf Document with Metadata Sign Options**
    
    ```csharp
    // setup Signature configuration
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    PdfMetadataSignOptions signOptions = new PdfMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    PdfMetadataSignature mdSign_Author = new PdfMetadataSignature("Author", "Mr.Scherlock Holmes");
    signOptions.MetadataSignatures.Add(mdSign_Author);
    // setup data of document id
    PdfMetadataSignature mdSign_DocId = new PdfMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup data of sign date
    PdfMetadataSignature mdSign_Date = new PdfMetadataSignature("SignDate", DateTime.Now, "pdf");
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_Documents_Metadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
6.  New abstract class **SearchMetadataOptions** derives base SearchOptions class to specify criteria to search for Metadata Signatures inside the Documents.
    
    New public class **SearchMetadataOptions** was added to provide options to search for Metadata signatures within the Documents. This class derives base **SearchOptions**.
    
    **Metadata Search Options properties**
    
    ```csharp
    //// <summary>
    /// Represents abstract search Options for Metadata Signatures.
    /// </summary>
    public abstract class SearchMetadataOptions : SearchOptions
    {
        /// <summary>
        /// Specifies Metadata Signature name if it should be searched and matched.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Get or set Metadata name Match Type search. It is used only when Name property is set.
        /// </summary>
        public TextMatchType NameMatchType { get; set; }
     
        /// <summary>
        /// Initializes a new instance of the SearchMetadataOptions class with default values.
        /// </summary>
        protected SearchMetadataOptions();
         
    }
    ```
    
7.  New class **PdfSearchMetadataOptions** derives base SearchMetadataOptions class to specify criteria to search for Metadata Signatures inside the Pdf Documents.  
    New public class **PdfSearchMetadataOptions** was added to provide options to search for Metadata signatures within the Documents. This class derives base **SearchOptions**.
    
    **PdfSearchMetadataOptions**
    
    ```csharp
    /// <summary>
    /// Represents the Bar-code Signature Search Options for Pdf Documents.
    /// </summary>
    public class PdfSearchMetadataOptions : SearchMetadataOptions
    {
        /// <summary>
        /// Initializes a new instance of the PdfSearchMetadataOptions class with default values.
        /// </summary>
        public PdfSearchMetadataOptions();
    }
    ```
    
    Following example demonstrates searching for Metadata Signature inside the Pdf Documents
    
    
    
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
    PdfSearchMetadataOptions searchOptions = new PdfSearchMetadataOptions();
     
    // search document
    SearchResult result = handler.Search("SignedMetadata.pdf", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        PdfMetadataSignature metadataSignature = signature as PdfMetadataSignature;
        if (metadataSignature != null)
        {
            Console.WriteLine("Pdf Metadata: {0}:{1}  = {2}", metadataSignature.TagPrefix, metadataSignature.Name, metadataSignature.ToString());
        }
    }
    ```
