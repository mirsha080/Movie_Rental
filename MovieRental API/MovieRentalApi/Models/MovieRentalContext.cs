using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace MovieRentalApi.Models
{
    public partial class MovieRentalContext : DbContext
    {
        public MovieRentalContext()
            : base("name=MovieRentalContext")
        {
        }

       
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<MovieRental> movie_rental { get; set; }
        public virtual DbSet<Rental> Rentals { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .Property(e => e.first_name)
                .IsUnicode(false);

            modelBuilder.Entity<Customer>()
                .Property(e => e.last_name)
                .IsUnicode(false);

            modelBuilder.Entity<Customer>()
                .Property(e => e.contact_num)
                .IsUnicode(false);

            modelBuilder.Entity<Customer>()
                .Property(e => e.address)
                .IsUnicode(false);

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.Rentals)
                .WithRequired(e => e.Customer)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Movie>()
                .Property(e => e.title)
                .IsUnicode(false);


            modelBuilder.Entity<Movie>()
                .Property(e => e.genra)
                .IsUnicode(false);

            modelBuilder.Entity<Movie>()
                .Property(e => e.cast)
                .IsUnicode(false);

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.movie_rental)
                .WithRequired(e => e.Movie)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Rental>()
                .HasMany(e => e.movie_rental)
                .WithRequired(e => e.Rental)
                .WillCascadeOnDelete(false);
        }
    }
}
