---
id: groupdocs-signature-for-net-18-11-release-notes
url: signature/net/groupdocs-signature-for-net-18-11-release-notes
title: GroupDocs.Signature for .NET 18.11 Release Notes
weight: 2
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.11{{< /alert >}}

## Major Features

There are about six new features and improvements in this regular release. Most features are related to introduced new Form-Field Signature type implementation for signing and searching for Pdf documents, same as implementation of Metadata Signature for Slides documents. There are few improvements with verification for digital signature for Words documents. Summary the most notable changes are:

*   Implement Form-field Search features for Pdf documents
*   Introduced Form-field Signature features for Pdf documents
*   Added support of built-in metadata search for Slides/Presentation documents
*   Implement Metadata Signatures Search for Slides documents
*   Introduced Metadata Signature features for Slides documents
*   Extend Digital Signatures verification with Subject and Issuer criteria for Words documents

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-1760 | Implement FormField Search features for Pdf documents | New Feature |
| SIGNATURENET-1751 | Implement FormField Signature features for Pdf documents | New Feature |
| SIGNATURENET-1715 | Implement support of built-in metadata search for Slides/Presentation documents | New Feature |
| SIGNATURENET-1711 | Implement Metadata Signatures Search for Slides documents | New Feature |
| SIGNATURENET-1707 | Implement Metadata Signature features for Slides documents | New Feature |
| SIGNATURENET-1582 | Extend verification options for Digital Signatures of Words documents with Subject and Issuer criteria | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.11. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  New Form-field type of signature is the abstract class **FormFieldSignature** and enumeration **FormFieldType**.  
    Many documents support special elements Form Fields that allow user to input data into standard form elements like text input, extended multi line text, check box, radio buttons, digital certificate holders etc. This version we implemented support of these signatures for Pdf documents. New enumeration type **FormFieldType** specifies type of form-field element like Text, CheckBox, Signature.
    
    **FormFieldType**
    
    ```csharp
    /// <summary>
    /// Specifies Form Field type.
    /// </summary>
    public enum FormFieldType
    {
        /// <summary>
        /// Simple text input.
        /// </summary>
        Text,
         
        /// <summary>
        /// Check-box.
        /// </summary>
        Checkbox,
         
        /// <summary>
        /// Digital signature area.
        /// </summary>
        DigitalSignature
    }
    ```
    
    New public abstract class **FormFieldSignature** was added to implement Form Field signature features for documents. The Form Field Signature is a input control which is placed on a document page. Some types of documents supports various input controls like Check-box or Text.
    
    This type of Signature allows users to place input controls on document pages.
    
    **FormFieldSignature**
    
    ```csharp
    /// <summary>
    /// Contains Form Field Signature properties.
    /// </summary>
    public abstract class FormFieldSignature : BaseSignature, ICloneable
    {
        /// <summary>
        /// Specifies unique form field name.
        /// </summary>
        public string Name { get; set; }
     
        /// <summary>
        /// Specifies Form field type.
        /// </summary>
        public FormFieldType Type { get; private set; }
     
        /// <summary>
        /// Specifies Form-Field data object.
        /// </summary>
        public object Value { get; set; }        
    }
    ```
    
    **FormField Signature properties:**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Name | string | Specifies name of FormField Signature. |
    | Type | FormFieldType | Specifies type of form field. |
    | Value | object | Specifies value of FormField  Signature. This property could be different type. |
    
2.  ****New classes to represent different Form-Field Signatures of Pdf documents.****  
    New scope of classes that are derived from base **FormFieldSignature** implement following Pdf document form-fields.  
      
    1. New public class **PdfTextFormFieldSignature** was added to implement simple input Text Form Field signatures for Pdf documents. The Form Field Signature is a input control which is placed on a document page. Some types of documents supports various input controls like Check-box or Text.
    
    This type of Signature allows users to place input controls on document pages.
    
    **PdfTextFormFieldSignature**
    
    ```csharp
    /// <summary>
    /// Contains text input form field signature properties for Pdf document
    /// </summary>
    public sealed class PdfTextFormFieldSignature : FormFieldSignature
    {
        /// <summary>
        /// Get or set text of form field  text input.
        /// </summary>
        public string Text { get; set; }
     
        /// <summary>
        /// Creates PdfTextFormFieldSignature with predefined name.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        public PdfTextFormFieldSignature(string name);
    }
    ```
    
    **Pdf Text FormField Signature properties:**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Text | string | Specifies text of input Form Field Signature. |
    
    2. New public class **PdfCheckboxFormFieldSignature** was added to implement simple Check Box Form Field signatures for Pdf documents.
    
    **PdfCheckboxFormFieldSignature**
    
    ```csharp
    /// <summary>
    /// Contains check-box input form field signature properties.
    /// </summary>
    public sealed class PdfCheckboxFormFieldSignature : FormFieldSignature
    {        
        /// <summary>
        /// Get or set checked value of form field check-box input.
        /// </summary>
        public bool Checked { get; set; }
         
        /// <summary>
        /// Creates PdfCheckboxFormFieldSignature with predefined name.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        public PdfCheckboxFormFieldSignature(string name);
     
        /// <summary>
        /// Creates PdfCheckboxFormFieldSignature with predefined name and value
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        /// <param name="isChecked">Value if check box is checked</param>
        public PdfCheckboxFormFieldSignature(string name, bool isChecked);
    }
    ```
    
    **Pdf Text FormField Signature properties:**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Text | string | Specifies text of input Form Field Signature. |
    
    3. New public class **PdfDigitalFormFieldSignature** was added to implement Digital Signature input Form Field for Pdf documents.
    
    **PdfDigitalFormFieldSignature**
    
    ```csharp
    /// <summary>
    /// Contains digital signature input form field properties for Pdf documents.
    /// </summary>
    public sealed class PdfDigitalFormFieldSignature : FormFieldSignature
    {        
        /// <summary>
        /// Read-only property that shows if Form-field Signature was signed with digital certificate.
        /// </summary>
        public bool Signed { get; private set; }
     
        /// <summary>
        /// Creates PdfDigitalFormFieldSignature with predefined name.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        public PdfDigitalFormFieldSignature(string name);
     
    }
    ```
    
    **Pdf Text FormField Signature properties:**
    
    | Name | Type | Description |
    | --- | --- | --- |
    | Signed | bool | Specifies if Form Field Signature was signed. |
    
3.  New static class **PdfFormFieldSignOptions** represent options to put Form-field signature on Pdf document. Class is derived from base **TextSignOptions** class that allows to specify positioning of signature area, alignment etc. Class keeps property of **FormFieldSignature** to be posted on document.
    
    **PdfFormFieldSignOptions**
    
    ```csharp
    /// <summary>
    /// Represents class of the FormField Signature Options for Pdf documents.
    /// </summary>
    public sealed class PdfFormFieldSignOptions
    {
        /// <summary>
        /// Gets or sets the FormField of signature.
        /// </summary>
        public FormFieldSignature Signature 
     
        /// <summary>
        /// Initializes a new instance of the PdfFormFieldSignOptions class with default values.
        /// </summary>
        public PdfFormFieldSignOptions(FormFieldSignature signature)
    }
    ```
    
    Following example demonstrates using **PdfFormFieldSignOptions** to add form field signature on PDF document page:
    
    **Signing with form field in PDF document**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        CertificatesPath = @"c:\Aspose\Test\Certificates",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    //collection of signatures initialization
    SignatureOptionsCollection collection = new SignatureOptionsCollection();
    // 1. setup text form field signature options
    // instantiate text form field signature
    FormFieldSignature textSignature = new PdfTextFormFieldSignature("FieldText","Value1");
    // instantiate options based on text form field signature
    PdfFormFieldSignOptions textOptions = new PdfFormFieldSignOptions(textSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(10, 20, 0, 0),
        Height = 10,
        Width = 100
    };
    collection.Add(textOptions);
    // 2. setup check-box form field signature options
    // instantiate check-box form field signature
    FormFieldSignature checkboxSignature = new PdfCheckboxFormFieldSignature("FieldCheckbox", true);
    // instantiate options based on check-box form field signature
    PdfFormFieldSignOptions checkboxOptions = new PdfFormFieldSignOptions(checkboxSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(120, 20, 0, 0),
        Height = 10,
        Width = 10
    };
    collection.Add(checkboxOptions);
    // 3. setup digital signature form field options
    // instantiate digital signature form field
    FormFieldSignature digitalSignature = new PdfDigitalFormFieldSignature("FieldDigital");
    // instantiate options based on digital signature form field
    PdfFormFieldSignOptions digitalOptions = new PdfFormFieldSignOptions(digitalSignature)
    {
        PagesSetup = new PagesSetup()
        {
            LastPage = true
        },
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Margin = new Padding(0, 0, 10, 10),
        Height = 20,
        Width = 100                
    };
    collection.Add(digitalOptions);
    // sign document
    string signedPath = handler.Sign<string>("02_pages.pdf", collection,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Pdf_FormFields" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
4.  New abstract class **SearchFormFieldOptions** represents base class to specify search options for field-form signatures.
    
    **SearchFormFieldOptions class properties**
    
    ```csharp
    /// <summary>
    /// Represents abstract search Options for Form-field Signatures.
    /// </summary>
    public abstract class SearchFormFieldOptions : SearchOptions
    {
        /// <summary>
        /// Specifies type of form field signature if it should be searched. Default value is null. 
        /// </summary>
        public FormFieldType? Type
     
        /// <summary>
        /// Specifies regular expression pattern of form field signature name if it should be searched. 
        /// You can use it simple as "text" or regular expression like "abc\d+". Default value is empty string.
        /// </summary>
        public string Name
     
        /// <summary>
        /// Specifies value of form field signature if it should be searched. Default value is null.
        /// </summary>
        public object Value
    }
    ```
    
    Nullable property **Type** allows optionally specify type of form-field to search, string property **Name** allows to specify regular expression pattern for form-field name, property **Value** allows to specify optionally value of control.
    
5.  New public abstract class **PdfSearchFormFieldOptions** was added to implement form field signature search for Pdf documents.
    
    This type of Signature allows users to search for form field signatures like TextBox, CheckBox or Digital.
    
    **PdfSearchFormFieldOptions class properties**
    
    ```csharp
    /// <summary>
    /// Represents the Form-field Signature Search Options for Pdf documents.
    /// </summary>
    public class PdfSearchFormFieldOptions : SearchFormFieldOptions
    {
        /// <summary>
        /// Initializes a new instance of the PdfSearchFormFieldOptions class with default values.
        /// </summary>
        public PdfSearchFormFieldOptions()
        {
        }
    }
    ```
    
    Following example demonstrates using **SearchFormFieldOptions** to search for form field signatures on PDF document page:
    
    **Searching for form field in PDF document**
    
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
    PdfSearchFormFieldOptions searchOptions = new PdfSearchFormFieldOptions();
    searchOptions.SearchAllPages = true;
    searchOptions.NamePattern = @"Field";
    searchOptions.Value = @"Value1";
         
    // search document
    SearchResult result = handler.Search("Pdf_FormFields_Signed.pdf", searchOptions);
     
    // output signatures
    foreach (FormFieldSignature formFieldSignature in result.ToList<FormFieldSignature>())
    {
         if (formFieldSignature != null)
        {
            Console.WriteLine("Pdf FormField: {0}:{1}  = {2}", formFieldSignature.Name, formFieldSignature.Value, formFieldSignature.ToString());
        }
    }
    ```
    
6.  New public class **SlidesMetadataSignature** was added to implement Metadata signature features for Slides documents. This class derives base **MetadataSignature**, overloads virtual methods (IClonable implementation).
    
    **Slides Metadata Signature class properties**
    
    ```csharp
    /// <summary>
    /// Contains Slides Metadata Signature properties.
    /// </summary>
    public sealed class SlidesMetadataSignature : MetadataSignature
    {
        /// <summary>
        /// Creates Slides Metadata Signature with predefined name and empty value
        /// </summary>
        /// <param name="name">Slides Metadata Signature name</param>
        public SlidesMetadataSignature(string name);
     
        /// <summary>
        /// Creates Slides Metadata Signature with predefined values
        /// </summary>
        /// <param name="name">Name of Metadata signature object</param>
        /// <param name="value">Value of Metadata signature</param>
        public SlidesMetadataSignature(string name, object value);
    }
    ```
    
    **Slides Metadata Signature methods:**
    
    Slides metadata Signature derives all base class methods.
    
    | Method name | Return type | Description / Remarks |
    | --- | --- | --- |
    | ToBoolean() | boolean | Returns the Metadata signature value as Boolean. Throws an exception if the Metadata value could not be converted. If value is integer type all non zero values will be interpreted as True.  |
    | ToInteger() | integer | Returns the Metadata Signature value as integer. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. Double value will be truncated. String value will be tries to parse into integer. |
    | ToDouble() | double | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as double. Throws an exception if the Metadata value could not be converted. Boolean value will be converted to 1 in case of logical true value, otherwise 0. String value will be tries to parse into double based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToDateTime() | DateTime | Overload method with ability to specify IDataFormatProvider for string based values conversion. Returns the Metadata Signature value as DateTime. Throws an exception if the Metadata value could not be converted. String value will be tries to parse into Datetime based on passed IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    | ToString() | string | Overload method with ability to specify IDataFormatProvider to data type convertions. Returns the Metadata Signature value as string representation based on passed format and IDataFormatProvider or default provider from SignatureConfig.DefaultCulture property. |
    
    Following example demonstrates using **SlidesMetadataSignature** to compose Metadata Signature options for Words document - **SlidesMetadataSignOptions**:
    
    **Compose Slides Metadata Signature Options**
    
    ```csharp
    // setup options with text of signature
    SlidesMetadataSignOptions signOptions = new SlidesMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    SlidesMetadataSignature mdSign_Author = new SlidesMetadataSignature("Author", "Mr.Scherlock Holmes");
    signOptions.MetadataSignatures.Add(mdSign_Author);
    // setup data of document id
    SlidesMetadataSignature mdSign_DocId = new SlidesMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup data of sign date
    SlidesMetadataSignature mdSign_Date = new SlidesMetadataSignature("SignDate", DateTime.Now);
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // setup some integer value
    SlidesMetadataSignature mdSign_Days = new SlidesMetadataSignature("DocDays", 12345);
    signOptions.MetadataSignatures.Add(mdSign_Days);
    // setup data of sign date
    SlidesMetadataSignature mdSign_Koeff = new SlidesMetadataSignature("SignKoeff", 2.345M);
    signOptions.MetadataSignatures.Add(mdSign_Koeff);
    ```
    
7.  New public class **SlidesMetadataSignOptions** was added to provide options to support Metadata signature features for Slides/Presentation documents. This class derives base **MetadataSignOptions.**
    
    **Slides Metadata Sign Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Options for Slides documents.
    /// </summary>
    public class SlidesMetadataSignOptions : MetadataSignOptions
    {
        /// <summary>
        /// Initializes a new instance of the SlidesSignMetadataOptions class with default values.
        /// </summary>
        public SlidesMetadataSignOptions();
     
        /// <summary>
        /// Initializes a new instance of the SlidesSignMetadataOptions class with Metadata.
        /// </summary>
        /// <param name="collection">Signature Metadata</param>
        public SlidesMetadataSignOptions(IEnumerable<MetadataSignature> collection);
    }
    ```
    
    Following example demonstrates using **SlidesMetadataSignOptions** to add Metadata signatures to Slides document:
    
    **Sign Slides document with Metadata Signature**
    
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
    SlidesMetadataSignOptions signOptions = new SlidesMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    SlidesMetadataSignature mdSign_Author = new SlidesMetadataSignature("Author", "Mr.Scherlock Holmes");
    signOptions.MetadataSignatures.Add(mdSign_Author);
    // setup data of document id
    SlidesMetadataSignature mdSign_DocId = new SlidesMetadataSignature("DocumentId", Guid.NewGuid().ToString());
    signOptions.MetadataSignatures.Add(mdSign_DocId);
    // setup data of sign date
    SlidesMetadataSignature mdSign_Date = new SlidesMetadataSignature("SignDate", DateTime.Now);
    signOptions.MetadataSignatures.Add(mdSign_Date);
    // setup some integer value
    SlidesMetadataSignature mdSign_Days = new SlidesMetadataSignature("DocDays", 12345);
    signOptions.MetadataSignatures.Add(mdSign_Days);
    // setup data of sign date
    SlidesMetadataSignature mdSign_Koeff = new SlidesMetadataSignature("SignKoeff", 2.345M);
    signOptions.MetadataSignatures.Add(mdSign_Koeff);
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Slides_Documents_Metadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
8.  New public class **SlidesSearchMetadataOptions** was added to provide options to search for Metadata Signatures within the Slides/Presentation documents. This class derives base **SearchMetadataOptions**.
    
    **Slides Metadata Search Options properties**
    
    ```csharp
    /// <summary>
    /// Represents the Metadata Signature Search Options for Slides documents.
    /// </summary>
    public class SlidesSearchMetadataOptions : SearchMetadataOptions
    {
        /// <summary>
        /// Indicates if Built-in document properties like Document statistic, information etc should be included into Search result
        /// </summary>
        public bool IncludeBuiltinProperties { get; set; }
        /// <summary>
        /// Initializes a new instance of the SlidesSearchMetadataOptions class with default values.
        /// </summary>
        public SlidesSearchMetadataOptions();
     
        /// <summary>
        /// Initializes a new instance of the SlidesSearchMetadataOptions class.
        /// </summary>
        /// <param name="includeBuiltinProperties">Indicates if buil-in properties should be included into search results.</param>
        public SlidesSearchMetadataOptions(bool includeBuiltinProperties);
    }
    ```
    
    Following example demonstrates using **SlidesSearchMetadataOptions** to search for Slides Metadata signatures in the Slides/Presentation documents:
    
    **Search for Slides Metadata Signatures in documents**
    
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
    SlidesSearchMetadataOptions searchOptions = new SlidesSearchMetadataOptions();
     
    // set if we need built-in signatures
    searchOptions.IncludeBuiltinProperties = true;
     
    // search document
    SearchResult result = handler.Search("SignedMetadata.pptx", searchOptions);
     
    // output signatures
    List<SlidesMetadataSignature> signatures = result.ToList<SlidesMetadataSignature>();
    foreach (SlidesMetadataSignature signature in signatures)
    {
        SlidesMetadataSignature metadataSignature = signature as SlidesMetadataSignature;
        if (metadataSignature != null)
        {
            Console.WriteLine("Slides Metadata: {0} = {1}", metadataSignature.Name, metadataSignature.ToString());
        }
    }
    ```
    
9.  Public class **WordsVerifyDigitalOptions** was updated with new string properties **SubjectName** and **IssuerName**. These fields could be used as additional criteria to verify Digital Signatures of Words documents. If these properties are specified verification process will check for Digital Signature properties (SubjectName, IssuerName) to be equal or contain passed strings. These values are case sensitive.
    
    **WordsVerifyDigitalOptions**
    
    ```csharp
    /// <summary>
    /// Subject distinguished name of the certificate to validate. Value is case sensitive.
    /// If this property is set verification will check if Signature subject name contains or equals passed value
    /// </summary>
    public string SubjectName { get; set; }
    /// <summary>
    /// Issuer name of the certificate to validate. Value is case sensitive.
    /// If this property is set verification will check if Signature's issuer name contains or equals passed value
    /// </summary>        
    public string IssuerName { get; set; }
    ```
    
    Following example demonstrates using these properties to verify Digital signatures in the Words documents:
    
    **Verify Digital signatures in the Words documents**
    
    ```csharp
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
     
    VerifyOptionsCollection verifyOptionsCollection = new VerifyOptionsCollection();
    // setup digital verification options
    WordsVerifyDigitalOptions verifyOptions = new WordsVerifyDigitalOptions("SherlockHolmes.cer");
    verifyOptions.Comments = "Test1";
    verifyOptions.SubjectName = "Signature";
    verifyOptions.IssuerName = "GroupDocs";
    verifyOptions.SignDateTimeFrom = new DateTime(2017, 1, 26, 14, 55, 57);
    verifyOptions.SignDateTimeTo = new DateTime(2017, 1, 26, 14, 55, 59);        
    //verify document
    VerificationResult result = handler.Verify("digital signatures.docx", verifyOptions);
    Console.WriteLine("Signed file verification result: " + result.IsValid);
    ```
