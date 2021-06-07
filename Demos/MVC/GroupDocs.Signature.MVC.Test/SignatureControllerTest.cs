using GroupDocs.Signature.MVC.Controllers;
using NUnit.Framework;
using System.Web.Routing;
using MvcContrib.TestHelper;
using Huygens;
using System;
using GroupDocs.Signature.MVC.Products.Signature.Entity.Web;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace GroupDocs.Signature.MVC.Test
{
    [TestFixture]
    public class SignatureControllerTest
    {
        
        [SetUp]
        public void TestInitialize()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        [TearDown]
        public void TearDown()
        {
            RouteTable.Routes.Clear();
        }

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

        [Test]
        public void ViewMapControllerTest()
        {
            "~/signature".Route().ShouldMapTo<SignatureController>(x => x.Index());
        }        
    }
}
