---
id: groupdocs-signature-for-net-18-3-release-notes
url: signature/net/groupdocs-signature-for-net-18-3-release-notes
title: GroupDocs.Signature for .NET 18.3 Release Notes
weight: 10
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.3{{< /alert >}}

## Major Features

There are about seven improvements, new features and fixes in this regular release. Most new features are related to ability to encode custom objects to QR-Code Signatures and alternative implementation of Stamp Signatures. The most notable changes are:

*   Introduced ability to encode custom objects to QR-Code Signatures
*   Implemented standard QR-Code embedded objects like VCard contact details and Email formats
*   Involved ability to search custom objects and obtain them from QR-Code Signatures
*   Updated Dynamic Metered library with latest changes and fixes
*   Implemented new Slides format like otp, potx, potm, pptm, ppsm
*   Fixed few bugs with Slides and Words format files extensions
*   Introduced new type of Stamp Signature

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3294 | Signed .doc files have .docx extension | Bug |
| SIGNATURENET-3290 | Signed .ppt files have .pps extension | Bug |
| SIGNATURENET-3413 | Implement standard QRCode embedded classes VCard, Email | New Feature |
| SIGNATURENET-3400 | Implement ability to search custom object to QR-Code Signature | New Feature |
| SIGNATURENET-3396 | Implement ability to encode custom object to QR-Code Signature | New Feature |
| SIGNATURENET-3393 | Add ability to process new Slides file formats (otp, potx, potm, pptm, ppsm) | New Feature |
| SIGNATURENET-3391 | Implement Square type of Stamp Signatures | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.3. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **Introduced ability to encode custom objects to QR-Code Signature** for all supported Document types. Any class can be used to embedded it to QRCode Signature. Optional few attributes can be used to specify names and format of data for objects serialization. New attributes allow to specify format and names of object fields/properties serialization. By default serialization format to QR-Code is Json format. Future versions will include ability to specify custom serialization and de-serialization of objects. New attribute **FormatAttribute** allows to specify name and data format for class property. Attribute **SkipSerializationAttribute** allows to skip member of class for serialization. These attributes are optional.  
      
    1.Public class **FormatAttribute** was added to GroupDocs.Signature.Domain.Extensions namespace to represent attribute for fields, variables or properties of class to be serialized to embedded QR-Code object. This attribute can be used for custom classes fields and properties to specify special field name or format while serialization.  
      
    
    **FormatAttriute class implementation**
    
    ```csharp
    /// <summary>
    /// Instructs for objects serialization to serialize the member with the specified name and format
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Parameter, AllowMultiple = false)]
    public sealed class FormatAttribute : Attribute
    {
        /// <summary>
        /// Gets or sets the name of the property.
        /// </summary>
        /// <value>The name of the property.</value>
        public string PropertyName { get; set; }
        /// <summary>
        /// Gets or sets the serialization format of the property.
        /// </summary>
        /// <value>The format of the property.</value>
        public string PropertyFormat { get; set; }
        /// <summary>
        /// Creates Format attribute with given property Name
        /// </summary>
        /// <param name="propertyName">The name of property</param>
        public FormatAttribute(string propertyName)
     
        /// <summary>
        /// Creates Format attribute with given property Name
        /// </summary>
        /// <param name="propertyName">The name of property</param>
        /// <param name="propertyFormat">The format of property</param>
        public FormatAttribute(string propertyName, string propertyFormat)
    }
    ```
    
    ** Create custom class with required properties or field**
    
    
    
    ```csharp
    public class DocumentSignature
    {
        [Format("SignatureID")]
        public string ID { get; set; }
        [Format("Author")]
        public string Author { get; set; }
        [Format("SignatureDate","yyyy-MM-dd")]
        public DateTime Signed { get; set; }
        [Format("Factor", "N2")]
        public decimal DataFactor { get; set; }
    }
    ```
    
    2.Public class **SkipSerializationAttribute **was added to GroupDocs.Signature.Domain.Extensions namespace to represent attribute for fields, variables or properties of class to be skipped while serialization to embedded QR-Code object. This attribute can be used for custom classes fields and properties to skip its property from serialization
    
    **SkipSerializationAttribute**
    
    ```csharp
    /// <summary>
    /// Instructs the serialization to skip the member
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Parameter, AllowMultiple = false)]
    public sealed class SkipSerializationAttribute : Attribute
    {
        /// <summary>
        /// Creates Format attribute with given property Name
        /// </summary>
        /// <param name="propertyName">The name of property</param>
        public SkipSerializationAttribute()
        {
        }
    }
    ```
    
    **Create custom class with required properties or field and specify fields that should not be serialized into embedded QR-Code Signature Text**
    
    
    
    ```csharp
    public class DocumentSignature
    {
        // specify SkipSerialization attribute to skip this field on serialization
        [SkipSerialization]
        public string Version { get; set; }
        // specify SkipSerialization attribute to skip this field on serialization
        [SkipSerialization]
        public bool IsProcessed { get; set; }
        [Format("SignatureID")]
        public string ID { get; set; }
        [Format("Author")]
        public string Author { get; set; }
        [Format("SignatureDate","yyyy-MM-dd")]
        public DateTime Signed { get; set; }
        [Format("Factor", "N2")]
        public decimal DataFactor { get; set; }
    }
    ```
    
    3.New property of **QRCodeSignOptions** of type object **Data** was added to pass objects for QR-Code Signature
    
    **QRCodeSignOptions**
    
    ```csharp
    /// <summary>
    /// Gets or sets custom object to serialize to QR-Code content.
    /// </summary>
    public object Data { get; set; }
    ```
    
    It allows to pass custom data objects for QR-Code Signature.
    
    Following example demonstrate it
    
    **Sign document with custom QR-Code data**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // setup custom object instance with required data
    DocumentSignature docSignature = new DocumentSignature()
    {
        ID = Guid.NewGuid().ToString(),
        Author = "Mr.Sherlock",
        Signed = DateTime.Now,
        DataFactor = 0.67M
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions();
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.QR;
     
    // setup Data property with custom object
    signOptions.Data = docSignature;
    // save Options
    SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "CustomSignature" };
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions, saveOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    By default current implementation of serialization format uses base Json format. For object above QR-Code Signature will keep following text content - fields marked with SkipSerialization attribute will be missing in output content.
    
    **Example of serialized custom object to QR-Code text**
    
    ```csharp
    {
    "SignatureID": "6ba54e34-f215-4dc0-be3e-b8ec552ec7fb",
    "Author": "Mr.Sherlock",
    "SignatureDate": "2018-03-18",
    "Factor": "0.67"
    }
    ```
    
2.  New classes where added to support standard QRCode embedded objects.   
    Class **VCard** implements standard of VCard contact details for QRCodes. Following example demonstrates using this to embedded VCard object to QR-Code Signature.
    
    **Composing VCard object**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // Setup VCard object
    VCard vcard = new VCard()
    {
        FirstName = "Sherlock",
        MidddleName = "",
        LastName = "Holmes",
        Initials = "Mr.",
        Company = "Watson Inc.",
        JobTitle = "Detective",
        HomePhone = "",
        WorkPhone = "",
        Email = "",
        Url = "http://sherlockholmes.com/",
        BirthDay= new DateTime(1854, 1, 6)
    };
    // Setup Address of Contant details
    vcard.HomeAddress = new Address()
    {
        Street = "221B Baker Street",
        City = "London",
        State = "NW",
        ZIP = "NW16XE",
        Country = "England"
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup SaveOptions
    SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "VCardData" };
    // setup options with text of signature
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions();
    // setup QR-code type and size
    signOptions.EncodeType = QRCodeTypes.QR;
    signOptions.Width = 200;
    signOptions.Height = 200;
     
    // setup Data property to VCard instance
    signOptions.Data = vcard;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions, saveOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Class **Email** implements standard QRCode email message. Here's how it can be used
    
    **Composing Email object**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
     
    // Setup Email object
    Email email = new Email()
    {
        Address = "watson@sherlockholmes.com",
        Subject = "Welcome email",
        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
     
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // setup SaveOptions
    SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "EmailData" };
    // setup options with text of signature
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions();
    // setup QR-code type and size
    signOptions.EncodeType = QRCodeTypes.QR;
    signOptions.Width = 200;
    signOptions.Height = 200;
     
    // setup Data property to Email instance
    signOptions.Data = email;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions, saveOptions);
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
3.  **Search features** was updated to support custom objects deserialization. New method of QRCodeSignature was added to support obtaining object from Signature.
    
    Following example demonstrates retrieving **DocumentSignature **object from signed Pdf file with **DocumentSignature **QR-Code Signature
    
    **Search for custom object from signed document**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    PdfSearchQRCodeOptions searchOptions = new PdfSearchQRCodeOptions();
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // search document
    SearchResult result = handler.Search("SignedQRCodeCustData.pdf", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        PdfQRCodeSignature qrCodeSignature = signature as PdfQRCodeSignature;
        if (qrCodeSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", qrCodeSignature.EncodeType.TypeName, qrCodeSignature.Text);
            DocumentSignature docSignature = qrCodeSignature.GetData<DocumentSignature>();
            if (docSignature != null)
            {
                Console.WriteLine("Found DocumentSignature signature: #{0}. Author {1} from {2}. Factor: {3}", 
                  docSignature.ID, docSignature.Author, docSignature.DataFactor, docSignature.DataFactor);
            }
        }
    }
    ```
    
    Also this feature supports retrieving standard VCard and Email object types.
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    PdfSearchQRCodeOptions searchOptions = new PdfSearchQRCodeOptions();
     
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
     
    // search document
    SearchResult result = handler.Search("SignedQRCodeVCardData", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        PdfQRCodeSignature qrCodeSignature = signature as PdfQRCodeSignature;
        if (qrCodeSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", qrCodeSignature.EncodeType.TypeName, qrCodeSignature.Text);
            VCard vcard = qrCodeSignature.GetData<VCard>();
            if(vcard != null)
            {
                Console.WriteLine("Found VCard signature: {0} {1} from {2}. Email: {3}", vcard.FirstName, vcard.LastName, vcard.Company, vcard.Email);
            }
        }
    }
    ```
    
4.  **New Stamp type **was implemented. Class **StampType** contains description of Stamp Type. 
    
    **StampType**
    
    ```csharp
    /// <summary>
    /// Specify stamp type properties.
    /// </summary>
    public sealed class StampType
    {
        /// <summary>
        /// Get Index of object in collection of supported stamp types.
        /// </summary>
        public int TypeIndex
     
        /// <summary>
        /// Name of stamp type.
        /// </summary>
        public string TypeName
     
        /// <summary>
        /// Determines whether the specified stamp type is equal to the current object.
        /// </summary>
        /// <param name="other">Object for comparison.</param>
        /// <returns>Result of comparison.</returns>
        public bool Equals(StampType other)
        {
        }
     
        /// <summary>
        /// Overridden method determines whether the specified System.Object is equal to the current System.Object.
        /// </summary>
        /// <param name="obj">Object for comparison.</param>
        /// <returns>Result of comparison.</returns>
        public override bool Equals(object obj)
        {
        }
     
        /// <summary>
        /// Overridden method serves as a hash function for a particular type.
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
        }
     
        /// <summary>
        /// Overridden method serves as conversion to string type.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
        }
     
    }
    ```
    
    Options **StampSignOptions **was updated with new property **StampType** that allows to specify type of Stamp. New implemented Stamp type was Square.
    
    **StampSignOptions**
    
    ```csharp
     /// <summary>
       /// Represents the Stamp Signature Options.
       /// </summary>
     
       public abstract class StampSignOptions
       {
           /// <summary>
           /// Gets or sets stamp type.
           /// </summary>
           public StampType StampType
    }
    ```
    
    **Example**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options
    ImagesStampSignOptions signOptions = new ImagesStampSignOptions();
     
    // setup stamp type
    signOptions.StampType = StampTypes.Square; //This feature is supported starting from version 18.03.
     
    // setup other properties
    signOptions.Top = 300;
    signOptions.Left = 255;
    signOptions.Height = 150;
    signOptions.Width = 250;
    signOptions.StampType = StampTypes.Round;
    signOptions.ImageGuid = @"C:\Aspose\Test\Images\300x200plane.png";
     
    //Outer round lines
    StampLine line00 = new StampLine();
    line00.Height = 18;
    line00.OuterBorder.Weight = 6;
    line00.OuterBorder.Color = Color.RoyalBlue;
    line00.InnerBorder.Weight = 6;
    line00.InnerBorder.Color = Color.CornflowerBlue;
    line00.BackgroundColor = Color.White;
    signOptions.OuterLines.Add(line00);
     
    StampLine line01 = new StampLine();
    line01.Height = 20;
    line01.Text = "INTERNATIONAL AIRPORT";
    line01.TextColor = Color.CadetBlue;
    line01.Font.FontSize = 10;
    line01.TextBottomIntent = 5;
    line01.InnerBorder.Weight = 1;
    line01.InnerBorder.Color = Color.CadetBlue;
    signOptions.OuterLines.Add(line01);
     
    //Inner square lines
    StampLine line02 = new StampLine();
    line02.Text = "DEPARTURE";
    line02.TextColor = Color.DarkRed;
    line02.Font.FontSize = 14;
    line02.TextBottomIntent = 10;
    line02.Font.Bold = true;
    line02.Height = 30;
    signOptions.InnerLines.Add(line02);
     
    StampLine line03 = new StampLine();
    line03.Text = "03.03.2003";
    line03.TextColor = Color.Brown;
    line03.Font.FontSize = 12;
    line03.Font.Bold = true;
    line03.Height = 20;
    signOptions.InnerLines.Add(line03);
     
    // sign document with round stamp
    string signedPath = handler.Sign<string>("invoice.png", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_StampRound" });
     
    //change type of stamp
    signOptions.StampType = StampTypes.Square;
     
    // sign document with square stamp
    signedPath = handler.Sign<string>("invoice.png", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "DocImages_StampSquare" });
    ```
