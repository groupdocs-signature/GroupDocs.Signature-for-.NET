---
id: subscribing-for-search-process-events
url: signature/net/subscribing-for-search-process-events
title: Subscribing for search process events
weight: 4
description: "This article explains how to subscribe for search electronic signatures events like start, progress and completion with GroupDocs.Signature API."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
[Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class contains several events that are being called for different search process stages

* [SearchStarted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchstarted) to handle process start event. This event is occur once [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method is called
* [SearchProgress](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchprogress) to handle progress event. This event occurs each time on searching each document page.
* [SearchCompleted](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/events/searchcompleted) to handle completion event. This event occurs once [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) process was completed.

Here are the steps to subscribe for searching process with GroupDocs.Signature:

* Define required handler delegates to process searching events.
* Create new instance of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class and pass source document path or stream as a constructor parameter.
* Subscribe for required events.
* Instantiate required [SearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/searchoptions) object.
* Call [Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/_1) method of [Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) class instance and pass search options in it.

## Implement method for SearchStarted event

[**GroupDocs.Signature**](https://products.groupdocs.com/signature/net) expects ProcessStartEventHandler delegate to subscribe for SearchStarted event

```csharp
private static void OnSearchStarted(Signature signature, ProcessStartEventArgs args)
{
    Console.WriteLine("Search process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}
```

## Implement method for SearchProgress event

```csharp
 private static void OnSearchProgress(Signature signature, ProcessProgressEventArgs args)
 {
     Console.WriteLine("Search progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
 }
```

## Implement method for SearchCompleted event

```csharp
private static void OnSearchCompleted(Signature signature, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Search process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}
```

## Subscribing for search process events

```csharp
private static void OnSearchStarted(Signature sender, ProcessStartEventArgs args)
{
    Console.WriteLine("Search process started at {0} with {1} total signatures to be put in document", args.Started, args.TotalSignatures);
}

private static void OnSearchProgress(Signature sender, ProcessProgressEventArgs args)
{
    Console.WriteLine("Search progress. Processed {0} signatures. Time spent {1} mlsec", args.ProcessedSignatures, args.Ticks);
}

private static void OnSearchCompleted(Signature sender, ProcessCompleteEventArgs args)
{
    Console.WriteLine("Search process completed at {0} with {1} total signatures. Process took {2} mlsec", args.Completed, args.TotalSignatures, args.Ticks);
}

public static void Run()
{
    using (Signature signature = new Signature("SignedSample.pdf"))
    {
        signature.SearchStarted += OnSearchStarted;
        signature.SearchProgress += OnSearchProgress;
        signature.SearchCompleted += OnSearchCompleted;
        BarcodeSearchOptions options = new BarcodeSearchOptions()
        {
            // specify special pages to search on
            AllPages = true
        };
        // search for signatures in document
        List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
        Console.WriteLine("\nSource document contains following signatures.");
        foreach (var barcodeSignature in signatures)
        {
            Console.WriteLine("Barcode signature found at page {0} with type {1} and text {2}",
                  barcodeSignature.PageNumber, barcodeSignature.EncodeType, barcodeSignature.Text);
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
