---
id: groupdocs-signature-for-net-20-10-release-notes
url: signature/net/groupdocs-signature-for-net-20-10-release-notes
title: GroupDocs.Signature for .NET 20.10 Release Notes
weight: 14
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.10{{< /alert >}}

## Major Features

There are eight important new features, improvements and important bug fixes in this release. New features are related to customization of PDF digital signatures on document pages and allow to adjust signature appearance. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.10:

* Introduced extended customization of PDF Digital signatures appearance.
* Implemented ability to apply signature extensions to Digital Signatures.
* Fixed bug with restoring signatures metadata from signed image documents.
* Bug fixes.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3136 | Improve PDF Digital Appearance implementation to support all image related extensions | Feature |
| SIGNATURENET-3104 | Implement CustomAppearance property for PDF Digital Signature | Feature |
| SIGNATURENET-3127 | Improve processing nullable Font properties entire options with default values | Improvement |
| SIGNATURENET-3133 | Exception Specified cast is not valid when processing signed image documents | Bug |
| SIGNATURENET-3131 | Incorrect Page count when obtaining .Odt documents format information | Bug |
| SIGNATURENET-3130 | Null reference exception occurs for applying Text signature options with nullable Font property | Bug |
| SIGNATURENET-3128 | This file type is not supported | Bug |
| SIGNATURENET-2971 | Word-processing blank document preview doesn't contain trial message | Bug |

## Public API and Backward Incompatible Changes

### New class [PdfDigitalSignatureAppearance](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options.appearances/pdfdigitalsignatureappearance) was added with several properties that allow to customize appearance of digital sigantures on the PDF Document pages. 

New class PdfDigitalSignatureAppearance contains follow properties.

**New class PdfDigitalSignatureAppearance**

```csharp
public sealed class PdfDigitalSignatureAppearance : SignatureAppearance
{
    /// <summary>
    /// Gets or sets contact info label. Default value: "Contact".
    /// if this value is empty then no contact label will appear on digital signature area.
    /// </summary>
    public string ContactInfoLabel { get; set; }

    /// <summary>
    /// Gets or sets reason label. Default value: "Reason".
    /// if this value is empty then no reason label will appear on digital signature area.
    /// </summary>
    public string ReasonLabel { get; set; }

    /// <summary>
    /// Gets or sets location label. Default value: "Location".
    /// if this value is empty then no location label will appear on digital signature area.
    /// </summary>
    public string LocationLabel { get; set; }

    /// <summary>
    /// Gets or sets digital signed label. Default value: "Digitally signed by".
    /// </summary>
    public string DigitalSignedLabel { get; set; }

    /// <summary>
    /// Gets or sets date signed label. Default value: "Date".
    /// </summary>
    public string DateSignedAtLabel { get; set; }

    /// <summary>
    /// Get or set background color of signature appearance.
    /// By default the value is SystemColors.Windows
    /// </summary>
    public Color Background { get; set; }

    /// <summary>
    /// Creates signature appearance object with default values.
    /// </summary>
    public PdfDigitalSignatureAppearance();
}
```

Following example shows how to sign PDF Document with customization of Digital signature appearance on the page.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("sample.pdf"))
{
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // certificate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Approved",
        Location = "New York",

        // apply custom PDF signature appearance
        Appearance = new PdfDigitalSignatureAppearance()
        {
            // do now show contact details
            ContactInfoLabel = string.Empty,
            // simplify reason label
            ReasonLabel = "?",
            // change location label
            LocationLabel = "From",
            DigitalSignedLabel = "By",
            DateSignedAtLabel = "On",
            // apply custom appearance color
            Background = Color.Red
        },
        AllPages = true,
        Width = 160,
        Height = 80,
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.Red,
            DashStyle = DashStyle.DashDot,
            Weight = 2
        }
    };
    SignResult signResult = signature.Sign("signed.pdf", options);
}
```
