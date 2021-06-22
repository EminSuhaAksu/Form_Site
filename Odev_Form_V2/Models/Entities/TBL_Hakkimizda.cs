using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Odev_Form_V2.Models.Entities
{
    public class TBL_Hakkimizda
    {
[Key]
public int ID { get; set; }
        [AllowHtml]
        public string Aciklama { get; set; }
        public DateTime Eklenme_Tarihi { get; set; }
        public bool Aktif { get; set; }
    }
}