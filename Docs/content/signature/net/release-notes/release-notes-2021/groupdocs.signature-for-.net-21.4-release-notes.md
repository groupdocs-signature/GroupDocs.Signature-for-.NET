---
id: groupdocs-signature-for-net-21-4-release-notes
url: signature/net/groupdocs-signature-for-net-21-4-release-notes
title: GroupDocs.Signature for .NET 21.4 Release Notes
weight: 46
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 21.4{{< /alert >}}

## Major Features

This release contains important improvements for PDF Digital signatures, for signature image preview generation, changes with the additional signature options properties and bug fixes. Below the list of most notable changes in release of GroupDocs.Signature for .NET 21.4:

* Implemented ability to support Border properties for PDF Digital signature on document page.
* Improved generation of digital signature image preview for Pdf document.
* Implemented additional properties Siganture Type and Document Type that allow to distinct the options and specify document type for signature preview.
* Fixed the issue with Word Processing document Watermark objects.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3410 | Implement support of Border properties for the Pdf Digital Appearance  | Improvement |
| SIGNATURENET-3389 | Implement special generation of the Digital Signature image preview for PDF Document type | Improvement |
| SIGNATURENET-3388 | Implement public enum Document Type to distinct document options | Improvement |
| SIGNATURENET-3363 | Implement SignOptions.SignatureType property | Improvement |
| SIGNATURENET-3309 | Unexpected Words Processing document behavior with watermark objects | Bug |

## Public API and Backward Incompatible Changes

#### New public enumeration [DocumentType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/documenttype) was added to distinct supported document types

This enumeration keeps supported Document types.

**New public enumeration**

```csharp
    /// <summary>
    /// Defines the Document type.
    /// </summary>
    public enum DocumentType
    {
        /// <summary>Indicates an error, unknown document type.</summary>
        Unknown,
        /// <summary>PDF Document Type.</summary>
        Pdf,
        /// <summary>Word Processing Document Type.</summary>
        WordProcessing,
        /// <summary>Presentation Document Type.</summary>
        Presentation,
        /// <summary>Spreadsheet Document Type.</summary>
        Spreadsheet,
        /// <summary>Image Document Type.</summary>
        Image
    };
}
```

#### Public class [SignOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/signoptions) was updated with 2 new properties that allow to distinct signature type and document type

Public class [SignOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/signoptions) was updated with properties

* readonly property [SignatureType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/signaturetype).
* property [DocumentType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain/documenttype).

**New properties of SignOptions class**

```csharp
    public class SignOptions
    {
        /// <summary>
        /// Get the Signature Type <see cref="Domain.SignatureType"/>
        /// </summary>
        public SignatureType SignatureType { get; }

        /// <summary>
        /// Get or set the Document Type of the Signature Options <see cref="Domain.DocumentType"/>
        /// </summary>
        public DocumentType DocumentType { get; set; }
   }
```

Following example demonstrates how to generate preview of the PDF Digital signature.

**Generate PDF Digtial Signature preview**

```csharp
public static void Run()
{
    // get certificate to check simulation preview with its data
    string certificatePath = "certificate.pfx";
    // create options
    DigitalSignOptions signOptions = new DigitalSignOptions(certificatePath)
    {
        // set the DocumentType property to specify simulating PDF signature appearance
        DocumentType = DocumentType.Pdf,
        // certificate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Approved",
        Contact = "John Smith",
        Location = "New York",

        // apply custom PDF signature appearance
        Appearance = new Options.Appearances.PdfDigitalSignatureAppearance()
        {
            // do now show contact details
            ContactInfoLabel = "Contact",
            // simplify reason label
            ReasonLabel = "R:",
            // change location label
            LocationLabel = "@=>",
            DigitalSignedLabel = "By:",
            DateSignedAtLabel = "On:",
            // apply custom appearance color
            Background = Color.LightGray,
            // apply custom font settings
            FontFamilyName = "Courier",
            FontSize = 8
        },
        //
        AllPages = false,
        Width = 200,
        Height = 130,
        VerticalAlignment = VerticalAlignment.Center,
        HorizontalAlignment = HorizontalAlignment.Left,
        Margin = new Padding() { Bottom = 10, Right = 10 },

        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.FromArgb(80, Color.DarkGray),
            DashStyle = DashStyle.DashDot,
            Weight = 2
        }
    };                              

    // create signature preview options object
    PreviewSignatureOptions previewOption = new PreviewSignatureOptions(signOptions, CreateSignatureStream, ReleaseSignatureStream)
    {
        SignatureId = Guid.NewGuid().ToString(),
        PreviewFormat = PreviewSignatureOptions.PreviewFormats.JPEG,
    };
    // generate preview
    Signature.GenerateSignaturePreview(previewOption);
}

private static Stream CreateSignatureStream(PreviewSignatureOptions previewOptions)
{
    SignOptions signOptions = previewOptions.SignOptions;
    string imageFilePath = $"signature-{previewOptions.SignatureId}-{previewOptions.SignOptions.GetType().Name}.jpg";
    return new FileStream(imageFilePath, FileMode.Create);
}

private static void ReleaseSignatureStream(PreviewSignatureOptions previewOptions, Stream signatureStream)
{
    signatureStream.Dispose();
    Console.WriteLine($"Signature {previewOptions.SignatureId}-{previewOptions.SignOptions.GetType().Name} is ready for preview");
}
```
