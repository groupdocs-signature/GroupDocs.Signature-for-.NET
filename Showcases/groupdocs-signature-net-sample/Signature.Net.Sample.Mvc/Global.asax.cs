using System.Web.Mvc;
using System.Web.Routing;
using GroupDocs.Signature;
using Signature.Net.Sample.Mvc.Engine;

namespace Signature.Net.Sample.Mvc
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Licensing licensing = new Licensing();
            licensing.ApplyLicense();

        }
    }
}