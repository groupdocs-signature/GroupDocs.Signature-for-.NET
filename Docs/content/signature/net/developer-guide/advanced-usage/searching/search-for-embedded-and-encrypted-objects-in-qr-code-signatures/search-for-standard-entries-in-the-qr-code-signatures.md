---
id: search-for-standard-entries-in-the-qr-code-signatures
url: signature/net/search-for-standard-entries-in-the-qr-code-signatures
title: Search for standard entries in the QR-Code signatures
weight: 5
description: "This article explains how to search for VCard, MeCard, Email, Address, EPC, SEPA, Event data in QR-code electronic signatures from previously signed documents with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides additional features when searching for[QrCode Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature)  that were previously added to document with embedded standard entry objects. Following standard entries are supported to search for and receive object back from Qr-Code

* [Email](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/email) that keeps in the QR-code standard email information with recipient, subject and body.
* [Address](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/address) with address information.
* [V-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/vcard) entry of visit card 3.0 specification with visited card details. More info could be found [here](https://en.wikipedia.org/wiki/VCard).
* [Me-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard) entry implements similar to V-Card contact details standard. More details could be found [here](https://en.wikipedia.org/wiki/MeCard_(QR_code)).
* [EPC](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/epc) implements standard of the European Payments Council guidelines define the content of a QR code that can be used to initiate [SEPA](https://en.wikipedia.org/wiki/SEPA_credit_transfer) credit transfer. More details could be found [here](https://en.wikipedia.org/wiki/EPC_QR_code).
* [Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event) entry implements event standard.  

## Search for QR-code signatures and extract Email object

This example shows how to search for QR-code signature and obtain [Email](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/email) object.  

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signed.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
    foreach (QrCodeSignature qrSignature in signatures)
    {
        Console.WriteLine("Found QRCode signature: {0} with text {1}", qrSignature.EncodeType.TypeName, qrSignature.Text);
        Email email = qrSignature.GetData<Email>();
        if (email != null)
        {
           Console.WriteLine($"Found Email signature: {email.Address} {email.Subject} {email.Body}");
        }
    }
}

```

## Search for QR-code signatures and extract Address object

This example shows how to search for QR-code signature and obtain [Address](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/address) object.  

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signed.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
    foreach (QrCodeSignature qrSignature in signatures)
    {
        Console.WriteLine("Found QRCode signature: {0} with text {1}", qrSignature.EncodeType.TypeName, qrSignature.Text);
        Address Address = qrSignature.GetData<Address>();
        if (Address != null)
        {
            Console.WriteLine($"Found Address signature: {Address.Country} {Address.State} {Address.City} {Address.ZIP}");
        }
     }
}

```

## Search for QR-code signatures and extract VCard object

This example shows how to obtain [V-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/vcard) entry from QR-Code electronic signatures.

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signed.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
 foreach (QrCodeSignature qrSignature in signatures)
    {
        Console.WriteLine("Found QRCode signature: {0} with text {1}", qrSignature.EncodeType.TypeName, qrSignature.Text);
        VCard vcard = qrSignature.GetData<VCard>();
        if (vcard != null)
        {
            Console.WriteLine("Found VCard signature: {0} {1} from {2}. Email: {3}", vcard.FirstName, vcard.LastName, vcard.Company, vcard.Email);
        }
    }
}
```

## Search for QR-code with MeCard object

This example shows how to obtain [Me-Card](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard) entry from QR-Code electronic signature.

```csharp
// instantiating the signature object
using (Signature signature = new Signature("sample.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
    try
    {
        foreach (QrCodeSignature qrSignature in signatures)
        {
            MeCard meCard = qrSignature.GetData<MeCard>();
            if (meCard != null)
            {
                Console.WriteLine("Found MeCard signature: {0} {1} from {2}. Email: {3}", meCard.Name, meCard.Reading, meCard.Note, meCard.Email);
            }
            else
            {
                Helper.WriteError($"MeCard object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
            }
        }
    }
    catch
    {
        Console.WriteError("\nThis example requires license to properly run. " +
                      "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                      "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                      "\nLear how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
    }
}
```

## Search for QR-code with EPC/SEPA object

This example shows how to obtain [EPC/SEPA](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/epc) entry from QR-Code electronic signatures.

```csharp
// instantiating the signature object
using (Signature signature = new Signature("sample.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
    try
    {
        foreach (QrCodeSignature qrSignature in signatures)
        {
            EPC payment = qrSignature.GetData<EPC>();
            if (payment != null)
            {
                Console.WriteLine($"Found EPC payment signature. Name {payment.Name}, IBAN {payment.IBAN}. Amount {payment.Amount}. Ref: {payment.Reference} / {payment.Remittance}");
            }
            else
            {
                Helper.WriteError($"EPC object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
            }
        }
    }
    catch
    {
        Console.WriteError("\nThis example requires license to properly run. " +
                      "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                      "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                      "\nLear how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
    }
}


```

## Search for QR-code with Event object

This example shows how to obtain [Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event) entry from QR-Code electronic signatures.

```csharp
// instantiating the signature object
using (Signature signature = new Signature("sample.pdf"))
{
    // search document
    List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
    try
    {
        foreach (QrCodeSignature qrSignature in signatures)
        {
            Event evnt = qrSignature.GetData<Event>();
            if (evnt != null)
            {
                Console.WriteLine($"Found Event signature: {evnt.Title}/{evnt.Description} at {evnt.Location}. Started @ {evnt.StartDate}");
            }
            else
            {
                Helper.WriteError($"Event object was not found. QRCode {qrSignature.EncodeType.TypeName} with text {qrSignature.Text}");
            }
        }
    }
    catch
    {
        Console.WriteError("\nThis example requires license to properly run. " +
                      "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                      "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                      "\nLear how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
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
