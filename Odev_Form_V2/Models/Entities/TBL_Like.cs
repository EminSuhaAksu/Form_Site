using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.Entities
{
    public class TBL_Like
    {
        [Key]
        public int ID { get; set; }
        public int Konu_ID{ get; set; }
        public int Entri_ID{ get; set; }
        public int Kullanici_ID { get; set; }
        public DateTime Eklenme_Tarihi { get; set; }
    }
}