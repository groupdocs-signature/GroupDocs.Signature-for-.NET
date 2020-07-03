---
id: groupdocs-signature-for-net-17-4-0-release-notes
url: signature/net/groupdocs-signature-for-net-17-4-0-release-notes
title: GroupDocs.Signature for .NET 17.4.0 Release Notes
weight: 8
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 17.4.0{{< /alert >}}

## Major Features

There are about 15 improvements, new features and fixes in this regular release. The most notable are:

*   Introduced Image Appearance for Text Signature for Pdf, Slides, Words and Cells Documents
*   Improved rendering Image from Text property for Text Signature for all document types
*   Introduced Image Appearance for Image Signatures for all document types
*   Implemented gray scale filter for Image Appearance and Text as Image Appearance for all supported document types
*   Introduced ability to save signed Documents with password
*   Introduced ability to remove or change password protection of signed Documents
*   Implemented brightness and contrast filters for Image Appearance
*   Involved ability to hide Digital Signature on Pdf Documents
*   Implemented Strike Out Font property for Text Signature
*   Fixed Excel files saving issues with formatting

## Full List of Issues Covering all Changes in this Release
| Key | Summary | Issue Type |
| --- | --- | --- |
| SIGNATURENET-2347 | Implement Visible flag of Pdf Digital Signature | New Feature |
| SIGNATURENET-2350 | Implement ability to protect signed document with password | New Feature |
| SIGNATURENET-2351 | Implement password protection for signed Pdf Documents | New Feature |
| SIGNATURENET-2353 | Implement password protection for signed Cells Documents | New Feature |
| SIGNATURENET-2355 | Implement password protection for signed Words Documents | New Feature |
| SIGNATURENET-2357 | Implement password protection for signed Slides Documents | New Feature |
| SIGNATURENET-2595 | Implement Font StrikeOut property for all Text Signature Implementation for supported Document Types | Improvement |
| SIGNATURENET-2741 | Implement alternative Appearance features of Image Signature for Pdf Documents | New Feature |
| SIGNATURENET-2758 | Implement alternative Appearance features of Image Signature for Cells Documents | New Feature |
| SIGNATURENET-2761 | Implement alternative Appearance features of Image Signature for Slides Documents | New Feature |
| SIGNATURENET-2764 | Implement alternative Appearance features of Image Signature for Words Documents | New Feature |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 17.4.0. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

*   Added new public class ImageAppearance to specify extended properties for Image Signatures. This class contains properties to specify Gray scale filter, Brightness, Contrast and Gamma filters. When signing Document with Image Signature options assign instance of ImageAppearance to Appearance property of options. Also ImageAppearance can be applied for Text Signature with TextAsImage Implementation selection.
    
    Here is an example of using this feature:
    
    **Add Extended Options to Image Signature appearance**  
    
    ```csharp
    string storagePath = @"c:\Aspose\Test\Storage";
    string outputPath = @"c:\Aspose\Test\Output";
    string imagePath = @"c:\Aspose\Test\Images";
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = storagePath,
        ImagesPath = imagePath,
        OutputPath = outputPath
    };
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    //setup size and position
    WordsSignImageOptions signOptions = new WordsSignImageOptions("signature.jpg");
    signOptions.Left = 100;
    signOptions.Top = 100;
    signOptions.Width = 200;
    signOptions.Height = 200;
    // setup rotation
    signOptions.RotationAngle = 48;
    // setup opacity
    signOptions.Opacity = 0.88;
    //setup additional image appearance
    ImageAppearance imageAppearance = new ImageAppearance();
    imageAppearance.Brightness = 1.2f;
    imageAppearance.Grayscale = true;
    imageAppearance.BorderDashStyle = ExtendedDashStyle.Dot;
    imageAppearance.BorderColor = System.Drawing.Color.OrangeRed;
    imageAppearance.BorderWeight = 5;
    signOptions.Appearance = imageAppearance;
     
    // sign document
    string signedPath = handler.Sign<string>("test.docx", signOptions,
        new SaveOptions { OutputType = OutputType.String, OutputFileName = "Words_Image_Rotation_Opacity" });
    Console.WriteLine("Signed file path is: " + signedPath);
    ```
    

*   Introduced password protection saving. SaveOptions class was extended with Password string property to specify output password for signed document and UseOriginalPassword Boolean property to specify if original password of document should not be changed.
    
    Following example shows how to manipulate password with SaveOptions:
    
    **Work with password protected documents**
    
    
    
    ```csharp
    // setup Signature configuration
    SignatureConfig signConfig = new SignatureConfig
    {
        StoragePath = @"c:\Aspose\Test\Storage",
        OutputPath = @"c:\Aspose\Test\Output"
    };
    string password_1 = "1234567890";
    string password_2 = "0987654321";
    // instantiating the conversion handler
    SignatureHandler handler = new SignatureHandler(signConfig);
    // setup options with text of signature
    SignOptions signOptions = new CellsSignTextOptions("John Smith");
    // specify load options
    LoadOptions loadOptions = new LoadOptions();
    // specify save options
    SaveOptions saveOptions = new SaveOptions{OutputType = OutputType.String};
     
    //Sign document and save it without password
    //Set signed document name
    saveOptions.OutputFileName = "WorkWithPasswordProtectedDocuments_WithoutPassword";
    string signedDocumentWithoutPassword = handler.Sign<string>("test.xls", signOptions, loadOptions, saveOptions);
     
    //Sign document and save it with new password
    //Set signed document name
    saveOptions.OutputFileName = "WorkWithPasswordProtectedDocuments_NewPassword";
    //Add password to save options
    saveOptions.Password = password_1;
    //Sign document with new password
    string signedDocumentWithPassword = handler.Sign<string>(signedDocumentWithoutPassword, signOptions, loadOptions, saveOptions);
     
    //Sign document and save it with original password
    //Set signed document name
    saveOptions.OutputFileName = "WorkWithPasswordProtectedDocuments_OriginalPassword";
    //Add password to load options to have ability to open document
    loadOptions.Password = password_1;
    //Set saveOptions to use password from loadOptions
    saveOptions.UseOriginalPassword = true;
    saveOptions.Password = String.Empty;
    //Sign document with original password
    string signedDocumentWithOriginalPassword = handler.Sign<string>(signedDocumentWithPassword, signOptions, loadOptions, saveOptions);
     
    //Sign document and save it with another password
    //Set signed document name
    saveOptions.OutputFileName = "WorkWithPasswordProtectedDocuments_AnotherPassword";
    //Add password to load options to have ability to open document
    loadOptions.Password = password_1;
    //Set saveOptions to use another password
    saveOptions.UseOriginalPassword = false;
    saveOptions.Password = password_2;
    //Sign document with another password
    string signedDocumentWithAnotherPassword = handler.Sign<string>(signedDocumentWithOriginalPassword, signOptions, loadOptions, saveOptions);
     
    //Sign document and save it without password
    //Set signed document name
    saveOptions.OutputFileName = "WorkWithPasswordProtectedDocuments_RemovedPassword";
    //Add password to load options to have ability to open document
    loadOptions.Password = password_2;
    //Set saveOptions with empty password
    saveOptions.UseOriginalPassword = false;
    saveOptions.Password = String.Empty;
    //Sign document with removed password
    string signedDocumentWithRemovedPassword = handler.Sign<string>(signedDocumentWithAnotherPassword, signOptions, loadOptions, saveOptions);
    
    
    ```
    
*   Updated XML comments of public API methods and classes with more detailed information.
