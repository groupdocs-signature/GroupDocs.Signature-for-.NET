---
id: groupdocs-signature-for-net-19-12-release-notes
url: signature/net/groupdocs-signature-for-net-19-12-release-notes
title: GroupDocs.Signature for .NET 19.12 Release Notes
weight: 2
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.12{{< /alert >}}

## Major Features

With this release we are glad to announce updated signature objects life cycle and entire different process methods for **Signature** class. Now **Signature** class supports classic CRUD (Create-Read-Update-Delete) operations set.

*   **Sign** method **creates** signatures inside document and returns them as result with all properties along with new signature identifier property;
*   **Search** method **reads** a list of existing document signatures;
*   **Update** method **modifies** existing document signature(s) by identifier and stores changes in the same document;
*   **Delete** method removes signature(s) from the document.

Here are few concepts that will help to understand changes in this release more precisely:

*   **Sign** process returns list of newly created signatures (as list of BaseSignature objects); When signing metadata layer is created inside the document to keep all signatures information: total signatures quantity, signature properties like unique identifier, location, size etc.;
*   **BaseSignature** class was extended with **SignatureId** string property that represents unique signature identifier inside the document;
*   **BaseSignature** class boolean property **IsSignature** was added to distinct signatures and native document components like text / images / barcodes / qr-codes etc.  
      
All changes described above allows to hide signatures for document preview and exclude non signatures upon search.

The most notable changes:

*   Retrieve collection of created signatures after signing document;
*   Added signature identifier to distinct them in document;
*   Implemented an ability to search for signatures only and exclude other document content from search;
*   Introduced an ability to hide signatures from document preview;
*   Implemented an ability to modify existing document signatures;
*   Added a feature to remove signatures from document;
*   Fixed few bugs.
*   Different signature type classes were updated with ability to compare and clone.
*   Fix known limitation with unsupported digital signatures for Spreadsheet documents under .Net Standard 2.0

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2453 | Implement ability to search only for signatures marked as IsSignature | New Feature |
| SIGNATURENET-2426 | Implement result of Sign method as SignResult class with newly created signatures list | New Feature |
| SIGNATURENET-2394 | Implement ability to hide signatures from Document Preview | New Feature |
| SIGNATURENET-2391 | Implement Delete method to remove existing document signatures | New Feature |
| SIGNATURENET-2326 | Implement Update method to modify existing document signatures | New Feature |
| SIGNATURENET-2473 | Implement support of Digital signatures for Spreadsheet document under .NET Standard 2.0 framework | Improvement |
| SIGNATURENET-2472 | Improve method ToList<T> of SearchResult to return only non null instances | Improvement |
| SIGNATURENET-2434 | Provide ICloneable interface implementation for all signature types | Improvement |
| SIGNATURENET-2431 | Override Equals / GetHashCode methods for all signatures to have compare ability | Improvement |
| SIGNATURENET-2425 | Generate new ProjectGuid and UpgradeCode for MSI package | Improvement |
| SIGNATURENET-2404 | Implement support enumeration type properties of embedded custom objects for QR-Code signatures | Improvement |
| SIGNATURENET-2403 | Improve exceptions usage | Improvement |
| SIGNATURENET-2387 | Allow adding Digital signatures to already signed Spreadsheet documents without removing previous signatures | Improvement |
| SIGNATURENET-1465 | Implement exceptions for required or incorrect password when load document | Improvement |
| SIGNATURENET-2400 | SaveOptions value OverwriteExistingFile with default value as false to prevent saving to the same file | Bug |
| SIGNATURENET-2382 | Compatibility issues under .NET Standard 2.0 | Bug |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.12. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  **GroupDocs.Signature.Domain.BarcodeSignature**
    
    Public class **BarcodeSignature** was updated with changes as follow
    
    *   property**EncodeType** was marked as read-only
    *   property **Text** was marked as read-only
    *   new public constructor **BarcodeSignature**(**string signatureId**) was added with string argument as unique signature identifier that could obtained by **Search** or **Sign** methods. Its value provides unique signature identification. When signing document, **Sign** method returns newly created signatures with this property set. So once signature was added to the document it can be identified by assigned **SignatureId** property. The same is true for document Search.
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing instance of object.
    *   method **Equals** was overridden to support object equals checking
    
    Since 19.12 version there's ability to manipulate signatures like updating its properties or remove signatures from the document. To provide signature identification unique identifier was added. Newly added constructor allows to create signature with this identifier.
    
    **Updated class BarcodeSignature with EncodeType, Text properties and constructor**
    
    ```csharp
    /// <summary>
    /// Contains Barcode Signature properties.
    /// </summary>
    public class BarcodeSignature : BaseSignature
    {
        /// <summary>
        /// Specifies the Barcode Encode Type.
        /// </summary>
        public BarcodeType EncodeType { get; }
        /// <summary>
        /// Specifies text of Barcode.
        /// </summary>
        public string Text { get; }
        /// <summary>
    
        /// Initialize BarcodeSignature object with signature identifier that was obtained after search process.
        /// This unique identifier is used to find additional properties for this signature from document signature information layer.
        /// </summary>
        /// <param name="signatureId">Unique signature identifier obtained by Sign or Search method of Signature class.</param>
        public BarcodeSignature(string signatureId);
    ```
    
    Example:
    
    Following example demonstrates using **Update** method with **BarcodeSignature** created by known Signature Id value:
    
    **Update Barcode Signature in the document by known signature id**
    
    ```csharp
    // initialize Signature instance
    using (Signature signature = new Signature(outputFilePath))
    {
        // read from some data source signature Id value
        string signatureId = "47512fb5cf71477dbecc4170ec918860";
        BarcodeSignature barcodeSignature = new BarcodeSignature(signatureId)
        {
            Left = 100,
            Top = 100,
            Width = 200,
            Height = 200,
            IsSignature = false
        };
        bool result = signature.Update(barcodeSignature);
        if (result)
        {
            Console.WriteLine($"Signature with Barcode '{barcodeSignature.Text}' and encode type '{barcodeSignature.EncodeType.TypeName}' was updated.");
        }
        else
        {
            Console.WriteLine($"Signature was not updated in the document! It was not found!");
        }
    }
    ```
    
2.  **GroupDocs.Signature.Domain.QrCodeSignature**  
    
    Public class **QrCodeSignature** was updated with changes as follow:
    
    *   property**EncodeType** was marked as read-only
    *   property **Text** was marked as read-only
    *   new public constructor **QrCodeSignature**(**string signatureId**) was added with string argument as unique signature identifier that could be obtained by **Search** or **Sign** methods. Its value provides unique signature identification. When signing document, **Sign** method returns newly created signatures with this property set. So once signature was added to the document it can be identified by assigned **SignatureId** property. The same is true for document Search.
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing object instance.
    *   method **Equals** was overridden to support object equality checking.
    
    Since 19.12 version there's an ability to manipulate signatures like updating its properties or remove signatures from the document. To provide signature identification unique identifier was added. Newly added constructor allows to create signature with this identifier.
    
    **Updated class QrCodeSignature with EncodeType, Text properties and constructor**
    
    ```csharp
    /// <summary>
    /// Contains Qr-code Signature properties.
    /// </summary>
    public class QrCodeSignature : BaseSignature
    {
        /// <summary>
        /// Specifies the Barcode Encode Type.
        /// </summary>
        public QrCodeType EncodeType { get; }
        /// <summary>
        /// Specifies text of QR-code.
        /// </summary>
        public string Text { get; }
        /// <summary>
    
        /// Initialize QrCodeSignature object with signature identifier that was obtained after search process.
        /// This unique identifier is used to find additional properties for this signature from document signature information layer.
        /// </summary>
        /// <param name="signatureId">Unique signature identifier obtained by Sign or Search method of Signature class.</param>
        public QrCodeSignature(string signatureId);
    ```
    
    Following example demonstrates using **Delete** method with **QrCodeSignature** created by known Signature Id value;
    
    **Update QR-code Signature in the document by known signature id**
    
    ```csharp
    // initialize Signature instance
    using (Signature signature = new Signature(outputFilePath))
    {
        // read from some data source signature Id value
        string signatureId = "47512fb5cf71477dbecc4170ec918860";
        QrCodeSignature qrCodeSignature = new QrCodeSignature(signatureId);
        bool result = signature.Delete(qrCodeSignature);
        if (result)
        {
            Console.WriteLine($"Signature with QR-Code '{qrCodeSignature.Text}' and encode type '{qrCodeSignature.EncodeType.TypeName}' was deleted.");
        }
        else
        {
            Console.WriteLine("Signature was not found!");
        }
    }
    ```
    
3.  **GroupDocs.Signature.Domain.DigitalSignature**  
    
    Public class **DigitalSignature** was updated with changes as follow    
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing object instance;
    *   method **Equals** was overridden to support object equality checking.
4.  **GroupDocs.Signature.Domain.ImageSignature**  
    
    Public class **ImageSignature** was updated with changes as follow
    
    *   property **int Size** was marked as read-only
    *   new public constructor **ImageSignature**(**string signatureId**) was added with string argument as unique signature identifier that could be obtained by **Search** or **Sign** methods. Its value provides unique signature identification. When signing document, **Sign** method returns newly created signatures with this property set. So once signature was added to the document it can be identified by assigned **SignatureId** property. The same is true for document Search.
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing object instance.
    *   method **Equals** was overridden to support object equality checking
    
    Since 19.12 version there's ability to manipulate signatures like updating its properties or remove signatures from the document. To provide signature identification unique identifier was added. Newly added constructor allows to create signature with this identifier.
    
    **Updated class ImageSignature with Size property and constructor**
    
    ```csharp
    /// <summary>
    /// Contains Image signature properties.
    /// </summary>
    public class ImageSignature 
    {
            /// <summary>
            /// Specifies the size in bytes of signature image.
            /// </summary>
            public int Size { get; }
    
            /// <summary>
            /// Initialize ImageSignature object with signature identifier that was obtained after search process.
            /// This unique identifier is used to find additional properties for this signature from document signature information layer.
            /// </summary>
            /// <param name="signatureId">Unique signature identifier obtained by Sign or Search method of Signature class.</param>
            public ImageSignature(string signatureId);
     }
    ```
    
    Following example demonstrates using **Update** method with **ImageSignature**
    
    **Update Image Signature in the document**
    
    ```csharp
    // initialize Signature instance
    using (Signature signature = new Signature("sample_signed.pdf"))
    {
        ImageSearchOptions options = new ImageSearchOptions();
        // search for image signatures in document
        List<ImageSignature> signatures = signature.Search<ImageSignature>(options);
        if (signatures.Count > 0)
        {
            ImageSignature imageSignature = signatures[0];
            bool result = signature.Update(imageSignature);
            if (result)
            {
                Console.WriteLine($"Image signature at {imageSignature.Left}x{imageSignature.Top} and Size {imageSignature.Size}' was updated");
            }
            else
            {
                Console.WriteLine($"Signature was not updated in the document! It was not found!");
            }
        }
    }
    ```
    
5.  **GroupDocs.Signature.Domain.MetadataSignature**  
    
    Public class **MetadataSignature** was updated with changes as follow:
    
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing object instance.
    *   method **Equals** was overridden to support object equality checking.
6.  **GroupDocs.Signature.Domain.TextSignature**  
    
    Public class **TextSignature** was updated with changes as follow:
    
    *   property **Text** was marked as editable and now it can be changed when modifying signatures
    *   property **TextSignatureImplementation SignatureImplementation** was marked as read-only since current signature class does not support changing implementation of Text Signature.        
    *   new public constructor **TextSignature**(**string signatureId**) was added with string argument as unique signature identifier that could be obtained by **Search** or **Sign** methods. Its value provides unique signature identification. When signing document, **Sign** method returns newly created signatures with this property set. So once signature was added to the document it can be identified by assigned **SignatureId** property. The same is true for document Search.
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing object instance.
    *   method **Equals** was overridden to support object equality checking.
    
    Since 19.12 version there's an ability to manipulate signatures like updating its properties or remove signatures from the document. To provide signature identification unique identifier was added. Newly added constructor allows to create signature with this identifier.
    
    **Updated class TextSignature with constructor**
    
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
        public TextSignatureImplementation SignatureImplementation { get; }
    
        /// <summary>
        /// Initialize TextSignature object with signature identifier that was obtained after search process.
        /// This unique identifier is used to find additional properties for this signature from document signature information layer.
        /// </summary>
        /// <param name="signatureId">Unique signature identifier obtained by sign or search method.</param>
        public TextSignature(string signatureId);
    }
    ```
    
    Following example demonstrates using **Update** method with **TextSignature** obtained from Search method
    
    **Update Text Signature in the document after Search**
    
    ```csharp
    using (Signature signature = new Signature("sampleSigned.xlsx"))
    {
        TextSearchOptions options = new TextSearchOptions();
        // search for text signatures in document
        List<TextSignature> signatures = signature.Search<TextSignature>(options);
        
        if(signatures.Count > 0)
        {
            TextSignature textSignature = signatures[0];
            // change Text property
            textSignature.Text = "John Walkman";
            // change position
            textSignature.Left = textSignature.Left + 10;                    
            textSignature.Top = textSignature.Top + 10;
            // change size. Please note not all documents support changing signature size
            textSignature.Width = 200;
            textSignature.Height = 100;
           
            bool result = signature.Update(textSignature);
            if(result)
            {
                Console.WriteLine($"Signature with Text '{textSignature.Text}' was updated in the document ['{fileName}'].");
            }
            else
            {
                Console.WriteLine($"Signature was not updated in  the document! Signature with Text '{textSignature.Text}' was not found!");
            }
        }
    }
    ```
    
7.  **GroupDocs.Signature.Domain.BaseSignature**  
    
    Public class **BaseSignature** was updated to support modifying signature in the document.
    
    *    properties **Top**, **Left**, **Width** and **Height** are marked as editable to adjust signature location and size in the document
    *   added new editable property **string SignatureId**. Its value provides unique signature identification. When signing document, **Sign** method returns newly created signatures with this property set. So once signature was added to the document it can be identified by assigned **SignatureId** property. The same is true for document Search.
    *   added new editable Boolean property **bool IsSignature**. This property specifies if document component (text/image/barcode/qr-code) is the actual signature or element of document content. By default all found signatures in the document are marked as signature (IsSignature = true). When particular signature object is created (over Sign method, Search or manually) this property could be changed to false, that will indicate that this component is no longer will be treated as signature object and over **Update** method saved to document
    *   class implements **ICloneable** interface that means ability to call **Clone** method to obtain copy of existing instance of object.
    *   method **Equals** was overridden to support object equals checking
    
    All these properties could be used for signatures modifying.
    
    **class BaseSignature**
    
    ```csharp
    /// <summary>
    /// Describes base class for signatures.
    /// </summary>
    public abstract class BaseSignature : ICloneable
    {
            /// <summary>
            /// Specifies top position of signature.
            /// </summary>
            public int Top { get; set; }
    
            /// <summary>
            /// Specifies left position of signature.
            /// </summary>
            public int Left { get; set; }
    
            /// <summary>
            /// Specifies width of signature.
            /// </summary>
            public int Width { get; set; }
    
            /// <summary>
            /// Specifies height of signature.
            /// </summary>
            public int Height { get; set; }
    
            /// <summary>
            /// Unique signature identifier to modify signature in the document over Update or Delete methods.
            /// This property will be set automatically during Search method.
            /// If this property was saved before it can be set manually to manipulate the signature.
            /// </summary>
            public string SignatureId { get; }
    
            /// <summary>
            /// Get or set flag to indicate if this component is Signature or document content.
            /// This property is being used with Update method to set element as signature (true) or document element (false).
            /// </summary>
            public bool IsSignature { get; set; }
    
     }
    ```
    
8.  **GroupDocs.Signature.Domain.IResult**  
    
    Public interface **IResult**was added to specify signatures process result common properties. This interface keeps two lists of signatures, one for successfully processed signatures and another one for failed ones.
    
    **New public interface IResult**
    
    ```csharp
    /// <summary>
    /// Common interface for signature process result.
    /// </summary>
    public interface IResult
    {
        /// <summary>
        /// List of successfully processed signatures.
        /// </summary>
        List<BaseSignature> Succeeded { get; }
        /// <summary>
        /// List of signatures that were not processed.
        /// </summary>
        List<BaseSignature> Failed { get; }
    }
    ```
    
    *   read-only property **Succeeded** specifies list of signatures that were successfully processed. 
        *   for **Sign** process this is a list of newly created signatures, 
        *   for **Update** method this property keeps a list of successfully updated signatures, 
        *   for **Delete** method this property keeps a list of successfully deleted signatures
    *   property **Failed** specifies list of signatures that were not successfully processed. 
        *   for **Sign** process this is a list of newly created signatures, 
        *   for **Update** method this property keeps a list of successfully updated signatures, 
        *   for **Delete** method this property keeps a list of successfully deleted signatures.
9.  **GroupDocs.Signature.Domain.SignResult**  
    
    Public class **SignResult** was added to keep result of updated **Sign** method of Signature class. This class implements newly added interface **IResult** that specifies succeeded and failed signatures after process.
    
    **New public class SignResult**
    
    ```csharp
    /// <summary>
    /// Result of signing process for document with newly created signatures.
    /// </summary>
    public class SignResult : IResult
    {
        /// <summary>
        /// List of newly created signatures.
        /// </summary>
        public List<BaseSignature> Succeeded { get; }
        /// <summary>
        /// List of signatures that were failed to create.
        /// </summary>
        public List<BaseSignature> Failed { get; }
    }
    ```
    
    *   property **Succeeded** contains a list of signatures that were successfully created in the document.
    *   property **Failed** contains list of signatures that were failed to create due to internal errors or exception.
    
    Following example demonstrates using **Sign** method and analyzing **SignResult** response
    
    **Sign document and analyze result**
    
    ```csharp
    // instantiating the signature object
    using (Signature signature = new Signature(filePath))
    {
        // create QRCode option with predefined QRCode text
        QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
        {
            // setup QRCode encoding type
            EncodeType = QrCodeTypes.QR,
            // set signature position
            Left = 100,
            Top = 100
        };
        // sign document to file
        SignResult signResult = signature.Sign(outputFilePath, options);
        if (signResult.Failed.Count == 0)
        {
            Console.WriteLine("\nAll signatures were sucessfully created!");
        }
        else
        {
            Console.WriteLine($"Sucessfully created signatures : {signResult.Succeeded.Count}");
            Console.WriteLine($"Failed signatures : {signResult.Failed.Count}");
        }
        Console.WriteLine("\nList of newly created signatures:");
        int number = 1;
        foreach (BaseSignature temp in signResult.Succeeded)
        {
            Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
        }
    }
    Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
    ```
    
10.  **GroupDocs.Signature.Domain.UpdateResult**  
Public class **UpdateResult** was added to keep result of Signature class **Update** method. This class implements newly added interface **IResult** that specifies succeeded and failed signatures after process.
    
**New public class DeleteResult**
    
```csharp
/// <summary>
/// Result of modification of signatures in the document.
/// </summary>
public class UpdateResult : IResult
{
    /// <summary>
    /// List of successfully modified signatures.
    /// </summary>
    public List<BaseSignature> Succeeded { get; }
    /// <summary>
    /// List of signatures that were not updated.
    /// </summary>
    public List<BaseSignature> Failed { get;}
}
```
    
*   property **Succeeded** contains list of signatures that were successfully updated in the document.
*   property **Failed** contains list of signatures that were passed as an argument, but not found in the document so was not updated.    
Few reasons when passed signature to method **Update** was not processed (updated) in the document    
*   signature was passed only with property **SignatureId** identifier that was not found at document signature information layer;
*   signature was passed after Search method with correct properties, but was not found in a document with these coordinates, size or other properties that identifies unique signature.
*   signature was passed with "wrong" properties like not actual **SignatureId**, coordinates **Left**, **Top**, **Width** or **Height**, same as Text for text signatures or **BarcodeType** for Barcode signatures

Following example demonstrates using **Update** method and analyzing **UpdateResult** response

**Search document for Text Signatures**
    
```csharp
// instantiating the signature object
using (Signature signature = new Signature(outputFilePath))
{
    TextSearchOptions options = new TextSearchOptions();
    // search for text signatures in document
    List<TextSignature> signatures = signature.Search<TextSignature>(options);
    if(signatures.Count > 0)
    {
        TextSignature textSignature = signatures[0];
        bool result = signature.Delete(textSignature);
        if(result)
        {
            Console.WriteLine($"Signature with Text '{textSignature.Text}' was deleted from document ['{fileName}'].");
        }
        else
        {
            Console.WriteLine($"Signature was not deleted from the document! Signature with Text '{textSignature.Text}' was not found!");
        }
    }
}
```
    
11.  **GroupDocs.Signature.Domain.DeleteResult**  
    
Public class **DeleteResult** was added to keep result of **Delete** method of Signature class. This class implements newly added interface **IResult** that specifies succeeded and failed signatures after process.
    
**New public class DeleteResult**

```csharp
/// <summary>
/// Result of signature(s) deletion from the document.
/// </summary>
public class DeleteResult : IResult
{
    /// <summary>
    /// List of successfully deleted signatures.
    /// </summary>
    public List<BaseSignature> Succeeded { get; }
    
     /// <summary>
    /// List of signatures that were not deleted.
    /// </summary>
    public List<BaseSignature> Failed { get; }
}
```

*   property **Succeeded** contains list of signatures that were successfully deleted from the document.
*   property **Failed** contains list of signatures that were not removed from the document.

Signature passed to method **Delete** may not be removed from the document for several reasons:

*   signature was passed only with property **SignatureId** identifier that was not found at document signature information layer;
*   signature was passed after Search method with correct properties, but was not found inside document with these coordinates, size or other properties that identifies unique signature.
*   signature was passed with "wrong" properties like not actual **SignatureId**, coordinates **Left**, **Top**, **Width** or **Height**, same as Text for text signatures or **BarcodeType** for Barcode signatures

Following example demonstrates using **Delete** method and analyzing **DeleteResult** response

**Delete Text Signatures from the document**

```csharp
// instantiating the signature object
using (Signature signature = new Signature(outputFilePath))
{
    TextSearchOptions options = new TextSearchOptions();
    // search for text signatures in document
    List<TextSignature> signatures = signature.Search<TextSignature>(options);
    if(signatures.Count > 0)
    {
        TextSignature textSignature = signatures[0];
        bool result = signature.Delete(textSignature);
        if(result)
        {
            Console.WriteLine($"Signature with Text '{textSignature.Text}' was deleted from document ['{fileName}'].");
        }
        else
        {
            Console.WriteLine($"Signature was not deleted from the document! Signature with Text '{textSignature.Text}' was not found!");
        }
    }
}
```
    
12.  **GroupDocs.Signature.IncorrectPasswordException**  
    
Public class **IncorrectPasswordException** can be used to handle scenario when incorrect password were provided at **LoadOptions** for password protected documents. This exception will be thrown once Signature class will try to access protected file.

**New public class DeleteResult**

```csharp
/// <summary>
/// The exception that is thrown when specified password is incorrect.
/// </summary>
[Serializable]
public class IncorrectPasswordException : GroupDocsSignatureException
{
}
```

*   class inherits common **GroupDocsSignatureException**
*   exception message contains only common information message "Specified password is incorrect."
*   please be aware that when password is not specified for protected documents another exception occurs

Following example demonstrates analyzing different errors with incorrect password exception

**Handling Exceptions example**

```csharp
// initialize LoadOptions with incorrect Password 
LoadOptions loadOptions = new LoadOptions() { Password = "1" };
using (Signature signature = new Signature("SamplePasswordProtected.pdf", loadOptions))
{
    try
    {
        QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith");
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
    
13.  **GroupDocs.Signature.PasswordRequiredException**  
    
Public class **PasswordRequiredException** can be used to handle scenario with missing password set up at LoadOptions for password protected documents. This exception will be thrown once Signature class will try to access protected file.

**New public class DeleteResult**

```csharp
/// <summary>
/// The exception that is thrown when password is required to load the document.
/// </summary>
[Serializable]
public class PasswordRequiredException : GroupDocsSignatureException
{
}
```

*   class inherits common **GroupDocsSignatureException**
*   exception message contains only information message "Please specify password to load the document."
*   please be aware that when password is specified but incorrect another exception occurs

Following example demonstrates analyzing different exceptions

**Handling Exceptions example**

```csharp
// instantiating the signature object
// but skip initialization of LoadOptions with Password 
// LoadOptions loadOptions = new LoadOptions(){ Password  = "1234567890" }            
using (Signature signature = new Signature("SamplePasswordProtected.pdf"))
{
    try
    {
        QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith");
        // try to sign document to file, we expect for PasswordRequiredException exception to be thrown
        signature.Sign("signed.pdf", options);
        Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
    }
    catch(PasswordRequiredException ex)
    {
        Console.WriteLine($"PasswordRequiredException: {ex.Message}");
    }
    catch(GroupDocsSignatureException ex)
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

14.  **GroupDocs.Signature.Options.PreviewOptions**  
    
Added new boolean **HideSignatures** property to **PreviewOptions** class.   
This property indicates whether signatures that were marked as **IsSignature = true** should be hidden from document preview or not.

**class PreviewOptions**

```csharp
/// <summary>
/// Represents document preview options.
/// </summary>
public class PreviewOptions
{
        /// <summary>
        /// Gets or sets flag to hide signatures from page preview image.
        /// Only signatures are marked as IsSignature will be hidden from generated document page image.
        /// </summary>
        public bool HideSignatures { get; set; }
}
```

Following example demonstrates usage of **HideSignatures** property for hiding signatures in document preview.

**Using HideSignatures property for hiding signatures for document preview**

```csharp
public class GeneratePreviewAdvanced
{
    /// <summary>
    /// Generate document pages preview with using HideSignature feature
    /// </summary>
    public static void Run()
    {
        // The path to the documents directory.
        string filePath = Constants.SAMPLE_PDF_SIGNED;
        using (Signature signature = new Signature(filePath))
        {
            // create preview options object
            PreviewOptions previewOption = new PreviewOptions(GeneratePreviewAdvanced.CreatePageStream, GeneratePreviewAdvanced.ReleasePageStream)
            {
                PreviewFormat = PreviewOptions.PreviewFormats.JPEG,
                // set property to hide all known signatures
                HideSignatures = true
            };
            // generate preview
            signature.GeneratePreview(previewOption);
        }
    }
    private static Stream CreatePageStream(int pageNumber)
    {
        string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewHideSignatures", "image-" + pageNumber.ToString() + ".jpg");
        string folder = Path.GetDirectoryName(imageFilePath);
        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }
        return new FileStream(imageFilePath, FileMode.Create);
    }
    private static void ReleasePageStream(int pageNumber, Stream pageStream)
    {
        pageStream.Dispose();
        string imageFilePath = Path.Combine(Constants.OutputPath, "GeneratePreviewHideSignatures", "image-" + pageNumber.ToString() + ".jpg");
        Console.WriteLine("Image file {0} is ready for preview", imageFilePath);
    }
}
```
    
15.  **GroupDocs.Signature.Options.SearchOptions**  
    
Added new **boolean** property **SkipExternal** to **SearchOptions** class.

This property indicates if Search result should return external signatures (external signatures are the signatures that were added with an 3rd party software and not with GroupDocs.Signature).

Since 19.12 every time when document is being signed information about document signatures are stored in document's metadata. Which means that all created signatures by GroupDocs.Signature can be distinguished from an actual document content and **BaseSignature.IsSignature** flag will be set as true. **BaseSignature.IsSignature** property specifies if document component (text/image/barcode/qr-code) is the actual signature or element of document content.

In order to convert signatures added by 3rd party software or by previous version of GroupDocs.Signature, just run Search with **SearchOptions.SkipExternal** property set to false and update **BaseSignature.IsSignature** for each signature returned by the search result.

There are few ways to manipulate with document signature search results:

*   If signature is no longer required it can be removed from the document by **Delete** method;
*   Signature could be marked as document native content by setting up **IsSignature = false** property,in this case **SearchOptions.SkipExternal** field will allow **Search** method to skip this signature;
*   Signatures that were added before 19.12 are treated as non signatures because information about them are not yet stored in the document. Setting **SkipExternal** flag to **true** will exclude these signatures from **Search** result.

**class PreviewOptions**

```csharp
/// <summary>
/// Represents document preview options.
/// </summary>
public abstract class SearchOptions
{
        /// <summary>
        /// Flag to return only signatures marked as IsSignature. By default value is false that indicates to return all signatures that match specified criteria.
        /// </summary>
        public bool SkipExternal { get; set; } = false;
}
```

**Example 1. Excluding non signatures from search**

 Following example demonstrates usage of **SkipExternal** property for excluding non actual signatures from search result

**Using SearchOptions SkipExternal property to exclude non actual signatures from search**

```csharp
using (Signature signature = new Signature("sample_signed.pdf"))
{
    TextSearchOptions options = new TextSearchOptions()
    {
        // specify SkipExternal value to exclude non signature objects from Search result
        SkipExternal = true,
        // specify search on all pages
        AllPages = false
    };
    // search for text signatures in document
    List<TextSignature> signatures = signature.Search<TextSignature>(options);
    Console.WriteLine("\nSource document contains following text signature(s).");
    // enumerate all signature for output                
    foreach (TextSignature textSignature in signatures)
    {
        if (textSignature != null)
        {
            Console.WriteLine($"Found Text signature at page {textSignature.PageNumber} with type [{textSignature.SignatureImplementation}] and text '{textSignature.Text}'.");
            Console.WriteLine($"Location at {textSignature.Left}-{textSignature.Top}. Size is {textSignature.Width}x{textSignature.Height}.");
        }
    }
}
```

**Example 2. Updating signatures from GroupDocs.Signature 19.11 and below**

Following examples shows the way to mark signatures in document as actual signatures (**BaseSignature.IsSignature = true**)

**How to mark signatures in document as actual signatures**

```csharp
    // initialize Signature instance
    using (Signature signature = new Signature("sample_signed.pdf"))
    {
        // define search options to select required signatures om the document
        BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions();
        QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions();
        TextSearchOptions textOptions = new TextSearchOptions();
        // add options to list
        List<SearchOptions> listOptions = new List<SearchOptions>();
        listOptions.Add(barcodeOptions);
        listOptions.Add(qrCodeOptions);
        listOptions.Add(textOptions);
        // search for signatures in document
        SearchResult result = signature.Search(listOptions);
        if (result.Signatures.Count > 0)
        {
            Console.WriteLine("\nTrying to update all signatures...");
            // mark all signatures as actual Signatures
            foreach(BaseSignature baseSignature in result.Signatures)
            {
                baseSignature.IsSignature = true;
            }
            // update all found signatures
            UpdateResult updateResult = signature.Update(result.Signatures);
            if(updateResult.Succeeded.Count == result.Signatures.Count)
            {
                Console.WriteLine("\nAll signatures were successfully updated!");                        
            }
            else
            {
                Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
            }
            Console.WriteLine("\nList of updated signatures:");
            int number = 1;
            foreach(BaseSignature temp in updateResult.Succeeded)
            {
                Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
            }
        }
        else
        {
            Console.WriteLine("No one signature was found.");
        }
    }
```
    
16.  **GroupDocs.Signature.Signature**  
    
Main public class **Signature** was updated with following changes

*   all existing overload methods **Sign** were extended with result as instance of object **SignResult**. This result allows to obtain list of newly created signatures with all properties set (like actual location, size, implementation type, and other corresponding signature fields) and new properties **IsSignature** = true and assigned value to internal property **SignatureId.**
    
    **Updated overload method Sign definition**
    
    ```csharp
    public SignResult Sign(Stream document, SignOptions signOptions);
    
    public SignResult Sign(Stream document, SignOptions signOptions, SaveOptions saveOptions);
    
    public SignResult Sign(Stream document, List<SignOptions> signOptionsList);
    
    public SignResult Sign(Stream document, List<SignOptions> signOptionsList, SaveOptions saveOptions);
    
    public SignResult Sign(string filePath, SignOptions signOptions);
    
    public SignResult Sign(string filePath, SignOptions signOptions, SaveOptions saveOptions);
    
    public SignResult Sign(string filePath, List<SignOptions> signOptionsList);
    
    public SignResult Sign(string filePath, List<SignOptions> signOptionsList, SaveOptions saveOptions);
    ```
    
*   added new overload method **Update** that expects one signature or list of signatures to update in the document. Method with one signature argument returns Boolean value as indicator if process went successfully. Method with list of signatures returns instance of **UpdateResult**. Each of passed signature should be identified with existing signatures in the document. This identification could be provided in two ways. First way when signature was searched right pass to **Update** method by **Search** method. See first example 2 *How to update signatures after Search*. The second way works over unique signature identifier **SignatureId**. This **SignatureId** could be obtained after **Sign** result as unique signature identifier stored at document metadata layer. The very important thing here that this method applies changes in same document file or stream. See second example  *How to update signatures by known Id*
    
    **New overload method Update definition**
    
    ```csharp
    public bool Update(BaseSignature signature);
    
    public UpdateResult Update(List<BaseSignature> signatures);
    ```
    
*   added new overload method **Delete** that that expects one signature or list of signatures to delete from the document. Method with one signature argument returns Boolean value as indicator if process went successfully. Method with list of signatures returns instance of **DeleteResult**. Same as method **Update** each of passed signature should be identified with existing signatures in the document. This identification could be provided by two ways. First way when signature was searched right pass to **Update** method by **Search** method. See first example *How to update signatures after Search*. The second way works over unique signature identifier **SignatureId**. This **SignatureId** could be obtained after **Sign** result as unique signature identifier stored at document metadata layer. The very important thing here that this method applies changes in same document file or stream.
    
    ```csharp
    public bool Delete(BaseSignature signature);
    
    public DeleteResult Delete(List<BaseSignature> signatures);
    ```
    

**Examples:**

1.  *How to sign document and analyze result.* Following example shows analysis of **SignResult** response.
    
    **Signing document with further result analysis**
    
    ```csharp
    using (Signature signature = new Signature("sample.pdf"))
    {
        // create QRCode option with predefined QRCode text
        QrCodeSignOptions options = new QrCodeSignOptions("JohnSmith")
        {
            // setup QRCode encoding type
            EncodeType = QrCodeTypes.QR,
            // set location as right down corner 
            HorizontalAlignment = HorizontalAlignment.Right,
            VerticalAlignment = VerticalAlignment.Bottom
        };
        // sign document to file
        SignResult signResult = signature.Sign("signed.pdf", options);
        if (signResult.Failed.Count == 0)
        {
            Console.WriteLine("\nAll signatures were successfully created!");
        }
        else
        {
            Console.WriteLine($"Successfully created signatures : {signResult.Succeeded.Count}");
            Console.WriteLine($"Failed signatures : {signResult.Failed.Count}");
        }
        Console.WriteLine("\nList of newly created signatures:");
        int number = 1;
        foreach (BaseSignature temp in signResult.Succeeded)
        {
            Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
        }
    }
    ```
    
2.  *How to update signatures after **Search***. Following example demonstrates using of **Search** method to find signatures and then modifying selected signatures with **Update** method.
    
    **Updating signatures after Search**
    
    ```csharp
    // initialize Signature instance with signed document
    using (Signature signature = new Signature("sampleSigned.pdf"))
    {
        // define few search options
        BarcodeSearchOptions barcodeOptions = new BarcodeSearchOptions();
        QrCodeSearchOptions qrCodeOptions = new QrCodeSearchOptions();
        // add options to list
        List<SearchOptions> listOptions = new List<SearchOptions>();
        listOptions.Add(barcodeOptions);
        listOptions.Add(qrCodeOptions);
        // search for signatures in document
        SearchResult result = signature.Search(listOptions);
        if (result.Signatures.Count > 0)
        {
            Console.WriteLine("\nTrying to update all signatures...");
            // mark all signatures as actual Signatures
            foreach(BaseSignature baseSignature in result.Signatures)
            {
                baseSignature.IsSignature = true;
            }
            // update all found signatures
            UpdateResult updateResult = signature.Update(result.Signatures);
            if(updateResult.Succeeded.Count == result.Signatures.Count)
            {
                Console.WriteLine("\nAll signatures were successfully updated!");                        
            }
            else
            {
                Console.WriteLine($"Successfully updated signatures : {updateResult.Succeeded.Count}");
                Console.WriteLine($"Not updated signatures : {updateResult.Failed.Count}");
            }
            Console.WriteLine("\nList of updated signatures:");
            int number = 1;
            foreach(BaseSignature temp in updateResult.Succeeded)
            {
                Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, at {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
            }
        }
        else
        {
            Console.WriteLine("No one signature was found.");
        }
    }
    ```
    
3.  *How to update signature using **SignatureId** property*. Following example demonstrates using of **Update** method to modify signatures using known **SignatureId** properties.
    
4.  *How to delete signatures after **Search***. Following example demonstrates using of **Search** method to find signatures and then remove them over **Delete** method.
5.  *How to delete signature using **SignatureId** property*. Following example demonstrates using of **Delete** method to remove signatures using known **SignatureId** properties.

**Updating signatures after Search**

```csharp
// instantiating the signature object
using (Signature signature = new Signature("signedSample.docx"))
{
    TextSearchOptions options = new TextSearchOptions();
    // search for text signatures in document
    List<TextSignature> signatures = signature.Search<TextSignature>(options);
    if(signatures.Count > 0)
    {
        TextSignature textSignature = signatures[0];
        // change Text property
        textSignature.Text = "John Walkman";
        // change position
        textSignature.Left = textSignature.Left + 10;                    
        textSignature.Top = textSignature.Top + 10;
        // change size. Please note not all documents support changing signature size
        textSignature.Width = 200;
        textSignature.Height = 100;
        bool result = signature.Update(textSignature);
        if(result)
        {
            Console.WriteLine($"Signature with Text '{textSignature.Text}' was updated in the document ['{fileName}'].");
        }
        else
        {
            Console.WriteLine($"Signature was not updated in  the document! Signature with Text '{textSignature.Text}' was not found!");
        }
    }
}
```
