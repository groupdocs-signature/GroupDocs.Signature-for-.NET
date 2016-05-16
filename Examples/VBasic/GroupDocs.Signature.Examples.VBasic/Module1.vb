Module Module1

    Sub Main()

        Utilities.ApplyLicense()

        '#Region "WorkingWithTextSignature"

        'Signatures.SignPdfDocumentWithText("digital signatures.pdf")

        'Signatures.SignCellDocumentWithText("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithText("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithText("getting started.docx")

        '#End Region

        '#Region "WorkingWithImageSignature"

        'Signatures.SignPdfDocumentWithImage("digital signatures.pdf")

        'Signatures.SignCellDocumentWithImage("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithImage("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithImage("getting started.docx")

        '#End Region

        '#Region "WorkingWithDigitalSignature"

        Signatures.SignPdfDocumentDigitally("digital signatures.pdf")

        Signatures.SignCellDocumentDigitally("pie chart.xlsx")

        Signatures.SignWordDocumentDigitally("getting started.docx")

        Signatures.SignSlideDocumentDigitally("butterfly effect.pptx")

        '#End Region

        '#Region "Azure"

        'Signatures.CustomInputHandlerTest("digital signatures.pdf")
        'Signatures.CustomOutputHandlerTest("digital signatures.pdf")

        '#End Region
    End Sub



End Module
