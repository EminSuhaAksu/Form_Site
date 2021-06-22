using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.Entities
{
    [Table("TBL_Iletisim")]
    public class TBL_Iletisim
    {
        [Key]
        public int ID { get; set; }
        public string Ad_Soyad { get; set; }
        public string E_Posta { get; set; }
        public string Konu { get; set; }
        public string Mesaj { get; set; }
        public DateTime Eklenme_Tarihi { get; set; }
    }
}