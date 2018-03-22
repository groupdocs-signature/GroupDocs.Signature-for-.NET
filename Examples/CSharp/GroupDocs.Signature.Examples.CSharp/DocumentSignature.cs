using System;

namespace GroupDocs.Signature.Examples.CSharp
{
    internal class DocumentSignature
    {
        internal DateTime Signed;

        public string Author { get; internal set; }
        public decimal DataFactor { get; internal set; }
        public string ID { get; internal set; }
    }
}