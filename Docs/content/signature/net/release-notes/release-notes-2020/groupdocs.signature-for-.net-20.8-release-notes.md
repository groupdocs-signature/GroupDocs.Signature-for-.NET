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

### New property Signatures of class [ProcessLog](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/processlog) is the list of processed signatures

New property Signatures keep list of processed signatures per process operation.

**New property Signatures**

```csharp
/// <summary>
/// The list of successfully processed signatures.
/// </summary>
public List<BaseSignature> Signatures { get; }
```

### New property Deleted of [BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature) was added.

New boolean property Deleted was added to class **[BaseSignature](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/basesignature)**. This property signals if Signature object was deleted from the Document.

### Obsolete member Stamp was removed from enumeration [TextSignatureImplementation](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation).

Obsolete member Stamp of enumeration **[TextSignatureImplementation](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation)** was removed and no longer supported. Please use enumeration value Native instead.

**Obsolete member Border was removed from [ImageAppearance](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options.appearances/imageappearance**

Obsolete member Stamp of enumeration **[TextSignatureImplementation](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/textsignatureimplementation)** was removed and no longer supported. Please use enumeration value Native instead.