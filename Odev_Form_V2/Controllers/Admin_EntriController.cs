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
using Odev_Form_V2.Models.ViewModel;

namespace Odev_Form_V2.Controllers
{
    [_SessionControl]
    public class Admin_EntriController : Controller
    {
        private Data_Context db = new Data_Context();

        // GET: Admin_Entri
        public ActionResult Index()
        {
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu = db.TBL_Konu.ToList();
            vm.TBL_Kullanici = db.TBL_Kullanici.ToList();
            vm.TBL_Entri = db.TBL_Entri.ToList();
            return View(vm);
        } 
        // GET: Admin_Entri/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu = db.TBL_Konu.ToList();
            vm.TBL_Kullanici = db.TBL_Kullanici.ToList();
            vm.TBL_Entri_Duzenle = db.TBL_Entri.Find(id);
            if (vm.TBL_Entri_Duzenle == null)
            {
                return HttpNotFound();
            }
            return View(vm);
        }

        // GET: Admin_Entri/Create
        public ActionResult Create()
        {
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu = db.TBL_Konu.ToList();
            vm.TBL_Kullanici = db.TBL_Kullanici.ToList();
            vm.TBL_Entri = db.TBL_Entri.ToList();
            return View(vm);
        }

        // POST: Admin_Entri/Create
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Aciklama,Konu_ID,Kullanici_ID,Aktif,Eklenme_Tarihi")] TBL_Entri tBL_Entri)
        {
            if (ModelState.IsValid)
            {
                db.TBL_Entri.Add(tBL_Entri);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tBL_Entri);
        }

        // GET: Admin_Entri/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TBL_Entri tBL_Entri = db.TBL_Entri.Find(id);
            if (tBL_Entri == null)
            {
                return HttpNotFound();
            }
            return View(tBL_Entri);
        }

        // POST: Admin_Entri/Edit/5
        // Aşırı gönderim saldırılarından korunmak için bağlamak istediğiniz belirli özellikleri etkinleştirin. 
        // Daha fazla bilgi için bkz. https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Aciklama,Konu_ID,Kullanici_ID,Aktif,Eklenme_Tarihi")] TBL_Entri tBL_Entri)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tBL_Entri).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tBL_Entri);
        }

        // GET: Admin_Entri/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Admin_View_Model vm = new Admin_View_Model();
            vm.TBL_Konu = db.TBL_Konu.ToList();
            vm.TBL_Kullanici = db.TBL_Kullanici.ToList();
            vm.TBL_Entri_Duzenle = db.TBL_Entri.Find(id);
            if (vm.TBL_Entri_Duzenle == null)
            {
                return HttpNotFound();
            }
            return View(vm);
        }

        // POST: Admin_Entri/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TBL_Entri tBL_Entri = db.TBL_Entri.Find(id);
            db.TBL_Entri.Remove(tBL_Entri);
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
