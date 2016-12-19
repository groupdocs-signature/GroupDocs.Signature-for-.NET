Imports GroupDocs.Signature.Options
Imports GroupDocs.Signature.Handler.Output
Imports GroupDocs.Signature.Handler
Imports System.IO
Imports GroupDocs.Signature.Config
Imports GroupDocs.Signature.Handler.Input
Imports GroupDocs.Signature.Domain

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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 25 _
        }
        '---------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.Font = New Domain.SignatureFont() With { _
            .FontSize = size, _
            .FontFamily = "Comic Sans MS" _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 25 _
        }
        '----------------------------
        ' if you need to sign all sheets set it to true
        signOptions.SignAllPages = False
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With { _
            .FontSize = size, _
            .FontFamily = "Comic Sans MS" _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 25 _
        }
        '----------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With { _
            .FontSize = size, _
            .FontFamily = "Comic Sans MS" _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 25 _
        }
        '----------------------------
        signOptions.ForeColor = System.Drawing.Color.Red
        signOptions.BackgroundColor = System.Drawing.Color.Black
        signOptions.BorderColor = System.Drawing.Color.Green
        signOptions.Font = New Domain.SignatureFont() With { _
            .FontSize = size, _
            .FontFamily = "Comic Sans MS" _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 25 _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 8 _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 15 _
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
        signOptions.Margin = New Domain.Padding() With { _
            .Top = 2, _
            .Left = 500 _
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
        Dim signedPath = handler.Sign(Of String)("test.pdf", collection, New SaveOptions() With { _
            .OutputType = OutputType.[String] _
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
        Dim signedPath = handler.Sign(Of String)("test.xlsx", collection, New SaveOptions() With { _
            .OutputType = OutputType.[String] _
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
        Dim signedPath = handler.Sign(Of String)("test.docx", collection, New SaveOptions() With { _
            .OutputType = OutputType.[String] _
        })
        Console.WriteLine("Signed file path is: " + signedPath)
        'ExEnd:MultipleWordSignOptoins
    End Sub


    'Multiple sign options slides
    Public Shared Sub MultipleSlideSignOptoins()
        'ExStart:multipleslidesignoptions
        Dim config As SignatureConfig = Utilities.GetConfigurations()
        ' instantiating the signature handler
        Dim handler = New SignatureHandler(config)
        ' define Signature Options Collection
        Dim collection = New SignatureOptionsCollection()
        ' specify text option
        Dim signTextOptions = New SlideSignTextOptions("Mr. John", 100, 100, 100, 100)
        ' add to collection
        collection.Add(signTextOptions)
        ' specify image options
        Dim signImageOptions = New SlideSignImageOptions("sign.png")
        signImageOptions.Left = 200
        signImageOptions.Top = 200
        signImageOptions.Width = 100
        signImageOptions.Height = 100
        ' add to collection
        collection.Add(signImageOptions)
        ' specify digital options
        Dim signDigitalOptions = New SlideSignDigitalOptions("acer.pfx")
        signDigitalOptions.Password = "1234567890"
        signDigitalOptions.VerticalAlignment = VerticalAlignment.Bottom
        signDigitalOptions.HorizontalAlignment = HorizontalAlignment.Center
        ' add to collection
        collection.Add(signDigitalOptions)
        ' sign document
        Dim signedPath = handler.Sign(Of String)("butterfly effect.pptx", collection, New SaveOptions() With { _
            .OutputType = OutputType.[String] _
        })
        Console.WriteLine("Signed file path is: " + signedPath)
        'ExEnd:multipleslidesignoptions
    End Sub

#End Region



End Class
