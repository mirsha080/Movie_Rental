namespace MovieRentalApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Movie")]
    public partial class Movie
    {
       
        public Movie()
        {
            movie_rental = new HashSet<MovieRental>();
        }

        [Key]
        public int movie_id { get; set; }

        [Required]
        public string title { get; set; }

        [StringLength(100)]
        public string genra { get; set; }

        [Required]
        public string cast { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_released { get; set; }

        [Required]
        public int number_of_copies { get; set; }

        [Required]
        public int available_copies { get; set; }

        [Required]
        public int rented_copies { get; set; }

      

     
       
        public virtual ICollection<MovieRental> movie_rental { get; set; }
    }
}
