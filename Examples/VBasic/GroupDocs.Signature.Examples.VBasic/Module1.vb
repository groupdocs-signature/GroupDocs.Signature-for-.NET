Module Module1

    Sub Main()

        'Utilities.ApplyLicense()

#Region "WorkingWithTextSignature"

        'Signatures.SignPdfDocumentWithText("digital signatures.pdf")

        'Signatures.SignCellDocumentWithText("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithText("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithText("getting started.docx")

#End Region

#Region "WorkingWithImageSignature"

        'Signatures.SignPdfDocumentWithImage("digital signatures.pdf")

        'Signatures.SignCellDocumentWithImage("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithImage("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithImage("getting started.docx")

        'Signatures.SetOpacityImageSignature("getting started.docx")

#End Region

#Region "WorkingWithDigitalSignature"

        'Signatures.SignPdfDocumentDigitally("digital signatures.pdf")

        'Signatures.SignCellDocumentDigitally("pie chart.xlsx")

        'Signatures.SignWordDocumentDigitally("getting started.docx")

        'Signatures.SignSlideDocumentDigitally("butterfly effect.pptx")

#End Region

#Region "Azure"

        'Signatures.CustomInputHandler("digital signatures.pdf")
        'Signatures.CustomOutputHandler("digital signatures.pdf")

#End Region

#Region "OpenPasswordProtectedDocuments"
        'Signatures.GetPasswordProtectedDocs("getting started.docx")
        'Signatures.ManipulatePasswordWithSaveOptions("pie chart.xlsx")

#End Region

        'Following feature is supported in GroupDocs.Signature for .NET 16.10.0 version
#Region "SaveTextSignedFormatOptions"

        'Signatures.SignPdfDocumentWithTextWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentWithTextWithSaveFormat("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithTextWithSaveFormat("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithTextWithSaveFormat("getting started.docx")

#End Region

#Region "SaveImageSignedFormatOptions"

        'Signatures.SignPdfDocumentWithImageWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentWithImageWithSaveFormat("pie chart.xlsx")

        'Signatures.SignSlideDocumentWithImageWithSaveFormat("butterfly effect.pptx")

        'Signatures.SignWordDocumentWithImageWithSaveFormat("getting started.docx")

#End Region

#Region "SaveDigitalSignedFormatOptions"

        'Signatures.SignPdfDocumentDigitallyWithSaveFormat("digital signatures.pdf")

        'Signatures.SignCellDocumentDigitallyWithSaveFormat("pie chart.xlsx")

        'Signatures.SignWordDocumentDigitallyWithSaveFormat("getting started.docx")

        'digital signatures are not supported yet for slides documents 
        'Signatures.SignSlideDocumentDigitallyWithSaveFormat("butterfly effect.pptx")

#End Region
#Region "SetupMultipleSignatureOptionsInPdf"
        'Signatures.MultiplePdfSignOptoins()
        'Signatures.MultipleCellSignOptoins()
        'Signatures.MultipleWordSignOptoins()
        'Signatures.MultipleSlideSignOptoins()
#End Region



#Region "VerificationOptions"
        'Signatures.TextVerificationOfPdfDocument("text.pdf")
        'Signatures.DigitalVerificationOfCellsDocWithCerCertificateContainer("digital signatures.xlsx")
        'Signatures.DigitalVerificationOfCellsDocWithPfxCertificateContainer("digital signatures.xlsx")
        'Signatures.DigitalVerificationOfPdfWithCerContainer("digital signatures.pdf")
        'Signatures.DigitalVerificationOfPdfWithPfxCertificateContainer("digital signatures.pdf")
        'Signatures.DigitalVerificationOfWordDocWithCerCertificateContainer("digital signatures.docx")
        'Signatures.DigitalVerificationOfWordDocWithPfxCertificateContainer("digital signatures.docx")
        'Signatures.VerifyPdfDocumentSignedWithTextSignatureAnnotation("test_text_annotation.pdf")
        'Signatures.VerifyPdfDocumentSignedWithTextSignatureSticker("test_text_sticker.pdf")
        'Signatures.VerifyCellDocumentSignedWithTextSignature("digital signatures.xlsx")
        'Signatures.VerifySlidesDocumentSignedWithTextSignature("butterfly effect.pptx")
        'Signatures.VerifyWordDocumentSignedWithTextSignature("getting started.docx")
        'Signatures.VerifyWordsDocWithTextSignatureToFormTextField("getting started.docx")
#End Region


#Region "SignatureAppearnaceoptions"
        'Signatures.SignPdfDocWithTextSignAsImage("text.pdf")
        'Signatures.SignPdfDocWithTextSignAsAnnotation("text.pdf")
        'Signatures.SignPdfDocWithTextSignatureAsSticker("text.pdf")
        'Signatures.AddRotationToTextSignatureAppearance("text.pdf")
        'Signatures.AddTransparencyRotationToTextSignatureForSlides("butterfly effect.pptx")
        'Signatures.AddRotationToImageSignatureAppearance("text.pdf")
        'Signatures.ImageSignatureAppearanceExtendedoptions("getting started.docx")
        'Signatures.SignArbitraryPages("text.pdf")
        'Signatures.SpecifyDifferentMeasureUnitsForPDFTextSignature("text.pdf")
        'Signatures.SignPDFDocsWithTextSignatureAsWatermark("text.pdf")
        'Signatures.SignWordsDocsWithTextSignToFormTextField("getting started.docx")
#End Region

        'Signatures.SetOutputFileName()
        'Signatures.GetDocumentInfo("text.pdf")



    End Sub



End Module
