---
id: groupdocs-signature-for-net-19-5-release-notes
url: signature/net/groupdocs-signature-for-net-19-5-release-notes
title: GroupDocs.Signature for .NET 19.5 Release Notes
weight: 7
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.5{{< /alert >}}

## Major Features

There are few new features, improvements and bug fixes in this regular release. Most features are related to support of djvu format for most service methods, implementation of serialization and encryption of custom data objects into Metadata signatures with ability to extract them back and specify custom serialization and data encryption. Also this release contains some internal security and licensing improvements.

*   Introduced ability to embed custom objects to Metadata Signature for Cells and Words Documents
*   Implemented support to embed custom objects to Metadata Signature for Slides Presentation Documents
*   Added support of custom serialization for Pdf Metadata Signature object
*   Implemented ability of custom data encryption and decryption for embedded objects into Metadata Signature for Pdf Documents
*   Internal improvements of error handling and code updates
*   Fixed data serialization issues with simple data type for QR and Metadata signature

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2020 | Fix exception for de-serialization of encrypted string values in Metadata Signatures | Bug |
| SIGNATURENET-2012 | SaveOptions.OutputFileName doesn't affect on result name of signed document | Bug |
| SIGNATURENET-2008 | PdfQRCodeSignature.GetData<DocumentSignature>() throws exception | Bug |
| SIGNATURENET-2024 | Implement ability to embed custom object to Slides Metadata Signature | New Feature |
| SIGNATURENET-1842 | Implement ability to embed custom object to Words Metadata Signature | New Feature |
| SIGNATURENET-1838 | Implement ability to embed custom object to Cells Metadata Signature | New Feature |
| SIGNATURENET-2014 | Implement support of .djvu file format for verification process | Improvement |
| SIGNATURENET-2013 | Implement ability to search files with .djvu format as image documents | Improvement |
| SIGNATURENET-2007 | Implement ability to sign files with .djvu format as image documents | Improvement |
| SIGNATURENET-1980 | Implement new method AddSignature for MetadataOptions | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.5. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **GroupDocs.Signature.Options.WordsMetadataSignOptions**  
    Public class **WordsMetadataSignOptions** was extended with new public method **AddSignature**. Method creates new Words Metadata Signature with passed arguments (name and value), adds signature to list of metadata signatures and returns newly created object as result.
    
    **AddSignature method**
    
    ```csharp
    /// <summary>
    /// Creates new WordsMetadataSignature with passed arguments and adds it to collection.
    /// </summary>
    /// <param name="name">The name of new metadata signature</param>
    /// <param name="value">The value of new metadata signature</param>
    /// <returns>Newly created signature that was added to MetadataSignatures collection</returns>
    public WordsMetadataSignature AddSignature(string name, object value)
    ```
    
    Following example demonstrates signing Words document with Metadata signature using this new method:
    
    **Sign Document with metadata signatures**
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    WordsMetadataSignOptions signOptions = new WordsMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property with encryption
    var msAuth = signOptions.AddSignature("Author", "Mr.Scherlock Holmes");
    msAuth.DataEncryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, "12345", "12345");
    // setup data of document id
    signOptions.AddSignature("DocumentId", Guid.NewGuid().ToString());
    // setup data of sign date
    var msDate = signOptions.AddSignature("SignDate", DateTime.Now);
    msDate.Value = DateTime.Now.Date;
    // setup some integer value
    signOptions.AddSignature("DocDays", 12345);
    // setup data of sign date
    signOptions.AddSignature("SignKoeff", 2.345M);
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMetadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
2.  **GroupDocs.Signature.Options.SlidesMetadataSignOptions**  
    Public class **SlidesMetadataSignOptions** was extended with new public method **AddSignature**. Method creates new Slides Metadata Signature with passed arguments (name and value), adds signature to list of metadata signatures and returns newly created object as result.
    
    **AddSignature method**
    
    ```csharp
    /// <summary>
    /// Creates new SlidesMetadataSignature with passed arguments and adds it to collection.
    /// </summary>
    /// <param name="name">The name of new metadata signature</param>
    /// <param name="value">The value of new metadata signature</param>
    /// <returns>Newly created signature that was added to MetadataSignatures collection</returns>
    public SlidesMetadataSignature AddSignature(string name, object value)
    ```
    
    Following example demonstrates signing Slides document with Metadata signature using this new method:
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    SlidesMetadataSignOptions signOptions = new SlidesMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property with encryption
    var msAuth = signOptions.AddSignature("Author", "Mr.Scherlock Holmes");
    msAuth.DataEncryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, "12345", "12345");
    // setup data of document id
    signOptions.AddSignature("DocumentId", Guid.NewGuid().ToString());
    // setup data of sign date
    var msDate = signOptions.AddSignature("SignDate", DateTime.Now);
    msDate.Value = DateTime.Now.Date;
    // setup some integer value
    signOptions.AddSignature("DocDays", 12345);
    // setup data of sign date
    signOptions.AddSignature("SignKoeff", 2.345M);
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMetadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
3.  **GroupDocs.Signature.Options.PdfMetadataSignOptions**  
    Public class **PdfMetadataSignOptions** was extended with new public method **AddSignature**. Method creates new Pdf Metadata Signature with passed arguments (name and value), adds signature to list of metadata signatures and returns newly created object as result.
    
    **AddSignature method**
    
    ```csharp
    /// <summary>
    /// Creates new PdfMetadataSignature with passed arguments and adds it to collection.
    /// </summary>
    /// <param name="name">The name of new metadata signature</param>
    /// <param name="value">The value of new metadata signature</param>
    /// <returns>Newly created signature that was added to MetadataSignatures collection</returns>
    public PdfMetadataSignature AddSignature(string name, object value)
    ```
    
    Following example demonstrates signing Pdf document with Metadata signature using this new method:
    
    
    
    ```csharp
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
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property with encryption
    var msAuth = signOptions.AddSignature("Author", "Mr.Scherlock Holmes");
    msAuth.DataEncryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, "12345", "12345");
    // setup data of document id
    signOptions.AddSignature("DocumentId", Guid.NewGuid().ToString());
    // setup data of sign date
    var msDate = signOptions.AddSignature("SignDate", DateTime.Now);
    msDate.Value = DateTime.Now.Date;
    // setup some integer value
    signOptions.AddSignature("DocDays", 12345);
    // setup data of sign date
    signOptions.AddSignature("SignKoeff", 2.345M);
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMetadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
4.  GroupDocs.Signature.Options.CellsMetadataSignOptions  
    Public class **CellsMetadataSignOptions** was extended with new public method **AddSignature**. Method creates new Cells Metadata Signature with passed arguments (name and value), adds signature to list of metadata signatures and returns newly created object as result.
    
    **AddSignature method**
    
    ```csharp
    /// <summary>
    /// Creates new CellsMetadataSignature with passed arguments and adds it to collection.
    /// </summary>
    /// <param name="name">The name of new metadata signature</param>
    /// <param name="value">The value of new metadata signature</param>
    /// <returns>Newly created signature that was added to MetadataSignatures collection</returns>
    public CellsMetadataSignature AddSignature(string name, object value)
    ```
    
    Following example demonstrates signing Cells document with Metadata signature using this new method:
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    CellsMetadataSignOptions signOptions = new CellsMetadataSignOptions();
    // Specify different Metadata Signatures and add them to options sigature collection
    // setup Author property with encryption
    var msAuth = signOptions.AddSignature("Author", "Mr.Scherlock Holmes");
    msAuth.DataEncryption = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, "12345", "12345");
    // setup data of document id
    signOptions.AddSignature("DocumentId", Guid.NewGuid().ToString());
    // setup data of sign date
    var msDate = signOptions.AddSignature("SignDate", DateTime.Now);
    msDate.Value = DateTime.Now.Date;
    // setup some integer value
    signOptions.AddSignature("DocDays", 12345);
    // setup data of sign date
    signOptions.AddSignature("SignKoeff", 2.345M);
    // sign document
    string signedPath = handler.Sign<string>("test.xlsx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMetadata" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
5.  Public classes **CellsMetadataSignature, SlidesMetadataSignature, WordsMetadataSignature** were extended with new public property **DataEncryption** of type **IDataEncryption**
    
    **DataEncryption property**
    
    ```csharp
    /// <summary>
    /// Gets or sets implementation of <see cref="IDataEncryption"/> interface to encode and decode signature Value property.
    /// </summary>
    public IDataEncryption DataEncryption { get; set; }
    ```
    
    and overloaded method **public T GetData<T>()**. These methods return object of type T over de-serialization and decryption from Metadata Value.
    
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
    
    Custom data class **DocumentSignature**
    
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
    
    Following example demonstrates signing Words document with Metadata signature with value of custom class **DocumentSignature** object:
    
    **Sign Words Document with custom objects in Metadata**
    
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
    WordsMetadataSignOptions signOptions = new WordsMetadataSignOptions();
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
    WordsMetadataSignature mdDocument = signOptions.AddSignature("DocumentSignature", signature);
    // set encryption
    mdDocument.DataEncryption = encryption;
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMedataDataEncrypted.docx" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Example how to retrieve signed Words document file with **DocumentSignature** Metadata Value (see examples above how to sign Document with custom data objects)
    
    **Search custom object in Metadata**
    
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
    WordsSearchMetadataOptions searchOptions = new WordsSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMedataDataEncrypted.docx", searchOptions);
    // output signatures
    List<WordsMetadataSignature> signatures = result.ToList<WordsMetadataSignature>();
    foreach (WordsMetadataSignature signature in signatures)
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
    
    Following example demonstrates signing Cells document with Metadata signature with value of  DocumentSignature object:
    
    **Sign Cells Document with custom objects in Metadata**
    
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
    CellsMetadataSignOptions signOptions = new CellsMetadataSignOptions();
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
    CellsMetadataSignature mdDocument = signOptions.AddSignature("DocumentSignature", signature);
    // set encryption
    mdDocument.DataEncryption = encryption;
     
    // sign document
    string signedPath = handler.Sign<string>("test.xlsx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMedataDataEncrypted.xlsx" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Example how to retrieve signed Cells document file with **DocumentSignature** Metadata Value (see examples above how to sign Document with custom data objects)
    
    **Search custom object in Metadata**
    
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
    CellsSearchMetadataOptions searchOptions = new CellsSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMedataDataEncrypted.xlsx", searchOptions);
    // output signatures
    List<CellsMetadataSignature> signatures = result.ToList<CellsMetadataSignature>();
    foreach (CellsMetadataSignature signature in signatures)
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
    
    Following example demonstrates signing Slides document with Metadata signature with value of  DocumentSignature object:
    
    **Sign Cells Document with custom objects in Metadata**
    
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
    SlidesMetadataSignOptions signOptions = new SlidesMetadataSignOptions();
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
    SlidesMetadataSignature mdDocument = signOptions.AddSignature("DocumentSignature", signature);
    // set encryption
    mdDocument.DataEncryption = encryption;
     
    // sign document
    string signedPath = handler.Sign<string>("test.pptx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedMedataDataEncrypted.pptx" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Example how to retrieve signed Slides document file with **DocumentSignature** Metadata Value (see examples above how to sign Document with custom data objects)
    
    **Search custom object in Metadata**
    
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
    SlidesSearchMetadataOptions searchOptions = new SlidesSearchMetadataOptions();
    // search document
    SearchResult result = handler.Search("SignedMedataDataEncrypted.pptx", searchOptions);
    // output signatures
    List<SlidesMetadataSignature> signatures = result.ToList<SlidesMetadataSignature>();
    foreach (SlidesMetadataSignature signature in signatures)
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
