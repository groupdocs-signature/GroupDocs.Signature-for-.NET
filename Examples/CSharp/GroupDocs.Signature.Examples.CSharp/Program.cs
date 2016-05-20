using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupDocs.Signature.Examples.CSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            
            //Utilities.ApplyLicense();

            #region WorkingWithTextSignature

            //Signatures.SignPdfDocumentWithText("digital signatures.pdf");

            //Signatures.SignCellDocumentWithText("pie chart.xlsx");

            //Signatures.SignSlideDocumentWithText("butterfly effect.pptx");

            //Signatures.SignWordDocumentWithText("getting started.docx");

            #endregion

            #region WorkingWithImageSignature

            //Signatures.SignPdfDocumentWithImage("digital signatures.pdf");

            //Signatures.SignCellDocumentWithImage("pie chart.xlsx");

            //Signatures.SignSlideDocumentWithImage("butterfly effect.pptx");

            Signatures.SignWordDocumentWithImage("getting started.docx");

            #endregion

            #region WorkingWithDigitalSignature

            //Signatures.SignPdfDocumentDigitally("digital signatures.pdf");

            //Signatures.SignCellDocumentDigitally("pie chart.xlsx");

            //Signatures.SignWordDocumentDigitally("getting started.docx");

            //Signatures.SignSlideDocumentDigitally("butterfly effect.pptx");

            #endregion

            #region Azure

            //Signatures.CustomInputHandler("digital signatures.pdf");
            //Signatures.CustomOutputHandler("digital signatures.pdf");

            #endregion
        }
    }
}
