using Odev_Form_V2.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Odev_Form_V2.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        Data_Context Db = new Data_Context();
        [AllowAnonymous]
        public ActionResult Index()
        {
            FormsAuthentication.SignOut();
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Index(string KAD, string PAS)
        {
            if (ModelState.IsValid)
            {

                var deger = Db.TBL_Kullanici.FirstOrDefault(x => x.KAD == KAD && x.Password == PAS);
                //Aşağıdaki if komutu gönderilen mail ve şifre doğrultusunda kullanıcı kontrolu yapar. Eğer kullanıcı var ise login olur.
                if (deger != null)
                {
                    FormsAuthentication.SetAuthCookie(deger.KAD, true);
                    Session["KID"] = deger.ID;
                    Session["KAD_Name"] = deger.Ad_Soyad;
                    Session["KAD"] = deger.KAD;
                    Session["KAD_EMAİL"] = deger.Email;
                    Session["KAD_Yetki"] = deger.Yetki;
                    if (deger.Yetki == 2)
                    {
                        return RedirectToAction("Index", "Home");
                    }
                    else if (deger.Yetki == 1)
                    {
                        return RedirectToAction("Index", "Admin_Konular");
                    }

                }
                else
                {
                    ModelState.AddModelError("", "EMail veya şifre hatalı!");
                }
            }
            return RedirectToAction("Login/Index");
        }
 
        public ActionResult LogOff()
        {
            Session.RemoveAll();
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Login");
        }

    }
   public class _SessionControlAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                if (!HttpContext.Current.Response.IsRequestBeingRedirected)
                    filterContext.HttpContext.Response.Redirect("/Login/Index");
            }
        }
    }
}