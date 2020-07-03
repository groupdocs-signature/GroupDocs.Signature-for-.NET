---
id: groupdocs-signature-for-net-20-6-release-notes
url: signature/net/groupdocs-signature-for-net-20-6-release-notes
title: GroupDocs.Signature for .NET 20.6 Release Notes
weight: 18
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.6{{< /alert >}}

## Major Features

There are about ten new features, improvements and fixes in this release. New features implement ability to add native Word processing Watermark signature, obtain with document common information the list of electronic digital signatures in it. Also in this release we implemented additional encryption algorithm for Net Standard platform AES, fixed few bugs and issues. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.6:

*   Added ability to add native Watermark signature for Word Processing documents.
*   Implemented AES encryption algorithm for Net Standard platform
*   Improved modification of Watermark object for Word processing document files
*   Introduced ability to obtain information about electronic digital signatures in the document over one method to retrieve all document information
*   Improved validation for various text implementation signatures
*   Added ability to rotate signature on the image document with free angle
*   Fixed few bugs with processing QR-code signatures  
      
Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2881 | Implement native Watermark signature for Word Processing documents | Feature |
| SIGNATURENET-2879 | Implement AES encryption algorithm for Net Standard platform | Feature |
| SIGNATURENET-2878 | Implement modification of native Watermark sugantures for Word processing documents | Feature |
| SIGNATURENET-2637 | Implement ability to keep digital signature meta info layer for Document Info | Feature |
| SIGNATURENET-2443 | Improve Validation for unsupported text implementation scenarios | Improvement |
| SIGNATURENET-2315 | Update implementation of signature rotation for Image documents | Improvement |
| SIGNATURENET-2906 | Unexpected recognition of QR-code on some images | Bug |
| SIGNATURENET-2882 | Exception on Word Processing document with obtaining watermark properties. | Bug |
| SIGNATURENET-2837 | Document content is changed after saving for OTT files | Bug |

## Public Developer Guide examples changes
Following topics from Developer Guide were added
*   [Sign documents with standard encryption of QR-code]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-embedded-and-encrypted-data-in-qr-code-signatures/sign-documents-with-standard-encryption-for-qr-code.md" >}})

## Public API and Backward Incompatible Changes

### Public enum [SymmetricAlgorithmType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain.extensions/symmetricalgorithmtype) was updated with new enumeration value for Net Standard 2.0.

Public class **[SymmetricAlgorithmType](https://apireference.groupdocs.com/signature/net/groupdocs.signature.domain.extensions/symmetricalgorithmtype)** was updated with new enumeration .

*   new enumeration options **AES** was added to specify AES encryption algorithm..

**New properties of TextSignOptions**

```csharp
    public enum SymmetricAlgorithmType
    {
         . . .
        /// <summary>
        /// Represents AES encryption algorithm.
        /// </summary>
        AES
    }
```

Following example demonstrates how to sign document with QR-code signature and encrypt EPC object into signature.

**Sign document with AES encrypted EPC object data**

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create EPC object
    EPC epc = new EPC()
    {
        Name = "Sherlock",
        BIC = "MrSherlockH",
        IBAN = "BE72000000001616",
        Amount = 123456.78D,
        Code = "SHRL",
        Reference = "Private service",
        Information = "Thanks for help"
    };
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.AES, key, salt);
    // create options
    QrCodeSignOptions options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup encryption
        DataEncryption = encryption,
        // setup Data property to EPC instance
        Data = epc,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };
    // sign document to file
    SignResult result = signature.Sign(outputFilePath, options);
}
```

### Public class [TextSignOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions) was updated with new property for document specific signatures. Supported only for text watermarks for WordProcessing documents yet.

Public class **[TextSignOptions](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions)** was updated with new property.

*   new property **[Native](https://apireference.groupdocs.com/signature/net/groupdocs.signature.options/textsignoptions/properties/native)** of type **bool** was added to specify document specific signatures implementations. Now it influences only text watermarks for WordProcessing, but it's application area could be widened soon.

**New properties of TextSignOptions**

```csharp
    /// <summary>
    /// Represents the Text signature options.
    /// </summary>
    /// <remarks>
    public class TextSignOptions
    {
        /// <summary>
        /// Gets or sets the native attribute. If it is set document specific signatures could be used.
        /// Native text watermark for WordProcessing documents is different than regular, for example.
        /// </summary>
        public bool Native { get; set; }
   }
```

Following example demonstrates how to sign document with document specific signatures implementation of text watermark.

**Sign WordProcessing document with native Watermark**

```csharp
using (Signature signature = new Signature("sample.docx"))
{
    TextSignOptions options = new TextSignOptions("John Smith Watermark")
    {
        // set attribute of using document specific implementation
        Native = true,
        //Watermark will be the same for each page
        SignatureImplementation = TextSignatureImplementation.Watermark,
        // set text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 72, FamilyName = "Comic Sans MS" },
        // set rotation
        // If rotation angle is not 0 it will be converted to 315.
        RotationAngle = 45,
        // set transparency
        // If transparency is not 0 it will be converted to 50%.
        Transparency = 0.9
    };
                
    // sign document to file
    SignResult signResult = signature.Sign(outputFilePath, options);
    Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
    Console.WriteLine("\nList of newly created signatures:");
    int number = 1;
    foreach (TextSignature temp in signResult.Succeeded)
    {
        Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, isNative: {temp.Native}");
    }
}
```
