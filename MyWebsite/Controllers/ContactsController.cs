using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL;
using MyWebsite.Models;
using System.Linq;

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly MyContext _context;

        public ContactsController(MyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ResultModel Get()
        {
            var result = new ResultModel();
            result.Data = _context.Contacts;
            result.IsSuccess = result.Data != null;
            return result;
        }

        [HttpGet("{id}")]
        public ResultModel Get(int id)
        {
            var result = new ResultModel();
            result.Data = _context.Contacts.SingleOrDefault(c => c.Id == id);
            result.IsSuccess = result.Data != null;
            return result;
        }

        [HttpPost]
        public ResultModel Post([FromBody]ContactModel contact)
        {
            var result = new ResultModel();
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            result.Data = contact.Id;
            result.IsSuccess = true;
            return result;
        }

        [HttpPut]
        public ResultModel Put([FromBody]ContactModel contact)
        {
            var result = new ResultModel();
            var oriContact = _context.Contacts.SingleOrDefault(c => c.Id == contact.Id);
            if (oriContact != null)
            {
                _context.Entry(oriContact).CurrentValues.SetValues(contact);
                _context.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }

        [HttpDelete("{id}")]
        public ResultModel Delete(int id)
        {
            var result = new ResultModel();
            var oriContact = _context.Contacts.SingleOrDefault(c => c.Id == id);
            if (oriContact != null)
            {
                _context.Contacts.Remove(oriContact);
                _context.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }
    }
}