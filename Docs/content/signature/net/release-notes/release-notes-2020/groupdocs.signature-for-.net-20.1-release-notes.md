---
id: groupdocs-signature-for-net-20-1-release-notes
url: signature/net/groupdocs-signature-for-net-20-1-release-notes
title: GroupDocs.Signature for .NET 20.1 Release Notes
weight: 50
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.1{{< /alert >}}{{< alert style="danger" >}}In this version we're removed Legacy API from product. GroupDocs.Signature.Legacy namespace does not exist anymore.{{< /alert >}}

## Major Features

Below is the list of most notable changes in release of GroupDocs.Signature for .NET 20.1:

*   Legacy API was removed from product
*   Introduced new digital signature XML Advanced Electronic Signatures type for Spreadsheet documents
*   Added new type of annotation

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2509  |  Implement support XAdES signatures for Spreadsheet documents | Feature |
| SIGNATURENET-2530 | SignResult does not have information about added PDF Form Field signatures | Bug |
| SIGNATURENET-2449 | Word Processing document Sign Text Watermark creates signatures only on last page for doc files | Bug |
| SIGNATURENET-2448 | Word Processing document Text Form Field - creation and search process gives no rectangle coordinates | Bug |
| SIGNATURENET-2447 | Word Processing document Sign Text Form field with empty Options.FormTextFieldTitle sign all form fields | Bug |
| SIGNATURENET-1794 | Getting exception while signing document without setting output path | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 20.1. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  GroupDocs.Signature.Domain.XAdESType
    
    New public enumeration type **XAdESType** was added. This type describes possible values of XML Advanced Electronic Signatures types.
    
    At this moment enumeration contains two options **None** and **XAdES**.
    
    **Enumeration of XML Advanced Electronic Signatures types**
    
    ```csharp
    /// <summary>
    /// Type of XML Advanced Electronic Signature (XAdES).
    /// </summary>
    public enum XAdESType
    {
        /// <summary>
        /// XAdES is off.
        /// </summary>
        None = 0,
        /// <summary>
        /// Basic XAdES.
        /// </summary>
        XAdES = 1
    }
    ```
    
2.  GroupDocs.Signature.Options.DigitalSignOptions  
    Public class [DigitalSignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/digitalsignoptions) was extended with new enumeration property **XAdESType** to specify if digital signature should be XAdES type. See enumeration type [XAdESType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/xadestype).
    
    **XAdESType property**
    
    ```csharp
    /// <summary>
    /// XAdES type <see cref="XAdESType"/>. Defaule value is None (XAdES is off).
    /// At this moment XAdES signature type is supported only for Spreadsheet documents.
    /// </summary>
    public XAdESType XAdESType { get; set; } = XAdESType.None;
    
    ```
    
    This new property is supported only for Spreadsheets documents. For any other document types this field value will be ignored.
    
    **Example**:
    
    Following example demonstrates creating XAdES Digital signature for Spreadsheet document.
    
    **Signing Spreadsheet document with XAdES signature**
    
    ```csharp
    using (Signature signature = new Signature("sample.xlsx"))
    {
        DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
        {
            // set XAdES type
            XAdESType = XAdESType.XAdES,
            // certificate password
            Password = "1234567890",
            // digital certificate details
            Reason = "Sign",
            Contact = "JohnSmith",
            Location = "Office1"
        };
        SignResult signResult = signature.Sign("output.xlsx", options);
        Console.WriteLine($"Document was signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");    
    }
    ```
