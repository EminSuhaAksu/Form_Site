using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Odev_Form_V2.Models.Entities
{
    public class TBL_Konu
    {
        [Key]
        public int ID { get; set; }

        public string Ad { get; set; }
        [AllowHtml]
        public string Aciklama { get; set; }
       public string Kapak_Foto { get; set; }
        public int Kategori_ID { get; set; }
        public int KID { get; set; }
        public DateTime EKlenme_Tarihi { get; set; }
        public bool Aktif { get; set; }
    }
}