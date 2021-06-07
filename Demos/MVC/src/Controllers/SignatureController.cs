using System.Web.Mvc;

namespace GroupDocs.Signature.MVC.Controllers
{
    /// <summary>
    /// Signature Web page controller
    /// </summary>
    public class SignatureController : Controller
    {
        // View Signature
        public ActionResult Index()
        {
            return View();
        }
    }
}