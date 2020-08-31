---
id: obtain-document-form-fields-and-signatures-information
url: signature/net/obtain-document-form-fields-and-signatures-information
title: Obtain document form fields and signatures information
weight: 1
description: "This article shows how to get information about electronic signatures in the document and its form fields with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) allows to get extended document information which includes:

* list of all existing [Form Field Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) in the document. This list will contain all Form Fields elements in the document no matter if these components were added by GroupDocs Signature or any other third party software. Please be aware only Pdf and Word processing documents support these elements.
* list of [Text Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;
* list of [Image Signatures](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagesignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;
* list of [DigitalSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/digitalsignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;
* list of [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;
* list of [QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;
* list of [FormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) previously added to document over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method or updated by [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update/index) method;

## Analyze document form fields and signatures information

The following code snippet demonstrates how to obtain information about document form fields, signatures and analyze them.

```csharp
using (Signature signature = new Signature("sampleSigned.pdf"))
{
    IDocumentInfo documentInfo = signature.GetDocumentInfo();
    Console.WriteLine($"Document properties {Path.GetFileName(filePath)}:");
    Console.WriteLine($" - format : {documentInfo.FileType.FileFormat}");
    Console.WriteLine($" - extension : {documentInfo.FileType.Extension}");
    Console.WriteLine($" - size : {documentInfo.Size}");
    Console.WriteLine($" - page count : {documentInfo.PageCount}");
    foreach (PageInfo pageInfo in documentInfo.Pages)
    {
        Console.WriteLine($" - page-{pageInfo.PageNumber} Width {pageInfo.Width}, Height {pageInfo.Height}");
    }
    // display document Form Field signatures information
    Console.WriteLine($"Document Form Fields information: count = {documentInfo.FormFields.Count}");
    foreach (FormFieldSignature formField in documentInfo.FormFields)
    {
        Console.WriteLine($" - type #{formField.Type}: Name: {formField.Name} Value: {formField.Value}");
    }
    // display document Text signatures information
    Console.WriteLine($"Document Text signatures : {documentInfo.TextSignatures.Count}");
    foreach (TextSignature textSignature in documentInfo.TextSignatures)
    {
        Console.WriteLine($" - #{textSignature.SignatureId}: Text: {textSignature.Text}");
    }
    // display document Image signatures information
    Console.WriteLine($"Document Image signatures : {documentInfo.ImageSignatures.Count}");
    foreach (ImageSignature imageSignature in documentInfo.ImageSignatures)
    {
        Console.WriteLine($" - #{imageSignature.SignatureId}: Size: {imageSignature.Size} bytes, Format: {imageSignature.Format}.");
    }
    // display document Digital signatures information
    Console.WriteLine($"Document Digital signatures : {documentInfo.DigitalSignatures.Count}");
    foreach (DigitalSignature digitalSignature in documentInfo.DigitalSignatures)
    {
        Console.WriteLine($" - #{digitalSignature.SignatureId}.");
    }
    // display document Barcode signatures information
    Console.WriteLine($"Document Barcode signatures : {documentInfo.BarcodeSignatures.Count}");
    foreach (BarcodeSignature barcodeSignature in documentInfo.BarcodeSignatures)
    {
        Console.WriteLine($" - #{barcodeSignature.SignatureId}: Type: {barcodeSignature.EncodeType?.TypeName}. Text: {barcodeSignature.Text}");
    }
    // display document QrCode signatures information
    Console.WriteLine($"Document QR-Code signatures : {documentInfo.QrCodeSignatures.Count}");
    foreach (QrCodeSignature qrCodeSignature in documentInfo.QrCodeSignatures)
    {
        Console.WriteLine($" - #{qrCodeSignature.SignatureId}: Type: {qrCodeSignature.EncodeType?.TypeName}. Text: {qrCodeSignature.Text}");
    }
    // display document Form Fields signatures information
    Console.WriteLine($"Document Form Fields signatures : {documentInfo.FormFieldSignatures.Count}");
    foreach (FormFieldSignature formFieldSignature in documentInfo.FormFields)
    {
        Console.WriteLine($" - #{formFieldSignature.SignatureId} Type {formFieldSignature.Type}: Name: {formFieldSignature.Name} Value: {formFieldSignature.Value}");
    }
}
```

## More resources

### GitHub Examples

You may easily run the code above and see the feature in action in our GitHub examples:

* [GroupDocs.Signature for .NET examples, plugins, and showcase](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET)
* [GroupDocs.Signature for Java examples, plugins, and showcase](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java)
* [Document Signature for .NET MVC UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC)
* [Document Signature for .NET App WebForms UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms)
* [Document Signature for Java App Dropwizard UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Dropwizard)
* [Document Signature for Java Spring UI Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Spring)

### Free Online App

Along with full-featured .NET library we provide simple, but powerful free Apps.

You are welcome to eSign PDF, Word, Excel, PowerPoint documents with free to use online **[GroupDocs Signature App](https://products.groupdocs.app/signature)**.
