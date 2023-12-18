namespace MovieRentalApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Customer")]
    public partial class Customer
    {
       
        public Customer()
        {
            Rentals = new HashSet<Rental>();
        }

        [Key]
        public int customer_id { get; set; }

        [Required]
        [StringLength(100)]
        public string first_name { get; set; }

        [Required]
        [StringLength(100)]
        public string last_name { get; set; }

        [Column(TypeName = "date")]
        public DateTime birth_date { get; set; }

        [Required]
        [StringLength(50)]
        public string contact_num { get; set; }

        [Required]
        [StringLength(150)]
        public string address { get; set; }

        
        public virtual ICollection<Rental> Rentals { get; set; }
    }
}
