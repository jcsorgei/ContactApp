using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ContactExtensions
    {
        public static IQueryable<Contact> Sort(this IQueryable<Contact> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(c => c.FirstName.ToLower());

            query = orderBy switch
            {
                "firstName" => query.OrderBy(c => c.FirstName.ToLower()),
                "firstNameDesc" => query.OrderByDescending(c => c.FirstName.ToLower()),
                "lastName" => query.OrderBy(c => c.LastName.ToLower()),
                "lastNameDesc" => query.OrderByDescending(c => c.LastName.ToLower()),
                "email" => query.OrderBy(c => c.Email.ToLower()),
                "emailDesc" => query.OrderByDescending(c => c.Email.ToLower()),
                "phone" => query.OrderBy(c => c.PhoneNumber.ToLower()),
                "phoneDesc" => query.OrderByDescending(c => c.PhoneNumber.ToLower()),
                _ => query.OrderBy(p => p.FirstName.ToLower())
            };

            return query;
        }

        public static IQueryable<Contact> Search(this IQueryable<Contact> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => 
                   p.FirstName.ToLower().Contains(lowerCaseSearchTerm)
                || p.LastName.ToLower().Contains(lowerCaseSearchTerm)
                || p.Email.ToLower().Contains(lowerCaseSearchTerm)
                || p.PhoneNumber.ToLower().Contains(lowerCaseSearchTerm));

        }
    }
}