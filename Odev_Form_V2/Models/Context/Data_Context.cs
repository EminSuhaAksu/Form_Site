using Odev_Form_V2.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Odev_Form_V2.Models.Context
{
    public class Data_Context : DbContext
    {
        public DbSet<TBL_Entri> TBL_Entri { get; set; }
        public DbSet<TBL_Kategori> TBL_Kategori { get; set; }
        public DbSet<TBL_Konu> TBL_Konu { get; set; }
        public DbSet<TBL_Kullanici> TBL_Kullanici { get; set; }
        public DbSet<TBL_Like> TBL_Like { get; set; }
        public DbSet<TBL_Iletisim> TBL_Iletisim { get; set; }
        public DbSet<TBL_Hakkimizda> TBL_Hakkimizda { get; set; }
    }
}