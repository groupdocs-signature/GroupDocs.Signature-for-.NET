---
id: basic-usage
url: signature/net/basic-usage
title: Basic usage
weight: 1
description: "Quick Start section about main features of GroupDocs.Signature API, describes how to sign documents with just couple lines of code."
keywords: GroupDocs.Signature Quick Start, GroupDocs.Signature .NET Basic Usage, GroupDocs.Signature Quick Start C#, GroupDocs.Signature Get Started
productName: GroupDocs.Signature for .NET
hideChildren: False
---  
[**GroupDocs Signature**](https://products.groupdocs.com/signature/net) library provides ability to manipulate with different electronic signature types such as Text, Image, Digital, Barcode, QR-code, Stamp, Form Field, Metadata. These e-signatures could be added to document, updated, deleted, verified or searched inside already signed documents. Our product also provides information about document type and structure - file type, size, pages count, etc. and generates document pages preview based on provided options.  

Here are main GroupDocs Signature API concepts:

* [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) is the main class that contains all required methods for manipulating with document e-signatures.
* Most part of methods expects different options to eSign document, verify and search electronic signatures inside document.
* [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class implements [IDisposable](https://docs.microsoft.com/en-us/dotnet/api/system.idisposable) interface to correctly release used resources - like safely closing document streams when all operations completed.

## Referencing required namespaces

The following code shows how to include required namespace for all code examples.

```csharp
using GroupDocs.Signature;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.Domain.Extensions;
```  

## Signature object definition

The following code shows most used code pattern to define [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object and call its methods.  

```csharp
// Sign document with text signature.
using (Signature signature = new Signature("sample.docx"))
{
   TextSignOptions textSignOptions = new TextSignOptions("John Smith");
   signature.Sign("SampleSigned.docx", textSignOptions);
}
```

Please check detailed examples of how to eSign documents, search and verify document signatures in the following guides:
