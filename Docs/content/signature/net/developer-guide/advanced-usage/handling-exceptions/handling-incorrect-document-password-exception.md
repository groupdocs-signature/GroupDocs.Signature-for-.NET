---
id: handling-incorrect-document-password-exception
url: signature/net/handling-incorrect-document-password-exception
title: Handling incorrect document password exception
weight: 1
description: "This article shows how to handle incorrect document password exception with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports handling incorrect password passed to open protected documents over class [IncorrectPasswordException](https://apireference.groupdocs.com/net/signature/groupdocs.signature/incorrectpasswordexception).

Here are the steps to handle incorrect password exception when working with protected documents with GroupDocs.Signature:

* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Cover the code that works with [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) object methods ([Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature.signature/sign/methods/4), [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify), [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1), [Update](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/update), [Delete](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/delete)) with try - catch block including catching [IncorrectPasswordException](https://apireference.groupdocs.com/net/signature/groupdocs.signature/incorrectpasswordexception) exception.

## Handling incorrect password exception

Following example demonstrates how to handle incorrect password exception.

```csharp
// initialize LoadOptions with incorrect Password
LoadOptions loadOptions = new LoadOptions() { Password = "1" };
using (Signature signature = new Signature("ProtectedPwd.pdf", loadOptions))
{
    try
    {
        QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
        {
            EncodeType = QrCodeTypes.QR,
            Left = 100,
            Top = 100
        };
        // try to sign document to file, we expect for PasswordRequiredException
        signature.Sign(outputFilePath, options);
        Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
    }
    catch (IncorrectPasswordException ex)
    {
        Console.WriteLine($"HandlingIncorrectPasswordException: {ex.Message}");
    }
    catch (GroupDocsSignatureException ex)
    {
        Console.WriteLine($"Common GroupDocsSignatureException: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Common Exception happens only at user code level: {ex.Message}");
    }
    finally
    {
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
