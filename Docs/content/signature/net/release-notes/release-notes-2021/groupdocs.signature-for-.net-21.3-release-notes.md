---
id: groupdocs-signature-for-net-21-3-release-notes
url: signature/net/groupdocs-signature-for-net-21-3-release-notes
title: GroupDocs.Signature for .NET 21.3 Release Notes
weight: 48
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 21.3{{< /alert >}}

## Major Features

This release contains important updates for the electronic signatures deletion and signature preview based on the Signature Options. New Delete methods allow to remove selected or all digital signatures from the document and remove electronic signatures per certain type. The important update brings ability to generate signature preview with given Signature Options. This feature could be extremely useful for front-end applications when simulating document signature layer on the browers client side. Below the list of most notable changes in release of GroupDocs.Signature for .NET 21.3:

* Implemented ability to retrieve Signatures preview for the given Signature Options.
* Involved signature deletion by the certain Signature type (Text, Image, Barcode, QRCode, Digital).
* Improved electronic certificates removal from the WordProcesing, Spreadsheet and Presentation documents.
* Fixed page generation preview issues with the Qr-Code signatures.
* Fixed issues with the image rendering for the Spreadsheet documents.

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3358 | Implement ability to retrieve Stamp Signature Image Preview without document | Feature |
| SIGNATURENET-3357 | Implement ability to retrieve Digital Signature Image Preview without document | Feature |
| SIGNATURENET-3356 | Implement ability to retrieve Text Signature image preview without document | Feature |
| SIGNATURENET-3331 | Implement the ability to remove signatures of the certain type | Feature |
| SIGNATURENET-3329 | Implement ability to retrieve QR-code signature image without document | Feature |
| SIGNATURENET-3328 | Implement ability to retrieve Barcode signature image without document | Feature |
| SIGNATURENET-3282 | Implement ability to remove digital signatures from Spreadsheet documents | Feature |
| SIGNATURENET-3281 | Implement ability to remove all digital signatures from Presentation documents | Feature |
| SIGNATURENET-3233 | Implement ability to remove digital signatures from Word Processing documents | Feature |
| SIGNATURENET-3283 | Preview with hidden signatures contains QrCode signature | Bug |
| SIGNATURENET-3258 | Error "startIndex cannot be larger than length of string. Parameter name: startIndex" for Spreadsheet documents | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were added

[Delete Digital signatures from documents]({{< ref "signature/net/developer-guide/basic-usage/delete-signatures-from-documents/delete-digital-signatures-from-documents.md" >}})

[Delete Signatures of the certain type]({{< ref "signature/net/developer-guide/basic-usage/delete-signatures-from-documents/delete-signatures-of-the-certain-type.md" >}})

[Generate Signatures preview]({{< ref "signature/net/developer-guide/basic-usage/generate-signatures-preview.md" >}})

[Advanced Signatures removal of the certain types]({{< ref "signature/net/developer-guide/advanced-usage/deleting/delete-signatures-of-the-certain-types.md" >}})

## Public API and Backward Incompatible Changes

#### Public class [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) was updated with 2 new overload Delete methods

Method [Delete](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/delete) expects enumeration [SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype).

Alternative overload method [Delete](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/delete) expects list of the [SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype) enumeration.

**New overload Delete methods of Signature class**

```csharp
    public class Signature
    {
        /// <summary>
        /// Deletes signatures of the certain type SignatureType from the document.
        /// Only signatures that were added by Sign method and marked as Signatures (BaseSignature.IsSignature property) will be removed.
        /// Following signature types are supported: Text, Image, Barcode, QR-Code, Digital
        /// </summary>
        public DeleteResult Delete(SignatureType signatureType);

        public DeleteResult Delete(List<SignatureType> signatureTypes);
   }
```

Following example demonstrates how to remove all digital signatures from the document.

**Deleting all Digital signatures from the document**

```csharp
using (Signature signature = new Signature("signed.pdfx"))
{                
    // deleting Digital signatures from the document
    DeleteResult result = signature.Delete(SignatureType.Digital);
    if (result.Succeeded.Count > 0)
    {
        Console.WriteLine("Following Digital signatures were deleted:");                    
        int number = 1;
        foreach (DigitalSignature temp in result.Succeeded)
        {
            Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}");
        }
    }
}
```

#### New public class [PreviewSignatureOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/previewsignatureoptions) was added to collect settings for signature preview

This class contains following properties

* unique signature identifier SignatureId.
* instance of the [SignOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/signoptions).
* enumeration of the preview image format

**New static method GenerateSignaturePreview of Signature class**

```csharp
    /// <summary>
    /// Represents signature preview options.
    /// </summary>
    public class PreviewSignatureOptions
    {
        /// <summary>
        /// Unique value to distinct the signature.
        /// Use SignatureId to identify the preview options.
        /// </summary>
        public string SignatureId { get; set; }

        /// <summary>
        /// Signature Options for generate preview.
        /// </summary>
        public SignOptions SignOptions { get; set; }

        /// <summary>
        /// Gets or sets preview images format.
        /// Default value is PNG
        /// </summary>
        public PreviewFormats PreviewFormat { get; set; } = PreviewFormats.PNG;

        /// <summary>
        /// Initializes PreviewSignatureOptions object.
        /// </summary>
        public PreviewSignatureOptions(SignOptions signOptions, CreateSignatureStream createSignatureStream);

        /// <summary>
        /// Initializes PreviewSignatureOptions object.
        /// </summary>
        public PreviewSignatureOptions(SignOptions signOptions, CreateSignatureStream createSignatureStream, ReleaseSignatureStream releaseSignatureStream);
        
        /// <summary>
        /// Signature preview supported formats
        /// </summary>
        public enum PreviewFormats
        {
            /// <summary>
            /// PNG
            /// </summary>
            PNG,
            /// <summary>
            /// JPEG
            /// </summary>
            JPEG,
            /// <summary>
            /// BMP
            /// </summary>
            BMP
        }        
    }

    /// <summary>
    /// Delegate that defines method to create output signature preview stream.
    /// </summary>
    public delegate Stream CreateSignatureStream(PreviewSignatureOptions previewOptions);

    /// <summary>
    /// Delegate that defines method to release output signature preview stream.
    /// </summary>
    public delegate void ReleaseSignatureStream(PreviewSignatureOptions previewOptions, Stream signatureStream);
}
```

#### Public class [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) was updated with static method to generate Signature preview with specified SignOptions

Static method [GenerateSignaturePreview](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/generatesignaturepreview) expects [PreviewSignatureOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/previewsignatureoptions) to generate signature preview and control creation and deletion signature image stream.

**New static method GenerateSignaturePreview of Signature class**

```csharp
    public class Signature
    {
        /// <summary>
        /// Generates Signature preview based on given SignOptions
        /// </summary>
        public static void GenerateSignaturePreview(PreviewSignatureOptions previewOptions);
   }
```

Following example demonstrates how to generate signature.

**Generate signature preview**

```csharp
public static void Run()
{    
    // no need Siganture object since method is static

    // create options
    QrCodeSignOptions signOptions = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property with Address object
        Data = new GroupDocs.Signature.Domain.Extensions.Address()
        {
            Street = "221B Baker Street",
            City = "London",
            State = "NW",
            ZIP = "NW16XE",
            Country = "England"
        },
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Center,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
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
