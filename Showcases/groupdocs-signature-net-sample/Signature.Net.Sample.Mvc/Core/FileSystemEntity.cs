using System;

namespace Signature.Net.Sample.Mvc.Core
{
    public class FileSystemEntity
    {
        public string Guid { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public bool IsDirectory { get; set; }
        public DateTime DateModified { get; set; }
    }
}
