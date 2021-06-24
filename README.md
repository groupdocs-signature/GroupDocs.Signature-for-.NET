# Digital Signature API for .NET

[GroupDocs.Signature for .NET](https://products.groupdocs.com/signature/net) provides the ability to add stamps, barcodes and QR-codes, text, image, metadata, form field and digital signatures to documents of various formats. Sign, search and verify document signatures for all popular document formats and set different signing options to suit your needs.

<p align="center">

  <a title="Download complete GroupDocs.Signature for .NET source code" href="https://codeload.github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/zip/master">
	<img src="https://raw.github.com/AsposeExamples/java-examples-dashboard/master/images/downloadZip-Button-Large.png" />
  </a>
</p>

Directory | Description
--------- | -----------
[Docs](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Docs)  | Product documentation containing Developer's Guide, Release Notes & more.
[Demos](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/tree/master/Demos)  |  Open source web based projects that demonstrate the salient features of GroupDocs.Signature. Source code for the live demos hosted at https://products.groupdocs.app/signature/family.
[Examples](https://github.com/groupdocs-signature/GroupDocs.Signature-for.NET/tree/master/Examples)  | C# based examples and sample files that will help you quickly started. 
[Plugins](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/tree/master/Plugins)  | Visual Studio plugins related to GroupDocs.Signature.

## Document e-Signing Features

- Create and add signatures to [documents of various formats](https://docs.groupdocs.com/signature/net/supported-document-formats/).
- Specify visual attributes of signatures, such as, color, font, margins and more.
- Search and fetch list of signatures & certificates.
- Determine if the document contains signatures meeting a specified criterion.
- Distinguish created signatures from the actual document.
- Put encrypted text into QR-code signature or embed custom data objects.
- Extract basic information about the document.
- Generate image representation of document pages for preview.

## Supported Signature Types

- Text stamps
- Text labels
- Text as image signature
- Image signature
- Digital signature
- Barcode signature
- QR-code signature
- Metadata signature
- Form-field signature

## Supported Formats for Electronic Signature

**Microsoft Word:** DOC, DOCM, DOCX, DOT, DOTM, DOTX\
**Microsoft Excel:** XLSX, XLS, XLSB, XLSM, XLTX, XLTM\
**Microsoft PowerPoint:** PPTX, PPTM, PPT, PPSX, PPSM, PPS, POTX, POTM\
**OpenOffice:** ODT, OTT, ODS, OTS, ODP, OTP\
**Image:** BMP, GIF, JPG, JPEG, PNG, SVG, TIF, TIFF, WEBP\
**CorelDraw:** CDR, CMX\
**Photoshop:** PSD\
**eBook:** DJVU\
**Metafile:** WMF\
**Portable:** PDF


## Develop & Deploy GroupDocs.Signature Anywhere

**Microsoft Windows:** Windows Desktop & Server (x86, x64), Windows Azure\
**macOS:** Mac OS X\
**Linux:** Ubuntu, OpenSUSE, CentOS, and others\
**Development Environments:** Microsoft Visual Studio, Xamarin.Android, Xamarin.IOS, Xamarin.Mac, MonoDevelop\
**Supported Frameworks:** .NET Standard 2.0, .NET Framework 2.0 or higher, .NET Core 2.0 or higher, Mono Framework 1.2 or higher

## Get Started with GroupDocs.Signature for .NET

Are you ready to give GroupDocs.Signature for .NET a try? Simply execute `Install-Package GroupDocs.Signature` from Package Manager Console in Visual Studio to fetch & reference GroupDocs.Signature assembly in your project. If you already have GroupDocs.Signature for .Net and want to upgrade it, please execute `Update-Package GroupDocs.Signature` to get the latest version.

## Sign a PDF File and Save it as DOCX

```csharp
using (Signature signature = new Signature("sample.pdf"))
{
    // create QRCode option with predefined QRCode text
    QRCodeSignOptions signOptions = new QRCodeSignOptions("JohnSmith")
    {
        EncodeType = QRCodeTypes.QR,
        Left = 100,
        Top = 100
    };
    PdfSaveOptions pdfSaveOptions = new PdfSaveOptions()
    {
        FileFormat = PdfSaveFileFormat.DocX,
        OverwriteExistingFiles = true
    };
    // sign document to file
    signature.Sign("SignedPdf.docx", signOptions, pdfSaveOptions);
}
```

## Search & Delete Signatures from DOCX File

```csharp
// initialize Signature instance
using (Signature signature = new Signature("signed.docx"))
{
    BarcodeSearchOptions options = new BarcodeSearchOptions();
    List<BarcodeSignature> signatures = signature.Search<BarcodeSignature>(options);
    List<BaseSignature> signaturesToDelete = new List<BaseSignature>();
    // collect signatures to delete
    foreach (BarcodeSignature temp in signatures)
    {
        if (temp.Text.Contains("John"))
        {
            signaturesToDelete.Add(temp);
        }
    }
    // delete signatures
    DeleteResult deleteResult = signature.Delete(signaturesToDelete);
    if (deleteResult.Succeeded.Count == signaturesToDelete.Count)
    {
        Console.WriteLine("All signatures were successfully deleted!");
    }
    else
    {
        Console.WriteLine($"Successfully deleted signatures : {deleteResult.Succeeded.Count}");
        Console.WriteLine($"Not deleted signatures : {deleteResult.Failed.Count}");
    }
    Console.WriteLine("List of deleted signatures:");
    foreach (BaseSignature temp in deleteResult.Succeeded)
    {
        Console.WriteLine($"Signature# Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
    }
}
```

[Home](https://www.groupdocs.com/) | [Product Page](https://products.groupdocs.com/signature/net) | [Documentation](https://docs.groupdocs.com/signature/net/) | [Demo](https://products.groupdocs.app/signature/family) | [API Reference](https://apireference.groupdocs.com/signature/net) | [Examples](https://github.com/groupdocs-signature/GroupDocs.Signature-for.NET) | [Blog](https://blog.groupdocs.com/category/signature/) | [Search](https://search.groupdocs.com/) | [Free Support](https://forum.groupdocs.com/c/signature) | [Temporary License](https://purchase.groupdocs.com/temporary-license)
