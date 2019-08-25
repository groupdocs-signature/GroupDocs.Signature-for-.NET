using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;
    using GroupDocs.Signature.Domain.Extensions;

    public class SignWithStampAdvanced
    {
        /// <summary>
        /// Sign document with Bar-Code signature applying specific options
        /// </summary>
        public static void Run()
        {
            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);            

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithBarcodeAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // setup options with text of signature
                StampSignOptions signOptions = new StampSignOptions()
                {
                    Height = 300,
                    Width = 300,

                    VerticalAlignment = VerticalAlignment.Bottom,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    Margin = new Padding() { Right = 10, Bottom = 10 },

                    Background = new Background() { Color = Color.DarkOrange },
                    BackgroundColorCropType = StampBackgroundCropType.OuterArea,
                    ImageFilePath = Constants.ImageStamp,
                    BackgroundImageCropType = StampBackgroundCropType.InnerArea,
                    AllPages = true
                };

                //add few outer round lines
                signOptions.OuterLines.Add(
                    new StampLine()
                    {
                        Text = "* European Union *",
                        TextRepeatType = StampTextRepeatType.FullTextRepeat,
                        Font = new SignatureFont() { Size = 12, FamilyName = "Arial" },
                        Height = 22,
                        TextBottomIntent = 6,
                        TextColor = Color.WhiteSmoke,
                        BackgroundColor = Color.DarkSlateBlue
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
                        Text = "* Entrepreneur *",
                        TextRepeatType = StampTextRepeatType.FullTextRepeat,
                        TextColor = Color.DarkSlateBlue,
                        Font = new SignatureFont() { Size = 15 },
                        Height = 30,
                        TextBottomIntent = 8,
                        InnerBorder = new Border() { Color = Color.DarkSlateBlue, DashStyle = DashStyle.Dot },
                        OuterBorder = new Border() { Color = Color.DarkSlateBlue },
                    }
                );


                //Inner square lines
                signOptions.InnerLines.Add(
                    new StampLine()
                    { 
                        Text = "John",
                        TextColor = Color.MediumVioletRed,
                        Font = new SignatureFont() { Size = 20, Bold = true },
                        Height = 40,
                    }
                );

                signOptions.InnerLines.Add(
                    new StampLine()
                    {
                        Text = "Smith",
                        TextColor = Color.MediumVioletRed,
                        Font = new SignatureFont() { Size = 20, Bold = true },
                        Height = 40
                    }
                );

                signOptions.InnerLines.Add(
                    new StampLine()
                    {
                        Text = "SSN 1230242424",
                        TextColor = Color.MediumVioletRed,
                        Font = new SignatureFont() { Size = 12, Bold = true },
                        Height = 40,
                    }
                );

                // sign document                
                signature.Sign(outputFilePath, signOptions);
            }
            Console.WriteLine("\nSource document signed successfully.\nFile saved at " + outputFilePath);
        }
    }
}