using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController: ControllerBase
    {
        private readonly DataContext _context;
        public ContactsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts([FromQuery] ContactParams contactParams)
        {
            var query = _context.Contacts
                .Sort(contactParams.OrderBy)
                .Search(contactParams.SearchTerm)
                .AsQueryable();

            var contacts = await PagedList<Contact>.ToPagedList(query,
                contactParams.PageNumber,contactParams.PageSize);
            
            Response.AddPaginationHeader(contacts.MetaData);

            if (contacts == null) return NotFound();

            return contacts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null) return NotFound();

            return contact;
        }


        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact(ContactDto contactDto)
        {
            if (ModelState.IsValid)
            {
                var newContact = new Contact
                {
                    FirstName = contactDto.FirstName,
                    LastName = contactDto.LastName,
                    Email = contactDto.Email,
                    PhoneNumber = contactDto.PhoneNumber
                };
                _context.Contacts.Add(newContact);
                await _context.SaveChangesAsync();

                return newContact;
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ContactDto>> UpdateContact(int id, ContactDto contactDto)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null) return NotFound();

            if (ModelState.IsValid)
            {
                contact.FirstName = contactDto.FirstName;
                contact.LastName = contactDto.LastName;
                contact.Email = contactDto.Email;
                contact.PhoneNumber = contactDto.PhoneNumber;
            }

            await _context.SaveChangesAsync();

            return contactDto;

        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null) return NotFound();

            _context.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}