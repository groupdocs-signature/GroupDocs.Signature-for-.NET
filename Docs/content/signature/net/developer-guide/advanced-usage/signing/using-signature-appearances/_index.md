---
id: using-signature-appearances
url: signature/net/using-signature-appearances
title: Using Signature Appearances
weight: 17
description: " This sections contains explanation about various electronic signature visual appearances on document page."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
GroupDocs.Signature contains several signature appearance classes that implements document oriented special signature representation.

Base signature options [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) contains property [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) that expects instance of the following classes

* [PdfTextAnnotationAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdftextannotationappearance) class implements for Pdf documents signature as annotation area. Note that [TextSignOptions.SignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) property must be set to [TextSignatureImplementation.Annotation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation)
* [PdfTextStickerAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdftextstickerappearance) class implements for Pdf documents signature as small sticker. Note that [TextSignOptions.SignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/signatureimplementation) property must be set to [TextSignatureImplementation.Sticker](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation)
* [ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance) class extends any image based with different image adjustments (like gray scale, contrast, brightness,  corrections, border etc)
* [DigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/digitalsignatureappearance) class extends for Word Processing and Spreadsheet documents digital signature appearances as page header information line
* [PdfDigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdfdigitalsignatureappearance) class extends for PDF documents digital signature appearances to adjust labels and color.

Following examples demonstrate using these classes
