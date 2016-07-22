using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;

namespace Signature.Net.Sample.Mvc.Engine
{
    public interface ISvgRenderer
    {
        byte[] DrawSvgImage(string svgData, double signatureWidth, double signatureHeight);
    }


    public class SvgRenderer: ISvgRenderer
    {
        public byte[] DrawSvgImage(string svgData, double signatureWidth, double signatureHeight)
        {
            double viewBoxWidth = 264;
            double viewBoxHeight = 88;
            double widthRatio = signatureWidth / viewBoxWidth;
            double heightRatio = signatureHeight / viewBoxHeight;
            byte[] outputImageBytes = null;
            XDocument root = XDocument.Parse(svgData);
            IEnumerable<XElement> pathElements = root.Descendants("{http://www.w3.org/2000/svg}path");
            if (pathElements.Count() > 0)
            { // a drawn image
                using (Image image = new Bitmap((int)signatureWidth, (int)signatureHeight))
                {
                    using (Graphics graphics = Graphics.FromImage(image))
                    {
                        foreach (XElement pathElement in pathElements)
                        {
                            string pathColor = pathElement.Attribute("fill").Value;
                            Color color = System.Drawing.ColorTranslator.FromHtml(pathColor);
                            string drawingInstructionsString = pathElement.Attribute("d").Value;
                            Regex instructionRegex = new Regex(@"([CLM])([^CLM]*)[CLM$]");
                            var matches = instructionRegex.Matches(drawingInstructionsString);
                            double startX = 0, startY = 0;
                            double endX, endY;
                            string[] coordinates;
                            double controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y;
                            foreach (Match drawingInstructionMatch in matches)
                            {
                                string drawingInstruction = drawingInstructionMatch.Groups[1].ToString();
                                string coordsString = drawingInstructionMatch.Groups[2].ToString();
                                coordinates = coordsString.Split(new[] { ',' });
                                char firstCharacter = drawingInstruction[0];
                                switch (firstCharacter)
                                {
                                    case 'M':
                                        startX = Convert.ToDouble(coordinates[0], CultureInfo.InvariantCulture) * widthRatio;
                                        startY = Convert.ToDouble(coordinates[1], CultureInfo.InvariantCulture) * heightRatio;
                                        break;

                                    case 'C':
                                        controlPoint1X = Convert.ToSingle(coordinates[0], CultureInfo.InvariantCulture) * widthRatio;
                                        controlPoint1Y = Convert.ToDouble(coordinates[1], CultureInfo.InvariantCulture) * heightRatio;
                                        controlPoint2X = Convert.ToDouble(coordinates[2], CultureInfo.InvariantCulture) * widthRatio;
                                        controlPoint2Y = Convert.ToDouble(coordinates[3], CultureInfo.InvariantCulture) * heightRatio; ;
                                        endX = Convert.ToDouble(coordinates[4], CultureInfo.InvariantCulture) * widthRatio;
                                        endY = Convert.ToDouble(coordinates[5], CultureInfo.InvariantCulture) * heightRatio;
                                        graphics.DrawBezier(new Pen(color),
                                            (float)startX, (float)startY,
                                            (float)controlPoint1X, (float)controlPoint1Y,
                                            (float)controlPoint2X, (float)controlPoint2Y,
                                            (float)endX, (float)endY);

                                        startX = endX;
                                        startY = endY;
                                        break;

                                    case 'L':
                                        endX = Convert.ToDouble(coordinates[0], CultureInfo.InvariantCulture) * widthRatio;
                                        endY = Convert.ToDouble(coordinates[1], CultureInfo.InvariantCulture) * heightRatio; ;
                                        graphics.DrawLine(new Pen(Brushes.Black), (float)startX, (float)startY, (float)endX, (float)endY);
                                        startX = endX;
                                        startY = endY;
                                        break;
                                }
                            }
                        }
                    }

                    using (MemoryStream outputImageStream = new MemoryStream())
                    {
                        image.Save(outputImageStream, ImageFormat.Png);
                        outputImageBytes = outputImageStream.ToArray();
                    }
                }
            }
            return outputImageBytes;
        }
    }
}