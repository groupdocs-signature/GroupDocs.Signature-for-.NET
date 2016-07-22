using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Signature.Net.Sample.Mvc
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: null,
                url: "gd-signature/signature2/document-viewer/{action}",
                defaults: new { controller = "Signature" }
            );

            routes.MapRoute(
                name: null,
                url: "gd-signature/signature2/resource/{action}",
                defaults: new { controller = "Signature" }
            );

            routes.MapRoute(
                name: null,
                url: "gd-signature/signature2/service/{action}",
                defaults: new { controller = "Signature" }
            );

            routes.MapRoute(
                name: null,
                url: "gd-signature/signature2/GetDocumentPageImageHandler",
                defaults: new { controller = "Signature", action = "GetDocumentPageImage" }
            );

            routes.MapRoute(
                name: null,
                url: "gd-signature/signature2/{action}",
                defaults: new { controller = "Signature" }
            );
            
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
