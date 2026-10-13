<!-- generator:skip -->
# GroupDocs.Signature for .NET -- AGENTS.md

> Instructions for AI agents working with this examples repository: runnable C# examples for the
> GroupDocs.Signature NuGet package.

Add, search, verify, update and delete text, image, digital (X.509), barcode, QR code, stamp,
form-field and metadata signatures in 40+ formats: PDF, Word, Excel, PowerPoint, OpenDocument, images
and archives. For the exact list and the signature types each format supports, see the .NET
[supported-document-formats](https://docs.groupdocs.com/signature/net/supported-document-formats/)
table; format lists differ between platforms.

## Install

```bash
dotnet add package GroupDocs.Signature
```

**Package**: `GroupDocs.Signature` 26.9.0, a metapackage over `GroupDocs.Signature.Net462`, `.Net60`,
`.Net80` and `.Net100`.
**.NET TFMs**: `net462` (.NET Framework 4.6.2 or later), `net6.0`, `net8.0`, `net10.0`
(.NET Standard 2.1 was removed in 26.9).
**OS**: Windows 10 and 11, Windows Server 2016 and later; Linux and macOS with .NET 6, 8 or 10. The .NET
Framework build runs on Windows only. On Linux and macOS install libgdiplus and the fonts your documents
use, and set the `System.Drawing.EnableUnixSupport` switch (the .NET projects in this repository set it).

## Resources

| Resource | URL |
|---|---|
| Documentation | https://docs.groupdocs.com/signature/net/ |
| SDK, Cloud or MCP? | https://docs.groupdocs.com/signature/net/sdk-cloud-mcp/ |
| LLM-optimized docs | https://docs.groupdocs.com/signature/net/llms-full.txt |
| API reference | https://reference.groupdocs.com/signature/net/ |
| Supported document formats | https://docs.groupdocs.com/signature/net/supported-document-formats/ |
| Release notes | https://releases.groupdocs.com/signature/net/release-notes/ |
| NuGet | https://www.nuget.org/packages/GroupDocs.Signature |
| Free support forum | https://forum.groupdocs.com/c/signature/ |
| Temporary license | https://purchase.groupdocs.com/temporary-license |

## MCP Server

If your environment has MCP configured, connect your AI tool to the GroupDocs documentation
server for on-demand API lookups:

```json
{
  "mcpServers": {
    "groupdocs-docs": {
      "url": "https://docs.groupdocs.com/mcp"
    }
  }
}
```

Works with Claude Code (`~/.claude/settings.json`), Cursor (`.cursor/mcp.json`), VS Code
Copilot (`.vscode/mcp.json`) and any MCP-compatible client. If MCP is unavailable, use the
LLM-optimized docs URL above.

When the agent itself needs to sign or verify documents, use the
[GroupDocs.Signature MCP server](https://docs.groupdocs.com/signature/mcp/) (link only; a
separate repository, not patched from this examples repo).

## Rules for AI assistants

- Write C# against the .NET API only. Do not port code from the Python, Java or Node.js packages:
  names, casing and collection types differ.
- Wrap `Signature` in `using`. `Sign` writes a new file or stream; the source document is not changed.
- Collection parameters are `List<T>`: `List<SignOptions>`, `List<SearchOptions>`,
  `List<BaseSignature>`. Arrays do not compile.
- Format limits: form-field signatures (`FormFieldSignOptions`) work in PDF only; DOTM, RTF, OTT, ODP,
  OTP and PowerPoint formats other than PPTX and PPTM take no certificate signature; CSV opens only
  with `new LoadOptions(FileType.CSV)`; DJVU and PSD are not supported and CDR signing fails in 26.9.
- Apply a licence with `License.SetLicense` before other calls. .NET has no licence environment
  variable (`GROUPDOCS_LIC_PATH` belongs to the Python package).
- Do not claim PAdES support, or eIDAS, ESIGN or HIPAA compliance: the library provides signing and
  verification primitives; compliance depends on the certificate, the process and the jurisdiction.

## Usings

```csharp
using GroupDocs.Signature;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
```

## Text signature

```csharp
using (Signature signature = new Signature("document.pdf"))
{
    TextSignOptions options = new TextSignOptions("Approved")
    {
        Left = 100,
        Top = 100
    };
    SignResult result = signature.Sign("signed.pdf", options);
    Console.WriteLine($"Created: {result.Succeeded.Count}, failed: {result.Failed.Count}");
}
```

## Digital signature with X.509 certificate

```csharp
using (Signature signature = new Signature("document.pdf"))
{
    DigitalSignOptions options = new DigitalSignOptions("certificate.pfx")
    {
        Password = "1234567890"
    };
    signature.Sign("signed.pdf", options);
}
```

The certificate must be a PFX (PKCS#12) file with the private key. PDF digital signatures use SHA-256
unless `HashAlgorithm` (declared on `SignOptions`) selects `Sha384` or `Sha512`. `Verify` checks PDF
signatures cryptographically.

## Security defaults (engine 26.9+)

- Expired or not-yet-valid certificates are rejected. Signing throws
  `GroupDocsSignatureException` unless `DigitalSignOptions.AllowExpired` /
  `AllowNotYetValid` is set; validity is checked against the current UTC time.
- External resources are not loaded. `LoadOptions.SkipExternalResources` defaults to `true`;
  list trusted addresses in `LoadOptions.WhitelistedResources`. This setting does not cover
  certificate (AIA), CRL/OCSP, time-stamp or licensing traffic.
- PDF signatures use SHA-256 by default.
- Word documents (DOCX, DOC, ODT) can be signed with post-quantum ML-DSA certificates (ML-DSA-44, 65
  and 87); PDF, spreadsheets and presentations cannot.

## Licensing

```csharp
// From file
new License().SetLicense("path/to/license.lic");

// From stream
using (Stream stream = File.OpenRead("license.lic"))
{
    new License().SetLicense(stream);
}
```

In this repository, set `LicensePath` in `Examples/GroupDocs.Signature.Examples.CSharp/Constants.cs`;
`QuickStart.SetLicenseFromFile` applies it first.

**Evaluation mode** (no licence; measured on 26.9.0):

- Documents of more than 2 pages are refused: `Sign`, `Search`, `Verify`, `GetDocumentInfo` and
  previews throw `GroupDocsSignatureException` ("The number of pages cannot exceed 2 in a trial
  version").
- Search returns masked values (a text signature reads "Created with evaluation version of
  GroupDocs.Signature ..."), so `Verify` of a correctly signed document returns `IsValid == false`.

A 30-day full license is free: https://purchase.groupdocs.com/temporary-license

## Signature API (core surface)

| Member | Returns | Description |
|---|---|---|
| `Signature(string filePath)` / `Signature(Stream document)` | | Open a document for signing / verification |
| `Sign(string outputFilePath, SignOptions options)` | `SignResult` | Add a signature; pass `List<SignOptions>` for several |
| `Verify(VerifyOptions options)` | `VerificationResult` | Check signatures against criteria (`IsValid`) |
| `Search<T>(SearchOptions options)` / `Search<T>(SignatureType type)` | `List<T>` | Find signatures of one type |
| `Search(List<SearchOptions> options)` | `SearchResult` | Find several types at once (`Signatures`) |
| `Update(BaseSignature signature)` / `Update(List<BaseSignature> signatures)` | `bool` / `UpdateResult` | Move or change found signatures |
| `Delete(BaseSignature signature)` / `Delete(List<BaseSignature> signatures)` | `bool` / `DeleteResult` | Remove found signatures |
| `Delete(SignatureType type)` | `DeleteResult` | Remove every signature of a type |
| `GetDocumentInfo()` | `IDocumentInfo` | File type, page count, page sizes, existing signatures |
| `GeneratePreview(PreviewOptions options)` | `void` | Render document pages |
| `Signature.GenerateSignaturePreview(PreviewSignatureOptions options)` | `void` | Static: render a signature before signing |

## Key patterns

- Streams: pass `FileStream` / `MemoryStream` where the API takes `Stream`.
- Resource lifetime: always wrap `Signature` in `using` or call `Dispose`.
- Search several types, then update or delete what was found:

```csharp
using (Signature signature = new Signature("signed.pdf"))
{
    List<SearchOptions> searchOptions = new List<SearchOptions>
    {
        new TextSearchOptions(),
        new QrCodeSearchOptions()
    };
    SearchResult found = signature.Search(searchOptions);
    foreach (BaseSignature item in found.Signatures)
    {
        item.Left += 10;
    }
    UpdateResult updated = signature.Update(found.Signatures);
    DeleteResult deleted = signature.Delete(SignatureType.Barcode);
}
```

- Enums: `SignatureType.QrCode`, `BarcodeTypes.Code128`, `QrCodeTypes.QR`.
- Extension points: `IDataEncryption` (`GroupDocs.Signature.Domain.Extensions`) encrypts QR-code and
  metadata values; `ICustomSignHash` (`GroupDocs.Signature.Options`) signs an externally computed hash,
  for example with an HSM; `ILogger` (`GroupDocs.Signature.Logging`) is passed with
  `new SignatureSettings(logger)`.

## Repository layout

- `Examples/GroupDocs.Signature.Examples.CSharp/` -- shared C# examples, one class per use
  case with a static `Run()` method, in `QuickStart/`, `BasicUsage/` and `AdvancedUsage/`.
- `Examples/GroupDocs.Signature.Examples.CSharp.Framework/`, `.Net/`, `.Net8/`, `.Net10/` --
  console projects per TFM; `RunExamples.cs` lists what runs.
- `Examples/GroupDocs.Signature.Examples.CSharp/Resources/SampleFiles/` -- sample documents and test
  certificates; `Constants.cs` holds paths and `LicensePath`.
- Legacy, not part of the solution: `Examples/GroupDocs.Signature.Examples.CSharp.Core/`
  (netcoreapp3.1, GroupDocs.Signature 26.6.0) and `Demos/` (web demos on GroupDocs.Signature 20.1 and
  21.1). Do not copy patterns from them. Five files in the shared project are not listed in its
  `.projitems`, so they are never compiled: `AdvancedUsage/CRUD/Processing*SignatureOverCRUD.cs` (3),
  `AdvancedUsage/Verify/VerifyCertificateAdvanced.cs` and `BasicUsage/Common/LicenceUsing.cs`.

Run with the .NET CLI from the output folder (the examples read sample files relative to it):

```bash
dotnet build GroupDocs.Signature.Examples.CSharp.Net10 --configuration Release
cd GroupDocs.Signature.Examples.CSharp.Net10/bin/Release/net10.0
dotnet GroupDocs.Signature.Examples.CSharp.Net10.dll
```

## Troubleshooting

- **`GroupDocsSignatureException: The number of pages cannot exceed 2 in a trial version`**
  -- apply a license (`License.SetLicense`, or `LicensePath` in `Constants.cs`).
- **`The signing certificate expired on ...`** -- 26.9+ rejects expired certificates; renew the
  certificate or set `DigitalSignOptions.AllowExpired`.
- **PDF verify always returns valid before 26.9** -- upgrade; pre-26.9 did not check PDF
  signatures cryptographically.
- **External link in a document fails to resolve** -- `SkipExternalResources` defaults to
  true; whitelist the address through `LoadOptions.WhitelistedResources`.
- **`The type initializer for 'Gdip' threw an exception`** on Linux or macOS -- install libgdiplus and
  set `System.Drawing.EnableUnixSupport`; **`Font Arial was not found`** -- install the fonts.

Still stuck? Post at https://forum.groupdocs.com/c/signature/ -- the development team
responds directly.
