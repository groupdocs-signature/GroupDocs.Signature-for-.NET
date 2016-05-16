Imports GroupDocs.Signature.Handler.Output
Imports GroupDocs.Signature.Options
Imports GroupDocs.Signature.Domain
Imports System.IO
Imports Microsoft.WindowsAzure.Storage.Blob

Public Class SampleAzureOutputDataHandler
    Inherits SampleAzureDataHandler
    Implements IOutputDataHandler
    ''' <summary>
    ''' Handles azure output data
    ''' </summary>
    ''' <param name="endpoint">End point</param>
    ''' <param name="accountName">Account name</param>
    ''' <param name="accountKey">Key</param>
    ''' <param name="containerName">Container Name</param>
    Public Sub New(endpoint As String, accountName As String, accountKey As String, containerName As String)
        MyBase.New(endpoint, accountName, accountKey, containerName)
    End Sub

    ''' <summary>
    ''' Creates file
    ''' </summary>
    ''' <param name="fileDescription">Description of the file</param>
    ''' <param name="signOptions">Sign options</param>
    ''' <param name="saveOptions">Save options</param>
    ''' <returns>writeable append blob</returns>

    Public Function CreateFile(fileDescription As FileDescription, Optional signOptions As SignOptions = Nothing, Optional saveOptions As SaveOptions = Nothing) As Stream Implements IOutputDataHandler.CreateFile
        Dim container As CloudBlobContainer = GetContainerReference()
        Dim name As String = fileDescription.GUID.ToLower()
        Dim blob As CloudBlockBlob = container.GetBlockBlobReference(name)
        Using emptyStream As New MemoryStream()
            blob.UploadFromStream(emptyStream)
        End Using
        Try
            Dim appendBlob As CloudAppendBlob = container.GetAppendBlobReference(name)
            appendBlob.CreateOrReplace()
            Return appendBlob.OpenWrite(True)
        Catch exception As Microsoft.WindowsAzure.Storage.StorageException
            ' Azure Storage Emulator does not support append BLOBs,
            ' so we emulate appending
            Return New CachingAzureStream(blob)
        End Try
    End Function


    ''' <summary>
    ''' Creats stream
    ''' </summary>
    ''' <param name="fileDescription"></param>
    ''' <param name="signOptions"></param>
    ''' <param name="saveOptions"></param>
    ''' <returns></returns>
    Public Function CreateStream(fileDescription As FileDescription, Optional signOptions As SignOptions = Nothing, Optional saveOptions As SaveOptions = Nothing) As Stream Implements IOutputDataHandler.CreateStream
        Throw New NotImplementedException()
    End Function
End Class

