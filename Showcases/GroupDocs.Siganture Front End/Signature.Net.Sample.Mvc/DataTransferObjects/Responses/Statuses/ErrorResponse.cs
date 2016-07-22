namespace Groupdocs.Web.UI.DataTransferObjects.Responses.Statuses
{
    /// <summary>
    /// Encapsulates a response when document processing has failed
    /// </summary>
    public class ErrorResponse : OperationStatusResponse
    {
        public ErrorResponse()
        {
            success = false;
        }

        /// <summary>
        /// 1 - document not found; 2 - cannot open the file because it is corrupted or unsupported
        /// </summary>
        public byte ErrorCode { get; set; }

        /// <summary>
        /// Textual description of the reason of the error
        /// </summary>
        public string Reason { get; set; }

        /// <summary>
        /// Returns an appropriate 'ErrorResponse' instance for the 'Document not found' scenario with the default message
        /// </summary>
        /// <returns></returns>
        public static ErrorResponse DocumentNotFoundResponse()
        {
            return new ErrorResponse() { Reason = Constants.ExceptionMessages.DocumentNotFound, ErrorCode = 1 };
        }

        /// <summary>
        /// Returns an appropriate 'ErrorResponse' instance for the 'Document not found' scenario with specified message
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static ErrorResponse DocumentNotFoundResponse(string message)
        {
            return new ErrorResponse() { Reason = message, ErrorCode = 1 };
        }
    }
}
