---
id: esign-document-with-metadata-signature
url: signature/net/esign-document-with-metadata-signature
title: eSign document with Metadata signature
weight: 5
description: "This article shows how to add Metadata signature to the each document type meta layer with different data types over with GroupDocs.Signature"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a Metadata?

A **metadata** is an information about resource or another data. From the document perspective **metadata** is a **hidden document layer** that contains dictionary based map with unique names and its values. Metadata name is a string based unique name, the value of metadata may contain various types like whole values, decimal values, array of data, strings etc. Each document type has custom metadata specification with predefined records and custom metadata rows.

Summary metadata may contain following information as electronic signature:

* Descriptive information about document signer, recipients, senders. Custom entries about title, subject, author, tools and keywords;
* Hidden document calculation, statistics, reference metadata about the contents and quality;
* Custom metadata that contains any object serialized as string and encoded into metadata value.

Notes below specify the differences between document types from metadata perspective:

* PDF document metadata layer supports default names to describe document summary information. Each metadata row is unique by name and its prefix that allows to customize metadata usage. The unique metadata identifier looks like **[tag:name](http://tagname)** pair with value assigned to it by default.
* Word processing documents (Microsoft office Words formats - DOC, DOCX, RTF, and Open Office format - ODT, OTT) contain predefined standard metadata layer and custom metadata collection to manipulate with.
* Spreadsheet documents (Microsoft Office Excel formats - XLSX, XLS and Open Office Spreadsheet OTS, ODS) keeps same standard and custom metadata collections.
* Presentation documents follow the same pattern as Word processing and Spreadsheet files.
* Images metadata distinct by whole number identifier not a name. Most identifiers range are registered to keep standard or custom image metadata information like creator information, source provider, geo location, etc

GroupDocs.Signature allows to store in metadata and extract back any user defined data object with further custom serialization and encryption. This mechanism allows to embed and transfer in the document hidden secure information over public sharing without any concerns about its hidden custom privacy information.

## How to eSign document with Metadata Signature

[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) class to specify different options for Metadata Signature. The electronic signature as metadata allows to keep any value type or user defined objects and obtain these data back over search methods.  
Different document formats implement metadata in its own way. Office document formats like Spreadsheet, Word Processing and Presentation provides metadata properties as *"name-value"* pairs. PDF documents provide additional attribute prefix. Image documents implement metadata properties as a list of *"identifier-value"* pairs. Each document format requires unique metadata name or identifier (for images).

The [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) class contains list of MetadataSignature objects to put or update in the document.  
Document metadata could keep big amount of data that provides an ability to keep serialized custom objects with additional encryption in there.

Here are the steps to add Metadata signatures into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) object according to your requirements.
* Instantiate one or several Metadata Signature ([MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature)) objects using class for each document type.
* for Spreadsheet document use [SpreadsheetMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/spreadsheetmetadatasignature) class;
* for Word Processing use [WordProcessingMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/wordprocessingmetadatasignature) class;
* for Presentation use [PresentationMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/presentationmetadatasignature) class;
* for PDF use [PdfMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/pdfmetadatasignature) class;
* for Images use [ImageMetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagemetadatasignature) class.
* Add initialized Metadata signatures objects to [Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions/properties/signatures) property of [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions);
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [MetadataSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/metadatasignoptions) to it.

Please refer to the specific examples provided below:
