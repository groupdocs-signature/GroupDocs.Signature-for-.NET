using System;
using System.IO;
using System.Drawing;

namespace GroupDocs.Signature.Examples.CSharp.AdvancedUsage
{
    using GroupDocs.Signature;
    using GroupDocs.Signature.Domain;
    using GroupDocs.Signature.Options;

    public class SignWithStampAdvanced
    {
        /// <summary>
        /// Sign document with Stamp signature applying specific options
        /// </summary>
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Advanced Usage] # SignWithStampAdvanced : Sign document with Stamp signature applying specific options\n");

            // The path to the documents directory.
            string filePath = Constants.SAMPLE_PDF;
            string fileName = Path.GetFileName(filePath);            

            string outputFilePath = Path.Combine(Constants.OutputPath, "SignWithStampAdvanced", fileName);

            using (Signature signature = new Signature(filePath))
            {
                // setup options with text of signature
                StampSignOptions signOptions = new StampSignOptions()
                {
                    Height = 300,
                    Width = 300,

                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Margin = new Padding() { Right = 10, Bottom = 10 },
                    Transparency = 0.2,
                    Background = new Background() { Color = Color.DarkOrange, Transparency = 0.5 },
                    Border = new Border(){ Visible = true, Color = Color.OrangeRed,
                        DashStyle = DashStyle.DashLongDashDot, Weight = 2 },
                    BackgroundColorCropType = StampBackgroundCropType.OuterArea,
                    ImageFilePath = Constants.ImageHandwrite,
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
                SignResult signResult = signature.Sign(outputFilePath, signOptions);
                Console.WriteLine($"\nSource document signed successfully with {signResult.Succeeded.Count} signature(s).\nFile saved at {outputFilePath}.");

                Console.WriteLine("\nList of newly created signatures:");
                int number = 1;
                foreach (BaseSignature temp in signResult.Succeeded)
                {
                    Console.WriteLine($"Signature #{number++}: Type: {temp.SignatureType} Id:{temp.SignatureId}, Location: {temp.Left}x{temp.Top}. Size: {temp.Width}x{temp.Height}");
                }
            }
        }
    }
}