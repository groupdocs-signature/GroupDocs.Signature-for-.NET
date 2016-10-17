Imports GroupDocs.Signature.Options
Imports GroupDocs.Signature.Config
Imports GroupDocs.Signature.Handler

Public Class Utilities

    'ExStart:commonutilitiesvb
    Public Const storagePath As String = "../../../../Data/Storage/"
    Public Const outputPath As String = "../../../../Data/Output/"
    Public Const licensePath As String = "../../../../Data/Storage/GroupDocs.Total.lic"
    Public Const imagePath As String = "../../../../Data/Images/"
    Public Const certificatePath As String = "../../../../Data/Certificates/"
    'ExEnd:commonutilitiesvb

    ''' <summary>
    ''' Initialize, populate and return the SignatureConfig object
    ''' </summary>
    ''' <returns>Populated SignatureConfig object</returns>
    Public Shared Function GetConfigurations() As SignatureConfig
        'ExStart:Configurations
        Dim config As New SignatureConfig()
        'set the storage path
        config.StoragePath = storagePath
        config.OutputPath = outputPath
        config.ImagesPath = imagePath
        config.CertificatesPath = certificatePath

        Return config
        'ExEnd:Configurations
    End Function

    'ExStart:Applylicense
    ''' <summary>
    ''' Set product's license
    ''' </summary>
    Public Shared Sub ApplyLicense()
        Try
            'initialize License
            Dim lic As New License()
            'apply license
            lic.SetLicense(licensePath)
        Catch ex As System.Exception
            Console.WriteLine(ex.Message)
        End Try
    End Sub
    'ExEnd:Applylicense


    ''' <summary>
    ''' Saves the output/signed file
    ''' </summary>
    ''' <param name="fileExtension">Extension of the file</param>
    ''' <param name="fileName">Name of the file</param>
    ''' <param name="handler">Signature's handler</param>
    ''' <param name="textSignOptions">Text sign true or false</param>
    ''' <param name="imageSignOptions">Image sign true or false</param>
    ''' <param name="digitalSignOptions">Digital sign true or false</param>
    Public Shared Sub SaveFile(fileExtension As String, fileName As String, handler As SignatureHandler, textSignOptions As Object, imageSignOptions As Object, digitalSignOptions As Object)
        'ExStart:saveoutputfile
        Try
            Select Case fileExtension
                Case ".docx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithtext
                        Dim wordTextSignOptions As WordsSignTextOptions = DirectCast(textSignOptions, WordsSignTextOptions)
                        'ExEnd:signingworddocwithtext
                        Dim wordTextSignedPath = handler.Sign(Of String)(fileName, wordTextSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithimage
                        Dim wordImageSignOptions As WordsSignImageOptions = DirectCast(imageSignOptions, WordsSignImageOptions)
                        'ExEnd:signingworddocwithimage
                        Dim wordImageSignedPath = handler.Sign(Of String)(fileName, wordImageSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithdigitalcertificates
                        Dim wordDigitalSignOptions As WordsSignDigitalOptions = DirectCast(digitalSignOptions, WordsSignDigitalOptions)
                        'ExEnd:signingworddocwithdigitalcertificates
                        Dim wordDigitalSignedPath = handler.Sign(Of String)(fileName, wordDigitalSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    End If

                    Exit Select
                Case ".pdf"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithtext
                        Dim pdfTextSignOptions As PdfSignTextOptions = DirectCast(textSignOptions, PdfSignTextOptions)
                        'ExEnd:signingpdfdocwithtext
                        Dim pdfTextSignedPath = handler.Sign(Of String)(fileName, pdfTextSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithimage
                        Dim pdfImageSignOptions As PdfSignImageOptions = DirectCast(imageSignOptions, PdfSignImageOptions)
                        'ExEnd:signingpdfdocwithimage
                        Dim pdfImageSignedPath = handler.Sign(Of String)(fileName, pdfImageSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithdigitalcertificates
                        Dim pdfDigitalSignOptions As PdfSignDigitalOptions = DirectCast(digitalSignOptions, PdfSignDigitalOptions)
                        'ExEnd:signingpdfdocwithdigitalcertificates
                        Dim pdfDigitalSignedPath = handler.Sign(Of String)(fileName, pdfDigitalSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    End If

                    Exit Select
                Case ".xlsx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithtext
                        Dim cellTextSignOptions As CellsSignTextOptions = DirectCast(textSignOptions, CellsSignTextOptions)
                        'ExEnd:signingexceldocwithtext
                        Dim cellTextSignedPath = handler.Sign(Of String)(fileName, cellTextSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithimage
                        Dim cellImageSignOptions As CellsSignImageOptions = DirectCast(imageSignOptions, CellsSignImageOptions)
                        'ExEnd:signingexceldocwithimage
                        Dim cellImageSignedPath = handler.Sign(Of String)(fileName, cellImageSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithdigitalcertificates
                        Dim cellDigitalSignOptions As CellsSignDigitalOptions = DirectCast(digitalSignOptions, CellsSignDigitalOptions)
                        'ExEnd:signingexceldocwithdigitalcertificates
                        Dim cellDigitalSignedPath = handler.Sign(Of String)(fileName, cellDigitalSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    End If

                    Exit Select
                Case ".pptx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithtext
                        Dim slildeTextSignOptions As SlidesSignTextOptions = DirectCast(textSignOptions, SlidesSignTextOptions)
                        'ExEnd:signingslidesdocwithtext
                        Dim slideTextSignedPath = handler.Sign(Of String)(fileName, slildeTextSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithimage
                        Dim slideImageSignOptions As SlidesSignImageOptions = DirectCast(imageSignOptions, SlidesSignImageOptions)
                        'ExEnd:signingslidesdocwithimage
                        Dim slideImageSignedPath = handler.Sign(Of String)(fileName, slideImageSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithdigitalcertificates
                        Dim slideDigitalSignOptions As SlidesSignDigitalOptions = DirectCast(digitalSignOptions, SlidesSignDigitalOptions)
                        'ExEnd:signingslidesdocwithdigitalcertificates
                        Dim slideDigitalSignedPath = handler.Sign(Of String)(fileName, slideDigitalSignOptions, New SaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    End If

                    Exit Select
            End Select
        Catch ex As System.Exception
            Console.WriteLine(ex.Message)
        End Try
        'ExEnd:saveoutputfile
    End Sub

    ''' <summary>
    ''' Save the output/signed file with save options
    ''' </summary>
    ''' <param name="fileExtension">Extension of the file</param>
    ''' <param name="fileName">Name of the file</param>
    ''' <param name="handler">Signature's handler</param>
    ''' <param name="textSignOptions">Text sign true or false</param>
    ''' <param name="imageSignOptions">Image sign true or false</param>
    ''' <param name="digitalSignOptions">Digital sign true or false</param>
    ''' <remarks></remarks>
    Public Shared Sub SaveFileWithFormat(fileExtension As String, fileName As String, handler As SignatureHandler, textSignOptions As Object, imageSignOptions As Object, digitalSignOptions As Object)
        'ExStart:SaveFileWithFormat
        Try
            Select Case fileExtension
                Case ".docx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithtextandsaveformatoption
                        Dim wordTextSignOptions As WordsSignTextOptions = DirectCast(textSignOptions, WordsSignTextOptions)
                        'var wordTextSignedPath = handler.Sign<string>(fileName, wordTextSignOptions, new SaveOptions { OutputType = OutputType.String });
                        'ExEnd:signingworddocwithtextandsaveformatoption
                        Dim wordTextSignedPath = handler.Sign(Of String)(fileName, wordTextSignOptions, New WordsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.WordsSaveFileFormat.Dot _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithimageandsaveformatoption
                        Dim wordImageSignOptions As WordsSignImageOptions = DirectCast(imageSignOptions, WordsSignImageOptions)
                        'ExEnd:signingworddocwithimageandsaveformatoption
                        Dim wordImageSignedPath = handler.Sign(Of String)(fileName, wordImageSignOptions, New WordsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.WordsSaveFileFormat.Dot _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingworddocwithdigitalcertificatesandsaveformatoption
                        Dim wordDigitalSignOptions As WordsSignDigitalOptions = DirectCast(digitalSignOptions, WordsSignDigitalOptions)
                        'ExEnd:signingworddocwithdigitalcertificatesandsaveformatoption
                        Dim wordDigitalSignedPath = handler.Sign(Of String)(fileName, wordDigitalSignOptions, New WordsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.WordsSaveFileFormat.Dotm _
                        })
                    End If

                    Exit Select
                Case ".pdf"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithtextandsaveformatoption
                        Dim pdfTextSignOptions As PdfSignTextOptions = DirectCast(textSignOptions, PdfSignTextOptions)
                        'ExEnd:signingpdfdocwithtextandsaveformatoption
                        Dim pdfTextSignedPath = handler.Sign(Of String)(fileName, pdfTextSignOptions, New PdfSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.PdfSaveFileFormat.Doc _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithimageandsaveformatoption
                        Dim pdfImageSignOptions As PdfSignImageOptions = DirectCast(imageSignOptions, PdfSignImageOptions)
                        'ExEnd:signingpdfdocwithimageandsaveformatoption
                        Dim pdfImageSignedPath = handler.Sign(Of String)(fileName, pdfImageSignOptions, New PdfSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.PdfSaveFileFormat.Doc _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingpdfdocwithdigitalcertificatesandsaveformatoption
                        Dim pdfDigitalSignOptions As PdfSignDigitalOptions = DirectCast(digitalSignOptions, PdfSignDigitalOptions)
                        'ExEnd:signingpdfdocwithdigitalcertificatesandsaveformatoption
                        Dim pdfDigitalSignedPath = handler.Sign(Of String)(fileName, pdfDigitalSignOptions, New PdfSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.PdfSaveFileFormat.Pdf _
                        })
                    End If

                    Exit Select
                Case ".xlsx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithtextandsaveformatoption
                        Dim cellTextSignOptions As CellsSignTextOptions = DirectCast(textSignOptions, CellsSignTextOptions)
                        'ExEnd:signingexceldocwithtextandsaveformatoption
                        Dim cellTextSignedPath = handler.Sign(Of String)(fileName, cellTextSignOptions, New CellsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.CellsSaveFileFormat.Xlsm _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithimageandsaveformatoption
                        Dim cellImageSignOptions As CellsSignImageOptions = DirectCast(imageSignOptions, CellsSignImageOptions)
                        'ExEnd:signingexceldocwithimageandsaveformatoption
                        Dim cellImageSignedPath = handler.Sign(Of String)(fileName, cellImageSignOptions, New CellsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.CellsSaveFileFormat.Xlsm _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingexceldocwithdigitalcertificatesandsaveformatoption
                        Dim cellDigitalSignOptions As CellsSignDigitalOptions = DirectCast(digitalSignOptions, CellsSignDigitalOptions)
                        'ExEnd:signingexceldocwithdigitalcertificatesandsaveformatoption
                        Dim cellDigitalSignedPath = handler.Sign(Of String)(fileName, cellDigitalSignOptions, New CellsSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.CellsSaveFileFormat.Xlsm _
                        })
                    End If

                    Exit Select
                Case ".pptx"
                    If textSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithtextandsaveformatoption
                        Dim slildeTextSignOptions As SlidesSignTextOptions = DirectCast(textSignOptions, SlidesSignTextOptions)
                        'ExEnd:signingslidesdocwithtextandsaveformatoption
                        Dim slideTextSignedPath = handler.Sign(Of String)(fileName, slildeTextSignOptions, New SlidesSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.SlidesSaveFileFormat.Odp _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithimageandsaveformatoption
                        Dim slideImageSignOptions As SlidesSignImageOptions = DirectCast(imageSignOptions, SlidesSignImageOptions)
                        'ExEnd:signingslidesdocwithimageandsaveformatoption
                        Dim slideImageSignedPath = handler.Sign(Of String)(fileName, slideImageSignOptions, New SlidesSaveOptions() With { _
                            .OutputType = OutputType.[String], _
                            .FileFormat = Domain.SlidesSaveFileFormat.Odp _
                        })
                    ElseIf textSignOptions Is Nothing AndAlso imageSignOptions Is Nothing AndAlso digitalSignOptions IsNot Nothing Then
                        'ExStart:signingslidesdocwithdigitalcertificatesandsaveformatoption
                        Dim slideDigitalSignOptions As SlidesSignDigitalOptions = DirectCast(digitalSignOptions, SlidesSignDigitalOptions)
                        'ExEnd:signingslidesdocwithdigitalcertificatesandsaveformatoption
                        Dim slideDigitalSignedPath = handler.Sign(Of String)(fileName, slideDigitalSignOptions, New SlidesSaveOptions() With { _
                            .OutputType = OutputType.[String] _
                        })
                    End If

                    Exit Select
            End Select
        Catch ex As System.Exception
            Console.WriteLine(ex.Message)
        End Try
        'ExEnd:SaveFileWithFormat
    End Sub

End Class
