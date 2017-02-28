Imports GroupDocs.Signature.Options
Imports GroupDocs.Signature.Handler.Output
Imports GroupDocs.Signature.Handler
Imports System.IO
Imports GroupDocs.Signature.Config
Imports GroupDocs.Signature.Handler.Input
Imports GroupDocs.Signature.Domain
Imports System.Drawing

Public Class Signatures


#Region "WorkingWithTextSignature"

    ''' <summary>
    ''' Signing a pdf document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignPdfDocumentWithText(fileName As String)
        'ExStart:signingandsavingpdfdocumentwithtext
        Dim size As Single = 100
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options 
        Dim signOptions = New PdfSignTextOptions("coca cola")
        signOptions.Left = 100
        signOptions.Top = 100
        'this feature is supported in 16.12.0
        signOptions.VerticalAlignment = Domain.VerticalAlignment.Top
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 25
        }
        '---------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.Font = New Domain.SignatureFont() With {
            .FontSize = size,
            .FontFamily = "Comic Sans MS"
        }
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
        Dim size As Single = 100
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options
        Dim signOptions = New CellsSignTextOptions("coca cola")
        ' text position
        signOptions.RowNumber = 3
        signOptions.ColumnNumber = 6
        ' text rectangle size
        signOptions.Height = 100
        signOptions.Width = 100
        'this feature is supported in 16.12.0
        signOptions.VerticalAlignment = Domain.VerticalAlignment.Top
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 25
        }
        '----------------------------
        ' if you need to sign all sheets set it to true
        signOptions.SignAllPages = False
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With {
            .FontSize = size,
            .FontFamily = "Comic Sans MS"
        }
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
        Dim size As Single = 100
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options 
        Dim signOptions = New SlidesSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        'this feature is supported in 16.12.0
        signOptions.VerticalAlignment = Domain.VerticalAlignment.Top
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 25
        }
        '----------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With {
            .FontSize = size,
            .FontFamily = "Comic Sans MS"
        }
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
        Dim size As Single = 5
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options
        Dim signOptions = New WordsSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        'this feature is supported in 16.12.0
        signOptions.VerticalAlignment = Domain.VerticalAlignment.Top
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 25
        }
        '----------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With {
            .FontSize = size,
            .FontFamily = "Comic Sans MS"
        }
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
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 25
        }
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Left
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
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 8
        }
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
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
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 15
        }
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
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
        ' setup image signature options
        Dim signOptions = New WordsSignImageOptions("sign.png")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.Margin = New Domain.Padding() With {
            .Top = 2,
            .Left = 500
        }
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Right
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
        signOptions.Visible = True
        signOptions.SignAllPages = True
        signOptions.HorizontalAlignment = Domain.HorizontalAlignment.Center
        signOptions.VerticalAlignment = Domain.VerticalAlignment.Top
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
    Public Shared Sub CustomInputHandler(inputFileName As String)
        'ExStart:custominputhandler
        Const DevStorageEmulatorUrl As String = "http://127.0.0.1:10000/devstoreaccount1/"
        Const DevStorageEmulatorAccountName As String = "devstoreaccount1"
        Const DevStorageEmulatorAccountKey As String = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="

        Dim config As SignatureConfig = Utilities.GetConfigurations()

        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)

        Dim saveOptions As New SaveOptions(OutputType.[String])
        Dim customInputStorageProvider As IInputDataHandler = New AzureInputDataHandler(DevStorageEmulatorUrl, DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "testbucket")
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
    Public Shared Sub CustomOutputHandler(inputFileName As String)
        'ExStart:customoutputhandler
        Const DevStorageEmulatorUrl As String = "http://127.0.0.1:10000/devstoreaccount1/"
        Const DevStorageEmulatorAccountName As String = "devstoreaccount1"
        Const DevStorageEmulatorAccountKey As String = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="

        Dim config As SignatureConfig = Utilities.GetConfigurations()

        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)

        Dim saveOptions As New SaveOptions(OutputType.[String])
        Dim customOutputStorageProvider As IOutputDataHandler = New AzureOutputDataHandler(DevStorageEmulatorUrl, DevStorageEmulatorAccountName, DevStorageEmulatorAccountKey, "tempbucket")
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

#Region "OpenPasswordProtectedDocuments"
    Public Shared Sub GetPasswordProtectedDocs(fileName As String)
        'ExStart:GetPasswordProtectedDocs
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        Dim signOptions = New WordsSignTextOptions("John Smith")
        ' specify load options
        Dim loadOptions As New LoadOptions()
        loadOptions.Password = "1234567890"
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFile(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:GetPasswordProtectedDocs
    End Sub
#End Region

#Region "SaveTextSignedOutputWithFormatOptions"

    ''' <summary>
    ''' Signing a pdf document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignPdfDocumentWithTextWithSaveFormat(fileName As String)
        'ExStart:signingandsavingpdfdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options 
        Dim signOptions = New PdfSignTextOptions("coca cola")
        signOptions.Left = 100
        signOptions.Top = 100
        Dim fileExtension As String = Path.GetExtension(fileName)
        ' save document
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingpdfdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a cell document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input filel</param>
    Public Shared Sub SignCellDocumentWithTextWithSaveFormat(fileName As String)
        'ExStart:signingandsavingcellsdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingcellsdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a slide document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentWithTextWithSaveFormat(fileName As String)
        'ExStart:signingandsavingslidesdocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options 
        Dim signOptions = New SlidesSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingslidesdocumentwithtext
    End Sub

    ''' <summary>
    ''' Signing a word document with text
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentWithTextWithSaveFormat(fileName As String)
        'ExStart:signingandsavingworddocumentwithtext
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup text signature options
        Dim signOptions = New WordsSignTextOptions("coca cola")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, signOptions, Nothing, Nothing)
        'ExEnd:signingandsavingworddocumentwithtext
    End Sub


#End Region

#Region "SaveImageSignedOutputWithFormatOptions"

    ''' <summary>
    ''' Signing a pdf document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input filed</param>
    Public Shared Sub SignPdfDocumentWithImageWithSaveFormat(fileName As String)
        'ExStart:signingandsavingpdfdocumentwithimageWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingpdfdocumentwithimageWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing a cell document with image
    ''' </summary>
    ''' <param name="fileName">Name of the inut file</param>
    Public Shared Sub SignCellDocumentWithImageWithSaveFormat(fileName As String)
        'ExStart:signingandsavingcelldocumentwithimageWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingcelldocumentwithimageWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing a slide document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentWithImageWithSaveFormat(fileName As String)
        'ExStart:signingandsavingslidedocumentwithimageWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingslidedocumentwithimageWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing word document with image
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentWithImageWithSaveFormat(fileName As String)
        'ExStart:signingandsavingworddocumentwithimageWithSaveFormat
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup image signature options
        Dim signOptions = New WordsSignImageOptions("sign.png")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.Width = 100
        signOptions.Height = 100
        signOptions.DocumentPageNumber = 1
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, signOptions, Nothing)
        'ExEnd:signingandsavingworddocumentwithimageWithSaveFormat
    End Sub

#End Region

#Region "SaveDigitalSignedOutputWithFormatOptions"

    ''' <summary>
    ''' Signing a cell document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignCellDocumentDigitallyWithSaveFormat(fileName As String)
        'ExStart:signingcelldocumentwithdigitalcertificateWithSaveFormat
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' setup digital signature options
        Dim signOptions = New CellsSignDigitalOptions("ali.pfx")
        signOptions.Password = ""
        Dim fileExtension As String = Path.GetExtension(fileName)
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingcelldocumentwithdigitalcertificateWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing a pdf document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignPdfDocumentDigitallyWithSaveFormat(fileName As String)
        'ExStart:signingpdfdocumentwithdigitalcertificateWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingpdfdocumentwithdigitalcertificateWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing a word document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignWordDocumentDigitallyWithSaveFormat(fileName As String)
        'ExStart:signingworddocumentwithdigitalcertificateWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingworddocumentwithdigitalcertificateWithSaveFormat
    End Sub

    ''' <summary>
    ''' Signing a slide document with digital certificate
    ''' </summary>
    ''' <param name="fileName">Name of the input file</param>
    Public Shared Sub SignSlideDocumentDigitallyWithSaveFormat(fileName As String)
        'ExStart:signingslidedocumentwithdigitalcertificateWithSaveFormat
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
        Utilities.SaveFileWithFormat(fileExtension, fileName, handler, Nothing, Nothing, signOptions)
        'ExEnd:signingslidedocumentwithdigitalcertificateWithSaveFormat
    End Sub

#End Region

#Region "SetupMultipleSignatureOptions"
    'Multiple sign options Pdf documents 
    Public Shared Sub MultiplePdfSignOptoins()
        'ExStart:multiplepdfsignoptions
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' define Signature Options Collection
        Dim collection = New SignatureOptionsCollection()
        ' specify text option
        Dim signTextOptions = New PdfSignTextOptions("Mr. John", 100, 100, 100, 100)
        ' add to collection
        collection.Add(signTextOptions)
        ' specify image options
        Dim signImageOptions = New PdfSignImageOptions("sign.png")
        signImageOptions.Left = 200
        signImageOptions.Top = 200
        signImageOptions.Width = 100
        signImageOptions.Height = 100
        ' add to collection
        collection.Add(signImageOptions)
        ' specify digital options
        Dim signDigitalOptions = New PdfSignDigitalOptions("acer.pfx")
        signDigitalOptions.Password = "1234567890"
        signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom
        signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center
        ' add to collection
        collection.Add(signDigitalOptions)
        ' sign document
        Dim signedPath = handler.Sign(Of String)("test.pdf", collection, New SaveOptions() With {
            .OutputType = OutputType.[String]
        })
        Console.WriteLine("Signed file path is: " + signedPath)
        'ExEnd:multiplepdfsignoptions
    End Sub

    'Multiple sign options Cells
    Public Shared Sub MultipleCellSignOptoins()
        'ExStart:MultipleCellSignOptoins
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' define Signature Options Collection
        Dim collection = New SignatureOptionsCollection()
        ' specify text option
        Dim signTextOptions = New CellsSignTextOptions("some person")
        ' add to collection
        collection.Add(signTextOptions)
        ' specify image options
        Dim signImageOptions = New CellsSignImageOptions("sign.png")
        signImageOptions.Left = 200
        signImageOptions.Top = 200
        signImageOptions.Width = 100
        signImageOptions.Height = 100
        ' add to collection
        collection.Add(signImageOptions)
        ' specify digital options
        Dim signDigitalOptions = New CellsSignDigitalOptions("acer.pfx")
        signDigitalOptions.Password = "1234567890"
        signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom
        signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center
        ' add to collection
        collection.Add(signDigitalOptions)
        ' sign document
        Dim signedPath = handler.Sign(Of String)("test.xlsx", collection, New SaveOptions() With {
            .OutputType = OutputType.[String]
        })
        Console.WriteLine("Signed file path is: " + signedPath)
        'ExEnd:MultipleCellSignOptoins
    End Sub
    'Multiple sign options Word
    Public Shared Sub MultipleWordSignOptoins()
        'ExStart:MultipleWordSignOptoins
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' define Signature Options Collection
        Dim collection = New SignatureOptionsCollection()
        ' specify text option
        Dim signTextOptions = New WordsSignTextOptions("some person")
        ' add to collection
        collection.Add(signTextOptions)
        ' specify image options
        Dim signImageOptions = New WordsSignImageOptions("sign.png")
        signImageOptions.Left = 200
        signImageOptions.Top = 200
        signImageOptions.Width = 100
        signImageOptions.Height = 100
        ' add to collection
        collection.Add(signImageOptions)
        ' specify digital options
        Dim signDigitalOptions = New WordsSignDigitalOptions("acer.pfx")
        signDigitalOptions.Password = "1234567890"
        signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom
        signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center
        ' add to collection
        collection.Add(signDigitalOptions)
        ' sign document
        Dim signedPath = handler.Sign(Of String)("test.docx", collection, New SaveOptions() With {
            .OutputType = OutputType.[String]
        })
        Console.WriteLine("Signed file path is: " + signedPath)
        'ExEnd:MultipleWordSignOptoins
    End Sub


    ''Multiple sign options slides
    'Public Shared Sub MultipleSlideSignOptoins()
    '    'ExStart:multipleslidesignoptions
    '    Dim config As SignatureConfig = Utilities.GetConfigurations()
    '    ' instantiating the signature handler
    '    Dim handler = New SignatureHandler(config)
    '    ' define Signature Options Collection
    '    Dim collection = New SignatureOptionsCollection()
    '    ' specify text option
    '    Dim signTextOptions = New SlideSignTextOptions("Mr. John", 100, 100, 100, 100)
    '    ' add to collection
    '    collection.Add(signTextOptions)
    '    ' specify image options
    '    Dim signImageOptions = New SlideSignImageOptions("sign.png")
    '    signImageOptions.Left = 200
    '    signImageOptions.Top = 200
    '    signImageOptions.Width = 100
    '    signImageOptions.Height = 100
    '    ' add to collection
    '    collection.Add(signImageOptions)
    '    ' specify digital options
    '    Dim signDigitalOptions = New SlideSignDigitalOptions("acer.pfx")
    '    signDigitalOptions.Password = "1234567890"
    '    signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom
    '    signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center
    '    ' add to collection
    '    collection.Add(signDigitalOptions)
    '    ' sign document
    '    Dim signedPath = handler.Sign(Of String)("butterfly effect.pptx", collection, New SaveOptions() With { _
    '        .OutputType = OutputType.[String] _
    '    })
    '    Console.WriteLine("Signed file path is: " + signedPath)
    '    'ExEnd:multipleslidesignoptions
    'End Sub

#End Region


#Region "SignatureAppearanceOptions"

    ''' <summary>
    ''' Signs Pdf document with Text Signature as Image
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub SignPdfDocWithTextSignAsImage()
        'ExStart:SignPdfDocWithTextSignAsImage
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup image signature options with relative path - image file stores in config.ImagesPath folder
        Dim signOptions As New PdfSignTextOptions("John Smith")
        ' setup colors settings
        signOptions.BackgroundColor = System.Drawing.Color.Beige
        ' setup text color
        signOptions.ForeColor = System.Drawing.Color.Red
        ' setup Font options
        signOptions.Font.Bold = True
        signOptions.Font.Italic = True
        signOptions.Font.Underline = True
        signOptions.Font.FontFamily = "Arial"
        signOptions.Font.FontSize = 15
        'type of implementation
        signOptions.SignatureImplementation = PdfTextSignatureImplementation.Image
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_TextSignatureAsImage"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:SignPdfDocWithTextSignAsImage
    End Sub

    ''' <summary>
    ''' Signs Pdf document with Text Signature as Annotation
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub SignPdfDocWithTextSignAsAnnotation()
        'ExStart:SignPdfDocWithTextSignAsAnnotation
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup image signature options with relative path - image file stores in config.ImagesPath folder
        Dim signOptions As New PdfSignTextOptions("John Smith")
        signOptions.Left = 100
        signOptions.Top = 100
        signOptions.Height = 200
        signOptions.Width = 200
        ' setup colors settings
        signOptions.BackgroundColor = System.Drawing.Color.Beige
        ' setup text color
        signOptions.ForeColor = System.Drawing.Color.Red
        ' setup Font options
        signOptions.Font.Bold = True
        signOptions.Font.Italic = True
        signOptions.Font.Underline = True
        signOptions.Font.FontFamily = "Arial"
        signOptions.Font.FontSize = 15
        'type of implementation
        signOptions.SignatureImplementation = PdfTextSignatureImplementation.Annotation
        ' specify extended appearance options
        Dim appearance As New PdfTextAnnotationAppearance()
        appearance.BorderColor = Color.Blue
        appearance.BorderEffect = PdfTextAnnotationBorderEffect.Cloudy
        appearance.BorderEffectIntensity = 2
        appearance.BorderStyle = PdfTextAnnotationBorderStyle.Dashed
        appearance.HCornerRadius = 10
        appearance.BorderWidth = 5
        appearance.Contents = signOptions.Text + " content description"
        appearance.Subject = "Appearance Subject"
        appearance.Title = "MrJohn Signature"
        signOptions.Appearance = appearance
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_TextSignatureAsAnnotation"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:SignPdfDocWithTextSignAsAnnotation
    End Sub

    ''' <summary>
    ''' Signs Pdf document with Text Signature as Sticker
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub SignPdfDocWithTextSignatureAsSticker()
        'ExStart:SignPdfDocWithTextSignatureAsSticker
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup signature options
        Dim signOptions As New PdfSignTextOptions("John Smith")
        signOptions.Left = 10
        signOptions.Top = 10
        signOptions.HorizontalAlignment = HorizontalAlignment.Right
        signOptions.VerticalAlignment = VerticalAlignment.Bottom
        signOptions.Margin = New Padding(10)
        signOptions.BackgroundColor = Color.Red
        signOptions.Opacity = 0.5
        'type of implementation
        signOptions.SignatureImplementation = PdfTextSignatureImplementation.Sticker
        ' an appearance customizes more specific options
        Dim appearance As New PdfTextStickerAppearance()
        signOptions.Appearance = appearance
        ' text content of an sticker
        appearance.Title = "Title"
        appearance.Subject = "Subject"
        appearance.Contents = "Contents"
        ' is sticker opened by default
        appearance.Opened = False
        ' an icon of a sticker on a page
        appearance.Icon = PdfTextStickerIcon.Star
        'If custom appearance is not set there will be used DefaultAppearance
        'User can change any parameter of DefaultAppearance
        'PdfTextStickerAppearance.DefaultAppearance.Title = "Title";
        'PdfTextStickerAppearance.DefaultAppearance.Subject = "Subject";
        'PdfTextStickerAppearance.DefaultAppearance.Contents = "Contents";
        'PdfTextStickerAppearance.DefaultAppearance.Opened = false;
        'PdfTextStickerAppearance.DefaultAppearance.State = PdfTextStickerState.Completed;
        'PdfTextStickerAppearance.DefaultAppearance.Icon = PdfTextStickerIcon.Note;
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_TextSignatureAsSticker"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:SignPdfDocWithTextSignatureAsSticker
    End Sub

    ''' <summary>
    ''' Adds Rotation to Text Signature appearance
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub AddRotationToTextSignatureAppearance()
        'ExStart:AddRotationToTextSignatureAppearance
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup appearance options
        Dim signOptions As New PdfSignTextOptions("John Smith")
        signOptions.Font.FontSize = 32
        signOptions.BackgroundColor = Color.BlueViolet
        signOptions.ForeColor = Color.Orange
        signOptions.Left = 200
        signOptions.Top = 200
        ' setup rotation
        signOptions.RotationAngle = 48
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_Text_Rotation"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:AddRotationToTextSignatureAppearance
    End Sub

    ''' <summary>
    ''' Adds Transparency and Rotation to Text Signature appearance for Slides
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub AddTransparencyRotationToTextSignatureForSlides()
        'ExStart:AddTransparencyRotationToTextSignatureForSlides
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup appearance options
        Dim signOptions As New SlidesSignTextOptions("John Smith")
        signOptions.Left = 100
        signOptions.Top = 100
        signOptions.Width = 200
        signOptions.Height = 200
        signOptions.ForeColor = Color.Orange
        signOptions.BackgroundColor = Color.BlueViolet
        signOptions.BorderColor = Color.Orange
        signOptions.BorderWeight = 5
        ' setup rotation
        signOptions.RotationAngle = 48
        ' setup transparency
        signOptions.BackgroundTransparency = 0.4
        signOptions.BorderTransparency = 0.8
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("butterfly effect.pptx", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Slides_Text_Transparency_Rotation"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd: AddTransparencyRotationToTextSignatureForSlides
    End Sub

    ''' <summary>
    ''' Adds Rotation to Image Signature appearance
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub AddRotationToImageSignatureAppearance()
        'ExStart:AddRotationToImageSignatureAppearance
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        'setup size and position
        Dim signOptions As New PdfSignImageOptions("signature.jpg")
        signOptions.Left = 100
        signOptions.Top = 100
        signOptions.Width = 200
        signOptions.Height = 200
        ' setup rotation
        signOptions.RotationAngle = 48
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_Image_Rotation"
        })
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:AddRotationToImageSignatureAppearance
    End Sub
#End Region
#Region "SetVerificationOptions"

    ''' <summary>
    ''' Verifies PDF Documents signed with Text Signature 
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub TextVerificationOfPdfDocument()
        'ExStart:TextVerificationOfPdfDocument
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        Dim text As [String] = "John Smith, esquire"
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup image signature options with relative path - image file stores in config.ImagesPath folder
        Dim signOptions As New PdfSignTextOptions(text)
        signOptions.Left = 100
        signOptions.Top = 100
        signOptions.DocumentPageNumber = 1
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("text.pdf", signOptions, New SaveOptions() With {
            .OutputType = OutputType.[String],
            .OutputFileName = "Pdf_Documents_Verification_Text"
        })
        ' setup digital verification options
        Dim verifyOptions As New PDFVerifyTextOptions(text)
        verifyOptions.DocumentPageNumber = 1

        'verify document
        Dim result As VerificationResult = handler.Verify(signedPath, verifyOptions)
        Console.WriteLine("Verification result: " + result.IsValid)
        'ExEnd:TextVerificationOfPdfDocument
    End Sub

    ''' <summary>
    ''' Verifies Cells Documents signed with .cer digital certificates 
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub DigitalVerificationOfCellsDocWithCerCertificateContainer()
        'ExStart:DigitalVerificationOfCellsDocWithCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup digital verification options
        Dim verifyOptions As New CellsVerifyDigitalOptions("signtest.cer")
        verifyOptions.Comments = "Test1"
        verifyOptions.SignDateTimeFrom = New DateTime(2017, 1, 26, 14, 55, 7)
        verifyOptions.SignDateTimeTo = New DateTime(2017, 1, 26, 14, 55, 9)

        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.xlsx", verifyOptions)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfCellsDocWithCertificateContainer
    End Sub

    ''' <summary>
    ''' Digitally verifies cells document with .pfx certificate container
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub DigitalVerificationOfCellsDocWithPfxCertificateContainer()
        'ExStart:DigitalVerificationOfCellsDocWithPfxCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup digital verification options
        Dim verifyOptions1 As New CellsVerifyDigitalOptions("signtest.pfx")
        'password is needed to open .pfx certificate
        verifyOptions1.Password = "123"
        Dim verifyOptions2 As New CellsVerifyDigitalOptions("signtest.cer")
        Dim verifyOptionsCollection As New VerifyOptionsCollection(New List(Of VerifyOptions)() From {
            verifyOptions1,
            verifyOptions2
        })

        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.xlsx", verifyOptionsCollection)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfCellsDocWithPfxCertificateContainer
    End Sub

    ''' <summary>
    ''' Verifies pdf Documents signed with .cer digital certificates 
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub DigitalVerificationOfPdfWithCerContainer()
        'ExStart:DigitalVerificationOfPdfWithCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup digital verification options
        Dim verifyOptions As New PDFVerifyDigitalOptions("ali.cer")
        verifyOptions.Reason = "Test reason"
        verifyOptions.Contact = "Test contact"
        verifyOptions.Location = "Test location"
        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.pdf", verifyOptions)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfPdfWithCertificateContainer
    End Sub


    ''' <summary>
    ''' Digitally verifies pdf document with .pfx certificate container
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub DigitalVerificationOfPdfWithPfxCertificateContainer()
        'ExStart:DigitalVerificationOfPdfWithPfxCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup digital verification options
        Dim verifyOptions1 As New PDFVerifyDigitalOptions("ali.pfx")
        'password is needed to open .pfx certificate
        verifyOptions1.Password = "1234567890"
        Dim verifyOptions2 As New PDFVerifyDigitalOptions("ali.cer")
        Dim verifyOptionsCollection As New VerifyOptionsCollection(New List(Of VerifyOptions)() From {
            verifyOptions1,
            verifyOptions2
        })
        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.pdf", verifyOptionsCollection)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfPdfWithPfxCertificateContainer
    End Sub

    ''' <summary>
    ''' Verifies word Documents signed with .cer digital certificates 
    ''' </summary>
    Public Shared Sub DigitalVerificationOfWordDocWithCerCertificateContainer()
        'ExStart:DigitalVerificationOfWordDocWithCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)

        Dim verifyOptionsCollection As New VerifyOptionsCollection()
        ' setup digital verification options
        Dim verifyOptions As New WordsVerifyDigitalOptions("signtest.cer")
        verifyOptions.Comments = "Test1"
        verifyOptions.SignDateTimeFrom = New DateTime(2017, 1, 26, 14, 55, 57)
        verifyOptions.SignDateTimeTo = New DateTime(2017, 1, 26, 14, 55, 59)
        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.docx", verifyOptions)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfWordDocWithCertificateContainer
    End Sub


    ''' <summary>
    ''' Digitally verifies word document with .pfx certificate container
    ''' This feature is supported in GroupDocs.Signature for .NET 17.01.0 version or greater
    ''' </summary>
    Public Shared Sub DigitalVerificationOfWordDocWithPfxCertificateContainer()
        'ExStart:DigitalVerificationOfWordDocWithPfxCertificateContainer
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup digital verification options
        Dim verifyOptions1 As New WordsVerifyDigitalOptions("signtest.pfx")
        'password is needed to open .pfx certificate
        verifyOptions1.Password = "123"
        Dim verifyOptions2 As New WordsVerifyDigitalOptions("signtest.cer")
        Dim verifyOptionsCollection As New VerifyOptionsCollection(New List(Of VerifyOptions)() From {
            verifyOptions1,
            verifyOptions2
        })
        'verify document
        Dim result As VerificationResult = handler.Verify("digital signatures.docx", verifyOptionsCollection)
        Console.WriteLine("Signed file verification result: " + result.IsValid)
        'ExEnd:DigitalVerificationOfWordDocWithPfxCertificateContainer
    End Sub

    ''' <summary>
    ''' Verifies PDF Document signed with Text Signature Sticker
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub VerifyPdfDocumentSignedWithTextSignatureSticker()
        'ExStart:VerifyPdfDocumentSignedWithTextSignatureSticker
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup verification options
        Dim verifyOptions As New PDFVerifyTextOptions()
        ' specify verification type
        verifyOptions.SignatureImplementation = PdfTextSignatureImplementation.Sticker
        ' verify only page with specified number
        verifyOptions.DocumentPageNumber = 1
        ' verify all pages of a document if true
        verifyOptions.VerifyAllPages = True
        'If verify option Text is set, it will be searched in Title, Subject and Contents
        verifyOptions.Text = "Contents"
        ' create Verify Extensions
        Dim extensions As New PdfTextStickerVerifyExtensions()
        'If verify option is set, then appropriate property of Sticker must be equals
        extensions.Contents = "Contents"
        extensions.Subject = "Subject"
        extensions.Title = "Title"
        extensions.Icon = PdfTextStickerIcon.Cross
        ' set extensions to verification options
        verifyOptions.Extensions = extensions
        'verify document
        Dim result As VerificationResult = handler.Verify("test_text_sticker.pdf", verifyOptions)
        Console.WriteLine("Verification result is: " + result.IsValid)
        'ExEnd:VerifyPdfDocumentSignedWithTextSignatureSticker
    End Sub

    ''' <summary>
    ''' Verifies PDF Document signed with Text Signature Annotation
    ''' This feature is supported in GroupDocs.Signature for .NET 17.02.0 version or greater
    ''' </summary>
    Public Shared Sub VerifyPdfDocumentSignedWithTextSignatureAnnotation()
        'ExStart:VerifyPdfDocumentSignedWithTextSignatureAnnotation
        ' setup Signature configuration
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup verification options
        Dim verifyOptions As New PDFVerifyTextOptions()
        ' specify verification type
        verifyOptions.SignatureImplementation = PdfTextSignatureImplementation.Annotation
        ' verify only page with specified number
        verifyOptions.DocumentPageNumber = 1
        ' verify all pages of a document if true
        verifyOptions.VerifyAllPages = True
        'If verify option Text is set, it will be searched in Title, Subject and Contents
        verifyOptions.Text = "John Smith_1"
        ' create Verify Extensions
        Dim extensions As New PdfTextAnnotationVerifyExtensions()
        'If verify option is set, then appropriate property of Annotation must be equals
        extensions.Contents = "John Smith_1"
        extensions.Subject = "John Smith_2"
        extensions.Title = "John Smith_3"
        ' set extensions to verification options
        verifyOptions.Extensions = extensions
        'verify document
        Dim result As VerificationResult = handler.Verify("test_text_annotation.pdf", verifyOptions)
        Console.WriteLine("Verification result is: " + result.IsValid)
        'ExEnd:VerifyPdfDocumentSignedWithTextSignatureAnnotation
    End Sub

#End Region



    ''' <summary>
    ''' OUtput file name can be set in saveoptions
    ''' </summary>
    Public Shared Sub SetOutputFileName()
        'ExStart:SetOutputFileName
        Dim signConfig As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the conversion handler
        Dim handler As New SignatureHandler(signConfig)
        ' setup options with text of signature
        Dim signOptions As SignOptions = New CellsSignTextOptions("John Smith")
        ' specify load options
        Dim loadOptions As New LoadOptions()
        ' specify save options
        Dim saveOptions As New CellsSaveOptions() With {
        .OutputType = OutputType.[String],
        .OutputFileName = "FileWithDifferentFileName"
        }
        ' sign document
        Dim signedPath As String = handler.Sign(Of String)("pie chart.xlsx", signOptions, loadOptions, saveOptions)
        Console.WriteLine(Convert.ToString("Signed file path is: ") & signedPath)
        'ExEnd:SetOutputFileName
    End Sub




End Class
