using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature.Domain;

    public static class GetSupportedFileFormats
    {
        public static void Run()
        {
            IEnumerable<FileType> supportedFileTypes = FileType
                .GetSupportedFileTypes()
                .OrderBy(f => f.Extension);

            foreach (FileType fileType in supportedFileTypes)
                Console.WriteLine(fileType);
        }
    }
}
