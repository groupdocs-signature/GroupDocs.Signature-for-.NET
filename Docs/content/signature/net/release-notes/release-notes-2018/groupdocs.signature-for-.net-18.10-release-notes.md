---
id: groupdocs-signature-for-net-18-10-release-notes
url: signature/net/groupdocs-signature-for-net-18-10-release-notes
title: GroupDocs.Signature for .NET 18.10 Release Notes
weight: 3
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.10{{< /alert >}}

## Major Features

There are about 10 improvements, new features and fixes in this regular release. Most features are related to introduced Metadata Signature type implementation for signing and searching for Cells and Words Documents. There are few improvements with search signature results. Summary the most notable changes are:

*   Introduced Metadata Signature singing features for Cells Documents
*   Implemented Search for Metadata Signatures in Cells Documents
*   Added support of Metadata Signature singing features for Words Documents
*   Implemented Search for Metadata Signatures in Words Documents
*   Introduced ability to search for embedded built-in Metadata Signatures in Words and Cells documents
*   Implemented support of password protected open-documents-spreadsheet file types of Cells Documents
*   Provided ability to obtain typed list of signatures from search result data

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-1694 | Implement support of built-in metadata search for Words Documents | New Feature |
| SIGNATURENET-1690 | Implement support of built-in metadata search for Cells Documents | New Feature |
| SIGNATURENET-1685 | Implement Metadata Signatures Search for Cells Documents | New Feature |
| SIGNATURENET-1681 | Implement Metadata Signatures Search for Words Documents | New Feature |
| SIGNATURENET-1677 |  Implement Metadata Signature features for Cells Documents | New Feature |
| SIGNATURENET-1672 |  Implement Metadata Signature features for Words Documents | New Feature |
| SIGNATURENET-1582 |  Implement additional verification criteria for Digital Signatures of Words Documents | New Feature |
| SIGNATURENET-1701 | Implement support of password protected Open-Documents-Spreadsheet ODS file formats | Improvement |
| SIGNATURENET-1695 | Implement Search results conversion to typed list of signatures | Improvement |
| SIGNATURENET-1467 |  Implement global Exception handler to catch all not handled exceptions | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.10. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  New public class **CellsMetadataSignature** was added to implement Metadata signature features for Cells Documents. This class derives base **MetadataSignature** , overloads virtual methods (IClonable implementation).
    
    **CellsMetadataSignature**
    
    ```csharp
    /// <summary>
    /// Contains Cells Metadata Signature properties.
    /// </summary>
    public sealed class CellsMetadataSignature : MetadataSignature
    {
        /// <summary>
        /// Creates Cells Metadata Signature with predefined name and empty value
        /// </summary>
        /// <param name="name">Cells Metadata Signature name</param>
        public CellsMetadataSignature(string name);
     
        /// <summary>
        /// Creates Cells Metadata Signature with predefined values
        /// </summary>
        /// <param name="name">Name of Metadata signature object</param>
        /// <param name="value">Value of Metadata signature</param>
        public CellsMetadataSignature(string name, object value);
     
        /// <summary>
        /// Clone Metadata Signature instance.
        /// </summary>
        /// <returns>Returns cloned Metadata Signature instance</returns>
        public override object Clone();
     
        /// <summary>
        /// Clone Cells Metadata Signature instance with given value.
        /// </summary>
        /// <param name="value">Value for new cloned object.</param>
        /// <returns>Returns cloned Metadata Signature instance.</returns>
        public override MetadataSignature Clone(object value);
    }
    ```
    
    **Cells Metadata Signature properties**
    
    Cells Metadata Signature derives all base class properties.
    
    **Cells Metadata Signature methods**
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | ToBoolean() | boolean | Returns the Metadata signature value as Boolean. Throws an exception if the Metadata value could not be converted. If value is integer type all non zero values will be interpreted as True.  |
    | ToInteger() | integer | Returns the Metadata Signature value as integer. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. Double value will be truncated. String value will be tries to parse into integer. |
    | ToDouble() | double | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as double. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. String value will be tries to parse into double based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToDateTime() | DateTime | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as DateTime. Throws an exception if the Metadata value could not be converted. String value will be tries to parse into Datetime based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToString() | string | Overload method with ability to specify IDataFormatProvider to data type convertions. Returns the Metadata Signature value as string representation based on passed format and IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    
2.  New public class **CellsMetadataSignOptions** was added to provide options to support Cells Metadata signature features for Cells Documents. This class derives base **MetadataSignOptions**.
    
    **Cells Metadata Sign Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Options for Cells Documents.
    /// </summary>
    public class CellsMetadataSignOptions : MetadataSignOptions
    {
        /// <summary>
        /// Initializes a new instance of the CellsSignMetadataOptions class with default values.
        /// </summary>
        public CellsMetadataSignOptions();
     
        /// <summary>
        /// Initializes a new instance of the CellsSignMetadataOptions class with Metadata.
        /// </summary>
        /// <param name="collection">Signature Metadata</param>
        public CellsMetadataSignOptions(IEnumerable<MetadataSignature> collection);
    }
    ```
    
    Following example demonstrates using **CellsMetadataSignOptions** to add Metadata signatures to Cells Document.
    
    
    
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
    CellsMetadataSignOptions signOptions = new CellsMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    CellsMetadataSignature mdSign_Author = new CellsMetadataSignature("Author", "Mr.Scherlock Holmes");
    signOptions.MetadataSignatures.Add(mdSign_Author);
    // setup data of document id
    CellsMetadataSignature mdSign_DocId = new CellsMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup data of sign date
    CellsMetadataSignature mdSign_Date = new CellsMetadataSignature("SignDate", DateTime.Now);
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // setup some integer value
    CellsMetadataSignature mdSign_Days = new CellsMetadataSignature("DocDays", 12345);
    signOptions.MetadataSignatures.Add(mdSign_Days);
    // setup data of sign date
    CellsMetadataSignature mdSign_Koeff = new CellsMetadataSignature("SignKoeff", 2.345M);
    signOptions.MetadataSignatures.Add(mdSign_Koeff);
    // sign document
    string signedPath = handler.Sign<string>("test.xlsx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Cells_Documents_Metadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
3.  New public class **WordsMetadataSignature** was added to implement Metadata signature features for Words Documents. This class derives base **MetadataSignature**, overloads virtual methods (IClonable implementation).
    
    **WordsMetadataSignature**
    
    ```csharp
    /// <summary>
    /// Contains Words Metadata Signature properties.
    /// </summary>
    public sealed class WordsMetadataSignature : MetadataSignature
    {
        /// <summary>
        /// Creates Words Metadata Signature with predefined name and empty value
        /// </summary>
        /// <param name="name">Words Metadata Signature name</param>
        public WordsMetadataSignature(string name);
     
        /// <summary>
        /// Creates Words Metadata Signature with predefined values
        /// </summary>
        /// <param name="name">Name of Metadata signature object</param>
        /// <param name="value">Value of Metadata signature</param>
        public WordsMetadataSignature(string name, object value);
     
        /// <summary>
        /// Clone Metadata Signature instance.
        /// </summary>
        /// <returns>Returns cloned Metadata Signature instance</returns>
        public override object Clone();
     
        /// <summary>
        /// Clone Words Metadata Signature instance with given value.
        /// </summary>
        /// <param name="value">Value for new cloned object.</param>
        /// <returns>Returns cloned Metadata Signature instance.</returns>
        public override MetadataSignature Clone(object value);
    }
    ```
    
    **Words Metadata Signature properties**
    
    Words Metadata Signature derives all base class properties.
    
    **Words Metadata Signature methods**
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | ToBoolean() | boolean | Returns the Metadata signature value as Boolean. Throws an exception if the Metadata value could not be converted. If value is integer type all non zero values will be interpreted as True.  |
    | ToInteger() | integer | Returns the Metadata Signature value as integer. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. Double value will be truncated. String value will be tries to parse into integer. |
    | ToDouble() | double | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as double. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. String value will be tries to parse into double based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToDateTime() | DateTime | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as DateTime. Throws an exception if the Metadata value could not be converted. String value will be tries to parse into Datetime based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToString() | string | Overload method with ability to specify IDataFormatProvider to data type convertions. Returns the Metadata Signature value as string representation based on passed format and IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    
4.  New public class **WordsMetadataSignOptions** was added to provide options to support Words Metadata signature features for Words Documents. This class derives base **MetadataSignOptions**.
    
    **Words Metadata Sign Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Options for Words Documents.
    /// </summary>
    public class WordsMetadataSignOptions : MetadataSignOptions
    {
        /// <summary>
        /// Initializes a new instance of the WordsSignMetadataOptions class with default values.
        /// </summary>
        public WordsMetadataSignOptions();
     
        /// <summary>
        /// Initializes a new instance of the WordsSignMetadataOptions class with Metadata.
        /// </summary>
        /// <param name="collection">Signature Metadata</param>
        public WordsMetadataSignOptions(IEnumerable<MetadataSignature> collection);
    }
    ```
    
    Following example demonstrates using **WordsMetadataSignOptions** to add Metadata signatures to Words Document.
    
    
    
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
    WordsMetadataSignOptions signOptions = new WordsMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    WordsMetadataSignature mdSign_Author = new WordsMetadataSignature("Author", "Mr.Scherlock Holmes");
    signOptions.MetadataSignatures.Add(mdSign_Author);
    // setup data of document id
    WordsMetadataSignature mdSign_DocId = new WordsMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup data of sign date
    WordsMetadataSignature mdSign_Date = new WordsMetadataSignature("SignDate", DateTime.Now);
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // setup some integer value
    WordsMetadataSignature mdSign_Days = new WordsMetadataSignature("DocDays", 12345);
    signOptions.MetadataSignatures.Add(mdSign_Days);
    // setup data of sign date
    WordsMetadataSignature mdSign_Koeff = new WordsMetadataSignature("SignKoeff", 2.345M);
    signOptions.MetadataSignatures.Add(mdSign_Koeff);
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Documents_Metadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
5.  New public class **CellsSearchMetadataOptions** was added to provide options to search for Cells Metadata signatures within the Cells Documents. This class derives base **SearchMetadataOptions**.
    
    **Cells Metadata Search Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Search Options for Cells Documents.
    /// </summary>
    public class CellsSearchMetadataOptions : SearchMetadataOptions
    {
        /// <summary>
        /// Indicates if Built-in document properties like Document statistic, information etc should be included into Search result
        /// </summary>
        public bool IncludeBuiltinProperties { get; set; }
     
        /// <summary>
        /// Initializes a new instance of the CellsSearchMetadataOptions class with default values.
        /// </summary>
        public CellsSearchMetadataOptions();
     
        /// <summary>
        /// Initializes a new instance of the CellsSearchMetadataOptions class.
        /// </summary>
        /// <param name="includeBuiltinProperties">Indicates if buil-in properties should be included into search results.</param>
        public CellsSearchMetadataOptions(bool includeBuiltinProperties);
     
    }
    ```
    
    Following example demonstrates using **SearchMetadataOptions** to search for Cells Metadata signatures in the Cells Documents.
    
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
    CellsSearchMetadataOptions searchOptions = new CellsSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMetadata.xlsx", searchOptions);
    // output signatures
    List<CellsMetadataSignature> signatures = result.ToList<CellsMetadataSignature>();
    foreach (CellsMetadataSignature signature in signatures)
    {
        if (signature != null)
        {
            Console.WriteLine("Cells Metadata: {0} = {1}", signature.Name, signature.ToString());
        }
    }
    ```
    
6.  New public class **WordsSearchMetadataOptions** was added to provide options to search for Words Metadata signatures within the Words Documents. This class derives base **SearchMetadataOptions**.
    
    **Words Metadata Search Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Search Options for Words Documents.
    /// </summary>
    public class WordsSearchMetadataOptions : SearchMetadataOptions
    {
        /// <summary>
        /// Indicates if Built-in document properties like Document statistic, information etc should be included into Search result
        /// </summary>
        public bool IncludeBuiltinProperties { get; set; }
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchMetadataOptions class with default values.
        /// </summary>
        public WordsSearchMetadataOptions();
     
        /// <summary>
        /// Initializes a new instance of the WordsSearchMetadataOptions class.
        /// </summary>
        /// <param name="includeBuiltinProperties">Indicates if buil-in properties should be included into search results.</param>
        public WordsSearchMetadataOptions(bool includeBuiltinProperties);
     
    }
    ```
    
    Following example demonstrates using **SearchMetadataOptions** to search for Words Metadata signatures in the Words Documents.
    
    
    
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
    WordsSearchMetadataOptions searchOptions = new WordsSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMetadata.docx", searchOptions);
    // output signatures
    List<WordsMetadataSignature> signatures = result.ToList <WordsMetadataSignature>();
    foreach (WordsMetadataSignature signature in signatures)
    {
        WordsMetadataSignature metadataSignature = signature as WordsMetadataSignature;
        if (metadataSignature != null)
        {
            Console.WriteLine("Words Metadata: {0} = {1}", metadataSignature.Name, metadataSignature.ToString());
        }
    }
    ```
    
7.  Public class **SearchResult** was updated with generic method **ToList<T>()** to provide ability for typed list conversion.
    
    ```csharp
    // search document
    SearchResult result = handler.Search("SignedMetadata.docx", searchOptions);
    // output signatures
    List<WordsMetadataSignature> signatures = result.ToList <WordsMetadataSignature>();
    foreach (WordsMetadataSignature signature in signatures)
    {
        WordsMetadataSignature metadataSignature = signature as WordsMetadataSignature;
        if (metadataSignature != null)
        {
            Console.WriteLine("Words Metadata: {0} = {1}", metadataSignature.Name, metadataSignature.ToString());
        }
    }
    ```
