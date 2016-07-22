using System;
using System.IO;
using System.Linq;
using System.Web;

namespace Signature.Net.Sample.Mvc.Core
{
    public class Storage
    {
        private string _basePath;
        public Storage(string basePath)
        {
            _basePath = basePath;
        }

        public FileSystemEntity[] ListEntities(string path)
        {
            // list directories
            string fullPath = GetFullPath(path);
            var entities = Directory.EnumerateDirectories(fullPath);
            var dirs = entities.Select(e =>
            {
                var di = new DirectoryInfo(e);
                return new FileSystemEntity { Name = di.Name, DateModified = di.LastWriteTime, IsDirectory = true };
            }
            );

            // list files
            entities = Directory.EnumerateFiles(fullPath);
            var files = entities.Select(e =>
            {
                var fi = new FileInfo(e);
                return new FileSystemEntity { Name = fi.Name, DateModified = fi.LastWriteTime, Size = fi.Length };
            }
            );

            // return listed files and directories
            return dirs.Concat(files).ToArray();
        }

        public bool FolderExists(string path)
        {
            return Directory.Exists(GetFullPath(path));
        }

        private string GetFullPath(string path)
        {
            return Path.Combine(_basePath, path ?? String.Empty);
        }
    }
}