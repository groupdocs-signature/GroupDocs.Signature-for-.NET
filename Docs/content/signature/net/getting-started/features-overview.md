---
id: features-overview
url: signature/net/features-overview
title: Features Overview
weight: 1
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## Electronic signature

**Electronic Signature** is an abstract concept that means data in electronic form associated with a certain document and expressing the consent of the signatory with the information contained in the document.
GroupDocs.Signature provides various electronic signature implementations as follows:

* Native text signatures as text stamps, text labels, annotation, stickers, watermarks with big amount of settings for visualization effects, opacity, colors, fonts, etc.;
* Text as image signatures with big scope of additional options to specify how text will look, colors, and extra image effects;
* Image signatures with options to specify extra image effects, rotation etc.;
* Digital signatures based on digital certificate files and ability to support digital signature by document type (PDF, Microsoft Word documents and Microsoft Excel spreadsheets);
* Barcode/QR-code signatures with variety of options;
* Generated stamp looking image signatures based on predefined lines with custom text, colors, width, etc;
* Metadata signatures to keep hidden signatures inside the document;
* Form-field signatures.

Signing documents in .NET with our electronic signature (eSign) API is easy, reliable and secure. Document signatures could be created and added to the document via collection of different options that specify all possible visualization features – color settings, alignment, font, margins, padding and different styling. Depending on the application requirements, you can sign documents with one or several signature types at the same time.

## Search for signatures

Obtain signatures list applied to document:

* Text signatures information from all supported formats;
* Image signatures information;
* Digital signatures information from PDF, Microsoft Word documents and Microsoft Excel spreadsheets;
* Barcode/QR-code signatures information from all supported formats;
* Metadata signatures information from all supported formats;
* Form-field signatures information from all supported formats.

## Verify signatures

Determine whether document contains signatures that meet the specified criteria.
Supported signature types are:

* Text signatures;
* Digital signatures;
* Barcode/QR-code signatures;
* Metadata signatures;
* Form-field signatures.

## Document information extraction

GroupDocs.Signature allows to obtain basic information about source document - file type, size, pages count, page height and width etc.  
This may be quite useful for generating document preview and precise signature placing inside document.

## Preview document pages

Document preview feature allows to generate image representations of document pages. This may be helpful for better understanding about document content and its structure,  
set proper signature position inside document, apply appropriate signature styling etc. Preview can be generated for all document pages (by default) or for specific page numbers or page range.

Supported image formats for document preview are:

* PNG;
* JPG;
* BMP.
