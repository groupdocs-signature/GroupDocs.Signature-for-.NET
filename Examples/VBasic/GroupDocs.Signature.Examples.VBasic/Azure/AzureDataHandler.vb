Imports Microsoft.WindowsAzure.Storage.Auth
Imports Microsoft.WindowsAzure.Storage.Blob
Imports Microsoft.WindowsAzure.Storage

'ExStart:azuredatahandling
Public MustInherit Class AzureDataHandler
    Private _remoteStorage As CloudBlobClient
    Private _containerName As String

    ''' <summary>
    ''' Handles azure data
    ''' </summary>
    ''' <param name="endpoint"></param>
    ''' <param name="accountName"></param>
    ''' <param name="accountKey"></param>
    ''' <param name="containerName"></param>
    Public Sub New(endpoint As String, accountName As String, accountKey As String, containerName As String)
        Dim credentials = New StorageCredentials(accountName, accountKey)
        Dim account As New CloudStorageAccount(credentials, New Uri(endpoint), Nothing, Nothing, Nothing)
        _remoteStorage = account.CreateCloudBlobClient()
        _containerName = containerName
        Dim defTimeout As System.Nullable(Of TimeSpan) = _remoteStorage.DefaultRequestOptions.ServerTimeout
        _remoteStorage.DefaultRequestOptions.ServerTimeout = TimeSpan.FromSeconds(10)
        Dim container As CloudBlobContainer = _remoteStorage.GetContainerReference(containerName)
        container.CreateIfNotExists()
        _remoteStorage.DefaultRequestOptions.ServerTimeout = defTimeout
    End Sub

    ''' <summary>
    ''' Gets container reference
    ''' </summary>
    ''' <returns>Returns container</returns>
    Public Function GetContainerReference() As CloudBlobContainer
        Dim container As CloudBlobContainer = _remoteStorage.GetContainerReference(_containerName)
        Return container
    End Function
End Class
'ExEnd:azuredatahandling


