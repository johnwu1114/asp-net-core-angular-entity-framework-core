using Microsoft.AspNetCore.Mvc;
using MyWebsite.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private static List<ContactModel> _contacts = new List<ContactModel>();

        [HttpGet("{id}")]
        public ResultModel Get(int id)
        {
            var result = new ResultModel();
            result.Data = _contacts.SingleOrDefault(c => c.Id == id);
            result.IsSuccess = result.Data != null;
            return result;
        }

        [HttpPost]
        public ResultModel Post([FromBody]ContactModel contact)
        {
            var result = new ResultModel();
            contact.Id = _contacts.Count() == 0 ? 1 : _contacts.Max(c => c.Id) + 1;
            _contacts.Add(contact);
            result.Data = contact.Id;
            result.IsSuccess = true;
            return result;
        }

        [HttpPut]
        public ResultModel Put([FromBody]ContactModel contact)
        {
            var result = new ResultModel();
            int index;
            if ((index = _contacts.FindIndex(c => c.Id == contact.Id)) != -1)
            {
                _contacts[index] = contact;
                result.IsSuccess = true;
            }
            return result;
        }

        [HttpDelete("{id}")]
        public ResultModel Delete(int id)
        {
            var result = new ResultModel();
            int index;
            if ((index = _contacts.FindIndex(c => c.Id == id)) != -1)
            {
                _contacts.RemoveAt(index);
                result.IsSuccess = true;
            }
            return result;
        }
    }
}