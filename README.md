# GroupDocs.Signature for .NET

![NuGet](https://img.shields.io/nuget/v/GroupDocs.Signature)
![.NET](https://img.shields.io/badge/.NET-4.6.2+-informational)

**Create, apply, and verify digital signatures** in documents with an advanced .NET **e-signature API**. Add electronic, barcode, QR-code, image, text, metadata, and form field signatures to **90+ document formats** including PDFs, Word, Excel, Images, and more.

> ✅ Supports `create digital signature`, `esign pdf`, `sign pdf doc`, `verify signature`, and `remove signatures` features across multiple platforms.


## 🚀 Key Features

- Add **electronic signatures** to **90+ document formats** including PDF, DOCX, XLSX, PPTX, PNG, TIFF, and more
- Create signatures from **image, barcode, QR code, stamp, text, metadata, or form fields**
- Support for **signature validation**, **verification**, and **removal**
- **Search and remove** existing signatures from documents
- Apply **multiple signatures** of different types to a single document
- Built-in support for **digital certificates** (X.509, PKCS#7) for legally binding signatures
- **Metadata signatures** for document tracking and authentication
- **Form field signatures** for interactive document workflows
- Integrate into your **signature app** or web-based **e-sign platform**


## 🔧 Supported Signature Types

| Signature Type     | Description                                |
|--|--|
| **Digital Signatures** | X.509 certificate-based signatures for legal compliance |
| **Image Signatures**   | Draw or upload images (PNG, JPEG, SVG, BMP)    |
| **Text Signatures**    | Add custom text annotations with fonts & styles |
| **QR-Code Signatures** | Generate QR codes with custom data/format   |
| **Barcode Signatures** | Add/search/remove barcodes from documents         |
| **Stamp Signatures**   | Custom stamps with date/user info/company logos |
| **Metadata Signatures** | Hidden signatures for document tracking & authentication |
| **Form Field Signatures** | Interactive signature fields for workflows |



## 📁 Supported Document Formats (90+)

**Office Documents:**
- Microsoft Word (DOC, DOCX, DOCM, DOT, DOTX, DOTM)
- Excel (XLS, XLSX, XLSM, XLSB, XLT, XLTX, XLTM)
- PowerPoint (PPT, PPTX, PPTM, PPS, PPSX)
- Visio (VSD, VSDX, VSS, VSSX, VST, VSTX)

**PDFs & Images:**
- PDF (Portable Document Format)
- Images (PNG, JPG, JPEG, BMP, TIFF, GIF, SVG, WEBP)

**Other Formats:**
- OpenDocument (ODT, ODS, ODP)
- Text files (TXT, RTF, CSV)
- Web formats (HTML, HTM)
- And many more...



## 💡 Use Cases

- [**Sign PDF documents**](https://docs.groupdocs.com/signature/net/sign-document-with-digital-signature/) with digital certificates (X.509, PKCS#7)
- [**E-sign Word documents**](https://docs.groupdocs.com/signature/net/sign-document-with-different-text-signature-implementation/#sign-document-with-text-signature-and-form-field-implementation-type) with image signatures or typed names
- [**Add signatures to Excel spreadsheets**](https://docs.groupdocs.com/signature/net/how-to-sign-excel-macros-using-csharp/) and CSV files
- [**Verify and validate e-signatures**](https://docs.groupdocs.com/signature/net/verify-digital-signatures-in-the-document/) for authenticity
- [**Search and remove**](https://docs.groupdocs.com/signature/net/delete-barcode-signatures-from-documents/) existing signatures from documents
- [**Metadata signatures**](https://docs.groupdocs.com/signature/net/esign-document-with-metadata-signature/) for document versioning and tracking
- [**Form field signatures**](https://docs.groupdocs.com/signature/net/esign-document-with-form-field-signature/) for interactive document workflows
- [**Batch processing**](https://docs.groupdocs.com/signature/net/iterative-digital-signing-of-the-pdf-document/) multiple documents with signatures



## Example: Sign PDF Document with Image Signature

```csharp
using GroupDocs.Signature;
using GroupDocs.Signature.Options;

// Initialize signature with input document
using (Signature signature = new Signature("document.pdf"))
{
    // Configure image signature options
    ImageSignOptions options = new ImageSignOptions("signature.png")
    {
        Left = 100,
        Top = 100,
        Width = 200,
        Height = 80
    };
    
    // Sign document and save
    SignResult result = signature.Sign("signed.pdf", options);
    Console.WriteLine($"Document signed with {result.Signatures.Count} signature(s)");
}
```

☝️ This example shows how to sign a PDF with an image signature using **GroupDocs.Signature for .NET**.



## 📦 Installation

Install via NuGet Package Manager:

```bash
dotnet add package GroupDocs.Signature --version 25.6.0
```

Or via Package Manager Console:

```powershell
Install-Package GroupDocs.Signature -Version 25.6.0
```

Or download directly from the [Releases](https://releases.groupdocs.com/signature/net/).



## 📚 Documentation & Resources

- [Official Documentation](https://docs.groupdocs.com/signature/net/)
- [Code Examples](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET)
- [NuGet Package](https://www.nuget.org/packages/GroupDocs.Signature)
- [Free Support Forum](https://forum.groupdocs.com/c/signature)



## 🖥️ Cross-Platform Support

GroupDocs.Signature supports:

- **.NET Framework** (2.0+, including 4.6.2+)
- **.NET Core** 2.0 and above
- **.NET Standard** 2.0 / 2.1
- **.NET 6.0+**
- **Mono Framework** 1.2+
- **Platforms:** Windows, Linux, macOS
- **Cloud:** Azure, AWS, Google Cloud Platform



## Why Choose GroupDocs.Signature?

- **High-performance** signature processing for enterprise applications
- **Zero dependencies** on external tools like Adobe Acrobat or Microsoft Office
- **Memory-efficient** processing of large documents
- **Thread-safe** operations for multi-threaded applications
- **Comprehensive API** with 90+ supported document formats
- **Easy integration** into existing .NET signature applications
- **Regular updates** with new features and format support



## Security & Compliance

- **Digital Certificate Support**: RSA, DSA, ECDSA algorithms
- **Standards Compliance**: PKCS#7, X.509, PDF/A compatibility
- **Signature Validation**: Timestamp verification and certificate chain validation
- **Legal Compliance**: Suitable for legally binding digital signatures worldwide
- **Audit Trail**: Complete signature history and document integrity verification



## Looking for GroupDocs.Signature for Java?

👉 [View the Java version here](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java)



## Contribute

This repository contains **examples and demos** for GroupDocs.Signature for .NET. We welcome contributions and feedback! 

- [Report Issues](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/issues)
- Fork the repo and submit pull requests with improvements
- Help improve documentation and examples



<!--
SEO Keywords:
digital signature, create digital signature, document sign, document signature, e sign, e sign process, e signature, e signature from image, electronic sign, electronic signature, signature e sign, groupdocs signature, sign documents online, sign pdf doc, sign pdf document, sign the pdf, sign to pdf, signature app, signature pdf, signing pdf document, csv file signature, remove barcode from pdf, qr code remover from pdf, signature valid png, get a signature, signature api, signature java, esign pdf, file signature, verify signature, create signature, image signature
-->

## 📜 License

This project is licensed under the [GroupDocs EULA](https://purchase.groupdocs.com/policies/license).