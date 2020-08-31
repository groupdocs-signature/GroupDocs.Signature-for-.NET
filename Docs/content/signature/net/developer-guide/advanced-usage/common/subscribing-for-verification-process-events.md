---
id: subscribing-for-verification-process-events
url: signature/net/subscribing-for-verification-process-events
title: Subscribing for verification process events
weight: 6
description: "This article explains how to subscribe for verification of electronic signatures events like start, progress and completion with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)class contains several events that are being called for different verification process stages

* [VerifyStarted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifystarted) to handle process start event. This event is occur once [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify) method is called
* [VerifyProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifyprogress) to handle progress event. This event occurs each time on verifying each signature was completed.
* [VerifyCompleted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifycompleted) to handle completion event. This event occurs once [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify) process was completed.

Here are the steps to subscribe for verification process with GroupDocs.Signature:

* Define required handler delegates to process signing events.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for required events
* Instantiate required [VerifyOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/verifyoptions) object
* Call [Verify](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/verify) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature)class instance and pass verify options in it

## Implement method for VerifyStarted event

GroupDocs.Signature expects [ProcessStartEventHandler](https://apireference.groupdocs.com/net/signature/groupdocs.signature/processstarteventhandler) delegate to subscribe for [VerifyStarted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/verifystarted) event

```csharp
private static void OnVerifyStarted(Signature signature, ProcessStartEventArgs args)
{
    Console.WriteLine("Verify process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}
```

## Implement method for VerifyProgress event

```csharp
 private static void OnVerifyProgress(Signature signature, ProcessProgressEventArgs args)
 {
     Console.WriteLine("Verify progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
 }
```

## Implement method for VerifyCompleted event

```csharp
private static void OnVerifyCompleted(Signature signature, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Verify process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}
```

## Subscribing for verification process events

```csharp
private static void OnVerifyStarted(Signature sender, ProcessStartEventArgs args)
{
    Console.WriteLine("Verify process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}
/// <summary>
/// Defines on progress event
/// </summary>
/// <param name="sender"></param>
/// <param name="args"></param>
private static void OnVerifyProgress(Signature sender, ProcessProgressEventArgs args)
{
    Console.WriteLine("Verify progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
}
/// <summary>
/// Defines on completed event
/// </summary>
/// <param name="sender"></param>
/// <param name="args"></param>
private static void OnVerifyCompleted(Signature sender, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Verify process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}
/// <summary>
/// Verify document with text signature applying specific options and subscribe for events
/// </summary>
public static void Run()
{
    // The path to the documents directory.
    string filePath = Constants.SAMPLE_PDF;
    using (Signature signature = new Signature(filePath))
    {
        signature.VerifyStarted += OnVerifyStarted;
        signature.VerifyProgress += OnVerifyProgress;
        signature.VerifyCompleted += OnVerifyCompleted;
        TextVerifyOptions options = new TextVerifyOptions("John Smith")
        {
           AllPages = true
        };
        // verify document
        VerificationResult result = signature.Verify(options);
        if (result.IsValid)
        {
            Console.WriteLine("\nDocument was verified successfully!");
        }
        else
        {
            Console.WriteLine("\nDocument failed verification process.");
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
