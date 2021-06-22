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
    public class TBL_IletisimController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: TBL_Iletisim
        public ActionResult Index()
        {
            return View(db.TBL_Iletisim.ToList());
        }

        // GET: TBL_Iletisim/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Iletisim tBL_Iletisim = db.TBL_Iletisim.Find(id);
            if (tBL_Iletisim == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Iletisim);
        }

        // GET: TBL_Iletisim/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TBL_Iletisim/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Ad_Soyad,E_Posta,Konu,Mesaj,Eklenme_Tarihi")] TBL_Iletisim tBL_Iletisim)
        {
            if (ModelState.IsValid)
            {
                db.TBL_Iletisim.Add(tBL_Iletisim);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tBL_Iletisim);
        }

        // GET: TBL_Iletisim/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Iletisim tBL_Iletisim = db.TBL_Iletisim.Find(id);
            if (tBL_Iletisim == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Iletisim);
        }

        // POST: TBL_Iletisim/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Ad_Soyad,E_Posta,Konu,Mesaj,Eklenme_Tarihi")] TBL_Iletisim tBL_Iletisim)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tBL_Iletisim).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tBL_Iletisim);
        }

        // GET: TBL_Iletisim/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Iletisim tBL_Iletisim = db.TBL_Iletisim.Find(id);
            if (tBL_Iletisim == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Iletisim);
        }

        // POST: TBL_Iletisim/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Iletisim tBL_Iletisim = db.TBL_Iletisim.Find(id);
            db.TBL_Iletisim.Remove(tBL_Iletisim);
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
