namespace MovieRentalApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("movie_rental")]
    public partial class MovieRental
    {
        [Key]
        public int items_id { get; set; }

        public int rental_id { get; set; }

        public int movie_id { get; set; }

        public string status { get; set; }

        [Column(TypeName = "date")]
        public DateTime date_returned { get; set; }


        public virtual Movie Movie { get; set; }

        public virtual Rental Rental { get; set; }
    }
}
