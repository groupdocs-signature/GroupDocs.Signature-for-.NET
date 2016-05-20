using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupDocs.Signature.Examples.CSharp
{
    public class CachingAzureStream : Stream
    {
        private CloudBlockBlob _blob;
        private long _position;
        private readonly MemoryStream _cachingStream;

        /// <summary>
        /// Caches azure stream
        /// </summary>
        /// <param name="blob"></param>
        public CachingAzureStream(CloudBlockBlob blob)
        {
            _blob = blob;
            _cachingStream = new MemoryStream();
        }

        /// <summary>
        /// Sets reading
        /// </summary>
        public override bool CanRead
        {
            get { return false; }
        }

        /// <summary>
        /// Sets seeking
        /// </summary>
        public override bool CanSeek
        {
            get { return false; }
        }

        /// <summary>
        /// Sets writing
        /// </summary>
        public override bool CanWrite
        {
            get { return true; }
        }

        /// <summary>
        /// Sets flushing
        /// </summary>
        public override void Flush()
        {
            _cachingStream.Seek(0, SeekOrigin.Begin);
            _blob.UploadFromStream(_cachingStream);
            _cachingStream.Seek(0, SeekOrigin.End);
        }

        /// <summary>
        /// Sets lenght
        /// </summary>
        public override long Length
        {
            get { throw new NotImplementedException(); }
        }

        /// <summary>
        /// Gets and Sets position
        /// </summary>
        public override long Position
        {
            get { return _position; }
            set { throw new NotImplementedException(); }
        }

        /// <summary>
        /// Reads buffer
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int Read(byte[] buffer, int offset, int count)
        {
            throw new NotImplementedException();
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            if (offset != 0 || origin != SeekOrigin.Begin)
                throw new NotImplementedException();
            else
            {
                return 0;
            }
        }

        public override void SetLength(long value)
        {
            throw new NotImplementedException();
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            _cachingStream.Write(buffer, 0, count);
            _position = _cachingStream.Length;
        }

        public override void Close()
        {
            Flush();
        }
    }
}
