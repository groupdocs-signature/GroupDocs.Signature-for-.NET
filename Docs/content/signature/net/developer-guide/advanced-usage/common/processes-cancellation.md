---
id: processes-cancellation
url: signature/net/processes-cancellation
title: Processes cancellation
weight: 3
description: "This article explains how to control signature processing (cancellation) for large documents with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class supports cancellation for each of document processing (Sign, Verify, Search). The process cancellation happens over setting property [Cancel](https://apireference.groupdocs.com/net/signature/groupdocs.signature/processprogresseventargs/properties/cancel) of [ProcessProgressEventArgs](https://apireference.groupdocs.com/net/signature/groupdocs.signature/processprogresseventargs) property in proper event handler.

* for [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) process this flag should be set to true in handler of [SignProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signprogress) event. This event occurs each time on signing each signature was completed.
* for [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify) process this flag should be set to true in handler of [VerifyProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifyprogress) event. This event occurs each time on verifying document page.
* for [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) process this flag should be set to true in handler of [SearchProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchprogress) event. This event occurs each time on searching document page per each options.  

## Cancel signing process

Here are the steps to provide cancellation for signing process with GroupDocs.Signature:

* Define [SignProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signprogress) event handler delegates to conditionally cancel the process.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for [SignProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signprogress) event with proper handler method.
* Instantiate required [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) object.
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signature options in it.

```csharp
private static void OnSignProgress(Signature sender, ProcessProgressEventArgs args)
{
    // check if process takes more than 1 second (1000 milliseconds) processing cancellation
    if(args.Ticks > 1000)
    {
        args.Cancel = true;
        Console.WriteLine("Sign progress was cancelled. Time spent {0} mlsec", args.Ticks);
    }
}
/// <summary>
/// Sign document with text signature applying specific options
/// </summary>
public static void Run()
{
    using (Signature signature = new Signature("sample.docx"))
    {
        signature.SignProgress += OnSignProgress;
        TextSignOptions options = new TextSignOptions("John Smith")
        {
            // ...
        };
        // sign document to file
        signature.Sign("signedSample", options);
    }
}
```

## Cancel verification process

Here are the steps to provide cancellation for verification process with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Define [VerifyProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifyprogress) event handler delegates to conditionally cancel the process.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for [VerifyProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifyprogress) event with proper handler method.  
* Instantiate required [VerifyOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/verifyoptions)  object.
* Call [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify)method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass verification options in it.

```csharp
private static void OnVerifyProgress(Signature sender, ProcessProgressEventArgs args)
{
    // check if process takes more than 1 second (1000 milliseconds) processing cancellation
    if (args.Ticks > 1000)
    {
        args.Cancel = true;
        Console.WriteLine("Sign progress was cancelled. Time spent {0} mlsec", args.Ticks);
    }
}
public static void Run()
{
    using (Signature signature = new Signature("SignedSample.pdf"))
    {
        signature.VerifyProgress += OnVerifyProgress;
        TextVerifyOptions options = new TextVerifyOptions("John Smith")
        {
            // ...
        };
        // sign document to file
        VerificationResult result = signature.Verify(options);
    }
}
```

## Cancel search process

Here are the steps to provide cancellation of searching process with GroupDocs.Signature:

* Define [SearchProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchprogress) event handler delegates to conditionally cancel the process.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for [SearchProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchprogress) event with proper handler method.
* Instantiate required[SearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/searchoptions) object.
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1)method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass search options in it.

```csharp
private static void OnSearchProgress(Signature sender, ProcessProgressEventArgs args)
{
    // check if process takes more than 1 second (1000 milliseconds) processing cancellation
    if (args.Ticks > 1000)
    {
        args.Cancel = true;
        Console.WriteLine("Sign progress was cancelled. Time spent {0} mlsec", args.Ticks);
    }
}
public static void Run()
{
    using (Signature signature = new Signature("sampleSigned.pdf"))
    {
        signature.SearchProgress += OnSearchProgress;
        QRCodeSearchOptions options = new QRCodeSearchOptions(QRCodeTypes.QR)
        {
            // ...
        };
        // search for signatures in document
        List<QRCodeSignature> signatures = signature.Search<QRCodeSignature>(options);
        Console.WriteLine("\nSource document contains following signatures.");
        foreach (var QRCodeSignature in signatures)
        {
            Console.WriteLine("QRCode signature found at page {0} with type {1} and text {2}", QRCodeSignature.PageNumber, QRCodeSignature.EncodeType, QRCodeSignature.Text);
        }
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
