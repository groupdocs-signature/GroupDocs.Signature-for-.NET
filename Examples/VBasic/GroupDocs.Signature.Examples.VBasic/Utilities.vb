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
        Catch ex As Exception
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

End Class
