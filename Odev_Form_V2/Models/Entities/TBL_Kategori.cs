using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.Entities
{
    [Table("TBL_Kategori")]
    public class TBL_Kategori
    {
        [Key]
        public int ID { get; set; }
        public string Ad { get; set; }
        public bool Aktif { get; set; }
        public DateTime Eklenme_Tarihi { get; set; }
    }
}