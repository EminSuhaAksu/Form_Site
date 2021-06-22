using Odev_Form_V2.Models.Context;
using Odev_Form_V2.Models.Entities;
using Odev_Form_V2.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Odev_Form_V2.Controllers
{
    public class HomeController : Controller
    {
        Data_Context Db = new Data_Context();
        public ActionResult Index()
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.ToList();
            vm.TBL_Like = Db.TBL_Like.ToList();
            vm.TBL_Entri = Db.TBL_Entri.ToList();
            return View(vm);
        }
        [HttpGet]
        public ActionResult Search(string k)
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true&&x.Ad.Contains(k)).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.ToList();
            vm.TBL_Like = Db.TBL_Like.ToList();
            vm.TBL_Entri = Db.TBL_Entri.ToList();
            return View(vm);
        }
        public ActionResult Kategori_Detay(int? id)
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true && x.Kategori_ID == id).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.ToList();
            vm.TBL_Like = Db.TBL_Like.ToList();
            vm.TBL_Entri = Db.TBL_Entri.ToList();
            return View(vm);
        }
        [HttpPost]
        public ActionResult İletisim_Gonder(string isim, string eposta, string konu, string mesaj)
        {
            TBL_Iletisim cc = new TBL_Iletisim();
            cc.Ad_Soyad = isim;
            cc.E_Posta = eposta;
            cc.Konu = konu;
            cc.Mesaj = mesaj;
            cc.Eklenme_Tarihi = DateTime.Now;
            Db.TBL_Iletisim.Add(cc);
            Db.SaveChanges();
            TempData["Mesaj_Geldi"] = "Mesaj Gönderildi";
            return RedirectToAction("Contact");
        }
        public ActionResult Entri_Detay(int? id)
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true).ToList();
            vm.TBL_Konu_Secili = Db.TBL_Konu.Where(x => x.ID == id).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.ToList();
            vm.TBL_Like = Db.TBL_Like.ToList();
            vm.TBL_Entri = Db.TBL_Entri.Where(x => x.Konu_ID == id).ToList();
            return View(vm);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            var deger = Db.TBL_Hakkimizda.ToList();
            return View(deger);
        }
        [HttpPost]
        public ActionResult Yorum_Yap(int Konu_ID, Home_Index_View_Model dd)
        {
            int KID = Convert.ToInt32(Session["KID"].ToString());
            TBL_Entri cc = new TBL_Entri();
            cc.Kullanici_ID = KID;
            cc.Konu_ID = Konu_ID;
            cc.Eklenme_Tarihi = DateTime.Now;
            cc.Aktif = true;
            cc.Aciklama = dd.TBL_Entri_Duzenle.Aciklama;
            Db.TBL_Entri.Add(cc);
            Db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Yeni_Konu_Olustur()
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.ToList();
            vm.TBL_Like = Db.TBL_Like.ToList();
            vm.TBL_Entri = Db.TBL_Entri.ToList();
            return View(vm);
        }
        public ActionResult Login()
        { 
            return View();
        }
        [HttpPost]
        public ActionResult Login(string kuladi,string sifre)
        {
            var deger = Db.TBL_Kullanici.FirstOrDefault(x => x.KAD == kuladi && x.Password == sifre);
            if (deger!=null)
            {
                Session["KID"] = deger.ID;
                Session["KID_YETKİ"] = deger.Yetki;
                Session["KID_Ad"] = deger.Ad_Soyad;
                Session["KAD"] = deger.KAD;
                return RedirectToAction("Index");
            }
            else
            {
                TempData["Yanlis"] = "Şifre Veya E-Posta Hatalı Lütfen Tekrar Deneyiniz...";
                return RedirectToAction("Login");
            }
        }
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(string kuladi, string sifre, string email, string adsoyad)
        {
            TBL_Kullanici cc = new TBL_Kullanici();
            cc.Ad_Soyad = adsoyad;
            cc.KAD = kuladi;
            cc.Password = sifre;
            cc.Email = email;
            cc.Yetki = 2;
            Db.TBL_Kullanici.Add(cc);
            Db.SaveChanges();
            return RedirectToAction("Login");
        }
        public ActionResult Kullanici_Detay(int? id)
        {
            Home_Index_View_Model vm = new Home_Index_View_Model();
            vm.TBL_Konu = Db.TBL_Konu.Where(x => x.Aktif == true&&x.KID==id).ToList();
            vm.TBL_Kategori = Db.TBL_Kategori.Where(x => x.Aktif == true).ToList();
            vm.TBL_Kullanici = Db.TBL_Kullanici.Where(x=>x.ID==id).ToList(); 
            vm.TBL_Entri = Db.TBL_Entri.Where(x=>x.Kullanici_ID==id).ToList();
            return View(vm); 
        }
        [HttpPost]
        public ActionResult Parola_Degistir(int ID,string pass)
        {
            var deger = Db.TBL_Kullanici.FirstOrDefault(x => x.ID == ID);
            deger.Password = pass;
            Db.SaveChanges();
            return RedirectToAction("Index","Home");
        }
        public ActionResult Cikis_Yap()
        {
            Session.RemoveAll();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult Konu_Ac(int Kategori_ID,string Ad, Home_Index_View_Model cc, HttpPostedFileBase dd)
        {
            TBL_Konu yeni_konu = new TBL_Konu();
            if (dd.ContentLength > 0)
            {
                string a = Guid.NewGuid().ToString();
                string filePath = Path.Combine(Server.MapPath("~/Content/images"), a + "_" + Path.GetFileName(dd.FileName));
                dd.SaveAs(filePath);
                string b = "/Content/images/" + a + "_" + Path.GetFileName(dd.FileName);
                yeni_konu.Kapak_Foto=b;
            }
            else
            {
                string b = null;
                yeni_konu.Kapak_Foto = b;
            }
            yeni_konu.Kategori_ID = Kategori_ID;
            yeni_konu.KID= Convert.ToInt32(Session["KID"].ToString());
            yeni_konu.EKlenme_Tarihi = DateTime.Now;
            yeni_konu.Aktif = false;
            yeni_konu.Ad = Ad;
            yeni_konu.Aciklama = cc.TBL_Entri_Duzenle.Aciklama;
            Db.TBL_Konu.Add(yeni_konu);
            Db.SaveChanges();
            //var Eklenen_Konu = Db.TBL_Konu.FirstOrDefault(x => x.Ad == Ad && x.Aciklama == yeni_konu.Aciklama);
            return RedirectToAction("Index","Home");
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}