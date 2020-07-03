---
id: groupdocs-signature-for-net-19-10-release-notes
url: signature/net/groupdocs-signature-for-net-19-10-release-notes
title: GroupDocs.Signature for .NET 19.10 Release Notes
weight: 3
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.10{{< /alert >}}

## Major Features

The most notable feature is start of supporting .Net Standard 2.0. Also there are few new features and bug fixes in this regular release. In this version we implemented search functionality for text and image signatures, fixed few issues with unreleased internal resources. Most changes are related to support of .Net Standard, new search signatures types implementation. Here are the most notable changes

*   Introduced support of .Net Standard 2.0.
*   Implemented search for Text and Images signatures for supported document types.
*   Few memory issues with Document Preview feature were fixes.
*   Internal processes were adjusted and optimized.

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2240 | Add .NET Standard 2.0 support | Feature |
| SIGNATURENET-2249 | Implement searching for Text signatures for supported document types | New Feature |
| SIGNATURENET-2316 | Implement searching for Image signatures for supported document types | New Feature |
| SIGNATURENET-2325 | Fix memory leaks on Document Preview with unreleased resources | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.10. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **GroupDocs.Signature.Domain.ImageSignature**  
    Public class **ImageSignature** was added to describe image signatures from the document.
    
    **New public class ImageSignature**
    
    ```csharp
    /// <summary>
    /// Contains Image signature properties.
    /// </summary>
    public class ImageSignature : BaseSignature
    {
        /// <summary>
        /// Specifies the size of signature image.
        /// </summary>
        public int Size { get; set; }
    }
    ```
    
    Following example demonstrates using search for Image signature inside document:
    
    **Search document for Image Signatures**
    
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature("signed.pdf"))
    {
        // setup search options
        ImageSearchOptions searchOptions = new ImageSearchOptions()
        {
            // specify as true to search all pages of a document
            AllPages = true
        };
        // search document
        List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
        // output signatures
        foreach (ImageSignature itemSignature in signatures)
        {                 
            if (itemSignature != null)
            {
                Console.WriteLine("Found Image signature: {0}", itemSignature.Size);
            }
        }
    }
    ```
    
2.  **GroupDocs.Signature.Domain.TextSignature**  
    Public class **TextSignature** was added to describe text signatures inside the document.
    
    **New public class TextSignature**
    
    ```csharp
    /// <summary>
    /// Contains Text signature properties.
    /// </summary>
    public class TextSignature : BaseSignature
    {
        /// <summary>
        /// Specifies text in signature.
        /// </summary>
        public string Text { get; set; }
     
        /// <summary>
        /// Specifies text signature implementation.
        /// </summary>
        public TextSignatureImplementation SignatureImplementation { get; set; }
    }
    ```
    
    *   property **Text** contains text of signature inside the document.
    *   property **SignatureImplementation** specifies implementation of text. Possible values are described in enumeration. Values are Stamp, Image, Annotation, Sticker, FormField, Watermark.
    
    Following example demonstrates using search for Text signature inside document:
    
    **Search document for Text Signatures**
    
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature("signed.docx"))
    {
        // setup search options
        TextSearchOptions searchOptions = new TextSearchOptions()
        {
            // search only page with specified number
            PageNumber = null,
            //// specify as true to search all pages of a document
            AllPages = true,
            // specify text to search
            Text = "JS",
            // specify text math type
            MatchType = TextMatchType.Contains
        };
        // search document
        List<TextSignature> signatures = signature.Search<TextSignature>(searchOptions);
        // output signatures
        foreach (TextSignature temp in signatures)
        {
            if (temp != null)
            {
                Console.Write($"Found {temp.SignatureImplementation}-signature with text {temp.Text}");
                Console.WriteLine($"Location at {temp.Left}x{temp.Top}. Size is {temp.Width}-{temp.Height}.");
            }
         }
    }
    ```
    
3.  **GroupDocs.Signature.Options.ImageSearchOptions**  
    Public class **ImageSearchOptions** was added to specify different options to search for image signatures inside the document.
    
    **New public class ImageSearchOptions**
    
    ```csharp
    /// <summary>
    /// Represents search options for Image signatures.
    /// </summary>
    public class ImageSearchOptions : SearchOptions
    {
        /// <summary>
        /// Initializes a new instance of the ImageSearchOptions class with default values.
        /// </summary>
        public ImageSearchOptions();
    }
    ```
    
    This options is supported for all document types except Image documents.    
    Following example demonstrates using **ImageSearchOptions** with documents:   
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature("signed.pdf"))
    {
        // setup search options
        ImageSearchOptions searchOptions = new ImageSearchOptions()
        {
            // specify as true to search all pages of a document
            AllPages = true
        };
        // search document
        List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
        // output signatures
        foreach (ImageSignature itemSignature in signatures)
        {                 
            if (itemSignature != null)
            {
                Console.WriteLine($"Found Image signature with size {itemSignature.Size}");
            }
        }
    }
    ```
    
4.  **GroupDocs.Signature.Options.TextSearchOptions**  
    Public class **TextSearchOptions** was added to specify different options to search for text signatures inside the document.
    
    **New public class TextSearchOptions**
    
    ```csharp
    /// <summary>
    /// Represents search options for Text signatures.
    /// </summary>
    public class TextSearchOptions : SearchOptions
    {
        /// <summary>
        /// Specifies signature text to match on searching.
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// Gets or sets text match type search.
        /// </summary>
        public TextMatchType MatchType { get; set; }
        /// <summary>
        /// Specifies text signature implementation to search.
        /// </summary>
        public TextSignatureImplementation? SignatureImplementation { get; set; }
        /// <summary>
        /// Initializes a new instance of the TextSearchOptions class with default values.
        /// </summary>
        public TextSearchOptions();
        /// <summary>
        /// Initializes a new instance of the TextSearchOptions class with text value.
        /// </summary>
        /// <param name="text">Set Text of Text signature.</param>
        public TextSearchOptions(string text);
    }
    ```
    
    This options is supported for all document types except Image documents.    
    Following example demonstrates using **TextSearchOptions** with documents:   
    
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature("signedFile.pdf"))
    {
        // setup search options
        TextSearchOptions searchOptions = new TextSearchOptions()
        {
            // search only page with specified number
            PageNumber = null,
            //// specify as true to search all pages of a document
            AllPages = true,
            // specify text to search
            Text = "JS_",
            // specify text math type
            MatchType = TextMatchType.Contains
        };
        // search document
        List<TextSignature> signatures = signature.Search<TextSignature>(searchOptions);
        // output signatures
        foreach (TextSignature textSignature in signatures)
        {   
            if (textSignature != null)
            {
                Console.Write($"Found Text signature: {textSignature.SignatureImplementation} with text {textSignature.Text}.");
                Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
            }
        }
    }
    ```
    
5.  **GroupDocs.Signature.Signature.Domain.BaseSignature**  
    Public class **BaseSignature**  was extended with few new integer properties to specify signature position on document page if it was located. Some signature classes like **MetadataSignature** and **DigitalSignature** have these properties always zero.
    
    **New properties of Signature location on document page**
    
    ```csharp
    /// <summary>
    /// Specifies top position of signature.
    /// </summary>
    public int Top { get; private set; } = 0;
    /// <summary>
    /// Specifies left position of signature.
    /// </summary>
    public int Left { get; private set; } = 0;
    /// <summary>
    /// Specifies width of signature.
    /// </summary>
    public int Width { get; private set; } = 0;
    /// <summary>
    /// Specifies height of signature.
    /// </summary>
    public int Height { get; private set; } = 0;
    ```
    
    These properties are not supported for metadata and digital signatures.
    
    Following example demonstrates retrieving these properties after searching document for text signatures and its coordinates:
    
    
    
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature("signedFile.pdf"))
    {
        // setup search options
        TextSearchOptions searchOptions = new TextSearchOptions()
        {
            // search only page with specified number
            PageNumber = null,
            //// specify as true to search all pages of a document
            AllPages = true,
            // specify text to search
            Text = "JS_",
            // specify text math type
            MatchType = TextMatchType.Contains
        };
        // search document
        List<TextSignature> signatures = signature.Search<TextSignature>(searchOptions);
        // output signatures
        foreach (TextSignature textSignature in signatures)
        {   
            if (textSignature != null)
            {
                Console.Write($"Found Text signature: {textSignature.SignatureImplementation} with text {textSignature.Text}.");
                Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
            }
        }
    }
    ```
