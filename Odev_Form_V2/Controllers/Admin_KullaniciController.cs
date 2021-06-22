using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Odev_Form_V2.Models.Context;
using Odev_Form_V2.Models.Entities;

namespace Odev_Form_V2.Controllers
{
    [_SessionControl]
    public class Admin_KullaniciController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: Admin_Kullanici
        public ActionResult Index()
        {
            return View(db.TBL_Kullanici.ToList());
        }

        // GET: Admin_Kullanici/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kullanici tBL_Kullanici = db.TBL_Kullanici.Find(id);
            if (tBL_Kullanici == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kullanici);
        }

        // GET: Admin_Kullanici/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin_Kullanici/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,KAD,Password,Ad_Soyad,Email,Yetki")] TBL_Kullanici tBL_Kullanici)
        {
            if (ModelState.IsValid)
            {
                db.TBL_Kullanici.Add(tBL_Kullanici);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tBL_Kullanici);
        }

        // GET: Admin_Kullanici/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kullanici tBL_Kullanici = db.TBL_Kullanici.Find(id);
            if (tBL_Kullanici == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kullanici);
        }

        // POST: Admin_Kullanici/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,KAD,Password,Ad_Soyad,Email,Yetki")] TBL_Kullanici tBL_Kullanici)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tBL_Kullanici).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tBL_Kullanici);
        }

        // GET: Admin_Kullanici/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kullanici tBL_Kullanici = db.TBL_Kullanici.Find(id);
            if (tBL_Kullanici == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kullanici);
        }

        // POST: Admin_Kullanici/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Kullanici tBL_Kullanici = db.TBL_Kullanici.Find(id);
            db.TBL_Kullanici.Remove(tBL_Kullanici);
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
