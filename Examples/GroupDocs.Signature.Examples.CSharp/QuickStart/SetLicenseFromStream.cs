using System;
using System.IO;

namespace GroupDocs.Signature.Examples.CSharp.QuickStart
{
    /// <summary>
    /// This example demonstrates how to set license from stream.
    /// </summary>
    class SetLicenseFromStream
    {
        public static void Run()
        {
            Console.WriteLine("\n--------------------------------------------------------------------------------------------------------------------");
            Console.WriteLine("[Example Quick Start] # SetLicenseFromStream : Set license from stream\n");

            if (File.Exists(Constants.LicensePath))
            {
                using (FileStream stream = File.OpenRead(Constants.LicensePath))
                {
                    License license = new License();
                    license.SetLicense(stream);
                }

                Console.WriteLine("License set successfully.");
            }
            else
            {
                Helper.WriteError("\nWe do not ship any license with this example. " +
                                  "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
                                  "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
                                  "\nLearn how to request temporary license at https://purchase.groupdocs.com/temporary-license.");
            }
        }
    }
}
