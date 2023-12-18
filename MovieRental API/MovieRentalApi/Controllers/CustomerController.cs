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
    public class CustomerController : ApiController
    {
        
        private MovieRentalContext db = new MovieRentalContext();

        [Route("api/customers")]
        public IQueryable<Customer> GetCustomers()
        {
            return db.Customers;
        }

        [Route("api/customers/{id}")]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        
        [ResponseType(typeof(void))]
        [Route("api/updatecustomer/{id}")]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.customer_id)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

       
        [ResponseType(typeof(Customer))]
        [Route("api/addcustomer")]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);
            db.SaveChanges();

           // return CreatedAtRoute("DefaultApi", new { id = customer.customer_id }, customer);
           return Ok(customer);

        }

        
        [ResponseType(typeof(Customer))]
        [Route("api/deletecustomer/{id}")]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.customer_id == id) > 0;
        }
    }
}