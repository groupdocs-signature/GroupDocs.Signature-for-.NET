Imports System.IO
Imports Microsoft.WindowsAzure.Storage.Blob


Public Class CachingAzureStream
    Inherits Stream
    Private _blob As CloudBlockBlob
    Private _position As Long
    Private ReadOnly _cachingStream As MemoryStream

    ''' <summary>
    ''' Caches azure stream
    ''' </summary>
    ''' <param name="blob"></param>
    Public Sub New(blob As CloudBlockBlob)
        _blob = blob
        _cachingStream = New MemoryStream()
    End Sub

    ''' <summary>
    ''' Sets reading
    ''' </summary>
    Public Overrides ReadOnly Property CanRead() As Boolean
        Get
            Return False
        End Get
    End Property

    ''' <summary>
    ''' Sets seeking
    ''' </summary>
    Public Overrides ReadOnly Property CanSeek() As Boolean
        Get
            Return False
        End Get
    End Property

    ''' <summary>
    ''' Sets writing
    ''' </summary>
    Public Overrides ReadOnly Property CanWrite() As Boolean
        Get
            Return True
        End Get
    End Property

    ''' <summary>
    ''' Sets flushing
    ''' </summary>
    Public Overrides Sub Flush()
        _cachingStream.Seek(0, SeekOrigin.Begin)
        _blob.UploadFromStream(_cachingStream)
        _cachingStream.Seek(0, SeekOrigin.[End])
    End Sub

    ''' <summary>
    ''' Sets lenght
    ''' </summary>
    Public Overrides ReadOnly Property Length() As Long
        Get
            Throw New NotImplementedException()
        End Get
    End Property

    ''' <summary>
    ''' Gets and Sets position
    ''' </summary>
    Public Overrides Property Position() As Long
        Get
            Return _position
        End Get
        Set(value As Long)
            Throw New NotImplementedException()
        End Set
    End Property

    ''' <summary>
    ''' Reads buffer
    ''' </summary>
    ''' <param name="buffer"></param>
    ''' <param name="offset"></param>
    ''' <param name="count"></param>
    ''' <returns></returns>
    Public Overrides Function Read(buffer As Byte(), offset As Integer, count As Integer) As Integer
        Throw New NotImplementedException()
    End Function

    Public Overrides Function Seek(offset As Long, origin As SeekOrigin) As Long
        If offset <> 0 OrElse origin <> SeekOrigin.Begin Then
            Throw New NotImplementedException()
        Else
            Return 0
        End If
    End Function

    Public Overrides Sub SetLength(value As Long)
        Throw New NotImplementedException()
    End Sub

    Public Overrides Sub Write(buffer As Byte(), offset As Integer, count As Integer)
        _cachingStream.Write(buffer, 0, count)
        _position = _cachingStream.Length
    End Sub

    Public Overrides Sub Close()
        Flush()
    End Sub
End Class


