using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using MovieRentalApi.Models;

namespace MovieRentalApi.Controllers
{
    [EnableCors(origins: "http://localhost:1841", headers: "*", methods: "*")]
    public class MovieRentalController : ApiController
    {
        private MovieRentalContext db = new MovieRentalContext();

        // GET: api/movie_rental
        [Route("api/movierentals")]
        public IQueryable<MovieRental> Getmovie_rental()
        {
            return db.movie_rental;
        }

        // GET: api/movie_rental/5
        [ResponseType(typeof(MovieRental))]
        [Route("api/movierentals/{id}")]
        public IHttpActionResult Getmovie_rental(int id)
        {
            MovieRental movie_rental = db.movie_rental.Find(id);
            if (movie_rental == null)
            {
                return NotFound();
            }

            return Ok(movie_rental);
        }

        // PUT: api/movie_rental/5
        [ResponseType(typeof(void))]
        [Route("api/updatemovierental/{id}")]
        public IHttpActionResult Putmovie_rental(int id, MovieRental movie_rental)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie_rental.items_id)
            {
                return BadRequest();
            }

           
            var existingMovieRental  = db.movie_rental.Find(id); ;
            if (existingMovieRental != null)
            {
                
                db.Entry(existingMovieRental).CurrentValues.SetValues(movie_rental);
            }

            else
            {
                
                return NotFound();
            }


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!movie_rentalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/movie_rental
        [ResponseType(typeof(MovieRental))]
        [Route("api/addmovierental")]
        public IHttpActionResult Postmovie_rental(MovieRental movie_rental)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.movie_rental.Add(movie_rental);
            db.SaveChanges();

            return Ok(movie_rental);
            ///return CreatedAtRoute("DefaultApi", new { id = movie_rental.Id }, movie_rental);
        }

        // DELETE: api/movie_rental/5
        [ResponseType(typeof(MovieRental))]
        [Route("api/deletemovierental/{id}")]
        public IHttpActionResult Deletemovie_rental(int id)
        {
            MovieRental movie_rental = db.movie_rental.Find(id);
            if (movie_rental == null)
            {
                return NotFound();
            }

            db.movie_rental.Remove(movie_rental);
            db.SaveChanges();

            return Ok(movie_rental);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool movie_rentalExists(int id)
        {
            return db.movie_rental.Count(e => e.items_id == id) > 0;
        }
    }
}