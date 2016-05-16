Imports GroupDocs.Signature.Options
Imports GroupDocs.Signature.Handler.Output
Imports GroupDocs.Signature.Handler
Imports System.IO
Imports GroupDocs.Signature.Config
Imports GroupDocs.Signature.Handler.Input

Public Class Signatures

#Region "WorkingWithTextSignature"

    ''' <summary>
    ''' Signing a pdf document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignPdfDocumentWithText(fileName As String)
        'ExStart:signingandsavingpdfdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options 
        Dim signOptions = New PdfSignTextOptions("coca cola")
        signOptions.Left = 100
        signOptions.Top = 100
        Dim fileExtension As String = Path.GetExtension(fileName)
        ' save document
        Utilities.SaveFile(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingpdfdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a cell document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input filel</param>
    Public Shared Sub SignCellDocumentWithText(fileName As String)
        'ExStart:signingandsavingcellsdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup options with text of signature
        Dim signOptions = New CellsSignTextOptions("coca cola")
        ' text position
        signOptions.RowNumber = 3
        signOptions.ColumnNumber = 6
        ' text rectangle size
        signOptions.Height = 100
        signOptions.Width = 100
        ' if you need to sign all sheets set it to true
        signOptions.SignAllPages = False
        ' sign first sheet
        signOptions.SheetNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingcellsdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a slide document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentWithText(fileName As String)
        'ExStart:signingandsavingslidesdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options 
        Dim signOptions = New SlidesSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingslidesdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a word document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentWithText(fileName As String)
        'ExStart:signingandsavingworddocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options with relative path - image file stores in config.ImagesPath folder
        Dim signOptions = New WordsSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingworddocumentwithtext
    End Sub

#End Region

#Region "WorkingWithImageSignature"

    ''' <summary>
    ''' Signing a pdf document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input filed</param>
    Public Shared Sub SignPdfDocumentWithImage(fileName As String)
        'ExStart:signingandsavingpdfdocumentwithimage
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options
        Dim signOptions = New PdfSignImageOptions("sign.png")
        ' image position
        signOptions.Left = 300
        signOptions.Top = 200
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingpdfdocumentwithimage
    End Sub

    ''' <summary>
    ''' Signing a cell document with image
    ''' </summary>
    ''' <param name="fileName">Name of the inut file</param>
    Public Shared Sub SignCellDocumentWithImage(fileName As String)
        'ExStart:signingandsavingcelldocumentwithimage
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options
        Dim signOptions = New CellsSignImageOptions("sign.png")
        ' image position
        signOptions.RowNumber = 10
        signOptions.ColumnNumber = 10
        signOptions.SignAllPages = True
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingcelldocumentwithimage
    End Sub

    ''' <summary>
    ''' Signing a slide document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentWithImage(fileName As String)
        'ExStart:signingandsavingslidedocumentwithimage
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options
        Dim signOptions = New SlidesSignImageOptions("sign.png")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingslidedocumentwithimage
    End Sub

    ''' <summary>
    ''' Signing word document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentWithImage(fileName As String)
        'ExStart:signingandsavingworddocumentwithimage
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options with relative path - image file stores in config.ImagesPath folder
        Dim signOptions = New WordsSignImageOptions("sign.png")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingworddocumentwithimage
    End Sub

#End Region

#Region "WorkingWithDigitalSignatures"

    ''' <summary>
    ''' Signing a cell document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignCellDocumentDigitally(fileName As String)
        'ExStart:signingcelldocumentwithdigitalcertificate
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup digital signature options
        Dim signOptions = New CellsSignDigitalOptions("ali.pfx")
        signOptions.Password = ""
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingcelldocumentwithdigitalcertificate
    End Sub

    ''' <summary>
    ''' Signing a pdf document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignPdfDocumentDigitally(fileName As String)
        'ExStart:signingpdfdocumentwithdigitalcertificate
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup digital signature options
        Dim signOptions = New PdfSignDigitalOptions("acer.pfx", "sign.png")
        signOptions.Password = Nothing
        ' image position
        signOptions.Left = 100
        signOptions.Top = 100
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingpdfdocumentwithdigitalcertificate
    End Sub

    ''' <summary>
    ''' Signing a word document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentDigitally(fileName As String)
        'ExStart:signingworddocumentwithdigitalcertificate
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup digital signature options
        Dim signOptions = New WordsSignDigitalOptions("ali.pfx")
        signOptions.Password = ""
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingworddocumentwithdigitalcertificate
    End Sub

    ''' <summary>
    ''' Signing a slide document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentDigitally(fileName As String)
        'ExStart:signingslidedocumentwithdigitalcertificate
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup digital signature options
        Dim signOptions = New SlidesSignDigitalOptions("ali.pfx")
        signOptions.Password = ""
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 2
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingslidedocumentwithdigitalcertificate
    End Sub

#End Region

#Region "Azure"

    ''' <summary>
    ''' Custom input handling 
    ''' </summary>
    ''' <param name="inputFileName">Name of the input file</param>
    Public Shared Sub CustomInputHandlerTest(inputFileName As String)
        'ExStart:custominputhandler
        Const DevStorageEmulatorUrl As String = "http://127.0.0.1:10000/devstoreaccount1/"
        Const DevStorageEmulatorAccountName As String = "devstoreaccount1"
        Const DevStorageEmulatorAccountKey As String = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="

        Dim config As SignatureConfig = Utilities.GetConfigurations()

        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)


        Dim saveOptions As New SaveOptions(OutputType.[String])
        Dim customInputStorageProvider As IInputDataHandler = New SampleAzureInputDataHandler(DevStorageEmulatorUrl, DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "testbucket")
        Dim handlerWithCustomStorage As New SignatureHandler(config, customInputStorageProvider)

        ' setup image signature options
        Dim signOptions = New PdfSignImageOptions("sign.png")
        signOptions.DocumentPageNumber = 1
        signOptions.Top = 500
        signOptions.Width = 200
        signOptions.Height = 100
        Dim fileExtension As String = Path.GetExtension(inputFileName)
        Utilities.SaveFile(fileExtension, inputFileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:custominputhandler
    End Sub

    ''' <summary>
    ''' Custome output handling
    ''' </summary>
    ''' <param name="inputFileName">Name of the input file</param>
    Public Shared Sub CustomOutputHandlerTest(inputFileName As String)
        'ExStart:customoutputhandler
        Const DevStorageEmulatorUrl As String = "http://127.0.0.1:10000/devstoreaccount1/"
        Const DevStorageEmulatorAccountName As String = "devstoreaccount1"
        Const DevStorageEmulatorAccountKey As String = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="

        Dim config As SignatureConfig = Utilities.GetConfigurations()

        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)


        Dim saveOptions As New SaveOptions(OutputType.[String])
        Dim customOutputStorageProvider As IOutputDataHandler = New SampleAzureOutputDataHandler(DevStorageEmulatorUrl, DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "tempbucket")
        Dim handlerWithCustomStorage As New SignatureHandler(config, customOutputStorageProvider)
        ' setup image signature options
        Dim signOptions = New PdfSignImageOptions("sign.png")
        signOptions.DocumentPageNumber = 1
        signOptions.Top = 500
        signOptions.Width = 200
        signOptions.Height = 100
        Dim fileExtension As String = Path.GetExtension(inputFileName)
        Utilities.SaveFile(fileExtension, inputFileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:customoutputhandler
    End Sub

#End Region

End Class
