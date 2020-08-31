---
id: migration-notes
url: signature/net/migration-notes
title: Migration Notes
weight: 3
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
### Why To Migrate?
  
Here are the key reasons to use the new updated API provided by GroupDocs.Signature for .NET since version 19.8:

* [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class introduced as a **single entry point** to sing the document with various signature types with further verification and search with any supported file format.
* Document **signature options** ([SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions)), **verify options** ([VerifyOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/verifyoptions)) and **search options** ([SearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/searchoptions)) were unified for all document types. Instead of using document related options now options are related to signature type only.
* The overall document related classes were unified to common.
* Product architecture was redesigned from scratch in order to simplify passing options and classes to manipulate signature.
* Document information and preview generation procedures were simplified.

### How To Migrate?

Here is a brief comparison of how to sign document with text signature using old and new API.  

#### Old coding style

```csharp
// setup Signature configuration
SignatureConfig signConfig = new SignatureConfig
{
    StoragePath = @"c:\Aspose\Test\Storage",
    OutputPath = @"c:\Aspose\Test\Output"
};
// instantiating the signature handler
SignatureHandler handler = new SignatureHandler(signConfig);
// setup text signature options
PdfSignTextOptions signOptions = new PdfSignTextOptions("John Smith")
{
    // locate signature
    Left = 100, Top = 100, Width = 100, Height = 30,
    // set Text color and Font
    ForeColor = Color.Red,
    Font = new SignatureFont { FontSize = 12, FontFamily = "Comic Sans MS" }
};
SaveOptions saveOptions = new SaveOptions { OutputType = OutputType.String, OutputFileName = "signed.pdf" };
// sign document
string signedPath = handler.Sign<string>("test.pdf", signOptions,saveOptions);
Console.WriteLine("Signed file path is: " + signedPath);
```

#### New coding style

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    TextSignOptions options = new TextSignOptions("John Smith")
    {
        // locate signature
        Left = 100, Top = 100, Width = 100, Height = 30,
        // set Text color and Font
        ForeColor = Color.Red,
        Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" }
    };
    // sign document to file
    signature.Sign("signed.pdf", options);
}
```

For more code examples and specific use cases please refer to our [Developer Guide]({{< ref "signature/net/developer-guide/_index.md" >}}) documentation or [GitHub](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/) samples and showcases.
