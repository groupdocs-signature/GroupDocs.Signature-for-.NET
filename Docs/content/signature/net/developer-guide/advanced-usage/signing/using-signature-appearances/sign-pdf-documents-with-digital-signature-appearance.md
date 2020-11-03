---
id: sign-pdf-documents-with-digital-signature-appearance
url: signature/net/sign-pdf-documents-with-digital-signature-appearance
title: Sign Pdf documents with custom digital signature appearance
weight: 4
description: " This article explains how to customize PDF digital electronic signature on document page."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) contains classes that implements for Pdf document special signature appearances.

Base signature options [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) contains property [SignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) that could be assigned with the instance of following class

* [PdfDigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdfdigitalsignatureappearance) class implements properties to customize digital siganture appearance. 

Here are the steps to add digital signature to PDF document and customize signature appearance with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Compose object of [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) object with all required properties.
* Set  [DigitalSignOptions.Appearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions/properties/appearance) property with instance of [PdfDigitalSignatureAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/pdfdigitalsignatureappearance) class
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass created [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

## Sign Pdf document with customized appearance of digital signature

This example shows how to add electronic Digital signature to Pdf document with customized appearance.

```csharp
// initialize Signature instance
using (Signature signature = new Signature("sample.pdf"))
{
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        // certificate password
        Password = "1234567890",
        // digital certificate details
        Reason = "Approved",
        Location = "New York",

        // apply custom PDF signature appearance
        Appearance = new PdfDigitalSignatureAppearance()
        {
            // do now show contact details
            ContactInfoLabel = string.Empty,
            // simplify reason label
            ReasonLabel = "?",
            // change location label
            LocationLabel = "From",
            DigitalSignedLabel = "By",
            DateSignedAtLabel = "On",
            // apply custom appearance color
            Background = Color.Red
        },
        AllPages = true,
        Width = 160,
        Height = 80,
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.Red,
            DashStyle = DashStyle.DashDot,
            Weight = 2
        }
    };
    SignResult signResult = signature.Sign("signed.pdf", options);
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
