using NUnit.Framework;
using Huygens;
using System;
using GroupDocs.Signature.WebForms.Products.Signature.Entity.Web;
using System.Text;
using System.Collections.Generic;

namespace GroupDocs.Signature.WebForms.Test
{
    [TestFixture]
    public class SignatureControllerTest
    {
        [Test]
        public void ViewStatusTest()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "/../../../src";
            using (var server = new DirectServer(path))
            {
                var request = new SerialisableRequest
                {
                    Method = "GET",
                    RequestUri = "/signature",
                    Content = null
                };

                var result = server.DirectCall(request);
                Assert.That(result.StatusCode, Is.EqualTo(200));
            }
        }       
    }
}
