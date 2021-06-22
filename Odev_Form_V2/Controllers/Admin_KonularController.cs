using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Odev_Form_V2.Models.Context;
using Odev_Form_V2.Models.Entities;
using Odev_Form_V2.Models.ViewModel;

namespace Odev_Form_V2.Controllers
{
    [_SessionControl]
    public class Admin_KonularController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: Admin_Konular
        public ActionResult Index()
        {
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu = db.TBL_Konu.ToList();
            vm.TBL_Kategori = db.TBL_Kategori.ToList();
            vm.TBL_Kullanici = db.TBL_Kullanici.ToList();
            return View(vm);
        }
        public ActionResult Aktif(int? id)
        {
            var deger = db.TBL_Konu.FirstOrDefault(x => x.ID == id);
            deger.Aktif = true;
            db.SaveChanges();
            return RedirectToAction("Index", "Admin_Konular");
        }

        // GET: Admin_Konular/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Konu tBL_Konu = db.TBL_Konu.Find(id);
            if (tBL_Konu == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Konu);
        }

        // GET: Admin_Konular/Create
        public ActionResult Create()
        {
            Admin_View_Model vm = new Admin_View_Model(); 
            vm.TBL_Kategori = db.TBL_Kategori.ToList();
            return View(vm);
        }

        // POST: Admin_Konular/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Admin_View_Model cc, HttpPostedFileBase Kapak_Foto, int Kategori_ID)
        {
            if (ModelState.IsValid)
            {
                if (Kapak_Foto.ContentLength > 0)
                {
                    string a = Guid.NewGuid().ToString();
                    string filePath = Path.Combine(Server.MapPath("~/Content/images"), a + "_" + Path.GetFileName(Kapak_Foto.FileName));
                    Kapak_Foto.SaveAs(filePath);
                    string b = "/Content/images/" + a + "_" + Path.GetFileName(Kapak_Foto.FileName);
                    cc.TBL_Konu_Duzenle.Kapak_Foto = b;
                }
                else
                {
                    string b = null;
                    cc.TBL_Konu_Duzenle.Kapak_Foto = b;
                }
                cc.TBL_Konu_Duzenle.EKlenme_Tarihi = DateTime.Now;
                cc.TBL_Konu_Duzenle.Kategori_ID = Kategori_ID;
                cc.TBL_Konu_Duzenle.KID = 1;
                cc.TBL_Konu_Duzenle.Aktif = true;
                db.TBL_Konu.Add(cc.TBL_Konu_Duzenle);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cc.TBL_Konu_Duzenle);
        }

        // GET: Admin_Konular/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu_Duzenle = db.TBL_Konu.Find(id);
            vm.TBL_Kategori = db.TBL_Kategori.ToList();
            if (vm.TBL_Konu_Duzenle == null)
            {
                return HttpNotFound();
            }
            return View(vm);
        }

        // POST: Admin_Konular/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Admin_View_Model cc, HttpPostedFileBase Kapak_Foto,int Kategori_ID)
        {
            if (ModelState.IsValid)
            {
                if (Kapak_Foto.ContentLength > 0)
                {
                    string a = Guid.NewGuid().ToString();
                    string filePath = Path.Combine(Server.MapPath("~/Content/images"), a + "_" + Path.GetFileName(Kapak_Foto.FileName));
                    Kapak_Foto.SaveAs(filePath);
                    string b = "/Content/images/" + a + "_" + Path.GetFileName(Kapak_Foto.FileName);
                    cc.TBL_Konu_Duzenle.Kapak_Foto = b;
                }
                else
                {
                    string b = null;
                    cc.TBL_Konu_Duzenle.Kapak_Foto = b;
                }
                cc.TBL_Konu_Duzenle.EKlenme_Tarihi = DateTime.Now;
                cc.TBL_Konu_Duzenle.Aktif = true;
                cc.TBL_Konu_Duzenle.KID = 1;
                cc.TBL_Konu_Duzenle.Kategori_ID = Kategori_ID;
                db.Entry(cc.TBL_Konu_Duzenle).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cc.TBL_Konu_Duzenle);
        }

        // GET: Admin_Konular/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Konu tBL_Konu = db.TBL_Konu.Find(id);
            if (tBL_Konu == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Konu);
        }

        // POST: Admin_Konular/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Konu tBL_Konu = db.TBL_Konu.Find(id);
            db.TBL_Konu.Remove(tBL_Konu);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
