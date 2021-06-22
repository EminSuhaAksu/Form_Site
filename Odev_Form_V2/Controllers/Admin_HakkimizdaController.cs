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
    public class Admin_HakkimizdaController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: Admin_Hakkimizda
        public ActionResult Index()
        {
            return View(db.TBL_Hakkimizda.ToList());
        }

        // GET: Admin_Hakkimizda/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Hakkimizda tBL_Hakkimizda = db.TBL_Hakkimizda.Find(id);
            if (tBL_Hakkimizda == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Hakkimizda);
        }

        // GET: Admin_Hakkimizda/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin_Hakkimizda/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Aciklama,Eklenme_Tarihi,Aktif")] TBL_Hakkimizda tBL_Hakkimizda)
        {
            if (ModelState.IsValid)
            {
                db.TBL_Hakkimizda.Add(tBL_Hakkimizda);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tBL_Hakkimizda);
        }

        // GET: Admin_Hakkimizda/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Hakkimizda tBL_Hakkimizda = db.TBL_Hakkimizda.Find(id);
            if (tBL_Hakkimizda == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Hakkimizda);
        }

        // POST: Admin_Hakkimizda/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Aciklama,Eklenme_Tarihi,Aktif")] TBL_Hakkimizda tBL_Hakkimizda)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tBL_Hakkimizda).State = EntityState.Modified;
                tBL_Hakkimizda.Eklenme_Tarihi = DateTime.Now;
                tBL_Hakkimizda.Aktif = true;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tBL_Hakkimizda);
        }

        // GET: Admin_Hakkimizda/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Hakkimizda tBL_Hakkimizda = db.TBL_Hakkimizda.Find(id);
            if (tBL_Hakkimizda == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Hakkimizda);
        }

        // POST: Admin_Hakkimizda/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Hakkimizda tBL_Hakkimizda = db.TBL_Hakkimizda.Find(id);
            db.TBL_Hakkimizda.Remove(tBL_Hakkimizda);
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
