---
id: groupdocs-signature-for-net-19-9-release-notes
url: signature/net/groupdocs-signature-for-net-19-9-release-notes
title: GroupDocs.Signature for .NET 19.9 Release Notes
weight: 4
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.9{{< /alert >}}

## Major Features

There are about seven new features, improvements and bug fixes in this regular release. In this update we tried to stabilize signing process with different file types, adjust using various digital signature properties and implemented z-order features for Text signature for different document types. Most changes are related to internal processes optimization, fixes with supporting djvu file types and improvements with Stamp signature. Here are the most notable changes

*   Introduced ability to specify z-order for Text signatures.
*   Improved and fixed signing process with passed digital certificates from internal storage.
*   Adjusted sign processing of djvu format files.
*   Improved Word Processing saving to various format routines.
*   Internal processes were adjusted and optimized.

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2254 | DigitalSignature property of SignDigitalOptions does not affect signing process | Bug |
| SIGNATURENET-2279 | Implement Z-Order for Text Signature for WordProcessing Documents | New Feature |
| SIGNATURENET-2278 | Implement Z-Order for Text Signature for Spreadsheets Documents | New Feature |
| SIGNATURENET-2275 | Implement Z-Order for Text Signature for Pdf Documents | New Feature |
| SIGNATURENET-2211 | Improvement of saving signed .djvu files | Improvement |
| SIGNATURENET-2210 | Improvement of WordProcessing documents saving to various formats | Improvement |
| SIGNATURENET-2200 | Implement Background Transparent for Stamp | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.9. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

Base public class **TextSignOptions** wasextended with new public property **ZOrder** with integer type

**ZOrder property**

```csharp
        /// <summary>
        /// Gets or sets the Z-order position of text signature.        
        /// Determines the display order of overlapping signatures.
        /// </summary>
        public int ZOrder{ get; set; }
```

This field is supported for Spreadsheets, Pdf and Word processing documents.

Example:

Following example demonstrates signing document with Z-Order

**Signing document with Z-order of Text signature**

```csharp
// setup source document file
string filePath = @"Sample.xlsx";
// instantiating the signature object
using (Signature signature = new Signature(filePath))
{
    // setup options with text of signature
    TextSignOptions signOptions = new TextSignOptions("John Smith");
    // set Z-Order
    signOptions.ZOrder = 10;
    // text rectangle size
    signOptions.Height = 100;
    signOptions.Width = 100;
    // if you need to sign all sheets set it to true
    signOptions.AllPages = true;
    
    // sign document
    string signedPath = @"signedSample.xlsx";
    signature.Sign(signedPath, signOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
}
```
