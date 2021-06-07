![Create digital signature with GroupDocs.Signature](https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/banner.png "GroupDocs.Signature")
# GroupDocs.Signature for .NET Web Forms Example
###### version 1.16.0

[![Build status](https://ci.appveyor.com/api/projects/status/jpt31dp2p6u3h8el/branch/master?svg=true)](https://ci.appveyor.com/project/egorovpavel/groupdocs-signature-for-net-webforms/branch/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bae368faab7a4857bf5f239b30c63f3d)](https://www.codacy.com/app/GroupDocs/GroupDocs.Signature-for-.NET-WebForms?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms&amp;utm_campaign=Badge_Grade)
[![GitHub license](https://img.shields.io/github/license/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms.svg)](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms/blob/master/LICENSE)

## System Requirements
- .NET Framework 4.5
- Visual Studio 2015


## Digitally Sign documents with .NET API

GroupDocs.Signature for .NET allows you to **add a digital signature to PDF, DOCX, PPT, XLS** and over 90 formats with no external dependencies. Using powerful and flexible API you can easily add handwritten, barcode, QR code, Image and stamp signatures to a document. 

This web application demonstrates all GroupDocs.Signature features with simple modern UI which can be used as standalone or be integrated into your project.

**Note:** without a license application will run in trial mode, purchase [GroupDocs.Signature for .NET license](https://purchase.groupdocs.com/order-online-step-1-of-8.aspx) or request [GroupDocs.Signature for .NET temporary license](https://purchase.groupdocs.com/temporary-license).

## Demo Video
<p align="center">
  <a title="Document signature for .NET " href="https://youtu.be/MakhcqlV7iQ"> 
    <img src="https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/document-signature-demo.gif" width="100%" style="width:100%;">
  </a>
</p>


## Features 
<p>
<img src="https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/responsive.png?v=1" align="left" width="430"/>
<br/><br/><br/>
  <b>Responsive</b>
<div>Unique experience on the mobile device. Draw signature with your finger in landscape mode.</div>
<br/><br/><br/><br/>
</p>
<br/>
<p>
<img src="https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/digital-signature.png?v=1" align="left" width="430"/>
<br/><br/><br/>
  <b>Digital certificate</b>
<div>Add digital signature to securely sign documents.</div>
<br/><br/><br/>
</p>
<br/>
<p>
<img src="https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/barcode-generator.png?v=1" align="left" width="430"/>
<br/><br/><br/>
  <b>Barcode generator</b>
<div>Embedded barcode generator can generate over 50 barcode symbologies including linear, 2D and postal barcodes.</div>
<br/><br/><br/><br/>
</p>
<br/>
<p>
<img src="https://raw.githubusercontent.com/groupdocs-signature/groupdocs-signature.github.io/master/resources/image/qr-code-generator.png?v=1" align="left" width="430"/>
<br/><br/><br/>
  <b>QR code generator</b>
<div>Embeded QR generator can generate PDF417, MacroPDF417, DataMatrix, Aztec, QR, Italian Post 25, GS1DataMatrix 2D barcodes.</div>
<br/><br/><br/><br/><br/><br/>
</p>
<hr/>

### More features
- Clean, modern and intuitive design
- Easily switchable colour theme (create your own colour theme in 5 minutes)
- Responsive design
- Mobile support (open application on any mobile device)
- Support over 50 documents and image formats
- Image mode
- Fully customizable navigation panel
- Sign password protected documents
- Download original documents
- Download signed documents
- Upload documents
- Upload signatures
- Sign document with such signature types: digital certificate, image, stamp, qrCode, barCode.
- Draw signature image
- Draw stamp signature
- Generate bar code signature
- Generate qr code signature
- Print document
- Smooth page navigation
- Smooth document scrolling
- Preload pages for faster document rendering
- Multi-language support for displaying errors
- Cross-browser support (Safari, Chrome, Opera, Firefox)
- Cross-platform support (Windows, Linux, MacOS)


## How to run

You can run this sample by one of following methods

#### Build from source

Download [source code](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms/archive/master.zip) from github or clone this repository.

```bash
git clone https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms
```

Open solution in the VisualStudio.
Update common parameters in `web.config` and example related properties in the `configuration.yml` to meet your requirements.

Open http://localhost:8080/signature in your favorite browser

#### Docker image
Use [docker](https://hub.docker.com/u/groupdocs) image.

```bash
mkdir DocumentSamples
mkdir Licenses
docker run -p 8080:8080 --env application.hostAddress=localhost -v `pwd`/DocumentSamples:/home/groupdocs/app/DocumentSamples -v `pwd`/Licenses:/home/groupdocs/app/Licenses groupdocs/signature
## Open http://localhost:8080/signature in your favorite browser.
```

## Configuration
For all methods above you can adjust settings in `configuration.yml`. By default in this sample will lookup for license file in `./Licenses` folder, so you can simply put your license file in that folder or specify relative/absolute path by setting `licensePath` value in `configuration.yml`. 

### Signature configuration options

| Option                             | Type    |   Default value   | Description                                                                                                                                  |
| ---------------------------------- | ------- |:-----------------:|:-------------------------------------------------------------------------------------------------------------------------------------------- |
| **`filesDirectory`**               | String  | `DocumentSamples` | Files directory path. Indicates where uploaded and predefined files are stored. It can be absolute or relative path                          |
| **`fontsDirectory`**               | String  |                   | Path to custom fonts directory.                                                                                                              |
| **`defaultDocument`**              | String  |                   | Absolute path to default document that will be loaded automaticaly.                                                                          |
| **`preloadPageCount`**             | Integer |        `0`        | Indicate how many pages from a document should be loaded, remaining pages will be loaded on page scrolling.Set `0` to load all pages at once |
| **`textSignature`**                | Boolean |      `true`       | Enable/disable text signature                                                                                                                |
| **`imageSignature`**               | Boolean |      `true`       | Enable/disable image signature                                                                                                               |
| **`digitalSignature`**             | Boolean |      `true`       | Enable/disable digital signature                                                                                                             |
| **`qrCodeSignature`**              | Boolean |      `true`       | Enable/disable QR-Code signature                                                                                                             |
| **`barCodeSignature`**             | Boolean |      `true`       | Enable/disable Barcode signature                                                                                                             |
| **`stampSignature`**               | Boolean |      `true`       | Enable/disable Stamp signature                                                                                                               |
| **`handSignature`**                | Boolean |      `true`       | Enable/disable Hand signature                                                                                                                |
| **`downloadOriginal`**             | Boolean |      `true`       | Enable/disable original document downloading                                                                                                 |
| **`downloadSigned`**               | Boolean |      `true`       | Enable/disable signed document downloading                                                                                                   | 


## License
The MIT License (MIT). 

Please have a look at the LICENSE.md for more details

## GroupDocs Signature on other platforms & frameworks

- [Create digital signature](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Dropwizard) with JAVA Dropwizard 
- [Create digital signature](https://github.com/groupdocs-signature/GroupDocs.Signature-for-Java-Spring) with JAVA Spring 
- [Create digital signature](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC) with .NET MVC 


[Home](https://www.groupdocs.com/) | [Product Page](https://products.groupdocs.com/signature/net) | [Documentation](https://docs.groupdocs.com/signature/net/) | [Demo](https://products.groupdocs.app/signature/family) | [API Reference](https://apireference.groupdocs.com/signature/net) | [Examples](https://github.com/groupdocs-signature/GroupDocs.Signature-for.NET) | [Blog](https://blog.groupdocs.com/category/signature/) | [Free Support](https://forum.groupdocs.com/c/signature) | [Temporary License](https://purchase.groupdocs.com/temporary-license)
