---
id: groupdocs-signature-for-net-18-1-1-release-notes
url: signature/net/groupdocs-signature-for-net-18-1-1-release-notes
title: GroupDocs.Signature for .NET 18.1.1 Release Notes
weight: 12
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.1.1{{< /alert >}}

## Major Features

There are few improvements in this minor release. Most changes were made on updating namespaces and classes implementation on Signature Extensions:

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3325 | Fix TextShadow class implementation and namespace | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.1.1. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

 Added new namespace **GroupDocs.Signature.Domain.Extensions** that will contain Signature extensions.

1.  New class  **SignatureExtension **was added to specify base class for Signature Extensions options like new functional and appearance features.
    
    ```csharp
    /// <summary>
    /// Represents base class for signatures appearance options.
    /// </summary>
    public abstract class SignatureExtension: ICloneable
    {
        /// <summary>
        /// Gets a copy of this object.
        /// </summary>
        public virtual Object Clone()
        {
            return this.MemberwiseClone();
        }
    }
    ```
    
    Class **SignOptions** was updated with **Extensions** property
    
    ```csharp
    /// <summary>
     /// Signature Extensions.
     /// </summary>
    public List<SignatureExtension> Extensions { get; private set; }
    ```
    
2.  Updated class **TextShadow** in namespace **GroupDocs.Signature.Domain.Extensions**. It's recommended for using with text as image signature for all supported document types, also with simple text signature and text signature as watermark for Cells (.xslx) and Slides (.pptx). Simple text signature for Words (.docx) is recommended too, but has limited functionality.
    
    Here's example of using
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
     
    // set up text signature options
    SlidesSignTextOptions signOptions = new SlidesSignTextOptions("John Smith");
    signOptions.Width = 300;
    signOptions.Height = 300;
    signOptions.Font.FontSize = 48;
     
    // set up shadow options for text
    TextShadow shadow = new TextShadow();
    shadow.Color = Color.OrangeRed;
    shadow.Angle = 135;
    shadow.Blur = 5;
    shadow.Distance = 4;
    shadow.Transparency = 0.2;
     
    //add text shadow to signature extensions
    signOptions.Extensions.Add(shadow);
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignatureExtensions_TextShadow" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
