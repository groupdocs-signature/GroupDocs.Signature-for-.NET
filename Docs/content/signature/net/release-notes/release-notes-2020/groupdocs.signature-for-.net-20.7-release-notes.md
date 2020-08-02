---
id: groupdocs-signature-for-net-20-7-release-notes
url: signature/net/groupdocs-signature-for-net-20-7-release-notes
title: GroupDocs.Signature for .NET 20.7 Release Notes
weight: 17
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.7{{< /alert >}}

## Major Features

There are about ten new features, improvements and fixes in this release. New features implement ability to add timestamp and certification to digital signatures for PDF documents. Important changes were made to storing signatures metadata information. This data layer will be encrypted and compressed into one system document metadata. With these improvements we introduced ability to track document history of actions performed with a various processes like signing, modyfying or deletion signatures. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.7:

* Added ability to get history of actions performed with a document.
* Implemented time stamp options for digital signatures in PDF documents.
* Introduced for Pdf documents new type certificate type of electronic digital signatures.
* Improved processing of blank and zero-size documents
* Optimizing document preview for empty documents
* Fixed few bugs with processing Barcode signatures  

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2944 | Implement ability to use timestamp for digital signatures in Pdf Documents | Feature |
| SIGNATURENET-2937 | Implement ability to add digital certificate to Pdf Documents | Feature |
| SIGNATURENET-2936 | Implement ability to track document processing history | Feature |
| SIGNATURENET-2535 | Implement secured Document metadata information | Feature |
| SIGNATURENET-2951 | Return images with default size as preview result for empty Spreadsheets documents | Improvement |
| SIGNATURENET-2950 | Processing null-sized files with specific exception | Improvement |
| SIGNATURENET-2975 | PdfDigitalSignature has no constructors defined | Bug |
| SIGNATURENET-2948 | Empty image is returned for documents without any content | Bug |
| SIGNATURENET-2947 | Can't get document info for empty documents | Bug |
| SIGNATURENET-2946 | Wrong Barcode recognition for images with wide borders | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were added

* [Sign documents with standard encryption of QR-code]({{< ref "signature/net/developer-guide/advanced-usage/common/obtain-document-history-information.md" >}})

## Public API and Backward Incompatible Changes

### New public enumeration type [PdfDigitalSignatureType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignaturetype) was added.

New public enumeration type **[PdfDigitalSignatureType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignaturetype)** was added. This type describes possible values of PDF digital signature types.

* At this moment enumeration contains two options Signature and Certificate. In first case a PDF document is signed digitally in second one it is digitally certified.

**Enumeration of PDF digital signature types**

```csharp
 /// <summary>
 /// Describes enumeration of PDF digital signature type.
 /// </summary>
 public enum PdfDigitalSignatureType
 {
  /// <summary>
  /// Digital signature.
  /// </summary>
  Signature = 0,
  
  /// <summary>
  /// Digital certificate. Each document could be certified only once.
  /// </summary>
  Certificate = 1
 }
```

### New public struct [TimeStamp](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/timestamp) was added.

New public struct **[TimeStamp](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/timestamp)** was added. This struct could be used for getting time stamp from third-party site to PDF digital signature.

*   At this moment enumeration struct contains Url, User and Password properties.

**Struct for getting timestamp**

```csharp
/// <summary>
/// Represents data to get time stamp from third-party site.
/// </summary>
public struct TimeStamp
{
    /// <summary>
    /// Url of third-party site.
    /// </summary>
    public string Url { get; set; }
 
    /// <summary>
    /// User.
    /// </summary>
    public string User { get; set; }
 
    /// <summary>
    /// Password.
    /// </summary>
    public string Password { get; set; }
 
    /// <summary>
    /// Instantiates new time stamp structure.
    /// </summary>
    /// <param name="url">Url of third-party site.</param>
    /// <param name="user">User.</param>
    /// <param name="password">Password.</param>
    public TimeStamp(string url, string user, string password);
}
```

### Public class [PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature) was updated with new property.

Public class **[PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature)** was updated with new property for PDF document specific signatures. Supported only for digital signatures.

* new property Type of type PdfDigitalSignatureType was added to specify PDF document specific type of digital signatures.
* new property TimeStamp of type TimeStamp was added to add possibility for getting time stamp from third-party site to PDF digital signatures.
* four constructors were added to make process of instantiation more versatile.


**New properties of PdfDigitalSignature**

```csharp
/// <summary>
/// Contains Pdf Digital signature properties.
/// </summary>
public class PdfDigitalSignature : DigitalSignature
{
    /// <summary>
    /// Type of Pdf digital signature.
    /// </summary>
    public PdfDigitalSignatureType Type { get; set; } = PdfDigitalSignatureType.Signature;

    /// <summary>
    /// Time stamp for Pdf digital signature.
    /// Default value is null.
    /// </summary>
    public TimeStamp TimeStamp { get; set; }

    /// <summary>
    /// Initialize Pdf Digital Signature with no certificate.
    /// </summary>
    public PdfDigitalSignature()

    /// <summary>
    /// Initialize Pdf Digital Signature based on specified X509 store. First certificate from specified store will be used.
    /// </summary>
    /// <param name="store">X509 store.</param>
    public PdfDigitalSignature(X509Store store);

    /// <summary>
    /// Create Pdf Digital signature based on specified X509 Store and index of certificate.
    /// </summary>
    /// <param name="store">X509 store.</param>
    /// <param name="index">Index of certificate.</param>
    public PdfDigitalSignature(X509Store store, int index);

    /// <summary>
    /// Create Pdf Digital signature with specified certificate.
    /// </summary>
    /// <param name="certificate">X509 certificate.</param>
    public PdfDigitalSignature(X509Certificate2 certificate);
}
```

 Following example demonstrates how to certify a PDf document with digital signature and added timestamp.

**Certifying a PDf document with digital signature and adding timestamp**

```csharp
//Certify pdf document with digital signature
using (Signature signature = new Signature("sample.pdf"))
{
    PdfDigitalSignature pdfDigitalSignature = new PdfDigitalSignature() 
       { ContactInfo = "ContactInfo", Location = "Location", Reason = "Very important reason" };
    // Setting pdf digital signature type
    pdfDigitalSignature.Type = PdfDigitalSignatureType.Certificate;
 
    // Setting data for getting time stamp from third-party site for pdf digital signature
    pdfDigitalSignature.TimeStamp = new TimeStamp("https://freetsa.org/tsr", "", "");
 
    //Create digital signing options
    DigitalSignOptions options = new DigitalSignOptions(certificatePath)
    {
        // certificate password
        Password = "1234567890",
        // image as digital certificate appearance on document pages
        ImageFilePath = imagePath,
        // Setting document-specific options
        Signature = pdfDigitalSignature,
        Width = 160,
        Height = 80,
        VerticalAlignment = VerticalAlignment.Bottom,
        HorizontalAlignment = HorizontalAlignment.Right,
        Margin = new Padding() { Bottom = 10, Right = 10 },
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.Red,
            DashStyle = DashStyle.DashDot,
            Weight = 2
        }
    };
    SignResult signResult = signature.Sign(outputFilePathCertified, options);
    Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePathSigned}.");
    Console.WriteLine("\nList of newly created signatures:");
    int number = 1;
    foreach (BaseSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

### New public enumeration type [ProcessType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processtype) was added.

New public enumeration type **[ProcessType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processtype)** was added. This type describes document process type of supported operations.

**Enumeration of processing types**

```csharp
    /// <summary>
    /// Defines supported process with documents like Info, Preview, Sign, Verify, Search, Update, Delete
    /// </summary>
    public enum ProcessType
    {
        /// <summary>Indicates an error, unknown process type.</summary>
        Unknown,
        /// <summary>Obtain document information process.</summary>
        Info,
        /// <summary>Indicates method GeneratePreview().</summary>
        Preview,
        /// <summary>Signing process type.</summary>
        Sign,
        /// <summary>Document verification process.</summary>
        Verify,
        /// <summary>Signatures searching process.</summary>
        Search,
        /// <summary>Update document signatures process.</summary>
        Update,
        /// <summary>Delete document signatures process</summary>
        Delete
    }
```

### New public class [ProcessLog](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processlog) was added.

New public class type **[ProcessLog](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processlog)** was added to keep document process information like date/time, type of the process (**[ProcessType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processtype)**), message, quantity of succeeded and quantity of failed signatures.

**ProcessLog class properties**

```csharp
    /// <summary>
    /// Represents document process details.
    /// </summary>
    public sealed class ProcessLog
    {
        /// <summary>
        /// Get the process date and time.
        /// </summary>
        public DateTime Date { get; }

        /// <summary>
        /// Get the process type.
        /// </summary>
        public ProcessType Type { get; }

        /// <summary>
        /// Get process description.
        /// </summary>
        public string Message { get; }

        /// <summary>
        /// Quantity of successfully processed signatures.
        /// </summary>
        public int Succeeded { get; }

        /// <summary>
        /// Quantity of signatures that failed process action.
        /// </summary>
        public int Failed { get; }
    }
```

### Public interface [IDocumentInfo](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/idocumentinfo) was extended with new property

Public interface **[IDocumentInfo](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/idocumentinfo)** was extended with new properties. 

* ProcessLogs property as IList of ProcessLog objects to keep the list of document process history log records.

**New property ProcessLogs of IDocumentInfo interface**

```csharp
    /// <summary>
    ///  Defines document description properties.
    /// </summary>
    public interface IDocumentInfo
	{
        /// <summary>
        /// Collection of document history process logs.
        /// </summary>
        IList<ProcessLog> ProcessLogs { get; }
	}
```

### Public class [DocumentInfo](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/documentinfo) was extended with new property.

Public interface **[DocumentInfo](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/documentinfo)** was extended with new property **ProcessLogs** to keep the list of document process history log records.

**New property ProcessLogs of DocumentInfo class**

```csharp
    public class DocumentInfo : IDocumentInfo
	{
        ...
        
        /// <summary>
        /// Collection of document history processes like Sign, Update, Delete.
        /// </summary>
        public IList<ProcessLog> ProcessLogs { get; }
	}
```