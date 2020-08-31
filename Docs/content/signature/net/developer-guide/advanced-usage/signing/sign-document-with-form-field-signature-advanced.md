---
id: sign-document-with-form-field-signature-advanced
url: signature/net/sign-document-with-form-field-signature-advanced
title: Sign document with Form Field signature - advanced
weight: 8
description: " This article explains how to sign document with Form field electronic signatures using advanced options with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) provides [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions) class to specify different options for Form Field signature. The Form Field signature is special document predefined input field control with unique name inside the document content that expects some input from user.

At the moment GroupDocs.Siganture supports creation of Form Field signatures for Pdf documents only.

The [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions) class contains one [FormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) object to put to the document.

Here are the list of different Form Field signature classes that could be set to [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions)

* [TextFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/checkboxformfieldsignature) - represents text input form field on document page.
* [CheckboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/checkboxformfieldsignature) - represents check box field on the document page.
* [ComboboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/comboboxformfieldsignature) - represents combo box field signature input with list of possible options on document page.
* [RadioButtonFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/radiobuttonformfieldsignature) - represents radio button signature on document page.
* [DigitalFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/digitalformfieldsignature) - represents digital signature input form on document page.  

Here are the steps to add Form Field signatures into document with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path as a constructor parameter.
* Instantiate the [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions) object according to your requirements.
* Instantiate one of the derived classes from [FormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) object. It could be [TextFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/checkboxformfieldsignature), [CheckboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/checkboxformfieldsignature) or [DigitalFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/digitalformfieldsignature).
* Set FormFieldSignOptions.[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions/properties/signature) property with created object.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of  [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass [FormFieldSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/formfieldsignoptions) to it.
* Analyze [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult) result to check newly created signatures if needed.

Following examples show different scenarios of using form fields on document page. These samples are supported for Pdf documents.

## Sign Pdf document with various Form Field signatures  

This example shows how to add various Form Field signature to document. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    List<SignOptions> listOptions = new List<SignOptions>();

    // instantiate text form field signature
    FormFieldSignature textSignature = new TextFormFieldSignature("tbData1", "Value-1");
    // instantiate options based on text form field signature
    FormFieldSignOptions optionsTextFF = new FormFieldSignOptions(textSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(10, 20, 0, 0),
        Height = 10,
        Width = 100
    };
    // instantiate text form field signature
    CheckboxFormFieldSignature chbSignature = new CheckboxFormFieldSignature("chbData1", true);
    // instantiate options based on text form field signature
    FormFieldSignOptions optionsTextCHB = new FormFieldSignOptions(chbSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Center,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(0, 0, 0, 0),
        Height = 10,
        Width = 100,
    };
    // instantiate text form field signature
    DigitalFormFieldSignature digSignature = new DigitalFormFieldSignature("dgData1");
    // instantiate options based on text form field signature
    FormFieldSignOptions optionsTextDIG = new FormFieldSignOptions(digSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(0, 50, 0, 0),
        Height = 10,
        Width = 100,
    };
    listOptions.Add(optionsTextFF);
    listOptions.Add(optionsTextCHB);
    listOptions.Add(optionsTextDIG);
    // sign document to file
    signature.Sign("signedSample.pdf", listOptions);

}
```

## Sign PDF document with Combobox Form Field signature  

This example shows how to add combo box Form Field signature to PDF document. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)  

```csharp
// initialize Signature instance
using (Signature signature = new Signature(filePath))
{
    // instantiate combo box form field signature
    List<string> items = new List<string>() { "Red", "Green", "Blue" };
    ComboboxFormFieldSignature combobox = new ComboboxFormFieldSignature("combo1", items, "Blue");
    // instantiate options based on text form field signature
    FormFieldSignOptions options = new FormFieldSignOptions(combobox)
    {
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(0, 0, 0, 0),
        Height = 100,
        Width = 300,
    };
    // sign document to file
    SignResult signResult = signature.Sign("sampleSigned.pdf", options);
}
```

## Sign PDF document with Radio buttons Form Field signature  

This example shows how to add radio buttons Form Field signature to PDF document. See [SignResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signresult)  

```csharp
// initialize Signature instance
using (Signature signature = new Signature(filePath))
{
    // instantiate radio-button form field signature
    List<string> radioOptions = new List<string>() { "One", "Two", "Three" };
    RadioButtonFormFieldSignature radioSignature = new RadioButtonFormFieldSignature("radioData1", radioOptions, "Two");
    // instantiate options based on text form field signature
    FormFieldSignOptions options = new FormFieldSignOptions(radioSignature)
    {
        HorizontalAlignment = HorizontalAlignment.Right,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = new Padding(0, 0, 0, 0),
        Height = 100,
        Width = 300,
    };
    // sign document to file
    SignResult signResult = signature.Sign("sampleSigned.pdf", options );
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
