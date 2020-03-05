
using GroupDocs.Signature.Examples.CSharp.AdvancedUsage;
using GroupDocs.Signature.Examples.CSharp.BasicUsage;
using System;

namespace GroupDocs.Signature.Examples.CSharp
{
    class RunExamples
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Open RunExamples.cs. \nIn Main() method uncomment the example that you want to run.");
            Console.WriteLine("=====================================================");

            // Please uncomment the example you want to try out
            #region Quick Start

            QuickStart.SetLicenseFromFile.Run();
            //QuickStart.SetLicenseFromStream.Run();
            //QuickStart.SetMeteredLicense.Run();
            QuickStart.HelloWorld.Run();
            #endregion // Quick Start

            #region Basic Usage

            #region Common

            GetSupportedFileFormats.Run();

            #endregion

            #region Document Preview
            
            GetDocumentInfo.Run();
            GeneratePreview.Run();
            #endregion

            #region Sign document with different signature types

            //Sign document with text signature
            SignWithText.Run();

            //Sign document with image signature
            SignWithImage.Run();

            //Sign document with barcode signature
            SignWithBarcode.Run();

            //Sign document with qr-code signature
            SignWithQRCode.Run();

            //Sign document with digital signature
            SignWithDigital.Run();

            //Sign document with Stamp signature
            SignWithStamp.Run();

            //Sign image document with metadata signature
            SignImageWithMetadata.Run();

            //Sign pdf document with metadata signature
            SignPdfWithMetadata.Run();

            //Sign presentation document with metadata signature
            SignPresentationWithMetadata.Run();

            //Sign spreadsheets document with metadata signature
            SignSpreadsheetWithMetadata.Run();

            //Sign word-processing document with metadata signature
            SignWordProcessingWithMetadata.Run();

            //Sign pdf document with form-field signature
            SignPdfWithFormField.Run();

            // Sign document with multiple signature types
            SignWithMultipleOptions.Run();

            #endregion // Sign document with different signature types

            #region Search signed documents for different signature types

            //Search document for Text signature
            SearchForText.Run();
            
            //Search document for Image signature
            SearchForImage.Run();

            //Search document for Barcode signature
            SearchForBarcode.Run();

            //Search document for QR-Code signature
            SearchForQRCode.Run();

            //Search document for digital signature
            SearchForDigital.Run();

            //Search document for metadata signature
            SearchForMetadata.Run();

            //Search document for form-field signature
            SearchForFormField.Run();

            //Search document for multiple signature types
            SearchForMultiple.Run();

            #endregion // Search signed documents for different signature types

            #region Verify documents signed with different signature types

            //Verify document with Text signature
            VerifyText.Run();

            //Verify document with Barcode signature
            VerifyBarcode.Run();

            //Verify document with QR-Code signature
            VerifyQRCode.Run();

            //Verify document with digital signature
            VerifyDigital.Run();

            #endregion // Verify documents signed with different signature types

            #region Update signatures in the document
            UpdateText.Run();
            UpdateImage.Run();
            UpdateBarcode.Run();
            UpdateQRCode.Run();
            #endregion

            #region Delete signatures from document
            DeleteText.Run();
            DeleteImage.Run();
            DeleteBarcode.Run();
            DeleteQRCode.Run();
            DeleteMultiple.Run();
            #endregion

            #endregion // Basic Usage

            #region Advanced Usage

            #region Loading
            LoadDocumentFromLocalDisk.Run();
            LoadDocumentFromStream.Run();
            LoadDocumentFromUrl.Run();
            //LoadDocumentFromAmazonS3.Run();
            //LoadDocumentFromAzureBlobStorage.Run();
            //LoadDocumentFromFtp.Run();            
            LoadPasswordProtectedDocument.Run();

            #endregion

            #region Saving

            SaveSignedPdfWithDifferentOutputFileType.Run();
            SaveSignedSpreadsheetWithDifferentOutputFileType.Run();
            SaveSignedWordProcessingWithDifferentOutputFileType.Run();
            SaveSignedPresentationWithDifferentOutputFileType.Run();
            SaveSignedImageWithDifferentOutputFileType.Run();
            SaveSignedImageWithVariousOutputTypes.Run();

            SaveDocumentWithPassword.Run();
            SaveSignedDocumentsAsImages.Run();
            #endregion

            #region Document Preview with hiding signatures
            GeneratePreviewAdvanced.Run();
            GetDocumentInfoAdvanced.Run();
            #endregion

            #region Handling different special exceptions
            HandlingIncorrectPasswordException.Run();
            HandlingPasswordRequiredException.Run();
            #endregion

            #region Sign document with different signature types with additional options

            //Sign document with text signature applying specific options
            SignWithTextAdvanced.Run();

            //Sign document with digital signature applying specific options
            SignWithDigitalAdvanced.Run();

            //Sign document with image signature applying specific options
            SignWithImageAdvanced.Run();

            //Sign document with Barcode signature applying specific options
            SignWithBarcodeAdvanced.Run();

            //Sign document with QR-Code signature applying specific options
            SignWithQRCodeAdvanced.Run();

            // Sign Pdf document with Form-fields
            SignPdfWithFormFieldAdvanced.Run();

            // Sign Pdf document with Stamp signature
            SignWithStampAdvanced.Run();

            // Sign Spreadsheet document with XAdes signature
            SignWithXAdESTypes.Run();

            #endregion

            #region Sign with further result analysis
            SignWithResultAnalysis.Run();
            #endregion

            #region Sign with different signature implementation type
            SignWithTextStamp.Run();
            SignWithTextAnnotation.Run();
            SignWithTextImage.Run();
            SignWithTextSticker.Run();
            SignWithTextFormField.Run();
            SignWithTextWatermark.Run();
            #endregion

            #region Sign QR-Code Encryption, Custom encryption, custom serialization
            SignWithQRCodeEncryptedText.Run();
            SignWithQRCodeEncryptedObject.Run();
            SignWithQRCodeCustomEncryptionObject.Run();
            SignWithQRCodeCustomSerializationObject.Run();
            #endregion

            #region Sign QR-Code standard objects
            SignWithQRCodeAddressObject.Run();
            SignWithQRCodeEmailObject.Run();
            SignWithQRCodeVCardObject.Run();
            #endregion

            #region Sign Metadata advanced
            //Sign document with Metadata signature applying specific options
            SignPdfWithStandardMetadata.Run();
            SignPdfWithCustomMetadata.Run();
            SignImageWithCustomMetadata.Run();

            SignWithMetadataEncryptedText.Run();
            SignWithMetadataEncryptedObject.Run();
            SignWithMetadataCustomEncryptionObject.Run();
            SignWithMetadataCustomSerializationObject.Run();
            #endregion

            #region Sign with different annotation
            SignWithPdfTextAnnotation.Run();
            SignWithPdfTextSticker.Run();
            SignWithImageAppearance.Run();
            SignWithDigitalAppearance.Run();

            #endregion

            #region Sign with different measure type
            SignWithMillimeters.Run();
            SignWithPercents.Run();
            SignWithAlignments.Run();
            #endregion

            SignWithStretchMode.Run();

            SignWithExceptionHandling.Run();

            #region Sining with different brush styles
            SignWithSolidBrush.Run();
            SignWithTextureBrush.Run();
            SignWithLinearGradientBrush.Run();
            SignWithRadialGradientBrush.Run();
            #endregion

            #region Search signed documents for different signature types with additional options

            //Search document for Text signature with applying specific options
            SearchForTextAdvanced.Run();

            //Search document for Image signature with applying specific options
            SearchForImageAdvanced.Run();

            //Search document for Barcode signature with applying specific options
            SearchForBarcodeAdvanced.Run();

            //Search document for encrypted QR-Code signature with applying specific options
            SearchForQRCodeAdvanced.Run();

            //Search document for digital signature with applying specific options
            SearchForDigitalAdvanced.Run();

            //Search document for form-field signature with applying specific options
            SearchForFormFieldAdvanced.Run();

            //Search document for metadata signature with applying specific options
            SearchForMetadataAdvanced.Run();

            #region Search for QR-Code Encryption, Custom encryption, custom serialization
            SearchForMetadataEncryptedText.Run();
            SearchForMetadataEncryptedObject.Run();
            SearchForMetadataCustomEncryptionObject.Run();
            SearchForMetadataCustomSerializationObject.Run();
            #endregion

            #region Search for QR-Code standard objects
            SearchForQRCodeAddressObject.Run();
            SearchForQRCodeEmailObject.Run();
            SearchForQRCodeVCardObject.Run();
            #endregion

            SearchWithExceptionHandling.Run();
            #endregion // Search signed documents for different signature types with additional options

            #region Search for QR-Code Encryption, custom encryption, custom serialization            
            SearchForQRCodeEncryptedText.Run();
            SearchForQRCodeEncryptedObject.Run();
            SearchForQRCodeCustomEncryptionObject.Run();
            SearchForQRCodeCustomSerializationObject.Run();
            #endregion

            SearchAndSkipExternalSignatures.Run();

            #region Verify signed documents with additional options

            //Verify document with Text signature with applying specific options
            VerifyTextAdvanced.Run();

            //Verify document with Barcode signature with applying specific options
            VerifyBarcodeAdvanced.Run();

            //Verify document with QR-Code signature with applying specific options
            VerifyQRCodeAdvanced.Run();

            //Verify document with digital signature with applying specific options
            VerifyDigitalAdvanced.Run();

            #endregion // Verify signed documents with additional options

            #region Subscribing for signing, verification, searching events
            SubscribeSignEvents.Run();
            SubscribeVerifyEvents.Run();
            SubscribeSearchEvents.Run();
            #endregion

            #region Cancellation of signing, verification, searching process
            CancellationSignProcess.Run();
            CancellationVerifyProcess.Run();
            CancellationSearchProcess.Run();
            #endregion

            VerifyWithExceptionHandling.Run();

            #region Updating document signatures
            UpdateTextAfterSearch.Run();
            UpdateTextById.Run();
            UpdateImageAfterSearch.Run();
            UpdateImageById.Run();
            UpdateBarcodeAfterSearch.Run();
            UpdateBarcodeById.Run();
            UpdateQRCodeAfterSearch.Run();
            UpdateQRCodeById.Run();
            UpdateMultipleAdvanced.Run();
            #endregion

            #region Delete signatures from the document
            DeleteTextAfterSearch.Run();
            DeleteTextById.Run();
            DeleteImageAfterSearch.Run();
            DeleteImageById.Run();
            DeleteBarcodeAfterSearch.Run();
            DeleteBarcodeById.Run();
            DeleteQRCodeAfterSearch.Run();
            DeleteQRCodeById.Run();
            DeleteMultipleAdvanced.Run();
            #endregion

            #region Processing signatures over all CRUD operation to show full signature process life-cycle
            ProcessingTextSignatureOverCRUD.Run();
            ProcessingImageSignatureOverCRUD.Run();
            ProcessingBarcodeSignatureOverCRUD.Run();
            ProcessingQrCodeSignatureOverCRUD.Run();
            #endregion

            #endregion // Advanced Usage

            Console.WriteLine();
            Console.WriteLine("All done.");
            Console.ReadKey();
        }
    }
}
