---
id: groupdocs-signature-for-net-18-5-release-notes
url: signature/net/groupdocs-signature-for-net-18-5-release-notes
title: GroupDocs.Signature for .NET 18.5 Release Notes
weight: 9
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 18.5{{< /alert >}}

## Major Features

There are about more than ten improvements, new features and fixes in this regular release. Most new features are related to ability to serialize and encrypt text or objects of QR-Code Signatures with standard or custom encryption implementation. The most notable changes are:

*   Introduced ability to encrypt QR-Code content with standard symmetric algorithm implementations
*   Implemented property of QR-Code Signature Options to specify custom encryption algorithm
*   Involved support of new Cells file formats (ots, xltx, xltm)
*   Added ability to specify custom serialization for QR-Code Signature object over attributes or by Options property
*   Implemented support of CRT and CER file format for verification of digital Signatures for all supported Document types
*   Fixed exception when accessing Pdf document without specified metadata
*   Updated calculation for processing pages for Cells documents  
      
    

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-3461 | Implement standard symmetric algorithm for QRCode Signature data encryption | New Feature |
| SIGNATURENET-3460 | Extend QRCode Signature to specify custom encryption dynamically | New Feature |
| SIGNATURENET-3424 | Add ability to process new Cells file formats (ots, xltx, xltm) | New Feature |
| SIGNATURENET-3422 | Implement custom encryption for embedded QR Code Signature | New Feature |
| SIGNATURENET-3417 | Implement custom serialization for embedded objects in QR Code Signature | New Feature |
| SIGNATURENET-3470 | Implement support of CRT and CER digital certificates files types for Verification | Improvement |
| SIGNATURENET-3473 | Tests for digital PDF signatures are failed with message "PKCS#1 does not support ocsp, timestamp settings, use PKCS#7" | Bug |
| SIGNATURENET-3472 | Add messages for exceptions that were thrown during making certificate objects for digital signatures | Bug |
| SIGNATURENET-3469 | Exception when accessing Pdf document without specified metadata | Bug |
| SIGNATURENET-3170 | Incorrect number of pages calculation for all Cells Options | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 18.5. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **Introduced ability to provide custom serialization of objects into QR-Code Signature** for all supported Document types. Objects of any class can be used to embedded it to QRCode Signature. Optional few attributes can be used to specify names and format of data for objects serialization. New interface **IDataSerializer** was added to provide ability for custom serialization. This interface currently supported by attributes of class. Custom serialization requires  implementation of IDataSerializer interface into Attribute class.
    
    **IDataSerializer implementation**
    
    ```csharp
    /// <summary>
    /// Serialization interface to provide object serialization and deserialization methods.
    /// </summary>
    public interface IDataSerializer
    {
        /// <summary>
        /// Serialize method to format object to string representing.
        /// </summary>
        /// <param name="data">Source object to serialize</param>
        /// <returns></returns>
        string Serialize(object data);
        /// <summary>
        /// Deserialize method to obtain required object from string.
        /// </summary>
        /// <typeparam name="T">Type of return object</typeparam>
        /// <param name="source">Source serialized string that contains object</param>
        /// <returns></returns>
        T Deserialize<T>(string source) where T : class;
    }
    ```
    
    1\. Following example demonstrates using interface ****IDataSerializer **** to provide custom serialization of QR-Code objects. As an example class implements IDataSerializer interface over JSON.Net third party library.
    
    
    
    ```csharp
    public class JsonSerializerAttribute: Attribute, IDataSerializer
    {
        public string Serialize(object data)
        {
            return JsonConvert.SerializeObject(data);
        }
        public T Deserialize<T>(string source) where T : class
        {
            return JsonConvert.DeserializeObject<T>(source);
        }
    }
    ```
    
    2\. Using this Attribute on class will allow to serialize and deserialize object of this class into QR-Code Signature
    
    **Serialization attribute, Format and SkipSerialization attributes**
    
    ```csharp
    // Specify Attribute with implementation of custom serialization
    [JsonSerializer]
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
    
2.  QR-Code Signature could be encrypted with standard or custom encryption algorithms. There are several solutions to encrypt Text or Data properties of QR-Code Signature. When using Text property the property **DataEncryption** of **QRCodeSignOptions** should be used to specify encryption algorithm.
    
    **IDataEncryption**
    
    ```csharp
    //// <summary>
    /// Encryption interface to provide object encoding and decoding methods.
    /// </summary>
    public interface IDataEncryption
    {
        /// <summary>
        /// Encode method to encrypt string.
        /// </summary>
        /// <param name="source">Source string to encode.</param>
        /// <returns>Returns enccrypted string</returns>
        string Encode(string source);
        /// <summary>
        /// Decode method to obtain decrypted string.
        /// </summary>
        /// <param name="source">Source string to decode.</param>
        /// <returns>Returns decrypted string</returns>
        string Decode(string source);
    }
    ```
    
    1\. This interface is used to specify over **QRCodeSignature** property DataEncryption the way to secure data in QR-Code on documents.
    
    
    
    ```csharp
    /// <summary>
    /// Gets or sets implementation of <see cref="IDataEncryption"/> interface to encode and decode QR-Code Signature Text or Data properties.
    /// </summary>
    public IDataEncryption DataEncryption { get; set; }
    ```
    
      
    2\. By default Signature library contains implementation of standard symmetric encryption algorithms - DES, TripleDES, RC2 and Rijndael. 
    
    New enumeration type was added to specify type of algorithm
    
    **Symmetric algorithm type enumeration**
    
    ```csharp
    /// <summary>
    /// Represents symmetric encryption algorithm type.
    /// </summary>
    public enum SymmetricAlgorithmType
    {
        /// <summary>Represents DES Data Encryption Standard algorithm.</summary>
        DES = 0,
        /// <summary>Represents TripleDES symmetric encryption algorithm..</summary>
        TripleDES = 1,
        /// <summary>Represents RC2 algorithm.</summary>
        RC2 = 2,
        /// <summary>Represents Rijndael symmetric encryption algorithm.</summary>
        Rijndael = 3,
    }
    ```
    
    3\. New public class **SymmetricEncryption **implements methods of interface **IDataEncryption** and contains property to specify type of encryption algorithm.
    
    **SymmetricEncryption**
    
    ```csharp
    namespace GroupDocs.Signature.Domain.Extensions
    {
        /// <summary>
        /// Implements standard symmetric algorithms for data encryption with single key and passphrase (salt).
        /// </summary>
        public sealed class SymmetricEncryption : IDataEncryption
        {
            /// <summary>
            /// Gets or sets type of symmetric algorithm.
            /// </summary>
            public SymmetricAlgorithmType AlgorithmType { get; set; }
     
            /// <summary>
            /// Gets or sets key of encryption algorithm.
            /// </summary>
            public string Key { get; set; }
     
            /// <summary>
            /// Gets or sets passphrase of encryption algorithm.
            /// </summary>
            public string Salt { get; set; }
     
            /// <summary>
            /// Creates symmetric encryption algorithm with parameters.
            /// </summary>
            /// <param name="algorithmType">Specify symmetric algorithm type</param>
            /// <param name="key">Encryption key</param>
            /// <param name="salt">Passphrase for encryption</param>
            public SymmetricEncryption(SymmetricAlgorithmType algorithmType, string key, string salt);
             
            /// <summary>
            /// Creates symmetric encryption algorithm with default passphrase
            /// </summary>
            /// <param name="algorithmType">Specify symmetric algorithm type</param>
            /// <param name="key">Encryption key</param>
            public SymmetricEncryption(SymmetricAlgorithmType algorithmType, string key);
          
            /// <summary>
            /// Encrypts string based on provided algorithm type, key and salt parameters
            /// </summary>
            /// <param name="source">Source string to encode.</param>
            /// <returns>Returns encrypted string.</returns>
            public string Encode(string source);
             
            /// <summary>
            /// Decrypts string based on provided algorithm type, key and salt parameters
            /// </summary>
            /// <param name="source"></param>
            /// <returns>Returns decrypted string.</returns>
            public string Decode(string source);
        }
    }
    ```
    
3.  **Encryption of Text property of QR-Code Signature**
    
    Following example demonstrates how to encrypt Text property of QR-Code Signature. Use property **DataEncryption** of **QRCodeSignOptions** to specify encryption algorithm.
    
    **Encrypt Text property of QR-Code Signature**
    
    ```csharp
    // setup key and passphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encrypter = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
     
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions("This is private text to be secured.");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.QR;
    // specify text encryption
    signOptions.DataEncryption = encrypter;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedQRCodeTextEncrypted.pdf" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Search original Text from encrypted QR-Code Signature in signed Document
    
    **Search encrypted Text**
    
    ```csharp
    // setup key and pasphrase
    string key = "1234567890";
    string salt = "1234567890";
    // create data encryption
    IDataEncryption encrypter = new SymmetricEncryption(SymmetricAlgorithmType.Rijndael, key, salt);
     
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup search options
    PdfSearchQRCodeOptions searchOptions = new PdfSearchQRCodeOptions();
    // specify as true to search all pages of a document
    searchOptions.SearchAllPages = false;
    // setup encrypter to retrieve original text
    searchOptions.DataEncryption = encrypter;
    // search document
    SearchResult result = handler.Search("SignedQRCodeTextEncrypted.pdf", searchOptions);
    // output signatures
    foreach (BaseSignature signature in result.Signatures)
    {
        PdfQRCodeSignature qrCodeSignature = signature as PdfQRCodeSignature;
        if (qrCodeSignature != null)
        {
            Console.WriteLine("Found QRCode signature: {0} with text {1}", qrCodeSignature.EncodeType.TypeName, qrCodeSignature.Text);
        }
    }
    ```
    
4.  **Custom data object encryption. Using Data property of QR-Code Signature**
    
    Following example demonstrates how to encrypt custom object of Data property of QR-Code Signature. Use property **DataEncryption **of **QRCodeSignOptions **to specify encryption algorithm and **Data** property to setup data object.
    
    
    
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
    
5.  ** Custom encryption implementation for signing and search**  
    Custom implementation requires class that implements GroupDocs.Signature.Domain.Extensions.IDataEncryption interface. Following example demonstrates simple XOR encryption method to encrypt and decrypt data.
    
    **IDataEncryption implementation**
    
    ```csharp
    public class CustomXOREncryption : IDataEncryption
    {
        /// <summary>
        /// Gets or sets non empty key for encryption (at least one character)
        /// </summary>
        public int Key { get; set; }
     
        /// <summary>
        /// Encode method to encrypt string.
        /// </summary>
        /// <param name="source">Source string to encode.</param>
        /// <returns>Returns enccrypted string</returns>
        public string Encode(string source)
        {
            return Process(source);
        }
        /// <summary>
        /// Decode method to obtain decrypted string.
        /// </summary>
        /// <param name="source">Source string to decode.</param>
        /// <returns>Returns decrypted string</returns>
        public string Decode(string source)
        {
            return Process(source);
        }
        /// <summary>
        /// Using XOR operation get encoded / decoded string
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        private string Process(string source)
        {
            StringBuilder src = new StringBuilder(source);
            StringBuilder dst = new StringBuilder(src.Length);
            char chTmp;
            char chKey;
            for (int index = 0; index < src.Length; ++index)
            {
                chTmp = src[index];
                chTmp = (char)(chTmp ^ this.Key);
                dst.Append(chTmp);
            }
            return dst.ToString();
        }
    }
    ```
    
    Using this class allows to specify custom encryption when using **Text** property of QR-Code Signature
    
    
    
    ```csharp
    // create data encryption
    IDataEncryption encrypter = new CustomXOREncryption();
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    // instantiating the signature handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions("This is private text to be secured.");
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.QR;
    // specify text encryption
    signOptions.DataEncryption = encrypter;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedQRCodeTextCustomEncrypted.pdf" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    
    Using same algorithm on custom data object as Attribute of class definition or **DataEncryption** property
    
    **Custom Data Object**
    
    ```csharp
    [SymmetricEncryption(SymmetricAlgorithmType.Rijndael, "1234567890", "1234567890")]
    public class DocumentSignature
    {
        [Format("SignID")]
        public string ID { get; set; }
        [Format("SAuth")]
        public string Author { get; set; }
        [Format("SDate", "yyyy-MM-dd")]
        public DateTime Signed { get; set; }
        [Format("SDFact", "N2")]
        public decimal DataFactor { get; set; }
    }
    ```
    
    Creating QR-Code Signature with Encryption attribute or setup encryption dynamically
    
    **Setup Custom Encryption**
    
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
    PdfQRCodeSignOptions signOptions = new PdfQRCodeSignOptions();
    // QR-code type
    signOptions.EncodeType = QRCodeTypes.QR;
    signOptions.DataEncryption = new CustomXOREncryption();
    // create custom object
    DocumentSignature signature = new DocumentSignature()
    {
        ID = Guid.NewGuid().ToString(),
        Author = Environment.UserName,
        Signed = DateTime.Now,
        DataFactor = 11.22M
    };
    // specify Data object instance
    signOptions.Data = signature;
    // sign document
    string signedPath = handler.Sign<string>("test.pdf", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "SignedQRCodeDataEncrypted.pdf" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
