---
id: search-for-embedded-and-encrypted-objects-in-qr-code-signatures
url: signature/net/search-for-embedded-and-encrypted-objects-in-qr-code-signatures
title: Search for embedded and encrypted objects in QR-Code signatures
weight: 9
description: " This section explains how to search for embedded electronic signatures into the QR-Code electronic signatures with GroupDocs.Signature API. Also this topic shows the way to customize data serialization and encryption same as provides the class definition with ability to embed it into the QR-Code electronic signature."
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
GroupDocs.Signature provides additional features when searching forQR-code signatures ([QrCodeSignature](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain/qrcodesignature)) that were previously encrypted or contains embedded data objects. Summary the abilities are as follow

* ability to search for embedded custom objects into metadata and decrypt them to original source values
* ability to search for encrypted text of QR-code signature and decrypt it
* ability to search for embedded object into QR-code signatures with custom encryption and custom serialization  

Following topics show different aspects

## Alternative implementation of custom data serialization

This example shows how to specify custom serialization class. This class should be implemented as Attribute and [IDataSerializer](https://apireference.groupdocs.com/net/signature/groupdocs.signature.domain.extensions/idataserializer) interface.

```csharp
/// <summary>
/// Creates class that implements IDataSerializer interface
/// It cam support common serialization like JSon or custom data format
/// </summary>
class CustomSerializationAttribute : Attribute, IDataSerializer
{
    public T Deserialize<T>(string source) where T : class
    {
        DocumentSignatureData result = new DocumentSignatureData();
        byte[] bytes = Encoding.UTF8.GetBytes(source);
        using (MemoryStream stream = new MemoryStream(bytes))
        {
            stream.Seek(0, SeekOrigin.Begin);
            using (BinaryReader reader = new BinaryReader(stream))
            {
                result.ID = reader.ReadString();
                result.Author = reader.ReadString();
                result.Signed = new DateTime( reader.ReadInt64());
                result.DataFactor = reader.ReadDecimal();
            }
        }
        var converter = TypeDescriptor.GetConverter(typeof(T));
        return (T)converter.ConvertFrom(result);
    }
    public string Serialize(object data)
    {
        string result = string.Empty;
        DocumentSignatureData signatureData = data as DocumentSignatureData;
        if (signatureData != null)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                using (BinaryWriter writer = new BinaryWriter(stream))
                {
                    writer.Write(signatureData.ID);
                    writer.Write(signatureData.Author);
                    writer.Write(signatureData.Signed.Ticks);
                    writer.Write(signatureData.DataFactor);
                }
                result = Encoding.UTF8.GetString(stream.ToArray());
            }
        }
        return result;
    }
}
```

## Implementation of custom data encryption

This example shows how to specify custom serialization class. This class could be implemented also as Attribute (optional) to specify as class attribute.

```csharp
// Define class that implements IDataEncryption interface
private class CustomXOREncryptionAttribute : Attribute, IDataEncryption
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

## Definition of class

This example shows how to define custom class with serialization and encryption properties and setup Format attributes for properties.

```csharp
// setup CustomSerialization Attribute to setup customer serialization(see example above)
[CustomSerialization]
// setup CustomXOREncryption Attribute for custom encryption (see example above)
[CustomXOREncryption]
private class DocumentSignatureData
{
    [Format("SignID")]
    public string ID { get; set; }
    [Format("SAuth")]
    public string Author { get; set; }
    [Format("SDate", "yyyy-MM-dd")]
    public DateTime Signed { get; set; }
    [Format("SDFact", "N2")]
    public decimal DataFactor { get; set; }
    [SkipSerialization]
    public string Comments { get; set; }
}
```
