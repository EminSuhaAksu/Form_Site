using Odev_Form_V2.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.ViewModel
{
    public class Admin_View_Model
    {
        public IEnumerable<TBL_Entri> TBL_Entri { get; set; }
        public IEnumerable<TBL_Kategori> TBL_Kategori { get; set; }
        public IEnumerable<TBL_Konu> TBL_Konu { get; set; }
        public IEnumerable<TBL_Konu> TBL_Konu_Secili { get; set; }
        public IEnumerable<TBL_Kullanici> TBL_Kullanici { get; set; } 
        public TBL_Entri TBL_Entri_Duzenle { get; set; }
        public TBL_Kategori TBL_Kategori_Duzenle { get; set; }
        public TBL_Konu TBL_Konu_Duzenle { get; set; }
        public TBL_Kullanici TBL_Kullanici_Duzenle { get; set; } 
    }
}