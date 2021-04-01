---
id: groupdocs-signature-for-net-21-1-release-notes
url: signature/net/groupdocs-signature-for-net-21-1-release-notes
title: GroupDocs.Signature for .NET 21.1 Release Notes
weight: 50
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 21.1{{< /alert >}}

## Major Features

This release contains important bug fixes related to processing Digital Signatures with its generated unique identifiers for supported document types. Also this update contains the fix document preview. Below the list of most notable changes in release of GroupDocs.Signature for .NET 21.1:

* The issue on Document preview generation with not hidden signatures was fixed.
* Unexpected identifiers in the result for digitally signed PDF Documents were fixed.
* Fixed the wrong signature identifiers in the signing result for all supported file formats.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3280 | Preview with hidden signatures contains QrCode signature image for Word processing documents | Bug |
| SIGNATURENET-3277 | Result of digitally signed documents contains wrong Digital signature identifiers | Bug |
| SIGNATURENET-3234 | Signed result of Pdf document returns unexpected Signature identifier | Bug |

## Public API and Backward Incompatible Changes
This release contains no changes for public API.