namespace MovieRentalApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Rental")]
    public partial class Rental
    {
       
        public Rental()
        {
            movie_rental = new HashSet<MovieRental>();
        }

        [Key]
        public int rental_id { get; set; }

        public int customer_id { get; set; }

        [Column(TypeName = "date")]
        public DateTime rent_date { get; set; }

        public virtual Customer Customer { get; set; }

        
        public virtual ICollection<MovieRental> movie_rental { get; set; }
    }
}
