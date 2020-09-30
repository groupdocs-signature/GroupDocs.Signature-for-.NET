using System;
using System.IO;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Examples.CSharp;

    public class OptionsSerialization
    {

        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Quick Start] # Options serialization and deserialization\n");

            List<SignOptions> collection = new List<SignOptions>();

            TextSignOptions textSignOptions = GetTextSignOptions();
            collection.Add(textSignOptions);

            ImageSignOptions imageSignOptions = GetImageSignOptions();
            collection.Add(imageSignOptions);

            DigitalSignOptions digitalSignOptions = GetDigitalSignOptions();
            collection.Add(digitalSignOptions);

            BarcodeSignOptions barcodeSignOptions = GetBarcodeSignOptions();
            collection.Add(barcodeSignOptions);

            QrCodeSignOptions qrCodeSignOptions = GetQrCodeSignOptions();
            collection.Add(qrCodeSignOptions);

            string serialized = JsonConvert.SerializeObject(collection);

            JsonConverter[] converters = { new SignOptionsJsonConverter(), new BarcodeTypeJsonConverter(), new QrCodeTypeJsonConverter() };

            List<SignOptions> deserialized = JsonConvert.DeserializeObject<List<SignOptions>>(serialized, converters);

            Console.WriteLine(deserialized.Count);

            if (deserialized != null)
            {
                // The path to the documents directory.
                string filePath = Constants.SAMPLE_PDF;
                string fileName = System.IO.Path.GetFileName(filePath);

                string outputFilePath = Path.Combine(Constants.OutputPath, "OptionsSerialization", fileName);

                using (Signature signature = new Signature(filePath))
                {
                    // sign document to file
                    SignResult signResult = signature.Sign(outputFilePath, deserialized);

                    Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");
                }
            }
        }

        #region Options

        static BarcodeSignOptions GetBarcodeSignOptions()
        {
            BarcodeSignOptions result = new BarcodeSignOptions("123456789012", BarcodeTypes.Code39Standard);
            // alignment settings
            result.Left = 100;
            result.Top = 50;
            result.Width = 200;
            result.Height = 120;
            result.AllPages = true;
            result.PageNumber = 1;
            result.PagesSetup = new PagesSetup() { FirstPage = true, LastPage = false, OddPages = true, EvenPages = false, PageNumbers = { 1, 2, 3 } };
            result.HorizontalAlignment = Domain.HorizontalAlignment.Right;
            result.VerticalAlignment = Domain.VerticalAlignment.Top;
            // border settings
            result.Border.Color = System.Drawing.Color.Red;
            result.Border.DashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDash;
            result.Border.Transparency = 0.8;
            result.Border.Weight = 2;
            result.Border.Visible = true;
            // background settings
            result.Background.Color = System.Drawing.Color.Yellow;
            result.Background.Transparency = 0.5;
            result.ForeColor = System.Drawing.Color.Green;

            return result;
        }
        static QrCodeSignOptions GetQrCodeSignOptions()
        {
            QrCodeSignOptions result = new QrCodeSignOptions("123456789012", QrCodeTypes.Aztec);
            // alignment settings
            result.Left = 100;
            result.Top = 50;
            result.Width = 200;
            result.Height = 120;
            result.AllPages = true;
            result.PageNumber = 1;
            result.PagesSetup = new PagesSetup() { FirstPage = true, LastPage = false, OddPages = true, EvenPages = false, PageNumbers = { 1, 2, 3 } };
            result.HorizontalAlignment = Domain.HorizontalAlignment.Right;
            result.VerticalAlignment = Domain.VerticalAlignment.Center;
            // border settings
            result.Border.Color = System.Drawing.Color.Red;
            result.Border.DashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDash;
            result.Border.Transparency = 0.8;
            result.Border.Weight = 2;
            result.Border.Visible = true;
            // background settings
            result.Background.Color = System.Drawing.Color.Yellow;
            result.Background.Transparency = 0.5;
            result.ForeColor = System.Drawing.Color.Green;

            return result;
        }
        static TextSignOptions GetTextSignOptions()
        {
            TextSignOptions result = new TextSignOptions("John Smith");
            // alignment settings
            result.Left = 100;
            result.Top = 50;
            result.Width = 200;
            result.Height = 120;
            result.AllPages = true;
            result.PageNumber = 1;
            result.PagesSetup = new PagesSetup() { FirstPage = true, LastPage = false, OddPages = true, EvenPages = false, PageNumbers = { 1, 2, 3 } };
            result.HorizontalAlignment = Domain.HorizontalAlignment.Left;
            result.VerticalAlignment = Domain.VerticalAlignment.Top;
            // border settings
            result.Border.Color = System.Drawing.Color.Red;
            result.Border.DashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDash;
            result.Border.Transparency = 0.8;
            result.Border.Weight = 2;
            result.Border.Visible = true;
            // background settings
            result.Background.Color = System.Drawing.Color.Yellow;
            result.Background.Transparency = 0.5;
            result.ForeColor = System.Drawing.Color.Green;

            return result;
        }
        static ImageSignOptions GetImageSignOptions()
        {
            string imagePath = Constants.ImageHandwrite;

            ImageSignOptions result = new ImageSignOptions(imagePath);
            // alignment settings
            result.Left = 100;
            result.Top = 350;
            result.Width = 200;
            result.Height = 120;
            result.AllPages = true;
            result.PageNumber = 1;
            result.PagesSetup = new PagesSetup() { FirstPage = true, LastPage = false, OddPages = true, EvenPages = false, PageNumbers = { 1, 2, 3 } };
            result.HorizontalAlignment = Domain.HorizontalAlignment.Left;
            result.VerticalAlignment = Domain.VerticalAlignment.Center;

            // border settings
            result.Border.Color = System.Drawing.Color.Red;
            result.Border.DashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDash;
            result.Border.Transparency = 0.8;
            result.Border.Weight = 2;
            result.Border.Visible = true;

            return result;
        }
        static DigitalSignOptions GetDigitalSignOptions()
        {
            string imagePath = Constants.ImageHandwrite;
            string certificatePath = Constants.CertificatePfx;
            string password = "1234567890";

            DigitalSignOptions result = new DigitalSignOptions(certificatePath, imagePath);
            result.Password = password;

            // alignment settings
            result.Left = 100;
            result.Top = 550;
            result.Width = 200;
            result.Height = 120;
            result.AllPages = true;
            result.PageNumber = 1;
            result.PagesSetup = new PagesSetup() { FirstPage = true, LastPage = false, OddPages = true, EvenPages = false, PageNumbers = { 1, 2, 3 } };
            result.HorizontalAlignment = Domain.HorizontalAlignment.Left;
            result.VerticalAlignment = Domain.VerticalAlignment.Bottom;

            // border settings
            result.Border.Color = System.Drawing.Color.Red;
            result.Border.DashStyle = GroupDocs.Signature.Domain.DashStyle.DashLongDash;
            result.Border.Transparency = 0.8;
            result.Border.Weight = 2;
            result.Border.Visible = true;

            return result;
        }
        #endregion

        internal abstract class JsonCreationConverter<T> : JsonConverter
        {
            public override bool CanWrite => false;

            protected abstract T Create(Type objectType, JObject jObject);

            public override bool CanConvert(Type objectType)
            {
                return typeof(T).IsAssignableFrom(objectType);
            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                var jObject = JObject.Load(reader);
                var target = Create(objectType, jObject);
                serializer.Populate(jObject.CreateReader(), target);
                return target;
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                throw new NotImplementedException();
            }

            protected SignatureType GetSignatureType(JObject jObject)
            {
                var result = SignatureType.Unknown;

                if (result == SignatureType.Unknown)
                {
                    bool hasItem = jObject.ContainsKey("EncodeType");
                    if (hasItem)
                    {
                        JToken encodeType = jObject["EncodeType"];
                        if (encodeType!=null)
                        {
                            string encodeTypeName = encodeType["TypeName"]?.ToString();
                            if (!String.IsNullOrEmpty(encodeTypeName))
                            {
                                foreach (BarcodeType item in BarcodeTypes.AllTypes)
                                {
                                    if (item.TypeName == encodeTypeName)
                                    {
                                        result = SignatureType.Barcode;
                                        break;
                                    }
                                }
                                foreach (QrCodeType item in QrCodeTypes.AllTypes)
                                {
                                    if (item.TypeName == encodeTypeName)
                                    {
                                        result = SignatureType.QrCode;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }                
                if (result == SignatureType.Unknown)
                {
                    bool hasItem = jObject.ContainsKey("Password");
                    result = hasItem ? SignatureType.Digital : SignatureType.Unknown;
                }
                if (result == SignatureType.Unknown)
                {
                    bool hasItem = jObject.ContainsKey("ImageFilePath");
                    result = hasItem ? SignatureType.Image : SignatureType.Unknown;
                }
                if (result == SignatureType.Unknown)
                {
                    bool hasItem = jObject.ContainsKey("Font");
                    result = hasItem ? SignatureType.Text : SignatureType.Unknown;
                }

                return result;
            }

            protected BarcodeType GetBarcodeType(JObject jObject)
            {
                BarcodeType result = null;

                bool hasItem = jObject.ContainsKey("TypeName");
                if (hasItem)
                {
                    JToken encodeType = jObject["TypeName"];
                    if (encodeType != null)
                    {
                        string encodeTypeName = encodeType.Value<string>();
                        if (!String.IsNullOrEmpty(encodeTypeName))
                        {
                            foreach (BarcodeType item in BarcodeTypes.AllTypes)
                            {
                                if (item.TypeName == encodeTypeName)
                                {
                                    result = item;
                                    break;
                                }
                            }
                        }
                    }
                }

                return result;
            }

            protected QrCodeType GetQrCodeType(JObject jObject)
            {
                QrCodeType result = null;

                bool hasItem = jObject.ContainsKey("TypeName");
                if (hasItem)
                {
                    JToken encodeType = jObject["TypeName"];
                    if (encodeType != null)
                    {
                        string encodeTypeName = encodeType.Value<string>();
                        if (!String.IsNullOrEmpty(encodeTypeName))
                        {
                            foreach (QrCodeType item in QrCodeTypes.AllTypes)
                            {
                                if (item.TypeName == encodeTypeName)
                                {
                                    result = item;
                                    break;
                                }
                            }
                        }
                    }
                }

                return result;
            }

        }

        internal class BarcodeTypeJsonConverter : JsonCreationConverter<BarcodeType>
        {
            protected override BarcodeType Create(Type objectType, JObject jObject)
            {
                BarcodeType result = GetBarcodeType(jObject);

                return result;
            }
        }

        internal class QrCodeTypeJsonConverter : JsonCreationConverter<QrCodeType>
        {
            protected override QrCodeType Create(Type objectType, JObject jObject)
            {
                QrCodeType result = GetQrCodeType(jObject);

                return result;
            }
        }

        internal class SignOptionsJsonConverter : JsonCreationConverter<SignOptions>
        {
            protected override SignOptions Create(Type objectType, JObject jObject)
            {
                SignOptions result = null;
                var signatureType = GetSignatureType(jObject);

                // check SignatureType
                // check for Barcode options
                if (signatureType == SignatureType.Barcode)
                {
                    result = new BarcodeSignOptions();
                }
                // check for QrCode options
                if (result == null && signatureType == SignatureType.QrCode)
                {
                    result = new QrCodeSignOptions();
                }
                // check for digital options
                if (result == null && signatureType == SignatureType.Digital)
                {
                    result = new DigitalSignOptions();
                }
                // check for text options
                if (result == null && signatureType == SignatureType.Text)
                {
                    result = new TextSignOptions();
                }
                // check for image options
                if (result == null && signatureType == SignatureType.Image)
                {
                    result = new ImageSignOptions();
                }
                // check for stamp options
                if (result == null && signatureType == SignatureType.Stamp)
                {
                    result = new StampSignOptions();
                }

                return result;
            }
        }




    }


}
