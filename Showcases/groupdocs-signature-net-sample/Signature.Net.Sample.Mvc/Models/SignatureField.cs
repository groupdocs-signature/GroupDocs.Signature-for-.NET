namespace Signature.Net.Sample.Mvc.Models
{
    public class SignatureField
    {
        public int FieldType { get; set; }
        public string Data { get; set; }
        public string DocumentGuid { get; set; }
        public Location[] Locations { get; set; }

        public class Location
        {
            public int Page { get; set; }
            public double LocationX { get; set; }
            public double LocationY { get; set; }
            public int LocationWidth { get; set; }
            public int LocationHeight { get; set; }
            public string FontName { get; set; }
            public int FontSize { get; set; }
            public int FontColor { get; set; }
            public bool? FontBold { get; set; }
            public bool? FontItalic { get; set; }
            public bool? FontUnderline { get; set; }
            public int Alignment { get; set; }
            public string Id { get; set; }
        };
    }
}