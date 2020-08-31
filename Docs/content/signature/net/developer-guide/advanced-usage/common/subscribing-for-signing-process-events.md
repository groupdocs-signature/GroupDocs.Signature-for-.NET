---
id: subscribing-for-signing-process-events
url: signature/net/subscribing-for-signing-process-events
title: Subscribing for signing process events
weight: 5
description: "This article explains how to subscribe for signing electronic signatures events like start, progress and completion with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class contains several events that are being called for different process stages

* [SignStarted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signstarted) to handle process start event. This event is occur once [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method is called
* [SignProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signprogress) to handle progress event. This event occurs each time on signing each signature was completed.
* [SignCompleted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signcompleted) to handle completion event. This event occurs once [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) process was completed.

Here are the steps to subscribe for signing process with [**GroupDocs.Signature**](https://products.groupdocs.com/signature/net):

* Define required handler delegates to process signing events.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for required events
* Instantiate required [SignOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/signoptions) object
* Call [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass signature options in it

## Implement method for SignStarted event

GroupDocs.Signature expects [ProcessStartEventHandler](https://apireference.groupdocs.com/net/signature/groupdocs.signature/processstarteventhandler) delegate to subscribe for [SignStarted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/signstarted) event

```csharp
private static void OnSignStarted(Signature signature, ProcessStartEventArgs args)
{
    Console.WriteLine("Sign process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}
```

## Implement method for SignProgress event

```csharp
 private static void OnSignProgress(Signature signature, ProcessProgressEventArgs args)
 {
     Console.WriteLine("Sign progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
 }
```

## Implement method for SignCompleted event

```csharp
private static void OnSignCompleted(Signature signature, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Sign process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}
```

## Subscribing for signing process events

```csharp
private static void OnSignStarted(Signature signature, ProcessStartEventArgs args)
{
    Console.WriteLine("Sign process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}

private static void OnSignProgress(Signature signature, ProcessProgressEventArgs args)
{
    Console.WriteLine("Sign progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
}

private static void OnSignCompleted(Signature signature, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Sign process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}

public static void Run()
{
    using (Signature signature = new Signature("sample.pdf"))
    {
        signature.SignStarted += OnSignStarted;
        signature.SignProgress += OnSignProgress;
        signature.SignCompleted += OnSignCompleted;
        TextSignOptions options = new TextSignOptions("John Smith")
        {
            // set signature position
            Left = 100,
            Top = 100
        };

        // sign document to file
        signature.Sign("SignedSample", options);
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
