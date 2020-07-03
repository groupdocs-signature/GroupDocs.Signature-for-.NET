---
id: groupdocs-signature-for-net-20-3-release-notes
url: signature/net/groupdocs-signature-for-net-20-3-release-notes
title: GroupDocs.Signature for .NET 20.3 Release Notes
weight: 30
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.3{{< /alert >}}

## Major Features

This release contains significant features with supporting additional Form Fields signatures, implementation of popular standard QR-code entities, important fixes and improvements. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.3:

*   Implemented Me-Card and Event QR-code entities support.
*   Implemented EPC/SEPA payment QR-Code standard
*   Added ability to create Combobox Form Field signatures
*   Involved support of Radio button form fields
*   Implemented additional V-Card properties support and different versioning
*   Added ability to specify Image Border with extra appearance settings
*   Fixed few bugs form field signatures coordinates saving
*   Updated text signature implementation naming  
      
    

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2671 |  Implement EPC/SEPA standard QR-code entry  | Feature |
| SIGNATURENET-2670 |  Implement MeCard contact details standard QR-code entry | Feature |
| SIGNATURENET-2669 |  Implement Event standard QR-code entry  | Feature |
| SIGNATURENET-2644 | Implement ability to add Radio button Form Field signature to PDF Documents | Feature |
| SIGNATURENET-2639 | Implement ability to add Combobox Form Field signature to PDF Documents | Feature |
| SIGNATURENET-2199 | Implement Border settings for Image signature options | Feature |
| /SIGNATURENET-2680 | Implement QR-Code VCard entry with CELL type phone support | Improvement |
| SIGNATURENET-2641 | Implement saving Form Fields signature coordinates and size to metadata layer | Improvement |
| SIGNATURENET-2602 | Update Signature Implementation enum with value Native against Stamp | Improvement |
| SIGNATURENET-2592 | Improve saving jpg images for Lossless formats | Improvement |
| SIGNATURENET-2200 | Implement Transparent feature for Background for Stamp signatures | Improvement |
| SIGNATURENET-2674 | SearchResult contains PDF FormField signatures with wrong Top property | Bug |
| SIGNATURENET-2590 | Inappropriate encoding result for processing Barcode of Code32 encode type | Bug |
| SIGNATURENET-2588 | Output Jpeg images are corrupted after saving | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were updated:

[Sign document with Form Field signature (advanced)]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-form-field-signature-advanced.md" >}})

[Sign documents with standard QR-code entries]({{< ref "signature/net/developer-guide/advanced-usage/signing/sign-document-with-embedded-and-encrypted-data-in-qr-code-signatures/sign-documents-with-standard-qr-code-entries.md" >}})

## Public API and Backward Incompatible Changes

Public class [ComboboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/comboboxformfieldsignature) was updated with new properties and ability to add this form field type to Pdf documents.

Public class **[ComboboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/comboboxformfieldsignature)** was updated with new properties.

*   property **Selected** as string returns the value which is selected at combo-box field;
*   property **Items** as list of strings keeps list of values at combo-box field;
*   new public constructors with various arguments was added. It provides possibility to set combo-box field signature name, list of values and selected value.

**New properties of ComboboxFormFieldSignature**

```csharp
/// <summary>
/// Contains combo-box input form field signature properties.
/// </summary>
public sealed class ComboboxFormFieldSignature : FormFieldSignature
{
    /// <summary>
    /// Get or set selected value.
    /// </summary>
    public string Selected { get; set; }

    /// <summary>
    /// Get or set combo-box options list.
    /// </summary>
    public List<string> Items { get; set; }

    /// <summary>
    /// Creates ComboboxFormFieldSignature with predefined name.
    /// </summary>
    /// <param name="name">Name of form field object.</param>
    public ComboboxFormFieldSignature(string name);
    
    /// <summary>
    /// Creates ComboboxFormFieldSignature with predefined name and options list.
    /// </summary>
    /// <param name="name">Name of form field object.</param>
    /// <param name="items">Values of combo-box list.</param>
    public ComboboxFormFieldSignature(string name, List<string> items);

    /// <summary>
    /// Creates ComboboxFormFieldSignature with predefined name, options list and selected value.
    /// </summary>
    /// <param name="name">Name of form field object.</param>
    /// <param name="items">Values of combo-box list.</param>
    /// <param name="selected">Selected value.</param>
    public ComboboxFormFieldSignature(string name, List<string> items, object selected);
}
```

Following example demonstrates using **[Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/6)** method with **[ComboboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/comboboxformfieldsignature)**

**Sign document with Combobox Form field siganture**

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

#### Public class [EPC](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/epc) was added to represent European Payments Council Quick Response Code to be encoded to QR-Code embedded objects.

Public class **[EPC](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/epc)** was added to represent European Payments Council Quick Response Code to be encoded to QR-Code embedded objects.

**New EFC class properties**

```csharp
/// <summary>
/// Represents European Payments Council Quick Response Code.
/// </summary>
public sealed class EPC
{
    /// <summary>
    /// Gets or sets Beneficiary's Name. Maximum length is 70 characters.
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Gets or sets Beneficiary's BIC with up to 11 characters length.
    /// </summary>
    public string BIC { get; set; }
    /// <summary>
    /// Gets or sets Beneficiary's Account (IBAN). The IBAN consists of up to 34 alphanumeric characters.
    /// </summary>
    public string IBAN { get; set; }
    /// <summary>
    /// Gets or sets amount.
    /// </summary>
    public double Amount { get; set; }
    /// <summary>
    /// Gets or sets Business Code up to 4 characters.
    /// </summary>
    public string Code { get; set; }
    /// <summary>
    /// Gets or sets Payment Reference (maximum 35 characters). This field and the Remittance Information field are mutually exclusive.
    /// </summary>
    public string Reference { get; set; }
    /// <summary>
    /// Gets or sets Remittance Information (maximum 140 characters). This field and the Payment Reference field are mutually exclusive.
    /// </summary>
    public string Remittance { get; set; }
    
    /// <summary>
    /// Gets or sets hint information. Maximum 70 characters.
    /// </summary>
    public string Information { get; set; }
    /// <summary>
    /// EPC / SEPA QR-Code version implementation. By default this value set to 002.
    /// </summary>
    public string Version { get; }
    /// <summary>
    /// EPC / SEPA QR-Code char set implementation. By default this value set to 1
    /// </summary>
    public string Charset { get; }
    /// <summary>
    /// EPC / SEPA QR-Code identification. By default this value set to SCT
    /// </summary>
    public string Identification { get; }
    /// <summary>
    /// Instantiates new EPC object.
    /// </summary>
    public EPC();
}
```

Following example demonstrates using **[Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/6)** method to esign PDF document with embedded **[EFC](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/efc)** object into the QR-code

**eSign Pdf with embedded EPC QR-Code**

```csharp
 // initialize Signature instance
 using (Signature signature = new Signature("sample.pdf")){              

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
        Width = 200,
        Height = 200,
        // setup Data property to MeCard instance
        Data = epc
    };
    // sign document to file
    signature.Sign("output.pdf", options);
}
```

#### Public class [Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event) was added to represent Event standard entry as QR-Code embedded objects.

Public class **[Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event)** was added to represent Event standard entry as QR-Code embedded objects.

**New public class Event**

```csharp
    /// <summary>
    /// Represents standard QR-Code Event details.
    /// </summary>
    public sealed class Event
    {
        /// <summary>
        ///Gets or sets event title.
        /// </summary>
        public string Title { get;set; }

        /// <summary>
        ///Gets or sets description.
        /// </summary>
        public string Description { get;set; }

        /// <summary>
        ///Gets or sets event location.
        /// </summary>
        public string Location { get;set; }

        /// <summary>
        /// Gets or sets event start date and time.
        /// </summary>
        public DateTime StartDate { get;set; }

        /// <summary>
        /// Gets or sets event end date and time.
        /// </summary>
        public DateTime? EndDate { get;set; }

        /// <summary>
        /// Creates Event instance with default values.
        /// </summary>
        public Event();        
    }
```

Following example demonstrates using **[Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/6)** method to esign PDF document with embedded **[Event](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/event)** object into the QR-code

**eSign Pdf with embedded Event QR-Code**

```csharp
 // initialize Signature instance
using (Signature signature = new Signature("sample.pdf")){              
{
    // create Event object
    Event Event = new Event()
    {
        Title = "GTM(9-00)",
        Description = "General Team Meeting",
        Location = "Conference-Room",
        StartDate = DateTime.Now.Date.AddDays(1).AddHours(9),
        EndDate = DateTime.Now.Date.AddDays(1).AddHours(9).AddMinutes(30)
    };
    // create options
    var options = new QrCodeSignOptions
    {
        EncodeType = QrCodeTypes.QR,
        Width = 200,
        Height = 200,
        // setup Data property to MeCard instance
        Data = Event
    };
    // sign document to file
    signature.Sign("output.pdf", options);
}
```

#### Public class [MeCard](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard) was added to represent standard contact details to be encoded to QR-Code embedded object.

Public class **[MeCard](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard)** was added to represent standard contact details to be encoded to QR-Code embedded object.

**MeCard properties**

```csharp
    /// <summary>
    /// Represents MeCard standard contact details.
    /// </summary>
    public sealed class MeCard
    {
        /// <summary>
        ///Gets or sets contact Name.
        /// </summary>
        public string Name { get;set; }

        /// <summary>
        ///Gets or sets contact Nickname.
        /// </summary>
        public string Nickname { get;set; }

        /// <summary>
        /// Gets or sets phone number.
        /// </summary>
        public string Phone { get;set; }

        /// <summary>
        /// Gets or sets alternative phone number.
        /// </summary>
        public string AltPhone { get;set; }

        /// <summary>
        /// Gets or sets reading of name.
        /// </summary>
        public string Reading { get;set; }

        /// <summary>
        /// Gets or sets contact email.
        /// </summary>
        public string Email { get;set; }

        /// <summary>
        ///Gets or sets Note (Company) of contact.
        /// </summary>
        public string Note { get;set; }

        /// <summary>
        /// Gets or sets URL.
        /// </summary>
        public string Url { get;set; }

        /// <summary>
        /// Gets or sets Home Address properties. This property is not initialized by default.
        /// </summary>
        public Address Address { get;set; }

        /// <summary>
        /// Gets or sets contact birthday.
        /// </summary>
        public DateTime? BirthDay{ get;set; }

        /// <summary>
        /// Creates MeCard instance with default values.
        /// </summary>
        public MeCard()        
    }
```

Following example demonstrates using **[Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/6)** method to esign PDF document with embedded **[MeCard](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/mecard)** object into the QR-code

**eSign Pdf with embedded MeCard QR-Code**

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create MeCard object
    MeCard vCard = new MeCard()
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

#### Public class [VCard](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/vcard) was updated with new property CellPhone.

Public class **[VCard](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/vcard)** was update with new string property CellPhone to get or set cellular phone number for contact details.

**New public class DeleteResult**

```csharp
/// <summary>
/// Represents VCard standard contact details.
/// </summary>
public class VCard
{
        /// <summary>
        /// Gets or sets cell phone number.
        /// </summary>
        public string CellPhone {get;set;}
 }
```

#### Public enumeration [FormFieldType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldtype) was updated with new option **Radio**.

Enumeration **[FormFieldType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldtype)** was updated with new options Radio to specify Radio button type for signature [RadiobuttonFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/radiobuttonformfieldsignature).

**New public class DeleteResult**

```csharp
/// <summary>
/// Specifies Form Field type.
/// </summary>
public enum FormFieldType
{
    /// <summary>
    /// Radio-button
    /// </summary>
    Radio
}


```

#### Public class [RadiobuttonFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/radiobuttonformfieldsignature) was added to implement radio buttons form field type for Pdf documents.

Public class **[RadioButtonFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/radiobuttonformfieldsignature)**

**RadiobuttonFormFieldSignature properties**

```csharp
    /// <summary>
    /// Contains radio-button input form field signature properties.
    /// </summary>
    public sealed class RadioButtonFormFieldSignature
    {
        /// <summary>
        /// Contains selected value.
        /// </summary>
        public string Selected { get; set; }

        /// <summary>
        /// Get or set Radio buttons options list.
        /// </summary>
        public List<string> Items { get; set; }

        /// <summary>
        /// Creates RadioButtonFieldSignature with predefined name.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        public RadioButtonFormFieldSignature(string name);

        /// <summary>
        /// Creates RadioButtonFieldSignature with predefined name and items list.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        /// <param name="items">Values of radio-button list.</param>
        public RadioButtonFormFieldSignature(string name, List<string> items);

        /// <summary>
        /// Creates RadioButtonFieldSignature with predefined name, items list and selected value.
        /// </summary>
        /// <param name="name">Name of form field object.</param>
        /// <param name="items">Values of radio-button list.</param>
        /// <param name="selected">Selected value.</param>
        public RadioButtonFormFieldSignature(string name, List<string> items, object selected);
    }
```

Following example demonstrates using **[Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/6)** method with **[RadioButtonFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/radiobuttonformfieldsignature)**

**eSign PDF documen with Radio button form field**

```csharp
// initialize Signature instance
using (Signature signature = new Signature("sample.pdf"))
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
    SignResult signResult = signature.Sign("output.pdf", options );
}

```

#### Public enumeration [TextSignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation) was updated with obsolete and new options.

Public enumeration **[TextSignatureImplementation](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignatureimplementation)** was  updated with marked as obsolete existing option **Stamp** and new option **Native**

**TextSignatureImplementation options**

```csharp
    /// <summary>
    /// Specifies type of implementation for PDF text signature.
    /// </summary>
    public enum TextSignatureImplementation
    {
        /// <summary>
        /// Text Signature as native text object on document page.
        /// Use new enumeration Native against this obsolete one.
        /// </summary>
        [Obsolete("This property is obsolete and will be removed in the future release (GroupDocs.Signature 20.06). Use enum value Native", false)]
        Stamp,

        /// <summary>
        /// Text Signature as native text object on document page.
        /// </summary>
        Native,
}
```

#### Public class [ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance) was updated with obsolete member Border.

Public class **[ImageAppearance](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance)** was  updated with marked as obsolete existing property **[Border](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options.appearances/imageappearance/properties/border)**. Please use new property **[Border](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions/properties/border)** of **[ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions)**

**ImageAppearences obsolete member**

```csharp
/// <summary>
/// Describes extended appearance features for Image Signature.
/// </summary>
public class ImageAppearance
{
        /// <summary>
        /// Specify border settings. 
        /// Use Border property of <see cref="ImageSignOptions"/> or <see cref="TextSignOptions"/>
        /// </summary>
        [Obsolete("This property is obsolete and will be removed in the future release (GroupDocs.Signature 20.06).", false)]
        public Border Border { get; set; }
}
```

#### Public class [ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions) was updated with Border property support.

Public class **[ImageSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesignoptions)** was updated with property Border of [Border](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/border) type

**Border property**

```csharp
/// <summary>
/// Represents the Image signature options.
/// </summary>
public class ImageSignOptions
{
        /// <summary>
        /// Specify border settings
        /// </summary>
        public Border Border { get; set;}
 
 }


```

Following example demonstrates using new property

**eSign documen with Image and Border property**

```csharp
// initialize Signature instance
using (Signature signature = new Signature("sample.pdf"))
{
    ImageSignOptions options = new ImageSignOptions(imagePath)
    {
        // set signature position 
        Left = 100,
        Top = 100,
        // set signature rectangle
        Width = 200,
        Height = 100,
        // setup signature border
        Border = new Border()
        {
            Visible = true,
            Color = Color.OrangeRed,
            DashStyle = DashStyle.DashDotDot,
            Weight = 5
        }
    };
    // sign document to file
    signature.Sign("output.pdf", options);
}



```
