---
id: esign-document-with-qr-code-signature
url: signature/net/esign-document-with-qr-code-signature
title: eSign document with QR-code signature
weight: 6
description: "This article explains how sign documents with electronic signature as QR-code on document page with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
## What is a QR-code?

QR-code (or Quick Response code) is a sort of two-dimensional [barcode]({{< ref "signature/net/developer-guide/basic-usage/electronic-signature-types/esign-document-with-barcode-signature.md" >}}) that consists of black squares arranged in a square grid on a white background. QR-code can be read by smartphone camera or specialized devices that are dedicated to QR reading - hand-held scanners, handy terminals, fixed scanners that are used after placing it on a desktop, or embedding it in other devices. Usually QR-codes contain data that points to a website or application, emails, or phone numbers, product identifiers, or trackers. Therefore QR-code application scope extends general marketing and item identification to document management.

![QR-code](signature/net/images/esign-document-with-qr-code-signature.png)

## How to eSign document with QR-Code signature

[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) allows to eSign documents with QR-codes of various types that is listed in a table below. 

| |Aztec code | DataMatrix code | GS1 DataMatrix  | GS1 QR code  | QR |
| --- | --- | --- | --- | --- | --- |
| **Application** | * transport and ticketing;<br> * in airline industry for electronic boarding passes;<br> * in rail for tickets sold online and printed out by customers or displayed on mobile phone screens. Code is scanned by a handheld scanner by on-train staff or at the turnstile to validate the ticket.<br> * medicine - patient identification wristbands and labels for unit-of-use medications etc. | * printed media such as labels and letters;<br> * industrial engineering purposes - marking components etc;<br>  * food industry - to prevent food products being packaged and dated incorrectly; | Used in<br> * Healthcare;<br> * Government;<br> * Industrial.<br> Encodes item additional information, such as:<br> * weight;<br> * expiration date;<br> * batch number;<br> * date of manufacture;<br> * etc.| Used in marketing to encode additional item information on the package | Widely used in automotive industry and mobile applications. Useful for encoding large amount of data characters and specific URLs.| 
| **Length** | 3067 alphanumeric,<br> 3832 numeric,<br> 1914 bytes | 2335 alphanumeric,<br> 3116 numeric | 2335 alphanumeric,<br> 3116 numeric,<br> 1556 bytes | 7089 alphanumeric,<br> 4296 numeric,<br> 2953 bytes | 4296 alphanumeric,<br> 7089 numeric,<br> 2953 bytes |
| **Example** | ![Aztec](signature/net/images/esign-document-with-qr-code-signature_1.png) | ![DataMatrix](signature/net/images/esign-document-with-qr-code-signature_2.png) | ![GS1 DataMatrix](signature/net/images/esign-document-with-qr-code-signature_3.png) | ![GS1 QR code](signature/net/images/esign-document-with-qr-code-signature_4.png) | ![QR](signature/net/images/esign-document-with-qr-code-signature_5.png)

While adding QR-code electronic signature to document GroupDocs.Signature the main settings are text to be encoded and QR-code [type](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodetypes/fields/index) which should be specified via [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) class.  

Here are the steps to eSign document with QR-code signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.

* Instantiate the [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) object according to your requirements and specify [EncodeType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/encodetype) and [Text](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/textsignoptions/properties/text) properties.
  
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) to it.

The code snippet below demonstrates how to sign PDF document with QR-code signature.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create QRCode option with predefined QRCode text
    QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
    {
        // setup QRCode encoding type
        EncodeType = QrCodeTypes.QR,
        // set signature position
        Left = 100,
        Top = 100
    };
    signature.Sign("SampleSigned.pdf", options);
}
```

### Advanced Usage Topics

To learn more about document eSign features, please refer to the [advanced usage section]({{< ref "signature/net/developer-guide/advanced-usage/_index.md" >}}).

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
