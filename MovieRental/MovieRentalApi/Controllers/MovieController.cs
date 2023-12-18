using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using MovieRentalApi.Models;

namespace MovieRentalApi.Controllers
{
    [EnableCors(origins: "http://localhost:1841", headers: "*", methods: "*")]
    public class MovieController : ApiController
    {
        private MovieRentalContext db = new MovieRentalContext();

        
        [Route("api/movies")]
        public IQueryable<Movie> GetMovies()
        {
            return db.Movies;
         }

     
        [ResponseType(typeof(Movie))]
        [Route("api/movies/{id}")]
        public IHttpActionResult GetMovieById(int id)
        {
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [ResponseType(typeof(void))]
        [Route("api/updatemovie/{id}")]
        public IHttpActionResult PutMovie(int id, Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.movie_id)
            {
                return BadRequest();
            }

            // db.Entry(movie).State = EntityState.Modified;
            var existingMovie = db.Movies.Find(id);
            if (existingMovie != null)
            {
                // Update the properties of the existingMovie with the values from the movie object
                db.Entry(existingMovie).CurrentValues.SetValues(movie);
            }
            else
            {
                // Movie with the specified id does not exist, handle the situation accordingly
                return NotFound();
            }



            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(movie);
        }

       
        [ResponseType(typeof(Movie))]
        [Route("api/addmovie")]
        public IHttpActionResult PostMovie(Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movies.Add(movie);
            db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = movie.movie_id }, movie);
            return StatusCode(HttpStatusCode.NoContent);
            //return Ok(movie);
        }

        
            [ResponseType(typeof(Movie))]
            [Route("api/deletemovie/{id}")]
            public IHttpActionResult DeleteMovie(int id)
            {
                Movie movie = db.Movies.Find(id);
                if (movie == null)
                {
                    return NotFound();
                }

                db.Movies.Remove(movie);
                db.SaveChanges();

                //return Ok(movie);
                return StatusCode(HttpStatusCode.NoContent);
            }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovieExists(int id)
        {
            return db.Movies.Count(e => e.movie_id == id) > 0;
        }
    }
}