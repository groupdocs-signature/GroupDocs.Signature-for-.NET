using System;
using System.Linq;
using System.Collections.Generic;

namespace GroupDocs.Signature.Examples.CSharp.BasicUsage
{
    using GroupDocs.Signature.Domain;

    /// <summary>
    /// Get supported file formats
    /// </summary>
    public static class GetSupportedFileFormats
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Basic Usage] # GetSupportedFileFormats : Get supported file formats\n");

            IEnumerable<FileType> supportedFileTypes = FileType
                .GetSupportedFileTypes()
                .OrderBy(f => f.Extension);

            foreach (FileType fileType in supportedFileTypes)
                Console.WriteLine(fileType);
        }
    }
}
