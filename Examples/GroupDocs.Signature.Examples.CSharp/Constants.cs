using System.IO;
using System.Reflection;

namespace GroupDocs.Signature.Examples.CSharp
{
    internal static class Constants
    {
        public const string LicensePath = @"./Resources/GroupDocs.Signature.lic";
        public const string SamplesPath = @"./Resources/SampleFiles";
        public const string ImagesPath = @"./Resources/SampleFiles/Images";
        public const string CertificatesPath = @"./Resources/SampleFiles/Certificates";
        public const string OutputPath = @"./Results/Output";

        // Images
        public static string ImageHandwrite { get { return Path.Combine(ImagesPath, "signature_handwrite.jpg"); } }
        public static string ImageStamp { get { return Path.Combine(ImagesPath, "stamp.png"); } }
        //Certificate
        public static string CertificatePfx { get { return Path.Combine(CertificatesPath, "MrSmithSignature.pfx"); } }
        public static string CertificateCer { get { return Path.Combine(CertificatesPath, "signtest.cer"); } }

        // WordProcessing
        public static string SAMPLE_WORDPROCESSING
            => GetSampleFilePath("sample.docx");
        public static string SAMPLE_FORMS_DOCX
            => GetSampleFilePath("sample_formfields.docx");
        public static string SAMPLE_SIGNED_MULTI
            => GetSampleFilePath("sample_multiple_signatures.docx");
        public static string SAMPLE_SIGNED_MULTI_XLSX
            => GetSampleFilePath("sample_multiple_signatures.xlsx");
        public static string SAMPLE_HISTORY
            => GetSampleFilePath("sample_history.docx");

        // PDF
        public static string SAMPLE_PDF
            => GetSampleFilePath("sample.pdf");
        public static string SAMPLE_PDF_SIGNED
            => GetSampleFilePath("sample_signed.pdf");
        public static string SAMPLE_PDF_SIGNED_FORMFIELD
            => GetSampleFilePath("sample_formfields.pdf");
        public static string SAMPLE_PDF_SIGNED_PWD
             => GetSampleFilePath("sample_signed_pwd.pdf");
        public static string SAMPLE_PDF_SIGNED_DIGITAL
            => GetSampleFilePath("sample_signed_digital.pdf");

        //Spreadsheets
        public static string SAMPLE_SPREADSHEET
            => GetSampleFilePath("sample.xlsx");
        public static string SAMPLE_SPREADSHEET_MACRO_SUPPORT
            => GetSampleFilePath("sample.xlsm");

        // Presentations
        public static string SAMPLE_PRESENTATION
            => GetSampleFilePath("sample.pptx");

        // Images
        public static string SAMPLE_IMAGE
            => GetSampleFilePath("sample.png");
        public static string SAMPLE_WEBP
            => GetSampleFilePath("sample.webp");

        // Multi-layer images
        public static string SAMPLE_DICOM
            => GetSampleFilePath("sample.dcm");
        public static string SAMPLE_DICOM_SIGNED
            => GetSampleFilePath("sample_signed.dcm");

        //Metadata
        public static string SAMPLE_PDF_SIGNED_METADATA => GetSampleFilePath("sample_signed_metadata.pdf");
        public static string SAMPLE_PRESENTATION_SIGNED_METADATA => GetSampleFilePath("sample_signed_metadata.pptx");
        public static string SAMPLE_SPREADSHEET_SIGNED_METADATA => GetSampleFilePath("sample_signed_metadata.xlsx");
        public static string SAMPLE_WORDSPROCESSING_SIGNED_METADATA => GetSampleFilePath("sample_signed_metadata.docx");
        public static string SAMPLE_IMAGE_SIGNED_METADATA => GetSampleFilePath("sample_signed_metadata.png");
        public static string SAMPLE_DOCX_METADATA_ENCRYPTED_TEXT
            => GetSampleFilePath("sample_metadata_encrypted_text.docx");
        public static string SAMPLE_DOCX_METADATA_ENCRYPTED_OBJECT
            => GetSampleFilePath("sample_metadata_encrypted_object.docx");
        public static string SAMPLE_DOCX_METADATA_CUSTOM_ENCRYPTION_OBJECT
            => GetSampleFilePath("sample_metadata_custom_encryption_object.docx");
        public static string SAMPLE_DOCX_METADATA_CUSTOM_SERIALIZATION_OBJECT
            => GetSampleFilePath("sample_metadata_custom_serialization_object.docx");
        //QrCode encryption and serialization
        public static string SAMPLE_PDF_QRCODE_ENCRYPTED_TEXT
            => GetSampleFilePath("sample_qrcode_encrypted_text.pdf");
        public static string SAMPLE_PDF_QRCODE_ENCRYPTED_OBJECT
            => GetSampleFilePath("sample_qrcode_encrypted_object.pdf");
        public static string SAMPLE_PDF_QRCODE_CUSTOM_ENCRYPTION_OBJECT
            => GetSampleFilePath("sample_qrcode_custom_encryption_object.pdf");
        public static string SAMPLE_PDF_QRCODE_CUSTOM_SERIALIZATION_OBJECT
            => GetSampleFilePath("sample_qrcode_custom_serialization_object.pdf");
        public static string SAMPLE_PDF_QRCODE_VCARD_OBJECT
            => GetSampleFilePath("sample_qrcode_vcard_object.pdf");
        public static string SAMPLE_PDF_QRCODE_ADDRESS_OBJECT
            => GetSampleFilePath("sample_qrcode_address_object.pdf");
        public static string SAMPLE_PDF_QRCODE_EMAIL_OBJECT
            => GetSampleFilePath("sample_qrcode_email_object.pdf");
        public static string SAMPLE_PDF_QRCODE_MECARD_OBJECT
            => GetSampleFilePath("sample_qrcode_mecard_object.pdf");
        public static string SAMPLE_PDF_QRCODE_EPC_OBJECT
            => GetSampleFilePath("sample_qrcode_epc_object.pdf");
        public static string SAMPLE_PDF_QRCODE_EVENT_OBJECT
            => GetSampleFilePath("sample_qrcode_event_object.pdf");
        public static string SAMPLE_PDF_QRCODE_WIFI_OBJECT
            => GetSampleFilePath("sample_qrcode_wifi_object.pdf");
        public static string SAMPLE_PDF_QRCODE_SMS_OBJECT
            => GetSampleFilePath("sample_qrcode_sms_object.pdf");

        #region Sample PDF with complex QR-Code data
        public static string SAMPLE_PDF_QRCODE_HIBCLICPRIMARY_OBJECT
            => GetSampleFilePath("sample_qrcode_hibclic_prmdata.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCLICPSECONDARY_OBJECT
            => GetSampleFilePath("sample_qrcode_hibclic_secdata.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCLICCOMBINED_OBJECT
            => GetSampleFilePath("sample_qrcode_hibclic_cmbdata.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCLICMAILMARK2DTYPE07_OBJECT
            => GetSampleFilePath("sample_qrcode_mailmark2d_type07.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCLICMAILMARK2DTYPE09_OBJECT
            => GetSampleFilePath("sample_qrcode_mailmark2d_type09.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCLICMAILMARK2DTYPE29_OBJECT
            => GetSampleFilePath("sample_qrcode_mailmark2d_type29.pdf");
        public static string SAMPLE_PDF_QRCODE_HIBCPASDATA_OBJECT
            => GetSampleFilePath("sample_qrcode_hibcpasdata.pdf");
        // Archive Documents
        public static string SAMPLE_ZIP
            => GetSampleFilePath("sample.zip");
        public static string SAMPLE_TAR
            => GetSampleFilePath("sample.tar");
        public static string SAMPLE_7Z
            => GetSampleFilePath("sample.7z");

        // Signed Archive Documents
        public static string SAMPLE_SIGNED_ZIP
            => GetSampleFilePath("signed.zip");
        public static string SAMPLE_SIGNED_TAR
            => GetSampleFilePath("signed.tar");
        public static string SAMPLE_SIGNED_7Z
            => GetSampleFilePath("signed.7z");
        #endregion

        private static string GetSampleFilePath(string filePath)
        {
            return Path.Combine(SamplesPath, filePath);
        }

        public static void CheckDir(string filePath)
        {
            string dir = Path.GetDirectoryName(filePath);

            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
        }

    }
}
