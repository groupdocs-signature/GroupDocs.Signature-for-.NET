Imports System.IO
Imports GroupDocs.Signature.Domain
Imports Microsoft.WindowsAzure.Storage.Blob
Imports GroupDocs.Signature.Handler.Input


Public Class AzureInputDataHandler
    Inherits AzureDataHandler
    Implements IInputDataHandler
    ''' <summary>
    ''' Handles azure input data
    ''' </summary>
    ''' <param name="endpoint">End point</param>
    ''' <param name="accountName">Account name</param>
    ''' <param name="accountKey">Key</param>
    ''' <param name="containerName">Container Name</param>
    Public Sub New(endpoint As String, accountName As String, accountKey As String, containerName As String)
        MyBase.New(endpoint, accountName, accountKey, containerName)
    End Sub
    Public Function GetFileDescription(guid As String) As FileDescription Implements IInputDataHandler.GetFileDescription
        Dim result As New FileDescription(guid)
        Return result
    End Function

    ''' <summary>
    ''' Gets stream
    ''' </summary>
    ''' <param name="guid">ID</param>
    ''' <returns>Returns memory stream</returns>
    Public Function GetStream(guid As String) As Stream Implements IInputDataHandler.GetStream
        Dim result As New MemoryStream()
        Dim container As CloudBlobContainer = GetContainerReference()
        Dim blob As CloudBlockBlob = container.GetBlockBlobReference(guid)
        Using content As Stream = blob.OpenRead()
            content.CopyTo(result)
        End Using
        result.Seek(0, SeekOrigin.Begin)
        Return result
    End Function
End Class

