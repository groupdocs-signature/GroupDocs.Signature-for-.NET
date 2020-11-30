---
id: groupdocs-signature-for-net-20-11-release-notes
url: signature/net/groupdocs-signature-for-net-20-11-release-notes
title: GroupDocs.Signature for .NET 20.11 Release Notes
weight: 13
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.11{{< /alert >}}

## Major Features

There are about ten important bug fixes, improvements and features in this release. New improvements are related to optimization of Open Office document saving and Text signatures rendering on the Image documents. The new feature with Pdf digital appearance allows to customize font of the labels. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.11:

* Implemented additional customization of Pdf Digital Signature appearance.
* Improved saving Open Office documents with the OTT file format.
* Implemented support of Native Text Signature implementation on the Image documents.
* Fixed major issues with reading and signing Word processing documents.
* Fixed issues with the image rendering for the Spreadsheet documents.
* Fixed null-references bugs with accessing not initialized objects across the signing process.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3207 | Implement Font customization for Pdf Digital Signature Appearance | Feature |
| SIGNATURENET-3188 | Open office document content is slightly changed after saving for OTT format types | Improvement |
| SIGNATURENET-3139 | Involve support of Text Signature options with Native implementation for Image documents | Improvement |
| SIGNATURENET-3187 | Exception while obtaining watermark type for Word processing documents | Bug |
| SIGNATURENET-3186 | Can not sign second page of Word processing document | Bug |
| SIGNATURENET-3185 | Document Information returns incorrect number of pages for Pdf files | Bug |
| SIGNATURENET-3184 | Can not sign Open Office document for ODT format files | Bug |
| SIGNATURENET-3183 | A generic error occurred in GDI+ for Spreadsheet documents | Bug |
| SIGNATURENET-3160 | NullReference exception occurs when Text property of StampLine is not set for Stamp Signatures | Bug |
| SIGNATURENET-3158 | NullReference exception occurs when Margin property of signature options is null | Bug |

## Public API and Backward Incompatible Changes

### Class [PdfDigitalSignatureAppearance](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options.appearances/pdfdigitalsignatureappearance) was update with new properties that allow to customize Font label appearance of PDF digital sigantures.

Class PdfDigitalSignatureAppearance was updated with new properties FontFamilyName and FontSize to custmomize Font of Digital Signature appearances labels.

**Updated class PdfDigitalSignatureAppearance**

```csharp
public sealed class PdfDigitalSignatureAppearance : SignatureAppearance
{
    .....
    /// <summary>
    /// Gets or sets the Font family name to display the labels. Default value is "Arial".
    /// </summary>
    public string FontFamilyName { get; set; }

    /// <summary>
    /// Gets or sets the Font size to display the labels. Default value is 10.
    /// </summary>
    public double FontSize{ get; set; }

    ......

}
```

### Class [PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature) was updated. Property Authority was removed.

Class PdfDigitalSignature was updated with removed property Authority.