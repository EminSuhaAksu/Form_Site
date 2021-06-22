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
    public class Admin_KategoriController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: Admin_Kategori
        public ActionResult Index()
        {
            return View(db.TBL_Kategori.ToList());
        }

        // GET: Admin_Kategori/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kategori tBL_Kategori = db.TBL_Kategori.Find(id);
            if (tBL_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kategori);
        }

        // GET: Admin_Kategori/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin_Kategori/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Ad,Aktif,Eklenme_Tarihi")] TBL_Kategori tBL_Kategori)
        {
            if (ModelState.IsValid)
            {
                db.TBL_Kategori.Add(tBL_Kategori);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tBL_Kategori);
        }

        // GET: Admin_Kategori/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kategori tBL_Kategori = db.TBL_Kategori.Find(id);
            if (tBL_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kategori);
        }

        // POST: Admin_Kategori/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Ad,Aktif,Eklenme_Tarihi")] TBL_Kategori tBL_Kategori)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tBL_Kategori).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tBL_Kategori);
        }

        // GET: Admin_Kategori/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Kategori tBL_Kategori = db.TBL_Kategori.Find(id);
            if (tBL_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Kategori);
        }

        // POST: Admin_Kategori/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Kategori tBL_Kategori = db.TBL_Kategori.Find(id);
            db.TBL_Kategori.Remove(tBL_Kategori);
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
