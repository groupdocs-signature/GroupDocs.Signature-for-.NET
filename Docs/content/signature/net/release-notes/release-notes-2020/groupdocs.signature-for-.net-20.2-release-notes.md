---
id: groupdocs-signature-for-net-20-2-release-notes
url: signature/net/groupdocs-signature-for-net-20-2-release-notes
title: GroupDocs.Signature for .NET 20.2 Release Notes
weight: 40
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 20.2{{< /alert >}}

## Major Features

This release contains advanced image search features like grabbing image content, extended search criteria and some important fixes and improvements. Below the list of most notable changes in release of GroupDocs.Signature for .NET 20.2:

*   Implemented additional image search criteria.
*   Involved ability to grab image content from document signatures
*   Multi threading PDF document processing with Digital signatures was fixed
*   Document information was extended with signatures and form fields details
*   Fixed bugs with Open Office documents
*   Few signature API overload methods were added

  

Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2605 |  Extend Image Signature with image data content for Presentations documents | Feature |
| SIGNATURENET-2604 |  Extend Image Signature with image data content for Word Processing documents | Feature |
| SIGNATURENET-2603 |  Extend Image Signature with image data content for Spreadsheets documents | Feature |
| SIGNATURENET-2585 |  Extend Image Signature with image data content for Pdf documents | Feature |
| SIGNATURENET-2529 |  Implement Image Size filter for Image Search functionality | Feature |
| SIGNATURENET-2377 |  Implement output Image format property for Image Search Options | Feature |
| SIGNATURENET-2528 |  Extend Document Information with list of existing signatures and document Form Fields | Improvement |
| SIGNATURENET-2470 |  Improve ability to search over simple SignatureType argument or several | Improvement |
| SIGNATURENET-2628  |  Multiple parallel API calls on digital signing PDF document raise an exception | Bug |
| SIGNATURENET-2445 |  Text search returns no signatures for Word Processing documents with format odt | Bug |

## Public Developer Guide examples changes

Following topics from Developer Guide were added:

*   [Obtain document form fields and signatures information]({{< ref "signature/net/developer-guide/advanced-usage/common/obtain-document-form-fields-and-signatures-information.md" >}})

Following topics from Developer Guide were updated:

*   [Advanced search for Image signatures]({{< ref "signature/net/developer-guide/advanced-usage/searching/advanced-search-for-image-signatures.md" >}})

## Public API and Backward Incompatible Changes

In version 20.2 following public members were added:

*   Main public class [GroupDocs.Signature.Signature](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature) was updated with two new overload **[Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/index)**  methods
    
    *   added overloaded method **[Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/index)** that expects one argument as **[SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype)** value. This method implements searching for specified type of signatures. For example call of this method with argument **[SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype)**. Metadata will search for all document metadata without any additional criteria and return list of [MetadataSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/metadatasignature).
        
        ```csharp
        /// <summary>
        /// Searches for exact type of signatures in the document by <see cref="SignatureType"/> value.
        /// </summary>
        /// <param name="signatureType">The type of signatures to search.</param>
        /// <returns>Returns the list of found signatures with exact type.</returns>
        public List<T> Search<T>(SignatureType signatureType) where T : BaseSignature
        ```
        
    *   added overloaded method **[Search](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/search/index)** that expects variable list or array of **[SignatureType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/signaturetype)** values. This methods implements searching for different signature types without any additional search criteria and returns [SearchResult](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/searchresult) object with list of found signatures.
        
        ```csharp
        /// <summary>
        /// Searches for specified signature types in the document by <see cref="SignatureType"/> value.
        /// </summary>
        /// <param name="signatureTypes">One or several types of sigatures to find.</param>
        /// <returns>Returns instance of <see cref="SearchResult"/> with list of found signatures.</returns>
        public SearchResult Search(params SignatureType[] signatureTypes)
        ```
        
        **Examples:**
        
    
    1.  *How to search for Qr-code signatures in the document.* Following example shows searching for QR Code signatures within the document with simplest Search method.
        
        ```csharp
        using (Signature signature = new Signature("signed.pdf"))
        {
            // search for signatures in document
            List<QrCodeSignature> signatures = signature.Search<QrCodeSignature>(SignatureType.QrCode);
        
            Console.WriteLine($"\nSource document contains following signatures.");
            foreach (var qrCodeSignature in signatures)
            {
                Console.WriteLine($"QRCode signature found at page {qrCodeSignature.PageNumber} with type {qrCodeSignature.EncodeType.TypeName} and text {qrCodeSignature.Text}");
            }
        }
        ```
        
    2.  *How to search for multiple Qr-code and Barcode signatures in the document.* Following example shows searching for signatures using new Search method.
        
        ```csharp
        using (Signature signature = new Signature("signed.pdf"))
        {
            // search for signatures in document
            SearchResult result = signature.Search(SignatureType.Text, SignatureType.Barcode, SignatureType.QrCode, SignatureType.Metadata);
            if (result.Signatures.Count > 0)
            {
                Console.WriteLine($"\nSource document contains following signatures.");
                foreach (var resSignature in result.Signatures)
                {
                    Console.WriteLine($"Signature found at page {resSignature.PageNumber} with type {resSignature.SignatureType} and Id#: {resSignature.SignatureId}");
                }
            }
            else
            {
                Console.WriteLine("No one signature was found.");
            }                
        }
        ```
        
*   New public class [GroupDocs.Signature.Domain.ComboboxFormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/comboboxformfieldsignature) was added to implement Combo Box Form Field signatures for PDF and Word processing Documents.
    
    This class is supported only as information about existing document Form Fields obtained over [GetDocumentInfo method](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/getdocumentinfo).
    
    ```csharp
    /// <summary>
    /// Contains combo-box input form field signature properties.
    /// </summary>
    public sealed class ComboboxFormFieldSignature : FormFieldSignature
    {
    }
    ```
    
*   Public interface [GroupDocs.Signature.Domain.IDocumentInfo](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/idocumentinfo) and public class that implements this interface  [GroupDocs.Signature.Domain.DocumentInfo](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/documentinfo) were updated with new properties
    
    *   property **TextSignatures** as list of [TextSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/textsignature) returns document text signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **ImageSignatures** as list of [ImageSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagesignature) keeps document image signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **DigitalSignatures** as list of [DigitalSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/digitalsignature) keeps document digital signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **BarcodeSignatures** as list of [BarcodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/barcodesignature) keeps document barcode signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **QrCodeSignatures** as list of [QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature) keeps document Qr-code signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **FormFieldSignatures** as list of [FormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) keeps document form field signatures previously added over [Sign](https://apireference.groupdocs.com/net/signature/groupdocs.signature/signature/methods/sign/index) method;
    *   property **FormFields** as list ofof [FormFieldSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/formfieldsignature) keeps all supported existing document forms fields no matter if these fields were added over Signature library or third party software.
    
    ```csharp
    /// <summary>
    /// Collection of document text signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<TextSignature> TextSignatures { get; }
    /// <summary>
    /// Collection of document image signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<ImageSignature> ImageSignatures { get; }
    /// <summary>
    /// Collection of document digital signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<DigitalSignature> DigitalSignatures { get; }
    /// <summary>
    /// Collection of document barcode signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<BarcodeSignature> BarcodeSignatures { get; }
    /// <summary>
    /// Collection of document QR-code signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<QrCodeSignature> QrCodeSignatures { get; }
    /// <summary>
    /// Collection of document Form Field signatures added or updated by <see cref="Signature"/> methods.
    /// </summary>
    IList<FormFieldSignature> FormFieldSignatures { get; }
    /// <summary>
    /// Collection of all existing supported Form Fields in the document. This property is supported only for Pdf and Word Processing document types.
    /// </summary>
    IList<FormFieldSignature> FormFields { get; }
    ```
    
Few example [Obtain document form fields and signatures information]({{< ref "signature/net/developer-guide/advanced-usage/common/obtain-document-form-fields-and-signatures-information.md" >}})
    
*   Public class [GroupDocs.Signature.Domain.ImageSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/imagesignature) was updated with changes as follow
    
    *   new property **Format** of type [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) was added to specify the original image data format;
    *   new property **byte\[\] Content** was added to keep original image raw data content
    
    Since 20.2 version there's ability to grab content of image signatures. To enable this feature the property [ReturnContent](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions/properties/returncontent)  of [ImageSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions) must be set to true. Also there is ability to specify output image content format type over property [ReturnContentType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions/properties/returncontenttype).
    
    ```csharp
    /// <summary>
    /// Contains Image signature properties.
    /// </summary>
    public class ImageSignature : BaseSignature
    {
        /// <summary>
        /// Specifies the size in bytes of signature image.
        /// </summary>
        public int Size { get; }
       
        /// <summary>
        /// Specifies the format of signature image.
        /// </summary>
        public FileType Format { get; }
    
        /// <summary>
        /// Specifies image binary data content of type <see cref="Format"/>.
        /// By default this property will not be set.
        /// Use property <see cref="ImageSearchOptions.ReturnContent"/> to enable this feature.
        /// </summary>
        public byte[] Content { get; }
    }
    ```
    
    Following example shows how to search for Image signatures in the PDF document and grab images content.
    
    ```csharp
    using (Signature signature = new Signature("signed.pdf"))
    {
        // setup search options
        ImageSearchOptions searchOptions = new ImageSearchOptions()
        {
            // enable grabbing image content feature
            ReturnContent = true,
            // set minimum size if needed
            MinContentSize = 0,
            // set maximum size if needed
            MaxContentSize = 0,                    
            // specify exact image type to be returned
            ReturnContentType = FileType.JPEG,                                   
        };
        // search document
        List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
        Console.WriteLine($"\nSource document contains following image signature(s).");
        // output signatures
        foreach (ImageSignature imageSignature in signatures)
        {
            Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
            Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
        }
        //Save signature images
        string outputPath = "Output";
        if (!Directory.Exists(outputPath))
        {
            Directory.CreateDirectory(outputPath);
        }
        foreach (ImageSignature imageSignature in signatures)
        {
            Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
            Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
            string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{imageSignature.Format.Extension}");
            using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
            {
                fs.Write(imageSignature.Content, 0, imageSignature.Content.Length);
            }
        }
    }
    ```
    
*    Public class [ImageSearchOptions](https://apireference.groupdocs.com/net/signature/groupdocs.signature.options/imagesearchoptions) was updated with changes as follow    
    *   New property **bool ReturnConten** was added to specify if returned image signatures objects should keep original or converted (if property **Format** was specified) image raw data. By default this value is set to false.
    *   New property **long MinContentSize** was added to support filtering image signatures by the minimum size of its image content. By default this value is set to 0 and this property does not affect search process.
    *   New property **long MaxContentSize** was added to support filtering image signatures by the maximum size of its image content. By default this value is set to 0 and this property does not affect search process.
    *   New property **ReturnContentType** of [FileType](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/filetype) type was added to specify non default returned image content type. By default this value is set to null that means original image format will be returned.
    
    ```csharp
        /// <summary>
        /// Gets or sets flag to grab image content of signature on document page.
        /// If this flag is set true, image signature content will keep raw image data by required format <see cref="ReturnContentType"/>.
        /// By default this option is disabled.
        /// </summary>
        public bool ReturnContent { get; set; } = false;
    
        /// <summary>
        /// For non zero value this flag specifies minimal size of images for search criteria.
        /// By default this flag is set to zero and does not affect search result.
        /// </summary>
        public long MinContentSize { get; set; } = 0;
        
        /// <summary>
        /// For non zero value this flag specifies maximum size of images for search criteria.
        /// By default this flag is set to zero and does not affect search result.
        /// </summary>
        public long MaxContentSize { get; set; } = 0;
        
        /// <summary>
        /// Specifies file type of returned content of the image signature when ReturnContent property is enabled.
        /// By default it set to Null. That means to return image content in original format. 
        /// This image format is specified at <see cref="ImageSignature.Format"/>
        /// Possible supported values are: FileType.JPEG, FileType.PNG, FileType.BMP. 
        /// If provided format is not supported than image content in original format will be returned.
        /// </summary>
        public FileType ReturnContentType { get; set; } 
    ```
    
    **Example**
    
     Following example demonstrates how to specify Image Search with various options to grab image content
    
    ```csharp
    using (Signature signature = new Signature("signed.pdf"))
    {
        // setup search options
        ImageSearchOptions searchOptions = new ImageSearchOptions()
        {
            // enable grabbing image content feature
            ReturnContent = true,
            // set minimum size if needed
            MinContentSize = 0,
            // set maximum size if needed
            MaxContentSize = 0,                    
            // specify exact image type to be returned
            ReturnContentType = FileType.JPEG,                                   
        };
        // search document
        List<ImageSignature> signatures = signature.Search<ImageSignature>(searchOptions);
        Console.WriteLine($"\nSource document contains following image signature(s).");
        // output signatures
        foreach (ImageSignature imageSignature in signatures)
        {
            Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
            Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
        }
        //Save signature images
        string outputPath = "Output";
        if (!Directory.Exists(outputPath))
        {
            Directory.CreateDirectory(outputPath);
        }
        int i = 0;
        foreach (ImageSignature imageSignature in signatures)
        {
            Console.Write($"Found Image signature at page {imageSignature.PageNumber} and size {imageSignature.Size}.");
            Console.WriteLine($"Location at {imageSignature.Left}-{imageSignature.Top}. Size is {imageSignature.Width}x{imageSignature.Height}.");
            string outputFilePath = System.IO.Path.Combine(outputPath, $"image{i}{imageSignature.Format.Extension}");
            using (FileStream fs = new FileStream(outputFilePath, FileMode.Create))
            {
                fs.Write(imageSignature.Content, 0, imageSignature.Content.Length);
            }
            i++;
        }
    }
    ```
