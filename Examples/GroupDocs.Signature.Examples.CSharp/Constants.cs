using System.IO;

namespace GroupDocs.Signature.Examples.CSharp
{
    internal static class Constants
    {
        public const string LicensePath = "./Resources/GroupDocs.Signature.lic";
        public const string SamplesPath = @"./Resources/SampleFiles";
        public const string ImagesPath = @"./Resources/SampleFiles/Images";
        public const string CertificatesPath = @"./Resources/SampleFiles/Certificates";
        public const string OutputPath = @"./Results/Output";

        // Images
        public static string ImageHandwrite { get { return Path.Combine(ImagesPath, "signature-handwrite.jpg"); } }
        public static string ImageStamp { get { return Path.Combine(ImagesPath, "stamp.png"); } }
        //Certificate
        public static string CertificatePfx { get { return Path.Combine(CertificatesPath, "MrSmithSignature.pfx"); } }
        public static string CertificateCer { get { return Path.Combine(CertificatesPath, "signtest.cer"); } }


        // WordProcessing documents
        public static string SAMPLE_DOCX
            => GetSampleFilePath("getting started.docx");
        public static string SAMPLE_FORMS_DOCX
            => GetSampleFilePath("Forms.docx");

        // PDF
        public static string SAMPLE_PDF
            => GetSampleFilePath("sample.pdf");

        public static string SAMPLE_PDF_SIGNED
            => GetSampleFilePath("sample_signed.pdf");
        public static string SAMPLE_PDF_QRCODE_ENCRYPTED_TEXT
            => GetSampleFilePath("QRCodeEncryptedText.pdf");
        public static string SAMPLE_PDF_QRCODE_ENCRYPTED_OBJECT
            => GetSampleFilePath("QRCodeEncryptedObject.pdf");
        public static string SAMPLE_PDF_QRCODE_CUSTOM_ENCRYPTION_OBJECT
            => GetSampleFilePath("QRCodeCustomEncryptionObject.pdf");
        public static string SAMPLE_PDF_QRCODE_CUSTOM_SERIALIZATION_OBJECT
            => GetSampleFilePath("QRCodeCustomSerializationObject.pdf");
        public static string SAMPLE_PDF_QRCODE_VCARD_OBJECT
            => GetSampleFilePath("QRCodeVCardObject.pdf");
        public static string SAMPLE_PDF_QRCODE_ADDRESS_OBJECT
            => GetSampleFilePath("QRCodeAddressObject.pdf");
        public static string SAMPLE_PDF_QRCODE_EMAIL_OBJECT
            => GetSampleFilePath("QRCodeEmailObject.pdf");        
        public static string SAMPLE_WORD_SIGNED
            => GetSampleFilePath("AllSignatures.docx");
        public static string SAMPLE_DOCX_METADATA_ENCRYPTED_TEXT
            => GetSampleFilePath("MetadataEncryptedText.DOCX");
        public static string SAMPLE_DOCX_METADATA_ENCRYPTED_OBJECT
            => GetSampleFilePath("MetadataEncryptedObject.DOCX");
        public static string SAMPLE_DOCX_METADATA_CUSTOM_ENCRYPTION_OBJECT
            => GetSampleFilePath("MetadataCustomEncryptionObject.DOCX");
        public static string SAMPLE_DOCX_METADATA_CUSTOM_SERIALIZATION_OBJECT
            => GetSampleFilePath("MetadataCustomSerializationObject.DOCX");

        public static string SAMPLE_PDF_SIGNED_FORMFIELD
            => GetSampleFilePath("signed_formfield.pdf");

        public static string SAMPLE_SIGNED_PWD_PDF
            => GetSampleFilePath("sample_signed_pwd.pdf");
        // Spreadsheet document files
        public static string SAMPLE_SPREADSHEET
            => GetSampleFilePath("sample.xlsx");

        public static string SAMPLE_SPREADSHEET_SIGNED
            => GetSampleFilePath("signed_sample.xlsx");

        public static string SAMPLE_PDF_SIGNED_NO_METAINFO
            => GetSampleFilePath("AllSignaturesNoMetadata.pdf");
        public static string SAMPLE_WORDS_SIGNED_NO_METAINFO
            => GetSampleFilePath("AllSignatures.docx");

        // Presentation document files
        public static string SAMPLE_PRESENTATION
            => GetSampleFilePath("sample.ppsx");

        // Image
        public static string SAMPLE_JPG
            => GetSampleFilePath("sample.jpg");

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
