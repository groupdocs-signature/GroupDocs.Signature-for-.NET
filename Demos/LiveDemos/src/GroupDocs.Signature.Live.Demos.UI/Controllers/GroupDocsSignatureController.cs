using System.Web.Http;
using System.Threading.Tasks;
using GroupDocs.Signature.Live.Demos.UI.Models;
using System;
using System.IO;
using System.Drawing;
using GroupDocs.Signature.Domain;
using GroupDocs.Signature.Options;
using GroupDocs.Signature.Domain.Extensions;

namespace GroupDocs.Signature.Live.Demos.UI.Controllers
{
	public class GroupDocsSignatureController : ApiControllerBase
	{
        [HttpGet]
		[ActionName("SignFile")]
		public async Task<Response> SignFile(string fileName, string folderName, string signType, string signText, string signImagePath, string signLocation, string signSize)
		{            
            string logMsg = "ControllerName: GroupDocsSignatureController FileName: " + fileName + " FolderName: " + folderName;

			try
			{
                string fileExt = Path.GetExtension(fileName).Substring(1).ToLower();

                return await ProcessTask(fileName, folderName, "." + fileExt, false, "", delegate (string inFilePath, string outPath, string zipOutFolder)
				{                                       
                    if (!Directory.Exists(zipOutFolder))
                    {
                        Directory.CreateDirectory(zipOutFolder);
                    }                   

                    using (Signature signature = new Signature(inFilePath))
                    {
                        var options = GetSignOptions(signType, signText, signImagePath, signLocation, signSize);
                        SignResult signResult = signature.Sign(outPath, options);
                    }

                });
			}
			catch (Exception exc)
			{
                return new Response { FileName = fileName, FolderName = folderName, OutputType = signType, Status = exc.Message, StatusCode = 500, Text = exc.ToString() };
			}
		}
       
        private SignOptions GetSignOptions(string signType, string signText, string signImagePath, string signLocation, string signSize)
        {
            SignOptions signOptions = null;

            if (signType == "barcode")
            {
                signOptions = GetBarcodeSignOptions(signText, signLocation, signSize);
            }
            else if (signType == "qr-code")
            {
                signOptions = GetQRCodeSignOptions(signText, signLocation, signSize);
            }
            else if (signType == "stamp")
            {
                signOptions = GetStampSignOptions(signText, signLocation, signSize);                
            }
            else if (signType == "text")
            {
                signOptions = GetTextSignOptions(signText, signLocation, signSize);
            }
            else if (signType == "image")
            {
                signOptions = GetImageSignOptions(signImagePath, signLocation, signSize);
            }
            else if (signType == "digital")
            {
                signOptions = GetDigitalSignOptions(signText, signImagePath, signLocation, signSize);
            }

            return signOptions;
        }

        private QrCodeSignOptions GetQRCodeSignOptions(string signText, string signLocation, string signSize)
        {                
            var options = new QrCodeSignOptions(signText)
            {             
                EncodeType = QrCodeTypes.QR,
                VerticalAlignment = VerticalAlignment.Top,
                HorizontalAlignment = HorizontalAlignment.Right,
                Margin = new Padding(10),
                
                Border = new Border()
                {
                    Color = Color.LightGray,
                    DashStyle = DashStyle.Solid,
                    Transparency = 0.5,
                    Visible = true,
                    Weight = 2
                },

                ForeColor = Color.Black,
                Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
                CodeTextAlignment = CodeTextAlignment.Below,

                Background = new Background()
                {
                    Color = Color.Transparent,
                    Transparency = 0.2,
                    Brush = new LinearGradientBrush(Color.White, Color.LightSteelBlue)
                },

            };

            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            options.VerticalAlignment = locationOptions.VerticalAlignment;
            options.HorizontalAlignment = locationOptions.HorizontalAlignment;

            switch (signSize)
            {
                case "small":
                    options.Width = 60;
                    options.Height = 75;
                    break;
                case "medium":
                    options.Width = 60 * 2;
                    options.Height = 75 * 2;
                    break;
                case "large":
                    options.Width = 60 * 3;
                    options.Height = 75 * 3;
                    break;
            }

            return options;
        }

        private BarcodeSignOptions GetBarcodeSignOptions(string signText, string signLocation, string signSize)
        {           
            var options = new BarcodeSignOptions(signText)
            {
                EncodeType = BarcodeTypes.Code128,
                VerticalAlignment = VerticalAlignment.Top,
                HorizontalAlignment = HorizontalAlignment.Right,
                Margin = new Padding(10),
                
                Border = new Border()
                {
                    Color = Color.LightGray,
                    DashStyle = DashStyle.Solid,
                    Transparency = 0.5,
                    Visible = true,
                    Weight = 2
                },

                ForeColor = Color.Black,
                Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },
                CodeTextAlignment = CodeTextAlignment.Below,

                Background = new Background()
                {
                    Color = Color.LightSteelBlue,
                    Transparency = 0.2,
                    Brush = new LinearGradientBrush(Color.White, Color.LightSteelBlue)
                }
            };

            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            options.HorizontalAlignment = locationOptions.HorizontalAlignment;
            options.VerticalAlignment = locationOptions.VerticalAlignment;

            
            switch (signSize)
            {
                case "small":
                    options.Width = 100;
                    options.Height = 50;
                    break;
                case "medium":
                    options.Width = 100 * 2;
                    options.Height = 50 * 2;
                    break;
                case "large":
                    options.Width = 100 * 3;
                    options.Height = 50 * 3;
                    break;
            }                       

            return options;
        }        

        private StampSignOptions GetStampSignOptions(string signText, string signLocation, string signSize)
        {         
            StampSignOptions signOptions = new StampSignOptions()
            {
                Height = 250,
                Width = 250,

                VerticalAlignment = VerticalAlignment.Bottom,
                HorizontalAlignment = HorizontalAlignment.Right,
                Margin = new Padding() { Right = 10, Bottom = 10 },
                Background = new Background()
                {
                    Transparency = 0.2,
                    Brush = new LinearGradientBrush(Color.Orange, Color.DarkOrange, 270)
                },
                BackgroundColorCropType = StampBackgroundCropType.OuterArea,
                //ImageFilePath = "example.jpg",
                BackgroundImageCropType = StampBackgroundCropType.InnerArea,
                AllPages = true
            };

            signOptions.OuterLines.Add(
                new StampLine()
                {
                    Text = $"*{signText}*",
                    TextRepeatType = StampTextRepeatType.FullTextRepeat,
                    Font = new SignatureFont() { Size = 12, FamilyName = "Arial" },
                    Height = 20,
                    TextBottomIntent = 6,
                    TextColor = Color.WhiteSmoke,
                    BackgroundColor = Color.DarkSlateBlue,
                    InnerBorder = new Border()
                    {
                        Color = Color.LightBlue,
                        Transparency = 0.5
                    },
                    OuterBorder = new Border()
                    {
                        Color = Color.DarkBlue,
                        Transparency = 0.4
                    }
                }
            );

            signOptions.OuterLines.Add(
                new StampLine()
                {
                    Height = 2,
                    BackgroundColor = Color.White
                }
            );

            signOptions.OuterLines.Add(
                new StampLine()
                {
                    Text = $"*{signText}*",
                    TextRepeatType = StampTextRepeatType.FullTextRepeat,
                    TextColor = Color.DarkSlateBlue,
                    Font = new SignatureFont() { Size = 15 },
                    Height = 20,
                    TextBottomIntent = 8,
                    InnerBorder = new Border() { Color = Color.DarkSlateBlue, DashStyle = DashStyle.Dot },
                    OuterBorder = new Border() { Color = Color.DarkSlateBlue },
                }
            );            

            signOptions.InnerLines.Add(
                new StampLine()
                {
                    Text = signText,
                    TextColor = Color.MediumVioletRed,
                    Font = new SignatureFont() { Size = 12, Bold = true },
                    Height = 20,
                }
            );

            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            signOptions.HorizontalAlignment = locationOptions.HorizontalAlignment;
            signOptions.VerticalAlignment = locationOptions.VerticalAlignment;
            
            switch (signSize)
            {
                case "small":
                    signOptions.Width = signOptions.Width * 2/3;
                    signOptions.Height = signOptions.Height * 2/3;
                    break;
                case "large":
                    signOptions.Width = signOptions.Width * 4/3;
                    signOptions.Height = signOptions.Height * 4/3;
                    break;
            }


            return signOptions;
        }

        private TextSignOptions GetTextSignOptions(string signText, string signLocation, string signSize)
        {           
            var options = new TextSignOptions(signText)
            {
                Width = 100,
                Height = 30,
                VerticalAlignment = VerticalAlignment.Top,
                SignatureImplementation = TextSignatureImplementation.Image,
                HorizontalAlignment = HorizontalAlignment.Right,
                Margin = new Padding(10),
                
                Border = new Border()
                {
                    Color = Color.LightGray,
                    DashStyle = DashStyle.Solid,
                    Transparency = 0.9,
                    Visible = true,
                    Weight = 2
                },

                ForeColor = Color.Black,
                Font = new SignatureFont { Size = 12, FamilyName = "Comic Sans MS" },

                Background = new Background()
                {
                    Color = Color.Transparent,
                    Transparency = 0.2,
                    Brush = new LinearGradientBrush(Color.White, Color.LightGray, 90)
                },
                TextHorizontalAlignment = TextHorizontalAlignment.Center,
                TextVerticalAlignment = TextVerticalAlignment.Center
            };

            TextShadow shadow = new TextShadow()
            {
                Color = Color.DarkGray,
                Angle = 65,
                Blur = 3,
                Distance = 4,
                Transparency = 0.3
            };
            
            options.Extensions.Add(shadow);


            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            options.VerticalAlignment = locationOptions.VerticalAlignment;
            options.HorizontalAlignment = locationOptions.HorizontalAlignment;
            
            switch (signSize)
            {
                case "medium":
                    options.Width = options.Width * 2;
                    options.Height = options.Height * 2;
                    break;
                case "large":
                    options.Width = options.Width * 3;
                    options.Height = options.Height * 3;
                    break;
            }

            return options;
        }

        private ImageSignOptions GetImageSignOptions(string signImagePath, string signLocation, string signSize)
        {           
            var options = new ImageSignOptions(signImagePath)
            {
                Width = 100,
                Height = 100,
                VerticalAlignment = VerticalAlignment.Top,
                HorizontalAlignment = HorizontalAlignment.Right,
                
                Margin = new Padding(10)
            };

            TextShadow shadow = new TextShadow()
            {
                Color = Color.DarkGray,
                Angle = 65,
                Blur = 3,
                Distance = 4,
                Transparency = 0.3
            };
            
            options.Extensions.Add(shadow);

            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            options.HorizontalAlignment = locationOptions.HorizontalAlignment;
            options.VerticalAlignment = locationOptions.VerticalAlignment;

            switch (signSize)
            {
                case "small":
                    options.Width = 50;
                    options.Height = 50;
                    break;
                case "medium":
                    options.Width = 50 * 2;
                    options.Height = 50 * 2;
                    break;
                case "large":
                    options.Width = 50 * 3;
                    options.Height = 50 * 3;
                    break;
            }

            return options;
        }        

        private async Task<Response> ProcessTask(string fileName, string folderName, string outFileExtension, bool createZip, string userEmail, ActionDelegate action)
		{
			try
			{
                return await Process("GroupDocsSignatureController", fileName, folderName, outFileExtension, createZip, action);
			}
			catch (Exception exc)
			{
				throw exc;
			}
		}

        private QrCodeSignOptions GetLocationOptions(string signLocation)
        {
            QrCodeSignOptions options = new QrCodeSignOptions();

            switch (signLocation)
            {
                case "top right":
                    options.VerticalAlignment = VerticalAlignment.Top;
                    options.HorizontalAlignment = HorizontalAlignment.Right;
                    break;
                case "top left":
                    options.VerticalAlignment = VerticalAlignment.Top;
                    options.HorizontalAlignment = HorizontalAlignment.Left;
                    break;
                case "bottom right":
                    options.VerticalAlignment = VerticalAlignment.Bottom;
                    options.HorizontalAlignment = HorizontalAlignment.Right;
                    break;
                case "bottom left":
                    options.VerticalAlignment = VerticalAlignment.Bottom;
                    options.HorizontalAlignment = HorizontalAlignment.Left;
                    break;
            }

            return options;
        }

        private ImageSignOptions GetDigitalSignOptions(string signText, string signImagePath, string signLocation, string signSize)
        {
            string pfxPath = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Substring(6) + "\\sample_certificate.pfx";

            var options = new DigitalSignOptions(pfxPath, signImagePath)
            {
                Contact = signText,
                Reason = "reason",
                Location = "location",
                Password = "1234567890",

                Width = 100,
                Height = 100,
                VerticalAlignment = VerticalAlignment.Top,
                HorizontalAlignment = HorizontalAlignment.Right,
                Margin = new Padding(10),
            };

            QrCodeSignOptions locationOptions = GetLocationOptions(signLocation);
            options.HorizontalAlignment = locationOptions.HorizontalAlignment;
            options.VerticalAlignment = locationOptions.VerticalAlignment;

            switch (signSize)
            {
                case "small":
                    options.Width = 50;
                    options.Height = 50;
                    break;
                case "medium":
                    options.Width = 50 * 2;
                    options.Height = 50 * 2;
                    break;
                case "large":
                    options.Width = 50 * 3;
                    options.Height = 50 * 3;
                    break;
            }

            return options;
        }
    }
}