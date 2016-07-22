using System.IO;
using GroupDocs.Signature;

namespace Signature.Net.Sample.Mvc.Engine
{
    public interface ILicensing
    {
        void ApplyLicense();
    }

    public class Licensing : ILicensing
    {
        public void ApplyLicense()
        {
            string fullPathToLicense = Path.GetFullPath(@"D:\GroupDocs.Signature.lic");
            if (File.Exists(fullPathToLicense))
            {
                License license = new License();
                license.SetLicense(fullPathToLicense);
            }
        }
    }
}