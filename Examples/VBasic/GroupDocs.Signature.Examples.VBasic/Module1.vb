Module Module1

    Sub Main()

        'Utilities.ApplyLicense()

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

        'Signatures.SignPdfDocumentDigitally("digital signatures.pdf")

        'Signatures.SignCellDocumentDigitally("pie chart.xlsx")

        'Signatures.SignWordDocumentDigitally("getting started.docx")

        Signatures.SignSlideDocumentDigitally("butterfly effect.pptx")

        '#End Region

        '#Region "Azure"

        'Signatures.CustomInputHandler("digital signatures.pdf")
        'Signatures.CustomOutputHandler("digital signatures.pdf")

        '#End Region

        '#Region "OpenPasswordProtectedDocuments"
        'Signatures.GetPasswordProtectedDocs("getting started.docx")
        '#End Region

        'Following feature is supported in GroupDocs.Signature for .NET 16.10.0 version
        'Region "SaveTextSignedFormatOptions"

        'Signatures.SignPdfDocumentWithTextWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentWithTextWithSaveFormat("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithTextWithSaveFormat("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithTextWithSaveFormat("getting started.docx")

        'End Region

        'Region "SaveImageSignedFormatOptions"

        'Signatures.SignPdfDocumentWithImageWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentWithImageWithSaveFormat("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithImageWithSaveFormat("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithImageWithSaveFormat("getting started.docx")

        'End Region

        'Region "SaveDigitalSignedFormatOptions"

        'Signatures.SignPdfDocumentDigitallyWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentDigitallyWithSaveFormat("pie chart.xlsx")

        'Signatures.SignWordDocumentDigitallyWithSaveFormat("getting started.docx")

        'digital signatures are not supported yet for slides documents 
        'Signatures.SignSlideDocumentDigitallyWithSaveFormat("butterfly effect.pptx")

        'End Region


    End Sub



End Module
