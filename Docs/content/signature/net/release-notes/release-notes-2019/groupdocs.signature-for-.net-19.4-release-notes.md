---
id: groupdocs-signature-for-net-19-4-release-notes
url: signature/net/groupdocs-signature-for-net-19-4-release-notes
title: GroupDocs.Signature for .NET 19.4 Release Notes
weight: 8
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.4{{< /alert >}}

## Major Features

There are few new features, and bug fixes in this regular release. Most features are related to improvement for Pdf Metadata signatures with ability to embed into document Metadata data objects with custom serialization and data encryption.

*   Introduced ability to embed custom objects to Metadata Signature for Pdf Documents
*   Added support of custom serialization for Pdf Metadata Signature object
*   Implemented ability of custom data encryption and decryption for embedded objects into Metadata Signature for Pdf Documents
*   Internal improvements of error handling and code updates
*   Fixed data serialization issues with simple data type for QR and Metadata signature

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-1981 | Data serialization routines fail on simple data types and strings | Bug |
| SIGNATURENET-1979 | Implement ability to encrypt and decrypt Pdf Metadata Signature values | New Feature |
| SIGNATURENET-1978 | Implement ability to serialize Pdf Metadata Signature value | New Feature |
| SIGNATURENET-1833 | Implement ability to embed custom object to Pdf Metadata Signature | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.4. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  Public class **PdfMetadataSignature** was extended with new public property **DataEncryption** of type **IDataEncryption**
    
    **DataEncryption property**
    
    ```csharp
    /// <summary>
    /// Gets or sets implementation of <see cref="IDataEncryption"/> interface to encode and decode signature Value properties.
    /// </summary>
    public IDataEncryption DataEncryption { get; set; }
    ```
    
    and overloaded method **public T GetData<T>()**. These methods return object of type T over de-erialization and decryption from Metadata Value.
    
    **GetData<T>() method**
    
    ```csharp
    /// <summary>
    /// Obtain object from Metadata Signature Value over de-serialization and decryption
    /// </summary>
    /// <typeparam name="T">Type of object to deserialize from Metadata value</typeparam>
    /// <returns></returns>
    public T GetData<T>() where T : class
     
    /// <summary>
    /// Obtain object from Metadata Signature Value over deserialization.
    /// </summary>
    /// <typeparam name="T">Type of object to deserialize from Metadata Value</typeparam>
    /// <param name="dataEncryption">Set custom data encryption implementation</param>
    /// <returns></returns>
    public T GetData<T>(IDataEncryption dataEncryption) where T : class
    ```
    
    Following example demonstrates signing Pdf document with Metadata signature with value of  **DocumentSignature** object:
    
    **Sign Document with custom object**
    
    ```csharp
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    PdfMetadataSignOptions signOptions = new PdfMetadataSignOptions();
    // create custom object
    DocumentSignature signature = new DocumentSignature()
    {
        ID = Guid.NewGuid().ToString(),
        Author = Environment.UserName,
        Signed = DateTime.Now,
        DataFactor = 11.22M
    };
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property
    PdfMetadataSignature mdDocument = new PdfMetadataSignature("DocumentSignature", signature);
    // set encryption
    mdDocument.DataEncryption = encryption;
    // add signatures to options
    signOptions.MetadataSignatures.Add(mdDocument);
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMedataDataEncrypted.pdf" });
    Console.WriteLine("Signed file path is: " + signedPath); 
    ```
    
    Class **DocumentSignature** written by user:
    
    **Example of custom class**
    
    ```csharp
    public class DocumentSignature
    {
        // specify SkipSerialization attribute to skip this field on serialization
        [SkipSerialization]
        public string Version { get; set; }
        // specify SkipSerialization attribute to skip this field on serialization
        [SkipSerialization]
        public bool IsProcessed { get; set; }
        [Format("SignatureID")]
        public string ID { get; set; }
        [Format("Author")]
        public string Author { get; set; }
        [Format("SignatureDate","yyyy-MM-dd")]
        public DateTime Signed { get; set; }
        [Format("Factor", "N2")]
        public decimal DataFactor { get; set; }
    }
    ```
    
    Example how to retrieve signed Pdf file with **DocumentSignature** Metadata Value (see examples above how to sign Document with custom data objects)
    
    **Search for custom objects**
    
    ```csharp
    // setup key and pasphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
    	StoragePath = @"c:\Aspose\Test\Storage",
    	OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    PdfSearchMetadataOptions searchOptions = new PdfSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMedataDataEncrypted.pdf", searchOptions);
    // output signatures
    List<PdfMetadataSignature> signatures = result.ToList<PdfMetadataSignature>();
    foreach (PdfMetadataSignature signature in signatures)
    {
    	if (signature != null && signature.Name.Equals("DocumentSignature"))
    	{
    		DocumentSignature docSignature = signature.GetData<DocumentSignature>(encryption);
    		if (docSignature != null)
    		{
    			Console.WriteLine("Found DocumentSignature signature: #{0}. Author {1} from {2}. Factor: {3}", 
    			  docSignature.ID, docSignature.Author, docSignature.DataFactor, docSignature.DataFactor);
    		}
    	}
    }
    ```
