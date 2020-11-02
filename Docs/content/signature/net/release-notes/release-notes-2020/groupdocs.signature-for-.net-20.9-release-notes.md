---
id: groupdocs-signature-for-net-20-9-release-notes
url: signature/net/groupdocs-signature-for-net-20-9-release-notes
title: GroupDocs.Signature for .NET 20.9 Release Notes
weight: 15
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.9{{< /alert >}}

## Major Features

There are few important new features and improvements in this release. Most features are related to ability to hide and remove digital electronic signatures on Pdf Document pages same as adjust appearance of its representation on document page. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.9:

* Implement ability to hide digital signatures on document preview for PDF documents.
* Involved option to adjust digital signature appearance on page.
* Introduced ability to remove digital signatures from PDF documents.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3085 | Implement ability to hide digital signatures on PDF Document Preview | Feature |
| SIGNATURENET-3084 | Set additional Digital Signatures properties for PDF documents | Feature |
| SIGNATURENET-3083 | Implement ability to remove digital signatures from PDF documents | Feature |

## Public API and Backward Incompatible Changes

### New constructor with string signature unique identifier for class [DigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/digitalsignature) is the list of processed signatures

New constructor class DigitalSignature allows to create instance with predefined signature identifier.

**New constructor DigitalSignature**

```csharp
/// <summary>
/// Initialize Digital signature with known SignatureId.
/// </summary>
public DigitalSignature(string signatureId)
```

Following example shows how to delete Digital signature by known signature identifier.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signedSample.pdf"))
{
    DigitalSignature dsSignature = new DigitalSignature("a01e1940-997a-444b-89af-9309a2d559a5");
    // delete required signatures
    bool result = signature.Delete(dsSignature);
    if (result)
    {
        Console.WriteLine("All signatures were successfully deleted!");
    }
    else
    {
        Helper.WriteError($"Not digital signatures : {dsSignature.SignatureId}");
    }
}
```

### New boolean property ShowProperties of class [PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature) was added

New boolean property ShowProperties was added to class **[PdfDigitalSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/pdfdigitalsignature)**. This property allow to adjust appearance of Digital signture on Pdf document page.