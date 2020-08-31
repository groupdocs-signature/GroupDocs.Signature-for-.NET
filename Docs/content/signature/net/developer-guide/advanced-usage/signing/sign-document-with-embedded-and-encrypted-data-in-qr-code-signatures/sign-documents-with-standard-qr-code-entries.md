---
id: sign-documents-with-standard-qr-code-entries
url: signature/net/sign-documents-with-standard-qr-code-entries
title: Sign documents with standard QR-code entries
weight: 5
description: "This article explains how to create QR-code electronic signature with standard encoded entries like Address, Email, V-Card, MeCard, EPC/SEPA, Event etc"
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides ability to embed into QR-code signature standard entries like email, contact v-card, address etc. This feature supports standard QR-code representation of entries. At this moment following standard QR-code entries are supported

* [Email](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/email) entry that allows to specify in QR-code standard email information with recipient, subject and body.
* [Address](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/address) entry contains address information.
* [V-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/vcard) entry implements standard of visit card 3.0 specification. More details could be found [here](https://en.wikipedia.org/wiki/VCard).
* [Me-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard) entry implements similar to V-Card contact details standard. More details could be found [here](https://en.wikipedia.org/wiki/MeCard_(QR_code)).
* [EPC](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/epc) implements standard of the European Payments Council guidelines define the content of a QR code that can be used to initiate [SEPA](https://en.wikipedia.org/wiki/SEPA_credit_transfer) credit transfer. More details could be found [here](https://en.wikipedia.org/wiki/EPC_QR_code).
* [Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event) entry implements event standard.

Here are the steps to embed standard entry into QR-code with GroupDocs.Signature:  

* Create new instance of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Create new instance of one of standard entries class.
* Create one or several objects of [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) object with [Data](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/data) value assigned with initialized standard object before.
* Instantiate the  [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions)  object according to your requirements and custom object to [Data](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions/properties/data) property.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)  class instance and pass [QrCodeSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/qrcodesignoptions) to it.

## Sign PDF with email QR-code object

This example shows how to esign PDF with Email QR-code object.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create Email object
    var email = new Email()
    {
        Address = "sherlock@holmes.com",
        Subject = "Very important e-mail",
        Body = "Hello, Watson. Reach me ASAP!"
    };

    // create options
    var options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = email,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };

    // sign document to file
    signature.Sign("output.pdf", options);
}


```

## Sign PDF with Address inside the QR-Code image

This example shows how to esign PDF with address inside the QR-code image.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create Address object
    var address = new Address()
    {
        Street = "221B Baker Street",
        City = "London",
        State = "NW",
        ZIP = "NW16XE",
        Country = "England"
    };
    // create options
    var options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = address,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Margin = new Padding(10),
        Width = 100,
        Height = 100,
    };
    // sign document to file
    signature.Sign("output.pdf", options);
}
```

## Sign PDF with V-Card (VCF) information in the QR-Code image

This example shows how to esign PDF with V-Card inside the QR-code image.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create VCard object
    var vCard = new VCard()
    {
        FirstName = "Sherlock",
        MidddleName = "Jay",
        LastName = "Holmes",
        Initials = "Mr.",
        Company = "Watson Inc.",
        JobTitle = "Detective",
        HomePhone = "0333 003 3577",
        WorkPhone = "0333 003 3512",
        Email = "watson@sherlockholmes.com",
        Url = "http://sherlockholmes.com/",
        BirthDay = new DateTime(1854, 1, 6),
        HomeAddress = new Address()
        {
            Street = "221B Baker Street",
            City = "London",
            State = "NW",
            ZIP = "NW16XE",
            Country = "England"
        }
    };
    // create options
    var options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = vCard,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };

    // sign document to file
    signature.Sign("output.pdf", options);
}
```

## Sign PDF with Me-Card information in the QR-Code image

This example shows how to esign PDF with Me-Card inside the QR-code image.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create MeCard object
    MeCard card = new MeCard()
    {
        Name = "Sherlock",
        Nickname = "Jay",
        Reading = "Holmes",
        Note = "Base Detective",
        Phone = "0333 003 3577",
        AltPhone = "0333 003 3512",
        Email = "watson@sherlockholmes.com",
        Url = "http://sherlockholmes.com/",
        BirthDay = new DateTime(1854, 1, 6),
        Address = new Address()
        {
            Street = "221B Baker Street",
            City = "London",
            State = "NW",
            ZIP = "NW16XE",
            Country = "England"
        }
    };
    // create options
    QrCodeSignOptions options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = card,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };

    // sign document to file
    signature.Sign("output.pdf", options);
}
```

## Sign PDF with EPC payment in the QR-Code image

This example shows how to esign PDF with EPC / SEPA payment inside the QR-code image.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
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
    // create options
    QrCodeSignOptions options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = epc,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };
    // sign document to file
    signature.Sign("output.pdf", options);
}
```

## Sign PDF with Event information in the QR-Code image

This example shows how to esign PDF with event data inside the QR-code image.

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create Event object
    Event evnt = new Event()
    {
        Title = "GTM(9-00)",
        Description = "General Team Meeting",
        Location = "Conference-Room",
        StartDate = DateTime.Now.Date.AddDays(1).AddHours(9),
        EndDate = DateTime.Now.Date.AddDays(1).AddHours(9).AddMinutes(30)
    };
    // create options
    QrCodeSignOptions options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        // setup Data property to Address instance
        Data = evnt,
        // set right bottom corner
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Bottom,
        Width = 100,
        Height = 100,
        Margin = new Padding(10)
    };
    // sign document to file
    signature.Sign("output.pdf", options);
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
