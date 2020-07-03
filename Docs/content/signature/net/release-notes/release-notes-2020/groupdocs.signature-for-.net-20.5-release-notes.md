---
id: groupdocs-signature-for-net-20-5-release-notes
url: signature/net/groupdocs-signature-for-net-20-5-release-notes
title: GroupDocs.Signature for .NET 20.5 Release Notes
weight: 19
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.5{{< /alert >}}

## Major Features

There are about 15 new features, improvements and fixes in this release. New features implement ability to process Presentation documents with electronic digital signatures such as sign document with certificates, verify and search Presentation files for digital signatures. Also few additional features and improvements were implemented with supporting XAdES digital signature types, fixed few bugs and issues. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.5:

*   Added ability to sign Presentation documents with digital electronic signatures with certificate pfx files.
*   Implemented verification of Presentation document for valid digital signatures
*   Involved support of searching digital signatures with Presentation files
*   Improved and added few data conversion methods when working with Metadata signatures
*   Fixed few issues with result of SignResult data
*   Added XAdES identification when searching for digital signatures in the Spreadsheet documents
*   Fixed few bugs with saving open office document format types
*   Fixed bug with processing Spreadsheet files while digital signing  
      
    

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2808 | Implement support of verification for digital signatures for presentations document types | Feature |
| SIGNATURENET-2806 | Implement support of search for digital signatures for presentations document types | Feature |
| SIGNATURENET-2803 | Implement support of digital signing for presentations document types | Feature |
| SIGNATURENET-2724 | Implement Metadata values convertion across various types | Feature |
| SIGNATURENET-2837 | Implement property XAdES for Digital Signature | Improvement |
| SIGNATURENET-2811 | Set up additional properties for digital signatures in SignResult | Improvement |
| SIGNATURENET-2789 | Remove support of signing .PSD files | Improvement |
| SIGNATURENET-2560 | Implement support XAdES signatures for Spreadsheet documents for .Net Standard | Improvement |
| SIGNATURENET-2280 | Update using Transparency property of Text and Image Options | Improvement |
| SIGNATURENET-2836 | XAdES type is not defined when reading signed Spreadsheet documents with XAdES signatures | Bug |
| SIGNATURENET-2798 | Wrong page calculations for .ott document | Bug |
| SIGNATURENET-2797 | Exception when trying to sign Spreadsheet files with Pfx certificate | Bug |
| SIGNATURENET-2796 | Trial message is cut off for Image documents | Bug |
| SIGNATURENET-2727 | Digital signing for PDF documents throws exception if signature image is not set | Bug |
| SIGNATURENET-2446 | Signatures (Text/Image/etc) are missing on second page for Word Processing document Ott format | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were added

[Advanced search for Metadata signatures]({{< ref "signature/net/developer-guide/advanced-usage/searching/advanced-search-for-metadata-signatures.md" >}})

[Sign document with XAdES Digital signature]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-xades-digital-signature.md" >}})

## Public API and Backward Incompatible Changes

#### Public class [DigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/digitalsignature) was updated with new properties and ability to set XAdES type. Supported only for Spreadsheets documents

Public class **[DigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/digitalsignature)** was updated with new property.

*   new property **[XAdESType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/barcodesignature/properties/xadestype)** of type **[XAdESType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/xadestype)** was added to specify alternative digital signature format XML Advanced Electronic Signature (see more details here [XAdES on Wiki](https://en.wikipedia.org/wiki/XAdES);

**New properties of DigitalSignature**

```csharp
    /// <summary>
    /// Contains Digital signature properties.
    /// </summary>
    public class DigitalSignature
    {
        /// <summary>
        /// XAdES type <see cref="XAdESType"/>. Default value is None (XAdES is off).
        /// At this moment XAdES signature type is supported only for Spreadsheet documents.
        /// </summary>
        public XAdESType XAdESType { get; internal set; }
   }
```

Following example demonstrates how to sign document with digital signature providing selected XAdES type.

**Sign document with Digital signature**

```csharp
using (Signature signature = new Signature("sample.xlsx"))
{
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // set XAdES type
        XAdESType = XAdESType.XAdES,
        // certificate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Sign",
        Contact = "JohnSmith",
        Location = "Office1"
    };
    SignResult signResult = signature.Sign("signedXades.xlsx", options);
}
```

#### Public class [MetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature) was updated with new conversion methods to retrieve its values with various data types.

Public class **[MetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature)** was updated with new data conversion methods

*   new method **[ToDecimal](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature/methods/todecimal)** converts metadata signature value to decimal;
*   new method **[ToDecimal(IFormatProvider provider)](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature/methods/index)** converts metadata signature value to decimal based on provided format provider;
*   new method **[ToSingle](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature/methods/tosingle)** converts metadata signature value to float;
*   new method **[ToSingle(IFormatProvider provider)](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/metadatasignature/methods/index)** converts metadata signature value to float based provided format provider;

All inherited classes (**[ImageMetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/imagemetadatasignature), [PdfMetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfmetadatasignature), [PresentationMetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/presentationmetadatasignature), [SpreadsheetMetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/spreadsheetmetadatasignature), [WordProcessingMetadataSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/wordprocessingmetadatasignature)**) are extended with there methods.

**New methods of MetadataSignature**

```csharp
    /// <summary>
    /// Contains Metadata signature properties.
    /// </summary>
    public abstract class MetadataSignature : BaseSignature
    {
        /// <summary>
        /// Converts to Decimal.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as Decimal.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted. 
        /// If original value is string based the default culture property info will be used from SignatureSettings properties <see cref="SignatureSettings.DefaultCulture"/>
        /// </remarks>
        public virtual decimal ToDecimal();

        /// <summary>
        /// Converts to Decimal.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as Decimal.</returns>
        /// <param name="provider">Format data provider to use with data conversion operations.</param>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public virtual decimal ToDecimal(IFormatProvider provider);

        /// <summary>
        /// Converts to float.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as float.</returns>
        /// <remarks>Throws an exception if the Metadata value could not be converted. 
        /// If original value is string based the default culture property info will be used from SignatureSettings properties <see cref="SignatureSettings.DefaultCulture"/>
        /// </remarks>
        public virtual float ToSingle();

        /// <summary>
        /// Converts to float.
        /// </summary>
        /// <returns>Returns the Metadata Signature value as float.</returns>
        /// <param name="provider">Format data provider to use with data conversion operations.</param>
        /// <remarks>Throws an exception if the Metadata value could not be converted</remarks>
        public virtual float ToSingle(IFormatProvider provider);
 }
```

Public class **[PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature)** property **string** **[Authority](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature/properties/authority)** was marked as obsolete and will be removed since 20.09 version.

**PdfDigitalSignature properties**

```csharp
/// <summary>
/// Contains Pdf Digital signature properties.
/// </summary>
public class PdfDigitalSignature : DigitalSignature
{
        /// <summary>
        /// The name of the person or authority signing the document.
        /// </summary>
        [Obsolete("This property is obsolete and will be removed in the future release (GroupDocs.Signature 20.09).", false)]
        public string Authority { get; set; }
}
```
