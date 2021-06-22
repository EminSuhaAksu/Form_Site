using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.Entities
{
    [Table("TBL_Kullanici")]
    public class TBL_Kullanici
    {
        [Key]
        public int ID { get; set; }
        public string KAD { get; set; }
        public string Password { get; set; }
        public string Ad_Soyad { get; set; }
        public string Email { get; set; }
        public int Yetki { get; set; }
    }
}