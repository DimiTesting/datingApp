using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SeedUserDTO
    {
        public required string Id { get; set; }
        public required string Email { get; set; }
        public required string DisplayName { get; set; }
        public string? ImageUrl { get; set; }
         public string? Description { get; set; }
        public required string Gender { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; } 
    }
}