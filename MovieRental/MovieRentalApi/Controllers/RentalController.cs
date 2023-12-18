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
    public class RentalController : ApiController
    {
        private MovieRentalContext db = new MovieRentalContext();

        // GET: api/Rentals
        [Route("api/rentals")]
        public IQueryable<Rental> GetRentals()
        {
            return db.Rentals;
        }

        // GET: api/Rentals/5
        [ResponseType(typeof(Rental))]
        [Route("api/rentals/{id}")]
        public IHttpActionResult GetRental(int id)
        {
            Rental rental = db.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            return Ok(rental);
        }

        // PUT: api/Rentals/5
        [ResponseType(typeof(void))]
        [Route("api/updaterental/{id}")]
        public IHttpActionResult PutRental(int id, Rental rental)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rental.rental_id)
            {
                return BadRequest();
            }

            db.Entry(rental).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalExists(id))
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

        // POST: api/Rentals
        [ResponseType(typeof(Rental))]
        [Route("api/addrental")]
        public IHttpActionResult PostRental(Rental rental)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rentals.Add(rental);
            db.SaveChanges();

            return Ok(rental);
            // return CreatedAtRoute("DefaultApi", new { id = rental.rental_id }, rental);
        }

        // DELETE: api/Rentals/5
        [ResponseType(typeof(Rental))]
        [Route("api/deleterental/{id}")]
        public IHttpActionResult DeleteRental(int id)
        {
            Rental rental = db.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            db.Rentals.Remove(rental);
            db.SaveChanges();

            return Ok(rental);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentalExists(int id)
        {
            return db.Rentals.Count(e => e.rental_id == id) > 0;
        }
    }
}