---
id: groupdocs-signature-for-net-20-8-release-notes
url: signature/net/groupdocs-signature-for-net-20-8-release-notes
title: GroupDocs.Signature for .NET 20.8 Release Notes
weight: 16
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.8{{< /alert >}}

## Major Features

There are about 14 new features, improvements and bug fixes in this release. New features are related to extended ability to obtain document signatures information, track deleted signatures and get list of processed signatures per each document operation. This update also contains ability to keep signatures information in the image documents.   Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.8:

* Implement ability to keep deleted signatures information.
* List of processed signatures were added to history log records.
* Introduced ability to keep signatures information in the Image documents.
* Fixed major bugs with processing various data files types
* Imroved verification of passed file type and proper signatures types.
* Fixed few bugs with signature processing and loading documents.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3020 | Implement ability to keep signature information in image documents | Feature |
| SIGNATURENET-2978 | Keep in history process log the list of processed sigantures | Feature |
| SIGNATURENET-2977 | Keep deleted signatures information in metadata for history | Feature |
| SIGNATURENET-3008 | Remove support of .DJVU files | Improvement |
| SIGNATURENET-3004 | Improve file format support verification for each Document type and operations | Improvement |
| SIGNATURENET-3047 | Fixed memory leak issue when working with metadata Signatures | Bug |
| SIGNATURENET-3021 | Exception is thrown when barcodes are being searched in .webp images | Bug |
| SIGNATURENET-2981 | Not protected file requires password | Bug |
| SIGNATURENET-2980 | Can not open .odg file | Bug |
| SIGNATURENET-2979 | Can not load pdf file | Bug |
| SIGNATURENET-2952 | Image loading failed | Bug |
| SIGNATURENET-2948 | Empty image is returned for documents without any content | Bug |
| SIGNATURENET-2791 | SignResult signatures are not populated with minor data for Image documents | Bug |

## Public API and Backward Incompatible Changes

### New property Signatures of class [ProcessLog](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processlog) is the list of processed signatures.

New property Signatures keep list of processed signatures per process operation.

**New property Signatures**

```csharp
/// <summary>
/// The list of successfully processed signatures.
/// </summary>
public List<BaseSignature> Signatures { get; private set; }
```

### New property Deleted of [BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature) was added.

New boolean property Deleted was added to class **[BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature)**. This property signals if Signature object was deleted from the Document.

### Obsolete member Stamp was removed from enumeration [TextSignatureImplementation](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation).

Obsolete member Stamp of enumeration **[TextSignatureImplementation](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation)** was removed and no longer supported. Please use enumeration value Native instead.

**Obsolete member Border was removed from [ImageAppearance](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options.appearances/imageappearance**

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